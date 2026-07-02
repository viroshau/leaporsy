# 🎪 MEGA JEOPARDY

A maximalist, zero-dependency Jeopardy-style party game. One HTML file, one
config file, no build step.

## Running it

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

> Tip: serving it (rather than opening the file directly) is more reliable
> for loading local images in picture clues.

## How to play

1. **Add teams** with the `+ NEW TEAM` button on the scoreboard. Click a
   team's name to rename it, `✕` to remove it.
2. **Click a point tile** to open the clue. Tiles with a 🖼 badge are
   picture clues.
3. Hit **REVEAL ANSWER**, then award `+points` to the team that got it
   (confetti included) or `−points` for a wrong buzz. `NOBODY GOT IT`
   closes the clue with no score change.
4. Closed clues are marked off the board. Scores and board state survive
   page refreshes (stored in `localStorage`). `↺ RESET GAME` wipes the
   board and zeroes all scores (teams are kept).

You can also nudge any team's score manually with the `±100` buttons on
its card.

## Editing the questions

Everything lives in **`config.js`** — categories, questions, answers, and
the game title. Each category has 5 clues, worth 100–500 points top to
bottom:

```js
{
  name: "My Category",
  clues: [
    { question: "Worth 100...", answer: "What is easy?" },
    { question: "Worth 200...", answer: "What is still easy?" },
    // ...5 clues total
  ],
}
```

### Picture clues

Add an `image` field pointing to a file in the `images/` folder (or any URL):

```js
{
  question: "Name one clue this image is AI-generated.",
  answer: "The six fingers.",
  image: "images/sample-slop.svg",
}
```

### Point values

Change the `POINT_VALUES` array at the bottom of `config.js` if you want
different stakes (e.g. `[200, 400, 600, 800, 1000]`).
