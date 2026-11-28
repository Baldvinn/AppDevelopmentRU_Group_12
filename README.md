# Toodler

A virtual Kanban board mobile application for task organization, built with React Native, Expo and TypeScript.

## Features

- Create, view, edit and delete boards.
- Organize boards into lists and lists into tasks.
- Create, edit, delete, and move tasks between lists.
- Mark tasks as complete or incomplete.
- Filter tasks to show all, unfinished, or completed tasks.
- Select and delete multiple boards or lists.

## Requirements

- Node.js and npm
- An Android or iOS device/emulator or a web browser.
- Expo Go or another compatible application for running the Expo app.

## Getting started

1. Install dependencies: `npm install`
2. Start Expo: `npx expo start`
3. Follow the instructions provided in the terminal window for opening the application in your platform of choice.

## Component graphs

Each view is broken up into components following the Single Responsibility Principle. Reusable components live in "src/components", the screens in "src/views", and shared data logic in "src/saved" and "src/hooks".

### Main Menu
![Main menu component graph](assets/component-graphs/Frame%201.png)

"Main" shows the toodler logo, a welcome message and a button that navigates to the Boards screen.

### Boards
![Boards component graph](assets/component-graphs/Frame%202.png)

"Boards" lists every board in a "Flatlist".  Boards are created and edited through a reusable "Modal" containing "BoardForm", and deletion is confirmed with "ConfirmDelete".  "BoardToolbar" deletes selected boards, and "AppButton" opens the create form.

### Board
![Board component graph](assets/component-graphs/Frame%203.png)

"Board" shows a board's lists side by side. "TaskFilter" switches between all, unfinished and finished tasks. Each list is a "BoardList" with a "ProgressBar" and its tasks as "ListTask" items, each with a "CheckButton".  Popups ("Modal") show "TaskForm", "ListForm", "EditList" and "ConfirmDelete", and "BoardToolbar" adds or deletes lists.