function EmojiCards({ emojis }) {
  return (
    <div className="emoji-cards">
      {emojis.map((emoji, index) => (
        <div key={index} className="emoji-card">
          <span role="img" aria-label={emoji.name}>
            {emoji.symbol}
          </span>
          <p>{emoji.name}</p>
        </div>
      ))}
    </div>
  );
}