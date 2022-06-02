 import './SingleCard.css'

 export default function SingleCard({card, handleChoice, flipped}) {

    // Handles user's selection of card and passes it to handleChoice
    const handleClick = () => {
        handleChoice(card)
    }

    return (
        // Creates individual cards
        <div className='card'>
              <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                <img className="back" 
                src='img/cover.png' 
                onClick={handleClick}
                alt="card back" />
              </div>
            </div>
    )

 }
