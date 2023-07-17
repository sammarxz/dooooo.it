# TaskBox - Simple Task Manager

![Taskbox](https://raw.githubusercontent.com/sammarxz/taskbox/main/preview.png)

TaskBox is a simple task manager application built using React, Chakra UI, and other modern technologies. It allows you to manage your tasks efficiently by providing a clean and intuitive user interface.

The challenge was to use only the React Context API and useReducer to manage the application states that started as a simple time manager and evolved into a more complete task manager.

## Technologies Used

- React
- Context API
- useReducer
- LocalStorage
- Chakra UI
- Emotion (for styling)
- react-beautiful-dnd (for task reordering)
- date-fns (for date manipulation)
- framer-motion (for animations)
- react-hook-form (for form handling)
- react-router-dom (for routing)
- use-sound (for sound effects)
- uuid (for generating unique IDs)
- zod (for data validation)

## How to Run the Project

Before running the project, make sure you have Node.js and npm installed on your system.

1. Clone the repository: `git clone https://github.com/sammarxz/taskbox.git`
2. Change into the project directory: `cd taskbox`
3. Install the dependencies: `npm install` or `yarn`
4. Start the development server: `npm run dev` or `yarn dev`

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Commands

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the production version of the app.
- `npm run lint`: Lints the source code using ESLint.
- `npm run prettier`: Formats the source code using Prettier.
- `npm run preview`: Previews the production build locally.
- `npm run test`: Runs tests using `vitest`.

## To Do

- [ ] Improve the kanban board to allow editing tasks and adding sections.
- [ ] Remove `emojis` from the project
- [ ] Improve usability adding some design interactions
- [ ] Put `edit task` as task menu option
- [ ] Remove React-router

## Contributing

If you find any issues or have suggestions for improvement, feel free to open an issue or create a pull request. Your contributions are greatly appreciated!

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.
