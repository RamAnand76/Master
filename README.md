# ResuMaster: AI-Powered Resume Builder

ResuMaster is a modern, feature-rich application designed to help users create professional, ATS-friendly resumes with ease. Leveraging the power of AI, it provides real-time feedback, content suggestions, and template customization to help job seekers land their dream job.

## ✨ Features

- **AI-Powered Content Generation**: Get AI suggestions to improve your resume summary and experience descriptions.
- **Tailored Resumes**: Automatically tailor your resume content for a specific job description to increase your chances.
- **Real-time ATS Analysis**: Receive an instant ATS (Applicant Tracking System) score with actionable feedback and keyword analysis.
- **Live Preview**: See your changes reflected instantly in a live preview of your selected template.
- **Multiple Professional Templates**: Choose from a variety of beautifully designed, ATS-friendly templates (Classic, Modern, Creative, etc.).
- **User Authentication**: Secure sign-up and login functionality to manage your resume projects.
- **Client-Side Storage**: Your resume projects are saved securely in your browser's local storage for privacy and quick access.
- **Responsive Design**: A fully responsive interface that works seamlessly on desktop and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Integration**: [Google's Genkit](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **State Management**: React Hooks & Context API
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Set Up Environment Variables

This project uses Google's Generative AI. You'll need an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

1.  Create a file named `.env` in the root of the project.
2.  Add your API key to the `.env` file:

    ```bash
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### 2. Install Dependencies

Install the project dependencies using npm (or your preferred package manager):

```bash
npm install
```

### 3. Run the Development Servers

This project requires two development servers to be running simultaneously: one for the Next.js frontend and another for the Genkit AI flows.

1.  **Terminal 1: Start the Next.js App**
    This server handles the user interface and all non-AI parts of the application.

    ```bash
    npm run dev
    ```

    Your application will be available at [http://localhost:9002](http://localhost:9002).

2.  **Terminal 2: Start the Genkit AI Flows**
    This server runs the AI agents that provide suggestions, analysis, and content generation. It will automatically watch for changes in your flow files.

    ```bash
    npm run genkit:watch
    ```

    The Genkit development UI will be available at [http://localhost:4000](http://localhost:4000), where you can inspect and test your AI flows.

You are now all set up! Open your browser to [http://localhost:9002](http://localhost:9002) to start using the application.
