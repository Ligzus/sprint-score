import { useState, useEffect } from 'react';
import './App.css';

// Firebase
import { db } from './firebase';
import { ref, onValue, set } from "firebase/database";

function App() {
  const ro = ["Катя"];
  const analysts = ["Пётр", "Алексей"];
  const backDevelopers = ["Максим", "Никита", "Владимир"];
  const frontDevelopers = ["Игорь Задорин"];
  const mobileDevelopers = ["Матвей", "Игорь Касьяненко", "Георгий"];
  const testers = ["Саша", "Олег", "Миша"];

  const groups = [
    { name: "РО", members: ro },
    { name: "Аналитики", members: analysts },
    { name: "Backend", members: backDevelopers },
    { name: "Mobile", members: mobileDevelopers },
    { name: "Frontend", members: frontDevelopers },
    { name: "Тестировщики", members: testers },
  ];

  const [scores, setScores] = useState({});

  useEffect(() => {
    const scoresRef = ref(db, 'scores');
    onValue(scoresRef, (snapshot) => {
      const data = snapshot.val() || {};
      setScores(data);
    });
  }, []);

  const handleScore = (name, value) => {
    const newValue = scores[name] === value ? null : value;

    const updatedScores = { ...scores };
    if (newValue === null) {
      delete updatedScores[name];
    } else {
      updatedScores[name] = newValue;
    }

    set(ref(db, 'scores'), updatedScores);
  };

  const resetAllScores = () => {
    set(ref(db, 'scores'), {});
  };

  const selectedScores = Object.values(scores);
  const average =
    selectedScores.length > 0
      ? (selectedScores.reduce((a, b) => a + b, 0) / selectedScores.length).toFixed(2)
      : null;

  const lowScorers = Object.entries(scores)
    .filter(([, val]) => val <= 7)
    .map(([name]) => name);

  return (
    <div className="app-container">
      {average && <div className="average-bg">{average}</div>}

      <h1>Оценка спринта 🚀</h1>
      <h3>Alfa ID Инновации</h3>

      <div className="main-flex">
        <div className="team-list">
          {groups.map(group => (
            <div key={group.name} className="team-group">
              <h2>{group.name}</h2>
              {group.members.map(name => (
                <div key={name} className="team-member">
                  <span className="member-name">{name}</span>
                  <div className="buttons">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => {
                      let color = "#1a1a1a";
                      if (scores[name] === num) {
                        if (num >= 8) {
                          color = "#10b981";
                        } else {
                          const red = 255;
                          const green = Math.floor(((num - 1) / 6) * 165);
                          color = `rgb(${red},${green},0)`;
                        }
                      }
                      return (
                        <button
                          key={num}
                          className={`score-btn ${scores[name] === num ? "active" : ""}`}
                          onClick={() => handleScore(name, num)}
                          style={{ backgroundColor: color }}
                        >
                          {num}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={`sidebar ${selectedScores.length > 0 ? 'visible' : ''}`}>
          {selectedScores.length > 0 && (
            <>
              <h2>Средняя оценка</h2>
              <div className="avg-sidebar">{average}</div>

              {lowScorers.length > 0 && (
                <>
                  <h3>Кто поясняет за оценку:</h3>
                  <ul>
                    {lowScorers.map(name => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}

          {selectedScores.length > 0 && (
            <div className="reset-btn-container">
              <button className="reset-btn" onClick={resetAllScores}>
                Сбросить все оценки
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
