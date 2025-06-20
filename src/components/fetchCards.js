const EMOJIS = [
  { emoji: "🍎", name: "Apple" },
  { emoji: "🐶", name: "Dog" },
  { emoji: "🚗", name: "Car" },
  { emoji: "🎮", name: "Game Controller" },
  { emoji: "🌈", name: "Rainbow" },
  { emoji: "⚽", name: "Soccer Ball" },
  { emoji: "🎲", name: "Dice" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "📚", name: "Books" },
  { emoji: "🚀", name: "Rocket" },
  { emoji: "🎧", name: "Headphones" },
  { emoji: "🧊", name: "Ice" },
  { emoji: "🍩", name: "Donut" },
  { emoji: "🐱", name: "Cat" },
  { emoji: "🎹", name: "Piano" },
  { emoji: "🧠", name: "Brain" },
  { emoji: "🌟", name: "Star" },
  { emoji: "📸", name: "Camera" },
];

function fetchCards(theme = "images", difficulty = "normal") {
  const difficultyMap = {
    easy: 6,
    normal: 12,
    hard: 18,
  };

  const cardCount = difficultyMap[difficulty] || 12;
  const gameCards = [];

  for (let i = 0; i < cardCount; i++) {
    if (theme === "emojis") {
      const { emoji, name } = EMOJIS[i % EMOJIS.length];
      gameCards.push({
        id: i,
        name,
        image: null,
        emoji,
      });
    } else {
      gameCards.push({
        id: i,
        name: `Card ${Math.floor((Math.random() * 100) + 1)}`,
        image: `https://picsum.photos/200?random=${i + 1}`,
        emoji: null,
      });
    }
  }

  return gameCards;
}

export default fetchCards;
