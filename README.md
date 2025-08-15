# StudyHub

A personal study tracker built with React and Vite. Organize your learning by categories, add topics, track progress, and watch embedded YouTube videos—all in a clean, fast, and local web app.

## Features

- **Category Management:** Add, edit, and delete study categories.
- **Topic Management:** Add, edit, and delete topics within categories.
- **Progress Tracking:** Mark topics as "Not Started", "In Progress", or "Completed". View progress bar and completion percentage per category.
- **Embedded Videos:** Add YouTube embed links to topics for direct video learning.
- **Local Persistence:** All data is saved in your browser (localStorage).
- **Responsive UI:** Built with Tailwind CSS for a modern look.
- **No Account Needed:** All features work locally, no login required.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Usage

- **Add a Category:** Click "Add a Category" on the home page.
- **Edit/Delete Category:** Use the "Edit" or "Delete" buttons next to each category.
- **Add a Topic:** Go to a category and click "Add Topic".
- **Edit/Delete Topic:** Use the "Edit" or "Delete" buttons next to each topic.
- **Track Progress:** Change topic status and watch your progress bar update.

## Project Structure

- `src/pages/` — Main pages (Home, Category, Topic, NotFound)
- `src/components/` — Reusable UI components (Modal, TopicList, etc.)
- `src/context/` — Global state management (ProgressContext)
- `src/utils/` — Seed data for initial topics

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

## License

This project is for personal use and learning.  
Feel free to modify and extend!

---
