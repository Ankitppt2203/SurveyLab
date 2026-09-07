# CSAT 🧪

CSAT is a modern, interactive **Survey Campaign Builder** built with React and TypeScript. It allows users to create and customize survey questions, configure options, adjust the visual appearance, and see all changes instantly through a live mobile preview.

The project focuses on creating a clean and user-friendly survey-building experience while demonstrating important frontend concepts such as **React component architecture, shared state management, dynamic forms, reusable components, and real-time UI synchronization**.

## ✨ Features

### 📝 Survey Content Builder

Create and manage survey questions dynamically.

- Add multiple survey questions
- Dynamically increase or decrease the number of questions
- Edit question titles and descriptions
- Add and remove answer options
- Maintain a minimum of two options per question
- Configure the CTA/submit button text
- Enable or disable additional comments
- Configure simple conditional logic
- Easily navigate between multiple questions

### 🎨 Survey Styling

Customize the appearance of your survey without writing any code.

- Background and backdrop colors
- Border radius controls
- Question title styling
- Subtitle styling
- Font family, size, weight, and style
- Text alignment
- Option list layouts
- Selected and unselected option styling
- Additional comment field styling
- CTA button styling
- Cross/close button customization
- Thank-you page styling
- Individual spacing and margin controls

### 📱 Live Mobile Preview

The application includes a realistic mobile survey preview that updates automatically whenever the survey configuration changes.

The preview supports:

- Dynamic questions
- Dynamic answer options
- Selected options
- Additional comments
- CTA buttons
- Cross/close button
- Thank-you page
- Uploaded media
- Custom styling

There is **no Save or Refresh button required**. Changes made in the editor are reflected immediately in the preview.

## 🛠️ Tech Stack

CSAT is built using modern frontend technologies:

- **React** – UI development and component-based architecture
- **TypeScript** – Type safety and maintainable code
- **Vite** – Fast development environment and build tooling
- **CSS / Tailwind CSS** – Styling and responsive UI
- **React State Management** – Managing survey content and styling state
- **Git & GitHub** – Version control and source code management

## 📂 Project Structure

The project follows a component-based structure to keep the application organized and easy to maintain.

```text
survey-lab/
│
├── public/
│   └── assets/
│
├── src/
│   ├── components/
│   │   ├── content/
│   │   ├── styling/
│   │   ├── preview/
│   │   └── common/
│   │
│   ├── data/
│   │   ├── defaultSurvey.ts
│   │   └── defaultStyles.ts
│   │
│   ├── hooks/
│   │
│   ├── utils/
│   │
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

Follow these steps to run CSAT locally.

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

### 2. Open the project directory

```bash
cd survey-lab
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Vite will start the local development server. Open the URL shown in your terminal, usually:

```text
http://localhost:5173
```

## 🏗️ Create a Production Build

To create an optimized production build:

```bash
npm run build
```

The generated production files will be placed in the `dist` directory.

You can also test the production build locally with:

```bash
npm run preview
```

## 🧠 How It Works

CSAT is designed around a shared application state.

The survey configuration contains information such as:

- Questions
- Question titles
- Descriptions
- Options
- Comments settings
- CTA text
- Conditional logic
- Thank-you page configuration

A separate styling state controls the visual appearance of the survey.

Both states are shared between the editor and the live preview:

```text
                 Survey State
                      │
          ┌───────────┴───────────┐
          ↓                       ↓
    Content Editor          Styling Editor
          │                       │
          └───────────┬───────────┘
                      ↓
               Live Preview
```

This approach allows the preview to stay synchronized with the editor without requiring a save operation.

## 🎯 Project Goals

The main purpose of CSAT is to demonstrate how a modern React application can handle:

- Dynamic form generation
- Nested state management
- Reusable React components
- Shared state between components
- Real-time preview synchronization
- Conditional UI rendering
- Responsive design
- User-friendly configuration interfaces

The project intentionally focuses on the frontend experience and does not require a complex backend, authentication system, analytics dashboard, or payment functionality.

## 📱 Responsive Design

CSAT is designed to work across different screen sizes.

### Desktop

The editor and live mobile preview are displayed side by side.

### Tablet

The layout adapts to provide enough space for both configuration and preview.

### Mobile

The editor and preview stack vertically to provide a comfortable mobile experience.

## 🌐 Live Demo

**Live Application:**
`<add-your-deployed-url-here>`

## 📦 Deployment

The application can be deployed using platforms such as:

- Vercel
- Netlify
- Render
- Firebase Hosting

For deployment, create a production build using:

```bash
npm run build
```

Then deploy the generated `dist` directory using your preferred hosting platform.

## 🤝 Contributing

This project was created as a frontend development project, but improvements and suggestions are welcome.

If you would like to experiment with the project:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Test the application
5. Create a pull request

## 📄 License

This project is intended for educational and portfolio purposes.

---

### 👨‍💻 Built with React + TypeScript

**CSAT** — Build surveys, customize them, and see the result instantly.
