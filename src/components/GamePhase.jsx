import { useState, useEffect } from "react";
import fetchCards from "./fetchCards";

function GamePhase({ onBack, theme, difficulty }) {
	const [score, setScore] = useState(0);
	const [cards, setCards] = useState([]);
	const [clickedCards, setClickedCards] = useState([]);
	const [bestScore, setBestScore] = useState(0);
	const [imagesLoaded, setImagesLoaded] = useState(false);

	useEffect(() => {
		const loadCards = async () => {
			const cardData = fetchCards(theme, difficulty);

			if (theme === "images") {
				const preload = (src) =>
					new Promise((resolve, reject) => {
						const img = new Image();
						img.src = src;
						img.onload = resolve;
						img.onerror = reject;
					});

				await Promise.all(cardData.map((card) => preload(card.image)));
			}

			setCards(cardData);
			setImagesLoaded(true);
		};

		loadCards();
	}, [theme, difficulty]);

	const shuffleCards = (cards) => [...cards].sort(() => Math.random() - 0.5);

	const handleCardClick = (id) => {
		if (clickedCards.includes(id)) {
			setClickedCards([]);
			setScore(0);
			alert("You clicked the same card! Game reset.");
		} else {
			const newScore = score + 1;
			setClickedCards([...clickedCards, id]);
			setScore(newScore);
			setBestScore(Math.max(newScore, bestScore));

			if (newScore === cards.length) {
				alert("🎉 You win!");
				setClickedCards([]);
				setScore(0);
			}
		}

		setCards(shuffleCards(cards));
	};

	if (!imagesLoaded)
		return (
			<div className="game-container loading">
				<div class="honeycomb">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<button className="back-button" onClick={onBack}>
					Back to Menu
				</button>
			</div>
		);

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
						{theme === "images" ? (
							<img src={card.image} alt={card.name} className="card-image" />
						) : (
							<div style={{ fontSize: "150px" }} className="card-image">
								{card.emoji}
							</div>
						)}
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
