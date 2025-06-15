import { useState } from "react";
import "./App.css";
import MainMenu from "./components/MainMenu.jsx";
import GamePhase from "./components/GamePhase.jsx";

function App() {
	const [phase, setPhase] = useState("menu");
	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => setDarkMode((prev) => !prev);

	return (
		<div className={`app-container ${darkMode ? "dark" : ""}`}>
			<main>
				<div className="heading">
					<h1 className="title">🧠 Memory Card Game</h1>
					<button className="dark-toggle" onClick={toggleDarkMode}>
						{darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
					</button>
				</div>

				{phase === "menu" ? (
					<MainMenu onStart={() => setPhase("game")} />
				) : (
					<GamePhase onBack={() => setPhase("menu")} />
				)}
			</main>
		</div>
	);
}

export default App;
