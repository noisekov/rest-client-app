# REST Client App

A lightweight Postman-like REST client built with Next.js, featuring authentication, request history, and environment variables.

## Features

- 🔒 **Authentication** with Firebase
- 🌐 **Multi-language support** (i18n)
- 📝 **REST Client** with:
  - HTTP method selection
  - URL input
  - Request body editor (JSON/text)
  - Headers management
  - Response viewer
  - Code generation (cURL, Fetch, etc.)
- 📚 **Request History** stored in localStorage
- 🔧 **Environment Variables** support
- 🎨 **Modern UI** with Tailwind CSS and shadcn/ui
- � **Full test coverage** with Playwright

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Authentication**: [Firebase](https://firebase.google.com/)
- **Testing**: [Playwright](https://playwright.dev/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase project with Authentication enabled
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/noisekov/rest-client-app.git
   cd rest-client-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase config:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `dev`: Start development server
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint
- `prettier-fix`: Format code with Prettier
- `test`: Run Playwright tests
- `coverage`: Generate test coverage report

## Testing

We use Playwright for end-to-end testing. To run tests:

```bash
npm run test
```

To view test coverage:

```bash
npm run coverage
```

## Deployment

The app deployed to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://rsnextteam.netlify.app/en)

## Team

- [Team Member Vladimir](https://github.com/noisekov)
- [Team Member Sergey](https://github.com/skayer81)
- [Team Member Larisa](https://github.com/LaraNU)

## Acknowledgments

- [RS School](https://rs.school/) for the project idea
- [Postman](https://www.postman.com/) for inspiration
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
