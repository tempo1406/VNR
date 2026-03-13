# Design Document

## Overview

Trò chơi giáo dục về Tư tưởng Hồ Chí Minh được xây dựng trên Next.js 16 với React 19, sử dụng TypeScript và Tailwind CSS. Ứng dụng là Single Page Application (SPA) với state management tập trung, không cần backend server vì tất cả dữ liệu được lưu trữ local.

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI (đã có sẵn)
- **Drag & Drop**: react-dnd hoặc dnd-kit
- **Audio**: Web Audio API
- **Storage**: localStorage API
- **Animation**: Framer Motion

## Architecture

### Component Hierarchy

```
app/
├── page.tsx (Main Game Container)
├── layout.tsx (Root Layout with Revolutionary Theme)
└── components/
    ├── WelcomeScreen.tsx
    ├── GameHeader.tsx (Timer, Progress, Stage Info)
    ├── Stage1MultipleChoice.tsx
    ├── Stage2FillInBlank.tsx
    ├── Stage3PuzzleGame.tsx
    ├── QuestionCard.tsx
    ├── AnswerFeedback.tsx
    ├── ProgressBar.tsx
    ├── PuzzlePiece.tsx
    ├── PuzzleBoard.tsx
    ├── VictoryScreen.tsx
    ├── InstructionsModal.tsx
    ├── LeaderboardModal.tsx
    └── AudioController.tsx
```

### State Management Pattern

Sử dụng React Context API với custom hooks để quản lý state toàn cục:


```typescript
// GameContext
interface GameState {
  stage: 1 | 2 | 3 | 'welcome' | 'victory';
  currentQuestionIndex: number;
  selectedQuestions: Question[];
  collectedPieces: number[];
  attempts: number;
  correctAnswers: number;
  wrongAnswers: number;
  timer: number;
  isPaused: boolean;
}
```

## Components and Interfaces

### 1. Core Data Models

```typescript
// types/game.ts
interface Question {
  id: number;
  content: string;
  type: 'MC' | 'text';
  options?: string[];
  correct_answer: string;
}

interface GameProgress {
  stage: number;
  questionIndex: number;
  collectedPieces: number[];
  correctAnswers: number;
  wrongAnswers: number;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  time: number; // in seconds
  date: string;
  timestamp: number;
}

interface PuzzlePiece {
  id: number;
  position: { x: number; y: number };
  correctPosition: { row: number; col: number };
  isPlaced: boolean;
}
```

### 2. WelcomeScreen Component

**Purpose**: Màn hình chào mừng với tiêu đề và nút bắt đầu

**Props**: 
```typescript
interface WelcomeScreenProps {
  onStart: () => void;
  onShowInstructions: () => void;
  onShowLeaderboard: () => void;
}
```


