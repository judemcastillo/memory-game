import { useState, useEffect } from "react";

function GamePhase({ onBack }) {
	const [score, setScore] = useState(0);
	const [cards, setCards] = useState([]); // This will hold the game cards
	const [clickedCards, setClickedCards] = useState([]); // Cards that have been clicked
	const [bestScore, setBestScore] = useState(0);

	const fetchCards = () => {
		const gameCards = [];
		for (let i = 0; i < 12; i++) {
			gameCards.push({
				id: i,
				name: `Card ${i + 1}`,
				image: `https://picsum.photos/200?random=${i + 1}`,
			});
		}
		setCards(gameCards);
	};
	useEffect(() => {
		fetchCards();
	}, []);

  const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
  };
  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      // Card already clicked, reset game
      setClickedCards([]);
      setScore(0);
      alert("You clicked the same card! Game reset.");
    } else {
      // Card not clicked, update score and clicked cards
      setClickedCards([...clickedCards, id]);
      setScore(score + 1);
      setBestScore(Math.max(score + 1, bestScore));
    }
    if(score + 1 === cards.length) {
      alert("Congratulations! You've clicked all cards without repeating.");
      setClickedCards([]);
      setScore(0);
    }
    setCards(shuffleCards(cards))
  };

	return (
		<div className="game-container">
      <div className="score">
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </div>
      <div className="game-board">
			{cards.map((card) => (
        <div
          key={card.id}
          className="card"
          onClick={() => handleCardClick(card.id)}
        >
          <img src={card.image} alt={card.name} />
          <p>{card.name}</p>
        </div>
      ))}
      </div>
			<button className="back-button" onClick={onBack}>
				Back to Menu
			</button>
		</div>
	);
}

export default GamePhase;
