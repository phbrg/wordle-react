import './Game.css';

import { useState, useRef } from 'react';

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {
  const [letter, setLetter] = useState('');
  const letterInputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    verifyLetter(letter);

    setLetter('');
    letterInputRef.current.focus();
  }

  return (
    <div className="Game">
      <p className="user_points">Pontuação: <span>{score}</span></p>
      <h1>Adivinhe a palavra:</h1>
      <div className="word_container">
        {
          letters.map((letter, i) => (
            guessedLetters.includes(letter) ? (
              <span key={i} className="letter">{letter}</span>
            ) : (
              <span key={i} className="blank"></span>
            )
          ))
        }
      </div>
      <h2 className="tip">Dica: <span>{pickedCategory}</span></h2>
      <h3 className="guesses">Você ainda tem <span>{guesses}</span> tentativas</h3>
      <form className="guessContainer" onSubmit={handleSubmit}>
        <input type="text" name="userGuess" maxLength={1} required onChange={(e) => { setLetter(e.target.value) }} value={letter} ref={letterInputRef} />
        <button>Adivinhar</button>
      </form>
      <h4 className="erro">Erros:</h4>
      <div className="wrong_letters">
        {
          wrongLetters.map((letter, i) => (
            <span key={i}>{letter}</span>
          ))
        }
      </div>
    </div>
  )
}

export default Game