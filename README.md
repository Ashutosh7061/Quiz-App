# Quiz App

A modern React-based quiz application that fetches real trivia questions from [The Trivia API](https://the-trivia-api.com/).

## Features
- Select from 5 categories: General Knowledge, Science: Computers, Sports, History, Geography
- 15 questions per quiz with randomized/shuffled options
- Interactive answering with visual feedback (green for correct, red for wrong)
- Score tracking and final results display
- Reset quiz functionality
- Responsive design

## Currently Active
- Form component: Category selector UI
- Quiz component: Full quiz logic (commented out in App.jsx, ready to uncomment)

## Tech Stack
- React 19
- Vite 7 (dev server)
- ESLint for code quality
- CSS modules for styling

## Quick Start
```
npm install
npm run dev
```
Visit http://localhost:5173/

## Project Structure
```
src/
├── App.jsx          # Root: Renders Form (Quiz ready to enable)
├── main.jsx         # Entry point
├── components/Quiz/
│   ├── Form.jsx     # Category selection form
│   ├── Quiz.jsx     # Main quiz: state, API fetch, UI logic
│   └── Quiz.css     # Quiz styles
└── assets/
    └── data.js      # Sample static quiz data (backup/local)
```

## API Integration
Fetches questions dynamically: `https://the-trivia-api.com/v2/questions?limit=15&categories={id}`

