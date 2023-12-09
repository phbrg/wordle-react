import './EndGame.css';

const EndGame = ({ retry, score }) => {
  return (
    <div className="End">
      <h1>Acabou!</h1>
      <h2>Sua pontuação final: <span>{score}</span></h2>
      <button onClick={retry}>Jogar de novo</button>
    </div>
  )
}

export default EndGame