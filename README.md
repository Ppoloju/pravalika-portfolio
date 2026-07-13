# Pravalika Portfolio

A modern, responsive portfolio website showcasing professional projects, skills, certifications, and experience.

## Overview

This portfolio is built with Next.js and features a clean, modern design with smooth animations and a professional layout optimized for recruiters and clients.

## Features

- Fully responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Interactive project showcase
- Skills and technology sections
- Certificates display
- Professional experience timeline
- Education section
- Social media integration
- Modern glassmorphism design

## Tech Stack

- **Next.js 16** - React framework
- **React UI Library**
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Project Structure

```
pravalika-portfolio/
├── app/                 # Next.js app router pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # React components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── sections/       # Page sections (Hero, Projects, Skills, etc.)
│   └── ui/             # Reusable UI components
├── constants/          # Static data (projects, skills, experience, etc.)
├── data/              # Portfolio data
├── lib/               # Utility functions and configurations
├── public/            # Static assets (images, certificates)
├── styles/            # Additional styles
└── types/             # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ppoloju/pravalika-portfolio.git
cd pravalika-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Adding Projects

Edit `constants/projects.ts` to add or modify project information.

### Updating Skills

Edit `constants/skills.ts` to update your technical skills.

### Adding Certificates

Place certificate PDFs in the `public/certificates/` directory and update `constants/certificates.ts`.

### Updating Experience

Edit `constants/experience.ts` to add or modify work experience.

### Updating Education

Edit `constants/education.ts` to add or modify education details.

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy automatically

Alternatively, you can build and deploy to any platform that supports Next.js.

## Author

**Pravalika Poloju**

- GitHub: [@Ppoloju](https://github.com/Ppoloju)

## License

This project is licensed under the MIT License.
