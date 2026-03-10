import type { GameRecord } from '../types'

interface GameHistoryProps {
  totalGames: number
  history: GameRecord[]
}

export function GameHistory({ totalGames, history }: GameHistoryProps) {
  return (
    <section className="panel panel--history">
      <header className="panel__header">
        <h2 className="panel__title">Game History</h2>
        <span className="panel__subtitle">Total games: {totalGames}</span>
      </header>
      {history.length === 0 ? (
        <p className="panel__empty">No games recorded yet. Play your first hand!</p>
      ) : (
        <ul className="history-list">
          {history.map((game) => {
            const date = new Date(game.timestamp)
            const time = date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
            const winnerLabel =
              game.winner === 'A'
                ? 'Team A'
                : game.winner === 'B'
                ? 'Team B'
                : game.winner === 'Tie'
                ? 'Tie'
                : '—'

            return (
              <li key={game.id} className="history-list__item">
                <div className="history-list__scores">
                  <span className="history-list__team history-list__team--a">
                    A {game.teamAScore}
                  </span>
                  <span className="history-list__dash">-</span>
                  <span className="history-list__team history-list__team--b">
                    {game.teamBScore} B
                  </span>
                </div>
                <div className="history-list__meta">
                  <span className="history-list__winner">
                    Winner: <strong>{winnerLabel}</strong>
                  </span>
                  <span className="history-list__time">{time}</span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

