import styles from './Home.module.css';

const Home = ({ startGame }) => {
  return (
    <div className={styles.Home}>
      <h1>Wordle project</h1>
      <p>Jogo de adivinhar a palavra, feito em React.js</p>
      <button onClick={startGame}>Jogar agora</button>
    </div>
  )
}

export default Home