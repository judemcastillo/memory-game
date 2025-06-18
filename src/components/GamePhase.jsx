import { useState, useEffect } from "react";
import fetchCards from "./fetchCards";

function GamePhase({ onBack, theme, difficulty }) {
	const [score, setScore] = useState(0);
	const [cards, setCards] = useState([]);
	const [clickedCards, setClickedCards] = useState([]);
	const [bestScore, setBestScore] = useState(0);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [lastClicked, setLastClicked] = useState({ id: null, status: null });
	const [showGameOver, setShowGameOver] = useState(false);

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
			setLastClicked({ id, status: "wrong" });
			setTimeout(() => {
				setShowGameOver(true);
				setClickedCards([]);
				setScore(0);
				setLastClicked({ id: null, status: null });
			}, 500);
		} else {
			const newScore = score + 1;
			setClickedCards([...clickedCards, id]);
			setScore(newScore);
			setBestScore(Math.max(newScore, bestScore));
			setLastClicked({ id, status: "correct" });

			// ✅ Delay shuffle until after the animation is shown
			setTimeout(() => {
				setLastClicked({ id: null, status: null });
				setCards(shuffleCards(cards));
			}, 300);

			if (newScore === cards.length) {
				setTimeout(() => setShowGameOver(true), 500);
			}
		}
	};

	const handlePlayAgain = () => {
		setShowGameOver(false);
		setClickedCards([]);
		setScore(0);
		setImagesLoaded(false);
		setLastClicked({ id: null, status: null });
		// re-trigger image loading
		const reload = async () => {
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
		reload();
	};

	const handleBackToMenu = () => {
		setShowGameOver(false);
		onBack();
	};

	if (!imagesLoaded)
		return (
			<div className="game-container loading">
				<div className="score">
					<div></div>
					<div>
						<p>Score: {score}</p>
						<p>Best Score: {bestScore}</p>
					</div>
					<button className="back-button" onClick={onBack}>
						Back to Menu
					</button>
				</div>
				<div class="honeycomb">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		);

	return (
		<div className="game-container">
			<div className="score">
				<div></div>
				<div>
					<p>Score: {score}</p>
					<p>Best Score: {bestScore}</p>
				</div>
				<button className="back-button" onClick={onBack}>
					Back to Menu
				</button>
			</div>

			<div className="game-board">
				{cards.map((card) => (
					<div
						key={card.id}
						className={`card ${
							lastClicked.id === card.id
								? lastClicked.status === "correct"
									? "correct"
									: "wrong shake"
								: ""
						}`}
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
			{showGameOver && (
				<div className="modal-overlay">
					<div className="modal">
						<h2>{score === cards.length ? "🎉 You Win!" : "❌ Game Over"}</h2>
						<p>Your Score: {score}</p>
						<p>Best Score: {bestScore}</p>
						<div className="modal-buttons">
							<button onClick={handlePlayAgain}>Play Again</button>
							<button onClick={handleBackToMenu}>Back to Menu</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default GamePhase;
