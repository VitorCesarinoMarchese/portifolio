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
  liveUrl?: string
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
  name: 'Vitor Cesarino Marchese',
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
      en: 'This portfolio is intentionally built as a KDE Plasma inspired desktop to showcase engineering, visual design, and interaction systems together.',
      pt: 'Este portfolio foi criado como um desktop inspirado no KDE Plasma para demonstrar engenharia, design visual e sistemas de interacao no mesmo produto.',
    },
  ] satisfies LocalizedText[],
}

export const projects: PortfolioProject[] = [
  {
    id: 'Exchange_of_Currencies',
    title: {
      en: 'A exchange of currencies',
      pt: 'Um câmbio de moedas',
    },
    description: {
      en: 'Currency exchange app with USD/GBP wallets, live rates, and transaction history.',
      pt: 'App de câmbio com carteiras em USD/GBP, taxas em tempo real e histórico de transações.',
    },
    stack: ['Next', 'TypeScript', 'Tailwind', 'Node.js'],
    repoUrl: 'https://github.com/VitorCesarinoMarchese/Exchange_of_Currencies',
  },
  {
    id: 'chat-terminal',
    title: {
      en: 'Chat Terminal',
      pt: 'Chat Terminal',
    },
    description: {
      en: 'A chat application for the terminal, using Go for the TUI and typescript for the backend.',
      pt: 'Uma aplicação de chat para o terminal, usando Go para a TUI e TypeScript para o backend.',
    },
    stack: ['Go', 'TypeScript', 'Redis', 'SQL'],
    repoUrl: 'https://github.com/VitorCesarinoMarchese/chat-terminal',
  },
  {
    id: 'portfolio',
    title: {
      en: 'Portfolio',
      pt: 'Portfolio',
    },
    description: {
      en: 'Portfolio inspired by KDE Plasma desktop enviroment',
      pt: 'Portfólio inspirado no ambiente de desktop KDE Plasma',
    },
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js'],
    liveUrl: 'https://www.vitorcesarinomarchese.site/',
    repoUrl: 'https://github.com/VitorCesarinoMarchese/portfolio',
  },
]

export const contacts: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'vitorcesarino1@gmail.com',
    href: 'mailto:vitorcesarino1@gmail.com',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/VitorCesarinoMarchese',
    href: 'https://github.com/VitorCesarinoMarchese',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/vitor-cesarino',
    href: 'https://www.linkedin.com/in/vitor-cesarino/',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: {
      en: 'Frontend',
      pt: 'Frontend',
    },
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'HTML/CSS'],
  },
  {
    id: 'backend',
    title: {
      en: 'Backend',
      pt: 'Backend',
    },
    items: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'SQL'],
  },
  {
    id: 'tooling',
    title: {
      en: 'Tooling',
      pt: 'Ferramentas',
    },
    items: ['Docker', 'Git', 'Linux', 'Vite', 'Figma'],
  },
]

export const cvInfo = {
  files: {
    en: '/cv-en.pdf',
    pt: '/cv-pt.pdf',
  } satisfies Record<LocaleCode, string>,
  lastUpdated: '2026-04',
}

export const getCvFileUrl = (locale: LocaleCode): string => cvInfo.files[locale] ?? cvInfo.files.en

export const getLocalizedText = (value: LocalizedText, locale: LocaleCode): string => value[locale]
