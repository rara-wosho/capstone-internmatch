# InternMatch: An Internship Placement Platform

A web platform built with **Next.js, Tailwind CSS, and shadcn/ui** that connects **students, OJT instructors, and company representatives** in an organized internship placement process.

## 🚀 Features

### 👩‍🎓 Students

-   Create an account and explore internship opportunities
-   Take company-created exams to showcase skills
-   View exam results and application status

### 👨‍🏫 OJT Instructors

-   Manage and organize students
-   Track application progress
-   Support students throughout their internship journey

### 🏢 Company Representatives

-   Create and manage exams for applicants
-   Review student results and decide whether to accept

## 📖 How It Works

1. **Students** sign up, browse internships, and take exams.
2. **Companies** create exams and evaluate student results.
3. **Instructors** monitor and organize student applications.

## ⚡ Tech Stack

-   [Next.js](https://nextjs.org/) – React framework for server-side rendering and routing
-   [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
-   [shadcn/ui](https://ui.shadcn.com/) – Accessible and customizable UI components
-   [Supabase](https://supabase.com/) an open-source, Backend-as-a-Service (BaaS) platform that serves as an alternative to Firebase, offering a suite of tools to build applications quickly.

## ⚠️ Important Notes

-   Some UI components may **not work properly on Safari versions below 16.4**.

## 🛠️ Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

## Run Locally

Clone the project

```bash
  git clone https://github.com/rara-wosho/capstone-internmatch.git
```

Go to the project directory

```bash
  cd capstone-internmatch
```

Install dependencies

```bash
  npm install
```

Create environment file

```bash
  cp .env.example .env
```

Update environment variables in .env

```bash
SUPABASE_PUBLIC_ANON_KEY
SUPABASE_PUBLIC_URL
SUPABASE_SECRET_KEY
```

Start the server

```bash
  npm run dev
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub

2. Connect your GitHub repository to Vercel

3. Configure environment variables in .env file

-   `SUPABASE_PUBLIC_ANON_KEY`
-   `SUPABASE_PUBLIC_URL`
-   `SUPABASE_SECRET_KEY`

4. Deploy

## License

This project is licensed under the
[MIT](https://choosealicense.com/licenses/mit/)
License.

## Contributors

-   [rara-wosho](https://github.com/rara-wosho) - Developer
-   [mhera-c1](https://github.com/mhera-c1) - Support analyst
