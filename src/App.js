import { useEffect, useState} from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "./img/helmet-1.png", matched: false },
  { "src": "./img/potion-1.png", matched: false },
  { "src": "./img/ring-1.png", matched: false },
  { "src": "./img/scroll-1.png", matched: false }, 
  { "src": "./img/shield-1.png", matched: false },
  { "src": "./img/sword-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  }

  // Handle a user's choice. Determines which choice was used. 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  // resets choices and calculates number of turns 
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false)
  }

  // Compares the two selected cards, and resets game
  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src){
        console.log("Cards match")
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card;
            }
          })
        })
      } else{
        console.log("Cards don't match")
      }
      setTimeout(() => resetTurn(), 1000)
    }
  }, [choiceOne, choiceTwo]);

  // Start game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      {/* Creates a grid of cards via SingleCard component */}
      <div className="card-grid">
        {cards.map(card => ( <SingleCard 
        card={card}  
        key={card.id} 
        handleChoice={handleChoice}
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
        />))}
      </div>
      <p>Number of turns: {turns}</p>
    </div>
  );
}

export default App
