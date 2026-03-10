export function AnimatedBackground() {
  const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8']
  const suits = ['♠', '♥', '♣', '♦']

  const floatingSymbols = Array.from({ length: 18 }).map((_, index) => {
    const rank = ranks[index % ranks.length]
    const suit = suits[index % suits.length]
    return (
      <span
        key={index}
        className="floating-symbol"
        data-index={index}
        aria-hidden="true"
      >
        {rank}
        {suit}
      </span>
    )
  })

  const floatingCards = Array.from({ length: 8 }).map((_, index) => (
    <div
      key={index}
      className="floating-card"
      data-index={index}
      aria-hidden="true"
    >
      <div className="floating-card__inner">
        <span className="floating-card__corner">A</span>
        <span className="floating-card__suit">♠</span>
      </div>
    </div>
  ))

  return (
    <div className="table-background">
      <div className="table-background__felt" />
      <div className="table-background__glow" />
      <div className="table-background__rim" />
      <div className="table-background__overlay">
        {floatingCards}
        {floatingSymbols}
      </div>
    </div>
  )
}

