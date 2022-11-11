import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { KeyBoard } from "./Keyboard";
import "./App.css";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;
      e.preventDefault();
      setGuessedLetters([]);

      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div
      className="game-result"
      id="sky"
      style={{
        fontSize: "3rem",
        maxWidth: "100%",
        textAlign: "center",
      }}
    >
      {isLoser && "Nice Try - Refresh to try again"}
      {isWinner && "Winner! - Refresh to try again"}
      <div
        style={{
          maxWidth: "100%",
          // maxWidth: "800px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          // flexDirection: "column",
          gap: "2rem",
          margin: "0 auto",
          marginTop: "10px",
          alignItems: "center",
        }}
      >
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <div
          style={{
            alignSelf: "stretch",
            width: "650px",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <HangmanWord
            reveal={isLoser}
            guessedLetters={guessedLetters}
            wordToGuess={wordToGuess}
          />
          <KeyBoard
            disabled={isWinner || isLoser}
            activeLetters={guessedLetters.filter((letter) =>
              wordToGuess.includes(letter)
            )}
            inactiveLetters={incorrectLetters}
            addGuessedLetter={addGuessedLetter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
