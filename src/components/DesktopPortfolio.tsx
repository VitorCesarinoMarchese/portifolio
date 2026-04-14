import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type UIEvent,
} from 'react'
import {
  AddressBook,
  FilePdf,
  Folders,
  Stack,
  User,
  type IconWeight,
} from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
import {
  contacts,
  getCvFileUrl,
  getLocalizedText,
  profile,
  projects,
  skillGroups,
  type LocaleCode,
} from '../data/portfolioContent.ts'
import { AppWindow, type WindowPosition } from './AppWindow.tsx'
import { PlasmaWallpaper } from './PlasmaWallpaper.tsx'

type DesktopAppId = 'projects' | 'about' | 'contact' | 'cv' | 'skills'
type WindowMode = 'closed' | 'open' | 'minimized'

interface DesktopAppDefinition {
  id: DesktopAppId
}

interface WindowState {
  mode: WindowMode
  position: WindowPosition
  zIndex: number
  isMaximized: boolean
  restorePosition: WindowPosition | null
}

type WindowStateMap = Record<DesktopAppId, WindowState>

const ICON_WEIGHT: IconWeight = 'regular'

const APP_DEFINITIONS: DesktopAppDefinition[] = [
  { id: 'projects' },
  { id: 'about' },
  { id: 'skills' },
  { id: 'contact' },
  { id: 'cv' },
]

const INITIAL_WINDOW_POSITIONS: Record<DesktopAppId, WindowPosition> = {
  projects: { x: 170, y: 96 },
  about: { x: 250, y: 130 },
  contact: { x: 340, y: 168 },
  cv: { x: 290, y: 92 },
  skills: { x: 420, y: 114 },
}

const DESKTOP_MEDIA_QUERY = '(max-width: 900px)'

const getInitialIsMobile = (): boolean => window.matchMedia(DESKTOP_MEDIA_QUERY).matches

const createInitialWindowState = (): WindowStateMap => ({
  projects: {
    mode: 'closed',
    position: { ...INITIAL_WINDOW_POSITIONS.projects },
    zIndex: 31,
    isMaximized: false,
    restorePosition: null,
  },
  about: {
    mode: 'open',
    position: { ...INITIAL_WINDOW_POSITIONS.about },
    zIndex: 32,
    isMaximized: false,
    restorePosition: null,
  },
  contact: {
    mode: 'closed',
    position: { ...INITIAL_WINDOW_POSITIONS.contact },
    zIndex: 33,
    isMaximized: false,
    restorePosition: null,
  },
  cv: {
    mode: 'closed',
    position: { ...INITIAL_WINDOW_POSITIONS.cv },
    zIndex: 34,
    isMaximized: false,
    restorePosition: null,
  },
  skills: {
    mode: 'closed',
    position: { ...INITIAL_WINDOW_POSITIONS.skills },
    zIndex: 35,
    isMaximized: false,
    restorePosition: null,
  },
})

const resolveLocale = (language: string): LocaleCode =>
  language.toLowerCase().startsWith('pt') ? 'pt' : 'en'

const formatClock = (date: Date): string =>
  new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(date)

const findMobileTabIndex = (appId: DesktopAppId): number =>
  APP_DEFINITIONS.findIndex((app) => app.id === appId)

function AppIcon({
  appId,
  size,
  className,
}: {
  appId: DesktopAppId
  size: number
  className?: string
}) {
  const sharedProps = { size, weight: ICON_WEIGHT, className, 'aria-hidden': true as const }

  switch (appId) {
    case 'projects':
      return <Folders {...sharedProps} />
    case 'about':
      return <User {...sharedProps} />
    case 'skills':
      return <Stack {...sharedProps} />
    case 'contact':
      return <AddressBook {...sharedProps} />
    case 'cv':
      return <FilePdf {...sharedProps} />
  }
}

interface AppViewProps {
  locale: LocaleCode
  translate: (key: string) => string
}

