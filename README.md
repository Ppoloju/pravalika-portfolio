# Pravalika Poloju | Portfolio

A modern personal portfolio website built with Next.js to showcase experience, skills, projects, certifications, and career highlights for recruiters and collaborators.

## Overview

This portfolio is designed as a clean, responsive, and professional landing page for a Computer Science student and developer. It highlights:

- full-stack development work
- AI and machine learning interests
- project experience and technical skills
- internship and learning journey
- certifications and achievements

The site uses a polished dark-mode aesthetic with animated sections, soft gradients, and structured content blocks.

## Featured Sections

- Hero introduction and personal branding
- About section with academic and career journey
- Skills showcase
- Project portfolio cards
- Work experience timeline
- Certifications gallery
- Contact section with social links

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Icons

## Project Structure

```bash
pravalika-portfolio/
├── app/                     # App router pages and global styles
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/             # Navbar, Footer, MobileMenu
│   ├── sections/           # Hero, About, Skills, Projects, Experience, Certifications, Contact
│   └── ui/                 # Reusable card, button, badge, and animation components
├── constants/              # Static portfolio data (projects, skills, experience, social links, certifications)
├── data/
│   └── portfolio.ts        # Core personal profile data
├── lib/                    # Utility functions and animation helpers
├── public/
│   ├── certificates/      # Certification assets
│   ├── projects/          # Project-related media
│   └── resume/            # Resume PDF
├── styles/                 # Additional CSS support
├── types/                  # TypeScript interfaces and definitions
├── eslint.config.mjs       # ESLint flat config
├── LICENSE                 # Project license
├── next.config.ts          # Next.js config
├── package.json            # Scripts and dependencies
├── postcss.config.mjs      # PostCSS config
├── tailwind.config.ts      # Tailwind config
├── tsconfig.json           # TypeScript config
├── README.md               # Project documentation
└── eslint.config.mjs       # ESLint flat config
```

## Getting Started

### Prerequisites

- Node.js 20.9.0 or newer
- npm or yarn

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

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

## Customization

You can update portfolio content by editing these files:

- `data/portfolio.ts` — core profile details, headline, about text, and contact info
- `constants/projects.ts` — project list and descriptions
- `constants/skills.ts` — technology stack and categories
- `constants/experience.ts` — work experience details
- `constants/certifications.ts` — certificate data and metadata
- `constants/socials.ts` — social media/profile links

You can also add resume files and certificate PDFs under `public/resume/` and `public/certificates/`.

## Deployment

This project is optimized for deployment with Vercel.

Typical workflow:

1. Push the repository to GitHub
2. Import it into Vercel
3. Configure the framework as Next.js
4. Deploy

It can also be deployed to any host that supports Next.js applications.

## Contact

- Name: Pravalika Poloju
- Email: ppoloju@student.gitam.edu
- GitHub: [@Ppoloju](https://github.com/Ppoloju)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
