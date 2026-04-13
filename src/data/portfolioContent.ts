export type LocaleCode = 'en' | 'pt'

export interface LocalizedText {
  en: string
  pt: string
}

export interface PortfolioProject {
  id: string
  title: LocalizedText
  description: LocalizedText
  stack: string[]
  liveUrl: string
  repoUrl: string
}

export interface ContactLink {
  id: string
  label: string
  value: string
  href: string
}

export interface SkillGroup {
  id: string
  title: LocalizedText
  items: string[]
}

export const profile = {
  name: 'Your Name',
  role: {
    en: 'Full Stack Developer',
    pt: 'Desenvolvedor Full Stack',
  } satisfies LocalizedText,
  bio: [
    {
      en: 'I design and build modern web products with strong user experience and maintainable architecture.',
      pt: 'Eu projeto e desenvolvo produtos web modernos com forte foco em experiencia de usuario e arquitetura sustentavel.',
    },
    {
      en: 'This portfolio is intentionally built as a KDE-inspired desktop to showcase engineering, visual design, and interaction systems together.',
      pt: 'Este portfolio foi criado como um desktop inspirado no KDE para demonstrar engenharia, design visual e sistemas de interacao no mesmo produto.',
    },
  ] satisfies LocalizedText[],
}

export const projects: PortfolioProject[] = [
  {
    id: 'plasma-commerce',
    title: {
      en: 'Plasma Commerce Dashboard',
      pt: 'Dashboard Plasma Commerce',
    },
    description: {
      en: 'Admin dashboard with analytics, inventory control, and role-based access for e-commerce operations.',
      pt: 'Dashboard administrativo com analiticos, controle de estoque e acesso por papeis para operacoes de e-commerce.',
    },
    stack: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
    liveUrl: 'https://example.com/plasma-commerce',
    repoUrl: 'https://github.com/your-user/plasma-commerce',
  },
  {
    id: 'aurora-api',
    title: {
      en: 'Aurora API Platform',
      pt: 'Plataforma de API Aurora',
    },
    description: {
      en: 'Service-oriented backend platform for authentication, billing workflows, and partner integrations.',
      pt: 'Plataforma de backend orientada a servicos para autenticacao, fluxo de cobranca e integracoes com parceiros.',
    },
    stack: ['Go', 'PostgreSQL', 'Docker', 'Redis'],
    liveUrl: 'https://example.com/aurora-api',
    repoUrl: 'https://github.com/your-user/aurora-api',
  },
  {
    id: 'lumen-ui',
    title: {
      en: 'Lumen UI System',
      pt: 'Sistema de UI Lumen',
    },
    description: {
      en: 'Reusable component system and documentation portal built for multi-product consistency.',
      pt: 'Sistema reutilizavel de componentes e portal de documentacao construido para consistencia entre produtos.',
    },
    stack: ['React', 'Storybook', 'Vite', 'Vitest'],
    liveUrl: 'https://example.com/lumen-ui',
    repoUrl: 'https://github.com/your-user/lumen-ui',
  },
]

export const contacts: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'youremail@example.com',
    href: 'mailto:youremail@example.com',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/your-user',
    href: 'https://github.com/your-user',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/your-user',
    href: 'https://www.linkedin.com/in/your-user',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: {
      en: 'Frontend',
      pt: 'Frontend',
    },
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Accessibility'],
  },
  {
    id: 'backend',
    title: {
      en: 'Backend',
      pt: 'Backend',
    },
    items: ['Node.js', 'Go', 'REST APIs', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'tooling',
    title: {
      en: 'Tooling',
      pt: 'Ferramentas',
    },
    items: ['Docker', 'GitHub Actions', 'ESLint', 'Vite', 'Figma'],
  },
]

export const cvInfo = {
  fileUrl: '/cv.pdf',
  lastUpdated: '2026-04',
}

export const getLocalizedText = (value: LocalizedText, locale: LocaleCode): string => value[locale]
