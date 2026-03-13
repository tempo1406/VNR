# Implementation Plan

- [x] 1. Setup project dependencies and configuration


  - Install required packages: framer-motion, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
  - Configure Tailwind CSS with custom revolutionary theme colors
  - Setup TypeScript types and interfaces in types/game.ts
  - _Requirements: 6.1, 6.2, 9.5_





- [ ] 2. Create core game state management
  - [ ] 2.1 Implement GameContext with state and actions
    - Create context/GameContext.tsx with GameState interface
    - Implement actions: startGame, answerQuestion, nextStage, resetGame


    - Add timer logic with setInterval
    - _Requirements: 1.2, 2.1, 3.1, 11.1, 11.2_
  
  - [x] 2.2 Create custom hooks for game logic


    - useGameState hook to access context
    - useTimer hook for timer management with pause/resume
    - useQuestionSelector hook for random question selection



    - _Requirements: 1.2, 8.3, 11.4_
  
  - [ ] 2.3 Implement localStorage utilities
    - Create lib/storage.ts with saveLeaderboard, loadLeaderboard functions

    - Add validation and error handling for localStorage operations
    - Implement cleanup for old entries (>30 days)
    - _Requirements: 12.2, 12.5, 13.2_

- [ ] 3. Build UI components library
  - [ ] 3.1 Create WelcomeScreen component
    - Design revolutionary-themed welcome screen with gradient background
    - Add title, subtitle, and call-to-action buttons
    - Implement star and hammer-sickle decorations
    - _Requirements: 1.1, 6.1, 6.2, 6.3_
  
  - [x] 3.2 Create GameHeader component

    - Display timer in MM:SS format
    - Show progress bar with collected pieces count
    - Display stage name and question counter
    - Add pause button and instructions button
    - _Requirements: 4.1, 4.2, 4.3, 11.2_
  
  - [x] 3.3 Create ProgressBar component

    - Visual progress indicator with percentage
    - Show correct/wrong answers count
    - Animate progress changes
    - _Requirements: 4.1, 4.4, 4.5_


- [x] 4. Implement Stage 1: Multiple Choice


  - [x] 4.1 Create Stage1MultipleChoice component


    - Display question content with proper formatting
    - Render 4 answer options as buttons (A, B, C, D)
    - Handle answer selection and disable buttons after selection
    - Show visual feedback for selected answer
    - _Requirements: 1.3, 1.4_
  
  - [x] 4.2 Create QuestionCard component


    - Reusable card layout for questions
    - Revolutionary-themed styling with borders
    - Responsive design for mobile/tablet/desktop
    - _Requirements: 6.1, 6.2, 9.1, 9.2, 9.3_
  
  - [x] 4.3 Create AnswerFeedback component


    - Show correct/wrong feedback with animations
    - Display correct answer when user fails
    - Auto-dismiss after 1.5 seconds on correct answer
    - _Requirements: 1.4, 5.1, 5.3_
  
  - [x] 4.4 Implement answer validation logic

    - Check if selected answer matches correct_answer
    - Track attempts (max 2)
    - Award puzzle piece on correct answer
    - Move to next question automatically
    - _Requirements: 1.4, 1.5, 5.2, 5.4_

- [x] 5. Implement Stage 2: Fill in the Blank


  - [x] 5.1 Create Stage2FillInBlank component


    - Display question with input field
    - Add "Xác nhận" button to submit answer
    - Handle Enter key to submit
    - Clear input after submission
    - _Requirements: 2.3, 2.4_
  
  - [x] 5.2 Implement answer normalization and validation

    - Normalize input: trim(), toLowerCase()
    - Compare with correct_answer (case-insensitive)
    - Handle Vietnamese characters correctly
    - Show feedback immediately after validation
    - _Requirements: 2.4, 5.1_
  
  - [x] 5.3 Add retry mechanism for wrong answers

    - Allow up to 2 attempts per question
    - Show remaining attempts
    - Display correct answer after 2 failed attempts
    - _Requirements: 5.2, 5.3, 5.4_


