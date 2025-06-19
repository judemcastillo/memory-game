import { useState, useEffect } from "react";
import { IoLogoGameControllerB } from "react-icons/io";

function MainMenu({ onStart, settings }) {
	const [theme, setTheme] = useState("images");
	const [difficulty, setDifficulty] = useState("normal");

	useEffect(() => {
		setTheme(settings.theme);
		setDifficulty(settings.difficulty);
	}, [settings]);

	const handleStart = () => {
		onStart({ theme, difficulty }); // pass theme and difficulty back to App
	};

	return (
		<div className="game-container">
			<div className="settings">
				<div className="instructions"> 
				<h2>How to play <div className="vl"></div></h2>
				
				<p>
					Select your preferred theme and difficulty, then press Start Game. Try
					to click on each card only once per round, if you click the same card
					twice, the game ends. Challenge yourself to get the highest score you
					can!
				</p></div>
				<h2>Game Theme:</h2>
				<div className="theme-options">
					<label>
						<input
							type="radio"
							name="theme"
							value="images"
							checked={theme === "images"}
							onChange={(e) => setTheme(e.target.value)}
						/>
						Image Theme
					</label>
					<label>
						<input
							type="radio"
							name="theme"
							value="emojis"
							checked={theme === "emojis"}
							onChange={(e) => setTheme(e.target.value)}
						/>
						Emoji Theme
					</label>
				</div>
				<h2>Difficulty:</h2>
				<div className="theme-options">
					<label>
						<input
							type="radio"
							name="difficulty"
							value="easy"
							checked={difficulty === "easy"}
							onChange={(e) => setDifficulty(e.target.value)}
						/>
						Easy
					</label>
					<label>
						<input
							type="radio"
							name="difficulty"
							value="normal"
							checked={difficulty === "normal"}
							onChange={(e) => setDifficulty(e.target.value)}
						/>
						Normal
					</label>
					<label>
						<input
							type="radio"
							name="difficulty"
							value="hard"
							checked={difficulty === "hard"}
							onChange={(e) => setDifficulty(e.target.value)}
						/>
						Hard
					</label>
				</div>
				<button className="menu-button" onClick={handleStart}>
					Start Game <IoLogoGameControllerB className="controller" />
				</button>
			</div>
		</div>
	);
}

export default MainMenu;
