import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" },
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
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
  }

  // Compares the two selected cards, and resets game
  useEffect(() => {
    if (choiceOne && choiceTwo){
      if (choiceOne.src === choiceTwo.src){
        console.log("Cards match")
      } else {
        console.log("Cards don't match")
      };
      resetTurn()
    }
  }, [choiceOne, choiceTwo])

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
        />))}
      </div>
    </div>
  );
}

export default App
