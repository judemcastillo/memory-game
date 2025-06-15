

function MainMenu({ onStart }) {
  return (
    <div className="game-container">
      <div className="settings">settings</div>
      <button className="menu-button" onClick={onStart}>
        Start Game
      </button>
    </div>
  );
}

export default MainMenu;
