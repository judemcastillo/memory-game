import { useState } from "react";
import { IoLogoGameControllerB } from "react-icons/io";

function MainMenu({ onStart }) {
	const [theme, setTheme] = useState("images");
	const [difficulty, setDifficulty] = useState("normal");

	const handleStart = () => {
		onStart({ theme, difficulty }); // pass theme and difficulty back to App
	};

	return (
		<div className="game-container">
			<div className="settings">
				<h3>Game Theme</h3>
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
				<h3>Difficulty:</h3>
				<div className="theme-options">
					<label>
						<input
							type="radio"
							name="difficulty"
							value="easy"
							checked={difficulty === "easy"}
							onChange={(e) => setDifficulty(e.target.value)}
						/>
						Easy (6 cards)
					</label>
					<label>
						<input
							type="radio"
							name="difficulty"
							value="normal"
							checked={difficulty === "normal"}
							onChange={(e) => setDifficulty(e.target.value)}
						/>
						Normal (12 cards)
					</label>
					<label>
						<input
							type="radio"
							name="difficulty"
							value="hard"
							checked={difficulty === "hard"}
							onChange={(e) => setDifficulty(e.target.value)}
						/>
						Hard (18 cards)
					</label>
				</div>
			</div>

			<button className="menu-button" onClick={handleStart}>
				Start Game <IoLogoGameControllerB className="controller"/>
			</button>
		</div>
	);
}

export default MainMenu;
