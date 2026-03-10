# AceArena – Casino Card Game Score Tracker

AceArena is a **Las Vegas–style casino scoreboard** for tracking card-game scores between **Team A** and **Team B**.  
It’s designed for quick use at the table: big scores, one-tap +1 buttons, glowing cards, and subtle casino animations.

Built with **React + TypeScript + Vite**, fully client-side, and ready to deploy (e.g. to Vercel).

---

## Features

- **Team A vs Team B scoreboard**
  - Large central score display (e.g. `34 - 41`).
  - Dedicated **+1** buttons for each team.
- **Game lifecycle**
  - **End Game & Save**: records the current score as a finished game, then resets to 0–0.
  - **Reset All**: clears current scores and full history.
- **Game history & stats**
  - Total games played counter.
  - Scrollable **game history** list with:
    - Final scores
    - Winner (Team A, Team B, or Tie)
    - Time the game was finished
- **Casino-grade UI**
  - Green **poker table background** with rim and soft center glow.
  - **Animated floating playing cards** and rank/suit symbols (A, K, Q, J…).
  - Score cards styled as **Ace (Team A)** and **King (Team B)** playing cards.
  - **Glowing score cards** and shimmering center scoreboard.
  - Subtle hover and motion effects for a premium Vegas feel.
- **Interaction polish**
  - Score numbers **bump/animate** when they change.
  - **Click sound** when a team score is incremented (using Web Audio API).
  - Highlight for the **currently leading team**.
- **Persistence**
  - All state (scores, total games, game history) is stored in `localStorage`.
  - You can refresh the page without losing your data.

---

## Tech Stack

- **Frontend**
  - [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vite.dev/) for lightning-fast dev/build
- **State & persistence**
  - Custom React hook: `useScoreTracker`
  - Browser `localStorage` for storing score state and history
- **Styling & animations**
  - CSS (no external UI framework)
  - CSS keyframes for floating cards, glowing score cards, and score bump animations

---

## Project Structure (key files)

```text
src/
  main.tsx                # React entrypoint
  App.tsx                 # Main layout: scoreboard + history
  index.css               # Global theme + casino styling

  types.ts                # Shared TypeScript types
  hooks/
    useScoreTracker.ts    # Score state + localStorage persistence

  components/
    Layout.tsx            # Shell layout + header/footer
    AnimatedBackground.tsx# Poker table background + floating cards
    TeamScoreCard.tsx     # Team A/B score playing cards with +1
    GameHistory.tsx       # Total games + history list
```

---

## Getting Started (Local Development)

1. **Clone the repo**

```bash
git clone https://github.com/Vadera007/AceArena.git
cd AceArena
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the dev server**

```bash
npm run dev
```

Open the URL printed in your terminal (usually `http://localhost:5173/`).

---

## Production Build & Preview

Build the optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

This serves the `dist/` folder so you can verify everything before deploying.

---

## Deployment (Vercel)

AceArena is a standard Vite React app, so deployment is straightforward:

1. Push your changes to GitHub (already set up for `Vadera007/AceArena`).
2. Go to [Vercel](https://vercel.com/) and **import the GitHub repo**.
3. Confirm the defaults:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

Every `git push` to the main branch will trigger an automatic redeploy.

---

## How Scoring Works

- **Increment (+1)**
  - Clicking `+1` on a team:
    - Adds 1 to that team’s current score.
    - Plays a short “chip” sound.
    - Animates the score number bump and highlights the last scoring team.
- **End Game & Save**
  - When you click **End Game & Save**:
    - If both scores are 0–0, nothing is saved.
    - Otherwise:
      - The winner is computed:
        - Team A, Team B, or Tie (if equal).
      - A game record is added to history with:
        - Final team scores
        - Winner
        - Timestamp
      - Current score resets to 0–0 and **Total games** increments.
- **Reset All**
  - Clears:
    - Current score
    - Total games
    - Entire game history
  - Also clears the saved state in `localStorage`.

---

## Future Ideas

- Multiple tables / matches instead of just Team A vs Team B.
- Custom team names and colors.
- Support for different card games (e.g. tracking rounds, blinds, or chip counts).
- Optional cloud sync for use across devices.

---

## License

This project is currently unlicensed and intended for personal or private use.  
If you plan to use it commercially or open-source it under a specific license, add a LICENSE file that fits your needs.
