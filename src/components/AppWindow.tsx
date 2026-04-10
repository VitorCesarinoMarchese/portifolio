import { useCallback, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'

export interface WindowPosition {
  x: number
  y: number
}

interface AppWindowProps {
  title: string
  closeLabel: string
  position: WindowPosition
  zIndex: number
  children: ReactNode
  onFocus: () => void
  onClose: () => void
  onMove: (position: WindowPosition) => void
}

const WINDOW_MARGIN = 16
const WINDOW_TOP_MARGIN = 56

export function AppWindow({
  title,
  closeLabel,
  position,
  zIndex,
  children,
  onFocus,
  onClose,
  onMove,
}: AppWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)

  const handleDragStart = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
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
    [onFocus, onMove, position],
  )

  return (
    <section
      ref={windowRef}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex,
      }}
      className="absolute flex h-[min(74vh,540px)] w-[min(92vw,760px)] flex-col overflow-hidden rounded-2xl border border-slate-200/20 bg-slate-950/70 shadow-[0_24px_70px_rgba(2,6,23,0.8)] backdrop-blur-xl"
      onMouseDown={onFocus}
    >
      <header
        className="flex cursor-move items-center justify-between border-b border-slate-200/15 bg-slate-900/90 px-4 py-2"
        onPointerDown={handleDragStart}
      >
        <h2 className="text-sm tracking-wide text-slate-100">{title}</h2>
        <button
          type="button"
          data-window-control="true"
          aria-label={closeLabel}
          onClick={onClose}
          className="rounded-md border border-rose-300/40 bg-rose-500/20 px-2 py-1 text-xs text-rose-100 transition hover:bg-rose-500/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200"
        >
          X
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
    </section>
  )
}
