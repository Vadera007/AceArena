import { useEffect, useState } from 'react'
import type { TeamId } from '../types'

interface TeamScoreCardProps {
  teamId: TeamId
  label: string
  score: number
  isActive: boolean
  onIncrement: () => void
}

export function TeamScoreCard({
  teamId,
  label,
  score,
  isActive,
  onIncrement,
}: TeamScoreCardProps) {
  const [isBumping, setIsBumping] = useState(false)
  const isTeamA = teamId === 'A'
  const rank = isTeamA ? 'A' : 'K'
  const suit = isTeamA ? '♠' : '♥'
  const suitTone = isTeamA ? 'dark' : 'red'

  useEffect(() => {
    if (score === 0) return
    setIsBumping(true)
    const timeout = setTimeout(() => setIsBumping(false), 220)
    return () => clearTimeout(timeout)
  }, [score])

  return (
    <div
      className={`team-card playing-card ${
        isActive ? 'playing-card--glow' : ''
      } ${isActive ? 'team-card--leading' : ''}`}
      data-team={teamId}
    >
      <div className="playing-card__inner">
        <div className="playing-card__face playing-card__face--front">
          <div className="team-card__corner team-card__corner--tl">
            <span className="team-card__corner-rank">{rank}</span>
            <span
              className={`team-card__corner-suit team-card__corner-suit--${suitTone}`}
            >
              {suit}
            </span>
          </div>
          <div className="team-card__corner team-card__corner--br">
            <span className="team-card__corner-rank">{rank}</span>
            <span
              className={`team-card__corner-suit team-card__corner-suit--${suitTone}`}
            >
              {suit}
            </span>
          </div>
          <div className="team-card__header">
            <span className="team-card__label">{label}</span>
            <span className="team-card__short">{teamId}</span>
          </div>
          <div className="team-card__pip">
            <span className="team-card__pip-rank">{rank}</span>
            <span
              className={`team-card__pip-suit team-card__pip-suit--${suitTone}`}
            >
              {suit}
            </span>
          </div>
          <div
            className={`team-card__score ${
              isBumping ? 'team-card__score--bump' : ''
            }`}
          >
            {score}
          </div>
          <button className="team-card__button" onClick={onIncrement}>
            +1
          </button>
        </div>
        <div className="playing-card__face playing-card__face--back">
          <div className="playing-card__pattern">♠ ♥ ♣ ♦</div>
        </div>
      </div>
    </div>
  )
}

