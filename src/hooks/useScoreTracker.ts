import { useEffect, useState } from 'react'
import type { GameRecord, ScoreState, TeamId } from '../types'

const STORAGE_KEY = 'casino-score-tracker-state-v1'

const defaultState: ScoreState = {
  teamAScore: 0,
  teamBScore: 0,
  totalGames: 0,
  history: [],
}

function loadState(): ScoreState {
  if (typeof window === 'undefined') return defaultState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as ScoreState
    if (
      typeof parsed.teamAScore === 'number' &&
      typeof parsed.teamBScore === 'number' &&
      typeof parsed.totalGames === 'number' &&
      Array.isArray(parsed.history)
    ) {
      return parsed
    }
    return defaultState
  } catch {
    return defaultState
  }
}

function saveState(state: ScoreState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore write errors
  }
}

export function useScoreTracker() {
  const [state, setState] = useState<ScoreState>(() => loadState())
  const [lastScoredTeam, setLastScoredTeam] = useState<TeamId | null>(null)

  useEffect(() => {
    saveState(state)
  }, [state])

  const increment = (team: TeamId) => {
    setState((prev) => {
      const next =
        team === 'A'
          ? { ...prev, teamAScore: prev.teamAScore + 1 }
          : { ...prev, teamBScore: prev.teamBScore + 1 }
      return next
    })
    setLastScoredTeam(team)
  }

  const endGame = () => {
    setState((prev) => {
      if (prev.teamAScore === 0 && prev.teamBScore === 0) {
        // nothing played, just ignore
        return prev
      }
      const winner: GameRecord['winner'] =
        prev.teamAScore === prev.teamBScore
          ? 'Tie'
          : prev.teamAScore > prev.teamBScore
          ? 'A'
          : 'B'

      const newRecord: GameRecord = {
        id: `${Date.now()}`,
        timestamp: new Date().toISOString(),
        teamAScore: prev.teamAScore,
        teamBScore: prev.teamBScore,
        winner,
      }

      return {
        teamAScore: 0,
        teamBScore: 0,
        totalGames: prev.totalGames + 1,
        history: [newRecord, ...prev.history],
      }
    })
    setLastScoredTeam(null)
  }

  const resetAll = () => {
    setState(defaultState)
    setLastScoredTeam(null)
  }

  return {
    ...state,
    lastScoredTeam,
    increment,
    endGame,
    resetAll,
  }
}