function ProjectsView({ locale, translate }: AppViewProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300">{translate('projects.intro')}</p>
      {projects.map((project) => (
        <article
          key={project.id}
          className="rounded-xl border border-slate-300/15 bg-slate-900/50 p-4 shadow-[0_14px_36px_rgba(2,6,23,0.45)]"
        >
          <h3 className="text-lg text-slate-100">{getLocalizedText(project.title, locale)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {getLocalizedText(project.description, locale)}
          </p>

          <ul className="mt-3 flex flex-wrap gap-2 text-xs">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-sky-300/35 bg-sky-400/10 px-2 py-1 text-sky-200"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-100">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-cyan-300/40 bg-cyan-400/15 px-3 py-1.5 transition hover:bg-cyan-400/30"
            >
              {translate('projects.demo')}
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-indigo-300/40 bg-indigo-400/15 px-3 py-1.5 transition hover:bg-indigo-400/30"
            >
              {translate('projects.source')}
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

function AboutView({ locale, translate }: AppViewProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl text-slate-100">{translate('about.heading')}</h3>
      <p className="text-sm uppercase tracking-[0.2em] text-sky-200/90">
        {profile.name} - {getLocalizedText(profile.role, locale)}
      </p>
      {profile.bio.map((paragraph, index) => (
        <p key={index} className="leading-relaxed text-slate-300">
          {getLocalizedText(paragraph, locale)}
        </p>
      ))}
    </section>
  )
}

function ContactView({ translate }: AppViewProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl text-slate-100">{translate('contact.heading')}</h3>
      <p className="text-sm text-slate-300">{translate('contact.description')}</p>

      <ul className="space-y-3">
        {contacts.map((contact) => {
          const isExternal = contact.href.startsWith('http')

          return (
            <li key={contact.id}>
              <a
                href={contact.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                className="flex items-center justify-between rounded-xl border border-slate-300/20 bg-slate-900/45 px-4 py-3 transition hover:border-sky-300/50 hover:bg-slate-900/75"
              >
                <span className="text-sm tracking-wide text-slate-400">{contact.label}</span>
                <span className="text-sm text-slate-100">{contact.value}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function CvView({ locale, translate }: AppViewProps) {
  const [cvFileUrl, setCvFileUrl] = useState(() => getCvFileUrl(locale))

  useEffect(() => {
    let isActive = true
    const preferredCvUrl = getCvFileUrl(locale)
    const fallbackCvUrl = getCvFileUrl('en')
    const controller = new AbortController()

    const verifyLocalizedCv = async () => {
      if (preferredCvUrl === fallbackCvUrl) {
        if (isActive) {
          setCvFileUrl(fallbackCvUrl)
        }
        return
      }

      try {
        const response = await fetch(preferredCvUrl, {
          method: 'HEAD',
          signal: controller.signal,
        })

        if (isActive) {
          setCvFileUrl(response.ok ? preferredCvUrl : fallbackCvUrl)
        }
      } catch {
        if (isActive) {
          setCvFileUrl(fallbackCvUrl)
        }
      }
    }

    void verifyLocalizedCv()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [locale])

  return (
    <section className="flex h-full min-h-[24rem] flex-col gap-3">
      <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-slate-300/25 bg-slate-950/85">
        <iframe
          title={translate('cv.previewTitle')}
          src={cvFileUrl}
          className="h-full w-full"
          loading="lazy"
        />
      </div>

      <footer className="rounded-xl border border-slate-300/25 bg-slate-900/55 p-2">
        <a
          href={cvFileUrl}
          target="_blank"
          rel="noreferrer"
          download
          className="inline-flex w-full justify-center rounded-lg border border-emerald-300/45 bg-emerald-400/20 px-4 py-2 text-sm text-emerald-100 transition hover:bg-emerald-400/30"
        >
          {translate('cv.download')}
        </a>
      </footer>
    </section>
  )
}

function SkillsView({ locale, translate }: AppViewProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl text-slate-100">{translate('skills.heading')}</h3>
      <p className="text-sm text-slate-300">{translate('skills.description')}</p>

      <div className="space-y-4">
        {skillGroups.map((group) => (
          <article key={group.id} className="rounded-xl border border-slate-300/20 bg-slate-900/45 p-4">
            <h4 className="text-sm uppercase tracking-[0.2em] text-sky-200">
              {getLocalizedText(group.title, locale)}
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-violet-300/30 bg-violet-400/12 px-2 py-1 text-xs text-violet-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function AppContent({
  appId,
  locale,
  translate,
}: {
  appId: DesktopAppId
} & AppViewProps) {
  switch (appId) {
    case 'projects':
      return <ProjectsView locale={locale} translate={translate} />
    case 'about':
      return <AboutView locale={locale} translate={translate} />
    case 'contact':
      return <ContactView locale={locale} translate={translate} />
    case 'cv':
      return <CvView locale={locale} translate={translate} />
    case 'skills':
      return <SkillsView locale={locale} translate={translate} />
  }
}

function MobileTabPage({
  appId,
  locale,
  translate,
  onToggleLanguage,
  pageRef,
}: {
  appId: DesktopAppId
  locale: LocaleCode
  translate: (key: string) => string
  onToggleLanguage: () => void
  pageRef: (node: HTMLDivElement | null) => void
}) {
  return (
    <div ref={pageRef} className="h-full w-full flex-none snap-start">
      <article className="mx-3 mb-1 flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-300/20 bg-slate-950/78 shadow-[0_18px_52px_rgba(2,6,23,0.65)] backdrop-blur-lg">
        <header className="flex items-center justify-between border-b border-slate-200/20 px-4 py-3">
          <div className="flex items-center gap-2">
            <AppIcon appId={appId} size={18} className="text-sky-200" />
            <h2 className="text-sm tracking-wide text-slate-100">{translate(`apps.${appId}.title`)}</h2>
          </div>
          <button
            type="button"
            onClick={onToggleLanguage}
            className="rounded-lg border border-slate-300/30 bg-slate-900/65 px-3 py-1 text-xs text-slate-100 transition hover:bg-slate-800/85"
          >
            {locale.toUpperCase()}
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <AppContent appId={appId} locale={locale} translate={translate} />
        </div>
      </article>
    </div>
  )
}

export function DesktopPortfolio() {
  const { t, i18n } = useTranslation()

  const [windowState, setWindowState] = useState<WindowStateMap>(createInitialWindowState)
  const [activeMobileTab, setActiveMobileTab] = useState<DesktopAppId>('about')
  const [isMobile, setIsMobile] = useState(getInitialIsMobile)
  const [clockLabel, setClockLabel] = useState(() => formatClock(new Date()))

  const zIndexRef = useRef(80)
  const mobilePagesRef = useRef<HTMLDivElement>(null)
  const mobilePageRefs = useRef<Array<HTMLDivElement | null>>([])
  const mobileEntrySyncRef = useRef(false)

  const locale = resolveLocale(i18n.language)

  const translate = useCallback((key: string): string => t(key) as string, [t])

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setClockLabel(formatClock(new Date()))
    }, 30_000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const activeDesktopApp = useMemo<DesktopAppId | null>(() => {
    const openApps = APP_DEFINITIONS
      .map((app) => ({ id: app.id, state: windowState[app.id] }))
      .filter((app) => app.state.mode === 'open')

    if (openApps.length === 0) {
      return null
    }

    return openApps.reduce((top, current) => {
      return current.state.zIndex > top.state.zIndex ? current : top
    }).id
  }, [windowState])

  const focusDesktopApp = useCallback((appId: DesktopAppId) => {
    zIndexRef.current += 1
    const nextZIndex = zIndexRef.current

    setWindowState((current) => ({
      ...current,
      [appId]: {
        ...current[appId],
        mode: 'open',
        zIndex: nextZIndex,
      },
    }))
  }, [])

  const closeDesktopApp = useCallback((appId: DesktopAppId) => {
    setWindowState((current) => {
      const previous = current[appId]
      const restoredPosition =
        previous.isMaximized && previous.restorePosition ? previous.restorePosition : previous.position

      return {
        ...current,
        [appId]: {
          ...previous,
          mode: 'closed',
          position: restoredPosition,
          isMaximized: false,
          restorePosition: null,
        },
      }
    })
  }, [])

  const minimizeDesktopApp = useCallback((appId: DesktopAppId) => {
    setWindowState((current) => ({
      ...current,
      [appId]: {
        ...current[appId],
        mode: 'minimized',
      },
    }))
  }, [])

  const toggleDesktopMaximize = useCallback((appId: DesktopAppId) => {
    zIndexRef.current += 1
    const nextZIndex = zIndexRef.current

    setWindowState((current) => {
      const previous = current[appId]

      if (previous.isMaximized) {
        return {
          ...current,
          [appId]: {
            ...previous,
            mode: 'open',
            zIndex: nextZIndex,
            position: previous.restorePosition ?? previous.position,
            isMaximized: false,
            restorePosition: null,
          },
        }
      }

      return {
        ...current,
        [appId]: {
          ...previous,
          mode: 'open',
          zIndex: nextZIndex,
          isMaximized: true,
          restorePosition: previous.position,
        },
      }
    })
  }, [])

  const moveDesktopApp = useCallback((appId: DesktopAppId, position: WindowPosition) => {
    setWindowState((current) => {
      if (current[appId].isMaximized) {
        return current
      }

      return {
        ...current,
        [appId]: {
          ...current[appId],
          position,
        },
      }
    })
  }, [])

  const handleTrayClick = useCallback(
    (appId: DesktopAppId) => {
      const mode = windowState[appId].mode

      if (mode === 'open') {
        minimizeDesktopApp(appId)
        return
      }

      focusDesktopApp(appId)
    },
    [focusDesktopApp, minimizeDesktopApp, windowState],
  )

  const toggleLanguage = useCallback(() => {
    const nextLanguage = locale === 'en' ? 'pt' : 'en'
    void i18n.changeLanguage(nextLanguage)
  }, [i18n, locale])

  const scrollMobileToTab = useCallback((appId: DesktopAppId, behavior: ScrollBehavior = 'smooth') => {
    const container = mobilePagesRef.current
    if (!container) {
      return
    }

    const targetIndex = findMobileTabIndex(appId)
    const targetPage = mobilePageRefs.current[targetIndex]
    if (!targetPage) {
      return
    }

    container.scrollTo({
      left: targetPage.offsetLeft,
      behavior,
    })
  }, [])

  const handleMobileTabSelect = useCallback(
    (appId: DesktopAppId) => {
      if (appId === activeMobileTab) {
        return
      }

      setActiveMobileTab(appId)
      scrollMobileToTab(appId, 'smooth')
    },
    [activeMobileTab, scrollMobileToTab],
  )

  const handleMobileScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget
    const offsets = APP_DEFINITIONS.map((_, index) => {
      const node = mobilePageRefs.current[index]
      return node?.offsetLeft ?? index * container.clientWidth
    })

    const nextIndex = offsets.reduce((bestIndex, offset, index) => {
      const bestDistance = Math.abs(container.scrollLeft - offsets[bestIndex])
      const currentDistance = Math.abs(container.scrollLeft - offset)
      return currentDistance < bestDistance ? index : bestIndex
    }, 0)

    const nextTab = APP_DEFINITIONS[nextIndex]?.id

    if (nextTab && nextTab !== activeMobileTab) {
      setActiveMobileTab(nextTab)
    }
  }, [activeMobileTab])

  useEffect(() => {
    if (!isMobile) {
      mobileEntrySyncRef.current = false
      return
    }

    if (mobileEntrySyncRef.current) {
      return
    }

    scrollMobileToTab(activeMobileTab, 'auto')
    mobileEntrySyncRef.current = true
  }, [activeMobileTab, isMobile, scrollMobileToTab])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <PlasmaWallpaper />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-transparent to-slate-950/80" />

      <div className="relative z-10 min-h-screen">
        {isMobile ? (
          <>
            <header className="absolute inset-x-0 top-0 z-50 flex justify-center px-4 pt-2">
              <span className="rounded-full border border-slate-200/25 bg-slate-900/70 px-4 py-1 text-xs tracking-[0.2em] text-slate-100">
                {clockLabel}
              </span>
            </header>

            <section className="absolute inset-x-0 bottom-24 top-12 md:hidden">
              <div
                ref={mobilePagesRef}
                onScroll={handleMobileScroll}
                className="flex h-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {APP_DEFINITIONS.map((app, index) => (
                  <MobileTabPage
                    key={app.id}
                    appId={app.id}
                    locale={locale}
                    translate={translate}
                    onToggleLanguage={toggleLanguage}
                    pageRef={(node) => {
                      mobilePageRefs.current[index] = node
                    }}
                  />
                ))}
              </div>
            </section>

            <nav className="absolute inset-x-0 bottom-3 z-50 px-4" aria-label={translate('panel.dock')}>
              <div className="mx-auto flex max-w-sm items-center justify-center gap-2 rounded-2xl border border-slate-200/25 bg-slate-950/68 p-2 shadow-[0_18px_50px_rgba(2,6,23,0.65)] backdrop-blur-xl">
                {APP_DEFINITIONS.map((app) => {
                  const isActive = activeMobileTab === app.id

                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => handleMobileTabSelect(app.id)}
                      aria-label={translate(`apps.${app.id}.title`)}
                      className={`rounded-xl p-2 transition ${
                        isActive
                          ? 'border border-sky-300/70 bg-sky-400/20 text-sky-50'
                          : 'border border-slate-300/25 bg-slate-900/45 text-slate-200 hover:border-slate-100/45'
                      }`}
                    >
                      <AppIcon appId={app.id} size={20} className="text-current" />
                    </button>
                  )
                })}
              </div>
            </nav>
          </>
        ) : (
          <>
            <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between border-b border-slate-200/20 bg-slate-950/55 px-4 py-3 backdrop-blur-md md:px-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-200/85">{profile.name}</p>
                <p className="text-xs text-slate-300">{translate('desktop.environment')}</p>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="rounded-lg border border-slate-300/30 bg-slate-900/65 px-3 py-1.5 text-xs text-slate-100 transition hover:bg-slate-800/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
                >
                  {translate('desktop.language')}: {locale.toUpperCase()}
                </button>

                <span className="rounded-lg border border-slate-300/25 bg-slate-900/65 px-3 py-1.5 text-xs text-slate-200">
                  {translate('desktop.clock')}: {clockLabel}
                </span>
              </div>
            </header>

            <div className="absolute left-4 top-24 hidden w-24 gap-3 md:grid">
              {APP_DEFINITIONS.map((app) => {
                const mode = windowState[app.id].mode
                const highlighted = mode !== 'closed'

                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => focusDesktopApp(app.id)}
                    className={`group flex flex-col items-center gap-1 rounded-xl p-2 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${
                      highlighted
                        ? 'border border-sky-300/50 bg-slate-900/60'
                        : 'border border-transparent bg-slate-900/25 hover:border-slate-200/30 hover:bg-slate-900/55'
                    }`}
                    aria-label={`${translate('desktop.open')} ${translate(`apps.${app.id}.title`)}`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/20 bg-slate-900/70 text-slate-100 group-hover:border-sky-300/60">
                      <AppIcon appId={app.id} size={22} />
                    </span>
                    <span className="line-clamp-2 text-xs text-slate-200">
                      {translate(`apps.${app.id}.title`)}
                    </span>
                  </button>
                )
              })}
            </div>

            {APP_DEFINITIONS.map((app) => {
              const currentWindow = windowState[app.id]

              if (currentWindow.mode === 'closed') {
                return null
              }

              return (
                <AppWindow
                  key={app.id}
                  title={translate(`apps.${app.id}.title`)}
                  closeLabel={translate('desktop.close')}
                  minimizeLabel={translate('desktop.minimize')}
                  maximizeLabel={translate('desktop.maximize')}
                  restoreLabel={translate('desktop.restore')}
                  position={currentWindow.position}
                  zIndex={currentWindow.zIndex}
                  isVisible={currentWindow.mode === 'open'}
                  isMaximized={currentWindow.isMaximized}
                  onFocus={() => focusDesktopApp(app.id)}
                  onClose={() => closeDesktopApp(app.id)}
                  onMinimize={() => minimizeDesktopApp(app.id)}
                  onToggleMaximize={() => toggleDesktopMaximize(app.id)}
                  onMove={(position) => moveDesktopApp(app.id, position)}
                >
                  <AppContent appId={app.id} locale={locale} translate={translate} />
                </AppWindow>
              )
            })}

            <nav className="absolute inset-x-0 bottom-3 z-50 px-3 md:px-4" aria-label={translate('panel.dock')}>
              <div className="mx-auto flex w-full max-w-xl items-center justify-center gap-2 rounded-2xl border border-slate-200/25 bg-slate-950/60 p-2 shadow-[0_20px_50px_rgba(2,6,23,0.65)] backdrop-blur-xl">
                {APP_DEFINITIONS.map((app) => {
                  const mode = windowState[app.id].mode
                  const isActive = activeDesktopApp === app.id

                  const dotClass = isActive
                    ? 'bg-cyan-300'
                    : mode === 'minimized'
                      ? 'bg-amber-300'
                      : mode === 'open'
                        ? 'bg-slate-200'
                        : 'border border-slate-500/70 bg-transparent'

                  const buttonClass = isActive
                    ? 'border border-sky-300/70 bg-sky-400/20 text-sky-50'
                    : mode === 'minimized'
                      ? 'border border-amber-300/60 bg-amber-400/12 text-amber-100'
                      : mode === 'open'
                        ? 'border border-slate-100/45 bg-slate-900/75 text-slate-100'
                        : 'border border-slate-300/20 bg-slate-900/45 text-slate-200 hover:border-slate-100/45 hover:bg-slate-900/75'

                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => handleTrayClick(app.id)}
                      aria-label={`${translate('desktop.open')} ${translate(`apps.${app.id}.title`)}`}
                      className={`flex min-w-0 flex-col items-center gap-1 rounded-xl px-3 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 ${buttonClass}`}
                    >
                      <AppIcon appId={app.id} size={18} className="text-current" />
                      <span className={`mt-1 h-1.5 w-1.5 rounded-full ${dotClass}`} />
                    </button>
                  )
                })}
              </div>
            </nav>
          </>
        )}
      </div>
    </div>
  )
}
