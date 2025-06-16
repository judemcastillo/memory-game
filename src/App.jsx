import { useState } from "react";
import "./App.css";
import MainMenu from "./components/MainMenu.jsx";
import GamePhase from "./components/GamePhase.jsx";
import Switch from "./components/Switch.jsx";


function App() {
	const [phase, setPhase] = useState("menu");
	const [darkMode, setDarkMode] = useState(true);
	const [settings, setSettings] = useState({
		theme: "images",
		difficulty: "normal",
	});

	const toggleDarkMode = () => setDarkMode((prev) => !prev);

	const handleStart = (newSettings) => {
		setSettings(newSettings);
		setPhase("game");
	};

	return (
		<div className={`app-container ${darkMode ? "" : "dark"}`}>
			<main>
				<div className="heading">
					<h1 className="title">🧠 Memory Card Game</h1>
					<Switch onToggle={toggleDarkMode} darkMode={darkMode} />
				</div>

				{phase === "menu" ? (
					<MainMenu onStart={handleStart} />
				) : (
					<GamePhase
						onBack={() => setPhase("menu")}
						theme={settings.theme}
						difficulty={settings.difficulty}
					/>
				)}
				
			</main>
		</div>
	);
}

export default App;
