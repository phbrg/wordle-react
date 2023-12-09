import './App.css';

// react imports
import { useEffect, useState } from 'react';

// date
import { wordList } from './data/words';

// components
import Home from './components/Home';
import Game from './components/Game';
import EndGame from './components/EndGame';

const stage = [
  {id: 1, name: 'home'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
];

function App() {
  const [gameStage, setGameStage] = useState(stage[0].name);

  const [words] = useState(wordList);
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(10);
  const [score, setScore] = useState(0);

  function pickWord() {
    const categories = Object.keys(words);

    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category};
  }

  function startGame() {
    const { word, category } = pickWord();

    let wordSplit = word.toLowerCase().split('');

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordSplit);

    setGameStage(stage[1].name);
  }

  function verifyLetter(letter) {
    const lowLetter = letter.toLowerCase();

    if(guessedLetters.includes(lowLetter) || wrongLetters.includes(lowLetter)) {
      return;
    }

    if(letters.includes(lowLetter)) {
      setGuessedLetters((arr) => [...arr, lowLetter]);
      setScore(score +100);
    } else {
      setWrongLetters((arr) => [...arr, lowLetter]);
      setGuesses(guesses -1);
      setScore(score -50);
    }
  }

  function clearStats() {
    setGuesses(10);
    setWrongLetters([]);
    setGuessedLetters([]);
  }

  useEffect(() => {
    if(guesses <= 0) {
      setGameStage(stage[2].name);

      clearStats();
    }
  }, [guesses]);

  useEffect(() => {
    let uniqueAnswer = [...new Set(letters)];
    if(guessedLetters.length === uniqueAnswer.length && guessedLetters.length >= 1) {
      clearStats();
      setScore(score +500);
      setGameStage(stage[2].name);
    } 
  }, [guessedLetters, letters, score])

  function retry() {
    clearStats();
    
    setGameStage(stage[0].name);
  }

  return (
    <div className="App">
      {gameStage === 'home' && <Home startGame = {startGame} />}
      {gameStage === 'game' && <Game verifyLetter = {verifyLetter} pickedWord = {pickedWord} pickedCategory = {pickedCategory} letters = {letters} guessedLetters = {guessedLetters} wrongLetters = {wrongLetters} guesses = {guesses} score = {score} />}
      {gameStage === 'end' && <EndGame retry = {retry} score = {score} />}
      <p className='source'>Source code avaliable on: <a href="https://github.com/phbrg/wordle-react" target='__blank'>github repository</a></p>
    </div>
  );
}

export default App;
