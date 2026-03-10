import './index.css'
import { useRef } from 'react'
import { Layout } from './components/Layout'
import { TeamScoreCard } from './components/TeamScoreCard'
import { GameHistory } from './components/GameHistory'
import { useScoreTracker } from './hooks/useScoreTracker'
import type { TeamId } from './types'

function App() {
  const {
    teamAScore,
    teamBScore,
    totalGames,
    history,
    lastScoredTeam,
    increment,
    endGame,
    resetAll,
  } = useScoreTracker()

  const audioContextRef = useRef<AudioContext | null>(null)

  const playScoreSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx()
      }
      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()

      oscillator.type = 'triangle'
      oscillator.frequency.value = 880

      gain.gain.setValueAtTime(0.0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)

      oscillator.connect(gain)
      gain.connect(ctx.destination)

      oscillator.start()
      oscillator.stop(ctx.currentTime + 0.25)
    } catch {
      // ignore audio errors
    }
  }

  const handleIncrement = (team: TeamId) => {
    playScoreSound()
    increment(team)
  }

  const leadingTeam: TeamId | null =
    teamAScore === teamBScore ? null : teamAScore > teamBScore ? 'A' : 'B'

  return (
    <Layout>
      <section className="scoreboard">
        <div className="scoreboard__teams">
          <TeamScoreCard
            teamId="A"
            label="Team A"
            score={teamAScore}
            isActive={lastScoredTeam === 'A'}
            onIncrement={() => handleIncrement('A')}
          />
          <div className="scoreboard__vs">
            <span
              className={`scoreboard__score ${
                leadingTeam === 'A'
                  ? 'scoreboard__score--ahead-a'
                  : leadingTeam === 'B'
                  ? 'scoreboard__score--ahead-b'
                  : ''
              }`}
            >
              {teamAScore} <span className="scoreboard__dash">-</span>{' '}
              {teamBScore}
            </span>
            <span className="scoreboard__label">Current Score</span>
          </div>
          <TeamScoreCard
            teamId="B"
            label="Team B"
            score={teamBScore}
            isActive={lastScoredTeam === 'B'}
            onIncrement={() => handleIncrement('B')}
          />
        </div>
        <div className="scoreboard__actions">
          <button className="btn btn--primary" onClick={endGame}>
            End Game &amp; Save
          </button>
          <button className="btn btn--ghost" onClick={resetAll}>
            Reset All
          </button>
        </div>
      </section>

      <GameHistory totalGames={totalGames} history={history} />
    </Layout>
  )
}

export default App
