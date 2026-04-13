import { useCallback, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { CornersIn, CornersOut, Minus, X } from '@phosphor-icons/react'

export interface WindowPosition {
  x: number
  y: number
}

interface AppWindowProps {
  title: string
  closeLabel: string
  minimizeLabel: string
  maximizeLabel: string
  restoreLabel: string
  position: WindowPosition
  zIndex: number
  isVisible: boolean
  isMaximized: boolean
  children: ReactNode
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  onToggleMaximize: () => void
  onMove: (position: WindowPosition) => void
}

const WINDOW_MARGIN = 16
const WINDOW_TOP_MARGIN = 56
const WINDOW_WORKSPACE_TOP = 72
const WINDOW_WORKSPACE_BOTTOM = 88

export function AppWindow({
  title,
  closeLabel,
  minimizeLabel,
  maximizeLabel,
  restoreLabel,
  position,
  zIndex,
  isVisible,
  isMaximized,
  children,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
}: AppWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)

  const handleDragStart = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (isMaximized) {
        return
      }

      const target = event.target as HTMLElement
      if (target.closest('[data-window-control="true"]')) {
        return
      }

      event.preventDefault()
      onFocus()

      const dragStartPoint = { x: event.clientX, y: event.clientY }
      const dragStartPosition = position
      const windowRect = windowRef.current?.getBoundingClientRect()
      const windowWidth = windowRect?.width ?? 700
      const windowHeight = windowRect?.height ?? 500

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const movedX = dragStartPosition.x + moveEvent.clientX - dragStartPoint.x
        const movedY = dragStartPosition.y + moveEvent.clientY - dragStartPoint.y

        const maxX = Math.max(WINDOW_MARGIN, window.innerWidth - windowWidth - WINDOW_MARGIN)
        const maxY = Math.max(WINDOW_TOP_MARGIN, window.innerHeight - windowHeight - WINDOW_MARGIN)

        onMove({
          x: Math.min(Math.max(WINDOW_MARGIN, movedX), maxX),
          y: Math.min(Math.max(WINDOW_TOP_MARGIN, movedY), maxY),
        })
      }

      const handlePointerUp = () => {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerup', handlePointerUp)
      }

      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
    },
    [isMaximized, onFocus, onMove, position],
  )

  const sectionStyle = isMaximized
    ? {
        top: WINDOW_WORKSPACE_TOP,
        left: WINDOW_MARGIN,
        right: WINDOW_MARGIN,
        bottom: WINDOW_WORKSPACE_BOTTOM,
        zIndex,
      }
    : {
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex,
      }

  return (
    <section
      ref={windowRef}
      hidden={!isVisible}
      style={sectionStyle}
      className={`absolute flex flex-col overflow-hidden border border-slate-200/20 bg-slate-950/70 shadow-[0_24px_70px_rgba(2,6,23,0.8)] backdrop-blur-xl ${
        isMaximized ? 'h-auto w-auto' : 'h-[min(74vh,540px)] w-[min(92vw,760px)]'
      } ${
        isMaximized ? 'rounded-none' : 'rounded-2xl'
      }`}
      onMouseDown={onFocus}
    >
      <header
        className={`flex items-center justify-between border-b border-slate-200/15 bg-slate-900/90 px-4 py-2 ${
          isMaximized ? 'cursor-default' : 'cursor-move'
        }`}
        onPointerDown={handleDragStart}
      >
        <h2 className="text-sm tracking-wide text-slate-100">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-window-control="true"
            aria-label={minimizeLabel}
            onClick={onMinimize}
            className="rounded-md border border-amber-300/45 bg-amber-500/20 px-2 py-1 text-xs text-amber-100 transition hover:bg-amber-500/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
          >
            <Minus size={14} weight="regular" aria-hidden />
          </button>
          <button
            type="button"
            data-window-control="true"
            aria-label={isMaximized ? restoreLabel : maximizeLabel}
            onClick={onToggleMaximize}
            className="rounded-md border border-emerald-300/45 bg-emerald-500/20 px-2 py-1 text-xs text-emerald-100 transition hover:bg-emerald-500/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
          >
            {isMaximized ? (
              <CornersIn size={14} weight="regular" aria-hidden />
            ) : (
              <CornersOut size={14} weight="regular" aria-hidden />
            )}
          </button>
          <button
            type="button"
            data-window-control="true"
            aria-label={closeLabel}
            onClick={onClose}
            className="rounded-md border border-rose-300/40 bg-rose-500/20 px-2 py-1 text-xs text-rose-100 transition hover:bg-rose-500/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200"
          >
            <X size={14} weight="regular" aria-hidden />
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
    </section>
  )
}
