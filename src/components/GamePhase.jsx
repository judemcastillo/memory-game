import { useState, useEffect } from "react";
import fetchCards from "./fetchCards";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function GamePhase({ onBack, theme, difficulty }) {
	const [score, setScore] = useState(0);
	const [cards, setCards] = useState([]);
	const [clickedCards, setClickedCards] = useState([]);
	const [bestScore, setBestScore] = useState(0);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [lastClicked, setLastClicked] = useState({ id: null, status: null });
	const [showGameOver, setShowGameOver] = useState(false);
	const [allFlipped, setAllFlipped] = useState(true); // true = face up, false = face down
	const [isShuffling, setIsShuffling] = useState(false);

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

	const animateShuffle = async () => {
		setAllFlipped(false); // 1. Flip all face down
		await sleep(600); // Wait for flip down animation

		setCards((prev) => shuffleCards(prev)); // 2. Shuffle while face down

		await sleep(10); // <--- Tiny delay to force repaint

		setAllFlipped(true); // 3. Flip all face up
		setIsShuffling(false);
	};

	const handleCardClick = async (id) => {
		if (isShuffling || !allFlipped) return;

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

			setTimeout(async () => {
				setLastClicked({ id: null, status: null });
				if (newScore === cards.length) {
					setTimeout(() => setShowGameOver(true), 500);
				} else {
					setIsShuffling(true);
					await animateShuffle(); // Now this can be awaited!
				}
			}, 400);
		}
	};

	const handlePlayAgain = () => {
		setShowGameOver(false);
		setClickedCards([]);
		setScore(0);
		setImagesLoaded(false);
		setLastClicked({ id: null, status: null });
		setAllFlipped(false);

		// Reload cards
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
			// Flip all up after a brief delay (looks nice)
			setTimeout(() => setAllFlipped(true), 600);
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
				<div className="game-board">
					<div className="score">
						<div className="score-info">
							<p>Score: {score}</p>
							<p>Best Score: {bestScore}</p>
						</div>
						<button className="back-button" onClick={onBack}>
							Back to Menu
						</button>
					</div>
					<div className="honeycomb">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
		);

	return (
		<>
			<div className="game-container">
				<div className="game-board">
					<div className="score">
						<div className="score-info">
							<p>Score: {score}</p>
							<p>Best Score: {bestScore}</p>
						</div>
						<button className="back-button" onClick={onBack}>
							Back to Menu
						</button>
					</div>
					{cards.map((card) => (
						<div
							key={card.id}
							className={`card${allFlipped ? "" : " flipped"} ${
								isShuffling ? " no-hover" : ""
							} ${
								lastClicked.id === card.id
									? lastClicked.status === "correct"
										? " correct"
										: " wrong shake"
									: ""
							}`}
							onClick={() => handleCardClick(card.id)}
						>
							<div className="card-inner">
								<div className="card-face front">
									{theme === "images" ? (
										<img
											src={card.image}
											alt={card.name}
											className="card-image"
										/>
									) : (
										<div style={{ fontSize: "90px" }} className="card-image">
											{card.emoji}
										</div>
									)}
									<p>{card.name}</p>
								</div>
								<div className="card-face back">
									<span>🂠</span>
								</div>
							</div>
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
		</>
	);
}

export default GamePhase;
