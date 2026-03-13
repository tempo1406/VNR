'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { GameState, Question, FeedbackType } from '@/types/game';
import questionsData from '../data/questions.json';

const STAGE1_QUESTION_COUNT = 10;
const STAGE2_QUESTION_COUNT = 5;
const STAGE1_TARGET_PIECES = 10;
const STAGE2_TARGET_PIECES = 15;

interface GameContextType {
  state: GameState;
  startGame: () => void;
  answerQuestion: (answer: string) => FeedbackType;
  nextQuestion: () => void;
  nextStage: () => void;
  resetGame: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  completeGame: () => void;
}

type GameAction =
  | { type: 'START_GAME'; payload: { questions: Question[]; imageId: number } }
  | { type: 'ANSWER_CORRECT' }
  | { type: 'ANSWER_WRONG' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'NEXT_STAGE' }
  | { type: 'RESET_GAME' }
  | { type: 'TICK_TIMER' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESUME_TIMER' }
  | { type: 'COMPLETE_GAME' };

const initialState: GameState = {
  stage: 'welcome',
  currentQuestionIndex: 0,
  selectedQuestions: [],
  collectedPieces: [],
  attempts: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  timer: 0,
  isPaused: false,
  isTimerRunning: false,
  selectedImageId: 1,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        stage: 1,
        selectedQuestions: action.payload.questions,
        selectedImageId: action.payload.imageId,
        isTimerRunning: true,
      };

    case 'ANSWER_CORRECT': {
      // Stage 1: collect up to 10 pieces (0-9)
      // Stage 2: collect up to 15 pieces total (10-14)
      const maxPiecesForStage =
        state.stage === 1 ? STAGE1_TARGET_PIECES : STAGE2_TARGET_PIECES;
      const currentTotalPieces = state.collectedPieces.length;

      // Only add piece if we haven't reached the max for this stage
      const pieceId = currentTotalPieces;
      const newCollectedPieces = currentTotalPieces < maxPiecesForStage
        ? [...state.collectedPieces, pieceId]
        : state.collectedPieces;

      return {
        ...state,
        correctAnswers: state.correctAnswers + 1,
        collectedPieces: newCollectedPieces,
        attempts: 0,
      };
    }

    case 'ANSWER_WRONG':
      return {
        ...state,
        wrongAnswers: state.wrongAnswers + 1,
        attempts: state.attempts + 1,
      };

    case 'NEXT_QUESTION': {
      // Advance question index. Stage transition is controlled in GamePage
      // based on stage question limits (10 for stage 1, 5 for stage 2).
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        attempts: 0,
      };
    }

    case 'NEXT_STAGE':
      return {
        ...state,
        stage: (state.stage === 1 ? 2 : 3) as GameState['stage'],
        currentQuestionIndex: 0,
        attempts: 0,
      };

    case 'TICK_TIMER':
      return state.isTimerRunning && !state.isPaused
        ? { ...state, timer: state.timer + 1 }
        : state;

    case 'PAUSE_TIMER':
      return { ...state, isPaused: true };

    case 'RESUME_TIMER':
      return { ...state, isPaused: false };

    case 'COMPLETE_GAME':
      return {
        ...state,
        stage: 'victory',
        isTimerRunning: false,
      };

    case 'RESET_GAME':
      return initialState;

    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Timer effect
  useEffect(() => {
    if (state.isTimerRunning && !state.isPaused) {
      const interval = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.isTimerRunning, state.isPaused]);

  const shuffleQuestions = useCallback((type: 'MC' | 'text'): Question[] => {
    const allQuestions = questionsData as Question[];
    const filtered = allQuestions.filter(q => q.type === type);

    // Fisher-Yates shuffle
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, []);

  const startGame = useCallback(() => {
    // Stage 1: 10 MC questions
    // Stage 2: 5 fill-in questions
    const mcQuestions = shuffleQuestions('MC').slice(0, STAGE1_QUESTION_COUNT);
    const textQuestions = shuffleQuestions('text').slice(0, STAGE2_QUESTION_COUNT);
    const allQuestions = [...mcQuestions, ...textQuestions];

    // Random select image from 1-4 for stage 3 puzzle
    const randomImageId = Math.floor(Math.random() * 4) + 1;

    dispatch({ type: 'START_GAME', payload: { questions: allQuestions, imageId: randomImageId } });
  }, [shuffleQuestions]);

  const answerQuestion = useCallback((answer: string): FeedbackType => {
    // Calculate the actual index in the selectedQuestions array
    // Stage 1: MC questions (from start)
    // Stage 2: text questions (after all MC questions)
    const mcCount = state.selectedQuestions.filter(q => q.type === 'MC').length;
    const offset = state.stage === 1 ? 0 : state.stage === 2 ? mcCount : 0;
    const actualIndex = offset + state.currentQuestionIndex;
    const currentQuestion = state.selectedQuestions[actualIndex];

    if (!currentQuestion) return null;

    // Normalize input to make fill-in answers more tolerant:
    // lowercase + remove accents + remove punctuation + collapse spaces
    const normalizeText = (value: string) =>
      value
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\p{L}\p{N}\s]/gu, ' ')
        .replace(/\s+/g, ' ');

    const normalizedAnswer = normalizeText(answer);
    const normalizedCorrect = normalizeText(currentQuestion.correct_answer);

    if (normalizedAnswer === normalizedCorrect) {
      dispatch({ type: 'ANSWER_CORRECT' });
      return 'correct';
    } else {
      dispatch({ type: 'ANSWER_WRONG' });
      return 'wrong';
    }
  }, [state.selectedQuestions, state.currentQuestionIndex, state.stage]);

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const nextStage = useCallback(() => {
    dispatch({ type: 'NEXT_STAGE' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const pauseTimer = useCallback(() => {
    dispatch({ type: 'PAUSE_TIMER' });
  }, []);

  const resumeTimer = useCallback(() => {
    dispatch({ type: 'RESUME_TIMER' });
  }, []);

  const completeGame = useCallback(() => {
    dispatch({ type: 'COMPLETE_GAME' });
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        startGame,
        answerQuestion,
        nextQuestion,
        nextStage,
        resetGame,
        pauseTimer,
        resumeTimer,
        completeGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