**Design**:
- Background gradient đỏ (#DC143C → #8B0000)
- Tiêu đề lớn với font chữ đậm, màu vàng (#FFD700)
- Họa tiết ngôi sao vàng và búa liềm
- Nút "Bắt đầu" nổi bật với hiệu ứng hover
- Nút phụ: "Hướng dẫn" và "Bảng xếp hạng"

### 3. GameHeader Component

**Purpose**: Hiển thị thông tin game (timer, progress, stage)

**Props**:
```typescript
interface GameHeaderProps {
  stage: number;
  timer: number;
  collectedPieces: number;
  totalPieces: number;
  currentQuestion: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  onPause: () => void;
  onShowInstructions: () => void;
}
```

**Design**:
- Sticky header ở top
- Timer hiển thị MM:SS
- Progress bar với màu vàng
- Icon ngôi sao cho mỗi mảnh ghép thu thập được

### 4. Stage1MultipleChoice Component

**Purpose**: Màn chơi trắc nghiệm

**Props**:
```typescript
interface Stage1Props {
  question: Question;
  onAnswer: (answer: string) => void;
  attempts: number;
  feedback: 'correct' | 'wrong' | null;
}
```

**Logic**:
- Hiển thị câu hỏi và 4 đáp án dạng button
- Khi click đáp án, gọi onAnswer()
- Disable buttons sau khi chọn
- Hiển thị feedback với animation
- Tự động chuyển câu sau 1.5s nếu đúng


### 5. Stage2FillInBlank Component

**Purpose**: Màn chơi điền từ

**Props**:
```typescript
interface Stage2Props {
  question: Question;
  onAnswer: (answer: string) => void;
  attempts: number;
  feedback: 'correct' | 'wrong' | null;
}
```

**Logic**:
- Input field với placeholder "Nhập đáp án..."
- Button "Xác nhận" để submit
- Normalize answer: trim(), toLowerCase()
- So sánh với correct_answer (case-insensitive)
- Hiển thị đáp án đúng nếu sai 2 lần

### 6. Stage3PuzzleGame Component

**Purpose**: Màn chơi ghép hình

**Props**:
```typescript
interface Stage3Props {
  collectedPieces: number[];
  onComplete: () => void;
}
```

**Logic**:
- Chia ảnh anh1.jpg thành grid 6x3 (18 pieces)
- Sử dụng CSS clip-path hoặc canvas để cắt ảnh
- Drag & drop với react-dnd hoặc dnd-kit
- Snap to grid khi gần đúng vị trí (tolerance 20px)
- Hiệu ứng "lock" khi đặt đúng
- Check completion sau mỗi lần đặt

### 7. PuzzlePiece Component

**Purpose**: Mảnh ghép có thể kéo thả

**Props**:
```typescript
interface PuzzlePieceProps {
  id: number;
  imageUrl: string;
  clipPath: string;
  position: { x: number; y: number };
  isPlaced: boolean;
  onDragEnd: (id: number, position: { x: number; y: number }) => void;
}
```


### 8. VictoryScreen Component

**Purpose**: Màn hình chiến thắng

**Props**:
```typescript
interface VictoryScreenProps {
  time: number;
  correctAnswers: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onSaveScore: (name: string) => void;
}
```

**Design**:
- Confetti animation
- Hiển thị thời gian hoàn thành
- Form nhập tên
- Nút "Chơi lại" và "Xem bảng xếp hạng"

### 9. LeaderboardModal Component

**Purpose**: Hiển thị bảng xếp hạng

**Props**:
```typescript
interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
}
```

**Logic**:
- Load data từ localStorage
- Sort theo time tăng dần
- Hiển thị top 10
- Highlight current user

### 10. AudioController Component

**Purpose**: Quản lý âm thanh

**Methods**:
```typescript
interface AudioController {
  playCorrect: () => void;
  playWrong: () => void;
  playComplete: () => void;
  playClick: () => void;
  toggleMute: () => void;
  isMuted: boolean;
}
```

**Implementation**:
- Sử dụng Web Audio API
- Tạo oscillator cho âm thanh đơn giản
- Hoặc sử dụng audio files nếu có


## Data Models

### Question Selection Algorithm

```typescript
function selectRandomQuestions(
  allQuestions: Question[],
  count: number,
  type: 'MC' | 'text',
  excludeIds: number[]
): Question[] {
  const filtered = allQuestions.filter(
    q => q.type === type && !excludeIds.includes(q.id)
  );
  
  // Fisher-Yates shuffle
  const shuffled = [...filtered];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
}
```

### Puzzle Grid Calculation

```typescript
const GRID_ROWS = 3;
const GRID_COLS = 6;
const TOTAL_PIECES = GRID_ROWS * GRID_COLS; // 18

function calculatePiecePosition(pieceId: number) {
  const row = Math.floor(pieceId / GRID_COLS);
  const col = pieceId % GRID_COLS;
  return { row, col };
}

function generateClipPath(row: number, col: number): string {
  const widthPercent = 100 / GRID_COLS;
  const heightPercent = 100 / GRID_ROWS;
  
  return `inset(${row * heightPercent}% ${(GRID_COLS - col - 1) * widthPercent}% ${(GRID_ROWS - row - 1) * heightPercent}% ${col * widthPercent}%)`;
}
```

### LocalStorage Schema

```typescript
// Key: 'hcm-game-leaderboard'
interface StoredLeaderboard {
  entries: LeaderboardEntry[];
  version: number;
}

// Key: 'hcm-game-instructions-seen'
interface InstructionsSeen {
  seen: boolean;
  timestamp: number;
}
```


## Error Handling

### Question Loading Errors

- **Scenario**: questions.json không load được
- **Handling**: Hiển thị error screen với nút "Thử lại"
- **Fallback**: Không có fallback data, yêu cầu reload

### LocalStorage Errors

- **Scenario**: localStorage bị full hoặc disabled
- **Handling**: Game vẫn chơi được nhưng không lưu leaderboard
- **User Notification**: Toast message thông báo không thể lưu điểm

### Invalid Question Data

- **Scenario**: Câu hỏi thiếu field hoặc sai format
- **Handling**: Skip câu hỏi đó, log error to console
- **Validation**: Validate questions khi load

### Drag & Drop Errors

- **Scenario**: Touch events không hoạt động
- **Handling**: Fallback sang click-to-place mode
- **Detection**: Detect touch support với window.ontouchstart

## Testing Strategy

### Unit Tests

- Question selection algorithm
- Answer validation logic (normalize, compare)
- Puzzle position calculation
- Timer logic
- LocalStorage utilities

### Component Tests

- WelcomeScreen renders correctly
- Stage1 handles answer selection
- Stage2 validates input
- Stage3 drag & drop functionality
- VictoryScreen displays correct data
- LeaderboardModal sorts and displays entries

### Integration Tests

- Complete game flow: Welcome → Stage1 → Stage2 → Stage3 → Victory
- Question randomization không trùng lặp
- Timer starts/stops/pauses correctly
- LocalStorage save/load leaderboard
- Audio plays on correct events


### E2E Tests (Optional)

- User completes full game successfully
- User can replay with different questions
- Leaderboard persists across sessions
- Responsive design works on mobile

## Design System

### Color Palette

```css
/* Revolutionary Theme Colors */
--red-primary: #DC143C;      /* Crimson Red */
--red-dark: #8B0000;          /* Dark Red */
--red-light: #FF6B6B;         /* Light Red for hover */
--gold: #FFD700;              /* Gold for accents */
--gold-dark: #DAA520;         /* Dark Gold */
--white: #FFFFFF;
--black: #1A1A1A;
--gray-light: #F5F5F5;
--gray-dark: #333333;

/* Semantic Colors */
--success: #4CAF50;
--error: #F44336;
--warning: #FF9800;
```

### Typography

```css
/* Font Families */
--font-primary: 'Inter', system-ui, sans-serif;
--font-heading: 'Montserrat', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Spacing

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```


### Animations

```css
/* Transitions */
--transition-fast: 150ms ease-in-out;
--transition-base: 300ms ease-in-out;
--transition-slow: 500ms ease-in-out;

/* Keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
```

### Revolutionary Theme Elements

**Header Decoration**:
- Ngôi sao vàng 5 cánh ở góc trái
- Búa liềm stylized ở góc phải
- Border pattern với sọc đỏ-vàng

**Background Pattern**:
- Gradient từ đỏ đậm sang đỏ nhạt
- Subtle texture overlay (noise pattern)
- Radial gradient từ center

**Button Styles**:
```css
.btn-primary {
  background: linear-gradient(135deg, var(--red-primary), var(--red-dark));
  color: var(--gold);
  border: 2px solid var(--gold);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all var(--transition-base);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  border-color: var(--white);
}
```


## Performance Optimization

### Image Optimization

- Sử dụng Next.js Image component cho anh1.jpg
- Lazy load puzzle pieces
- Preload ảnh khi vào Stage 3
- Optimize image size (max 1920x1080)

### Code Splitting

- Lazy load Stage components
- Dynamic import cho modals
- Separate bundle cho audio utilities

### State Optimization

- Memoize expensive calculations (puzzle positions)
- Use React.memo cho PuzzlePiece components
- Debounce drag events
- Use useCallback cho event handlers

### LocalStorage Optimization

- Batch writes
- Compress data nếu cần (JSON.stringify)
- Limit leaderboard entries (max 100)
- Clear old entries (> 30 days)

## Responsive Design

### Breakpoints

```typescript
const breakpoints = {
  mobile: '0px',      // 0-767px
  tablet: '768px',    // 768-1023px
  desktop: '1024px',  // 1024px+
};
```

### Mobile Adaptations

- Stack layout vertically
- Larger touch targets (min 44x44px)
- Simplified puzzle grid (4x3 instead of 6x3 on small screens)
- Bottom sheet cho modals
- Swipe gestures cho navigation

### Tablet Adaptations

- 2-column layout cho questions
- Medium puzzle grid (5x3)
- Side panel cho progress

### Desktop Adaptations

- Full 6x3 puzzle grid
- Side-by-side layout
- Hover effects
- Keyboard shortcuts (Enter to submit, Space to pause)


## Accessibility

### Keyboard Navigation

- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys to navigate options
- Escape to close modals

### Screen Reader Support

- Semantic HTML (button, input, heading tags)
- ARIA labels cho icons
- ARIA live regions cho feedback
- Alt text cho images

### Visual Accessibility

- High contrast mode support
- Focus indicators
- Color không phải là cách duy nhất truyền đạt thông tin
- Font size có thể zoom

### Motion Accessibility

- Respect prefers-reduced-motion
- Option to disable animations
- No auto-playing animations > 5s

## Security Considerations

### Input Validation

- Sanitize user name input (XSS prevention)
- Validate question data structure
- Limit localStorage size

### Data Privacy

- No personal data collection
- No external API calls
- All data stored locally
- No tracking or analytics

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Android 90+

## Deployment

- Static export với `next build && next export`
- Deploy lên Vercel, Netlify, hoặc GitHub Pages
- No server-side rendering needed
- CDN caching cho assets

