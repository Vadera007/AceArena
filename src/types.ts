export type TeamId = 'A' | 'B'

export interface GameRecord {
  id: string
  timestamp: string
  teamAScore: number
  teamBScore: number
  winner: TeamId | 'Tie' | null
}

export interface ScoreState {
  teamAScore: number
  teamBScore: number
  totalGames: number
  history: GameRecord[]
}