- [x] 6. Implement Stage 3: Puzzle Game


  - [x] 6.1 Create PuzzleBoard component


    - Display target image area with 6x3 grid overlay
    - Show empty slots for puzzle pieces
    - Implement drop zones for each grid position
    - Highlight valid drop zones on drag
    - _Requirements: 3.2, 3.4_
  
  - [x] 6.2 Create PuzzlePiece component


    - Render image piece with correct clip-path
    - Implement drag functionality with @dnd-kit
    - Add visual feedback during drag (shadow, opacity)
    - Lock piece when placed correctly
    - _Requirements: 3.3, 3.4_
  
  - [x] 6.3 Implement puzzle piece generation logic


    - Calculate clip-path for each piece (6 cols x 3 rows)
    - Generate random initial positions outside board
    - Map collected pieces to puzzle pieces
    - Create piece-to-slot matching logic
    - _Requirements: 3.2, 3.3, 5.5_
  
  - [x] 6.4 Implement drag and drop mechanics


    - Setup DndContext from @dnd-kit
    - Handle drag start, drag over, drag end events
    - Implement snap-to-grid with tolerance (20px)
    - Validate correct placement
    - Play sound effect on successful placement
    - _Requirements: 3.4, 9.4_
  
  - [x] 6.5 Add completion detection

    - Check if all pieces are placed correctly
    - Trigger victory screen when complete
    - Stop timer on completion
    - _Requirements: 3.5, 11.3_

- [x] 7. Create modals and overlays


  - [x] 7.1 Create InstructionsModal component


    - Display game instructions in 3 sections (one per stage)
    - Add visual examples or icons
    - Implement "Bỏ qua" and "Đóng" buttons
    - Save "seen" status to localStorage
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [x] 7.2 Create VictoryScreen component


    - Show congratulations message with animation
    - Display completion time and statistics
    - Add name input form with validation
    - Implement "Chơi lại" and "Xem bảng xếp hạng" buttons
    - _Requirements: 3.5, 8.1, 11.5, 12.1, 12.3, 12.4_
  
  - [x] 7.3 Create LeaderboardModal component


    - Load and display top 10 entries from localStorage
    - Sort by time (ascending)
    - Format time as MM:SS
    - Highlight current user's entry
    - Show rank, name, time, and date
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_


- [x] 8. Implement audio system

  - [x] 8.1 Create AudioController component/hook

    - Setup Web Audio API context
    - Create oscillator-based sound effects (correct, wrong, complete, click)
    - Implement play functions for each sound type
    - Add mute/unmute toggle with state persistence
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [x] 8.2 Integrate audio with game events

    - Play correct sound on right answer
    - Play wrong sound on incorrect answer
    - Play complete sound on stage completion
    - Play click sound on puzzle piece placement
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 9. Implement timer system

  - [x] 9.1 Create timer logic in GameContext

    - Start timer when game begins
    - Update every second
    - Format as MM:SS for display
    - _Requirements: 11.1, 11.2_
  
  - [x] 9.2 Add pause/resume functionality

    - Pause timer when viewing instructions
    - Pause when game is paused
    - Resume when returning to game
    - _Requirements: 11.4_
  
  - [x] 9.3 Implement timer stop on completion

    - Stop timer when all puzzles placed
    - Save final time to state
    - Display final time on victory screen
    - _Requirements: 11.3, 11.5_

- [x] 10. Build main game container and routing


  - [x] 10.1 Update app/page.tsx with game container


    - Wrap with GameContext provider
    - Implement stage routing logic (welcome, stage1, stage2, stage3, victory)
    - Handle stage transitions
    - _Requirements: 1.1, 2.1, 3.1_
  
  - [x] 10.2 Create stage transition animations

    - Fade out current stage
    - Fade in next stage
    - Show transition message ("Màn 2", "Màn 3")
    - _Requirements: 6.5_
  
  - [x] 10.3 Implement game reset functionality

    - Clear all state
    - Select new random questions
    - Reset timer
    - Return to welcome screen
    - _Requirements: 8.1, 8.2, 8.3_


