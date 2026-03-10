import type { ReactNode } from 'react'
import { AnimatedBackground } from './AnimatedBackground'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-root">
      <AnimatedBackground />
      <main className="app-shell">
        <header className="app-header">
          <h1 className="app-title">AceArena</h1>
          <p className="app-subtitle">
            Team A vs Team B &mdash; keep the action on the table.
          </p>
        </header>
        {children}
        <footer className="app-footer">
          <span>Built for fast table-side tracking.</span>
        </footer>
      </main>
    </div>
  )
}

