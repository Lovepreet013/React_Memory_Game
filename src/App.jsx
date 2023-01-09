import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/card';

const cardImages = [
  {"src" : "/img/helmet-1.png", matched : false},
  {"src" : "/img/potion-1.png", matched : false},
  {"src" : "/img/ring-1.png", matched : false},
  {"src" : "/img/scroll-1.png", matched : false},
  {"src" : "/img/shield-1.png", matched : false},
  {"src" : "/img/sword-1.png", matched : false},
]

function App() {

  const[cards, setCards] = useState([]);
  const[turns, setTurns] = useState(0);
  //choices
  const[choiceOne, setChoiceOne] = useState(null);
  const[choiceTwo, setChoiceTwo] = useState(null);
  const[disabled, setDisabled] = useState(false);

  //handling choices
  const handleChoice = (card)=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //shuffling cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5).map((card) => ({...card,id:Math.random()}))
    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
    setTurns(0)
    // console.log(shuffledCards);
  }

  //comparing the choices
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){                    // console.log("choices matched");
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){                      
              return {...card, matched: true};
            }
            else{
              return card;
            }
          })
        })
        
        resetTurns();
      }
      else{                                                   // console.log("choices not matched");
        setTimeout( () => resetTurns(), 500);                     
      }
    }
  }, [choiceOne,choiceTwo])

  console.log(cards);

  //reseting Turns
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(previousTurn => previousTurn + 1 );
    setDisabled(false);
  }
  

  //Starting the game automatically
  useEffect(() => {
    shuffleCards();
  },[])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards} >New Game</button>
      <p>Turns : {turns}</p>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard key={card.id}
            card = {card}
            handleChoice = {handleChoice}
            disabled = {disabled} 
            flipped = {card === choiceOne || card === choiceTwo || card.matched} />
        ))}
      </div>

    </div>
  );
}

export default App;