- [x] 11. Style with revolutionary theme

  - [x] 11.1 Configure Tailwind with custom colors

    - Add revolutionary color palette to tailwind.config
    - Define custom gradients
    - Add custom animations
    - _Requirements: 6.1, 6.2_
  
  - [x] 11.2 Create global styles and CSS variables

    - Add revolutionary background patterns
    - Define typography styles
    - Create button styles with hover effects
    - _Requirements: 6.1, 6.2, 6.4, 6.5_
  
  - [x] 11.3 Add decorative elements

    - Create star SVG component
    - Create hammer-sickle SVG component
    - Add border patterns
    - Position decorations in header
    - _Requirements: 6.3_
  
  - [x] 11.4 Implement animations with Framer Motion

    - Add page transitions
    - Create button hover animations
    - Add feedback animations (shake on wrong, pulse on correct)
    - Implement confetti effect for victory
    - _Requirements: 6.5_

- [x] 12. Implement responsive design

  - [x] 12.1 Add mobile-specific layouts

    - Stack components vertically
    - Adjust puzzle grid for small screens (4x3 or 5x3)
    - Increase touch target sizes
    - Optimize font sizes for mobile
    - _Requirements: 9.3, 9.4_
  

  - [ ] 12.2 Add tablet-specific layouts
    - Implement 2-column layout where appropriate
    - Adjust puzzle grid (5x3)
    - Optimize spacing
    - _Requirements: 9.2_

  
  - [ ] 12.3 Optimize desktop layout
    - Full 6x3 puzzle grid
    - Side-by-side layouts
    - Add hover effects

    - _Requirements: 9.1_
  
  - [ ] 12.4 Test touch interactions
    - Verify drag and drop works on touch devices
    - Test all buttons on mobile
    - Ensure modals work on small screens
    - _Requirements: 9.4_


- [x] 13. Add accessibility features

  - [x] 13.1 Implement keyboard navigation

    - Add tab navigation for all interactive elements
    - Support Enter/Space for button activation
    - Add Escape key to close modals
    - Implement arrow key navigation for answer options
    - _Requirements: 9.1, 9.2, 9.3_
  
  - [x] 13.2 Add ARIA labels and semantic HTML

    - Use proper heading hierarchy
    - Add aria-labels for icon buttons
    - Implement aria-live regions for feedback
    - Add alt text for images
    - _Requirements: 9.1, 9.2, 9.3_
  
  - [x] 13.3 Ensure visual accessibility

    - Add focus indicators
    - Verify color contrast ratios
    - Support prefers-reduced-motion
    - _Requirements: 6.1, 6.2, 6.5_

- [ ] 14. Optimize performance


  - [x] 14.1 Optimize image loading

    - Use Next.js Image component for anh1.jpg
    - Implement lazy loading for puzzle pieces
    - Preload image before Stage 3
    - _Requirements: 9.5_
  
  - [x] 14.2 Optimize component rendering

    - Add React.memo to PuzzlePiece components
    - Use useCallback for event handlers
    - Memoize expensive calculations
    - _Requirements: 9.5_
  
  - [x] 14.3 Optimize localStorage operations

    - Batch writes to localStorage
    - Implement debouncing for frequent updates
    - Add error handling for quota exceeded
    - _Requirements: 12.2, 12.5_



- [x] 15. Final integration and polish

  - [ ] 15.1 Connect all components in main game flow
    - Verify stage transitions work smoothly
    - Test complete game flow from start to finish
    - Ensure all modals open/close correctly
    - _Requirements: 1.1, 2.1, 3.1_

  
  - [ ] 15.2 Add loading states and error handling
    - Show loading spinner while questions load
    - Handle localStorage errors gracefully
    - Add error boundaries for component errors

    - _Requirements: 9.5_
  
  - [ ] 15.3 Test and fix bugs
    - Test on multiple browsers
    - Test on mobile devices
    - Fix any visual or functional issues

    - Verify all requirements are met
    - _Requirements: All_
  
  - [ ] 15.4 Add final touches
    - Optimize bundle size
    - Add meta tags for SEO
    - Test performance with Lighthouse
    - _Requirements: 9.5_
