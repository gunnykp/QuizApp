import React, { createContext, useState, ReactNode } from 'react';

interface GameContextProps {
  attempts: number;
  scores: number[];
  addScore: (score: number) => void;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [attempts, setAttempts] = useState(0);
  const [scores, setScores] = useState<number[]>([]);

  const addScore = (score: number) => {
    setScores([...scores, score]);
    setAttempts(attempts + 1);
  };

  const resetGame = () => {
    setAttempts(0);
    setScores([]);
  };

  return (
    <GameContext.Provider value={{ attempts, scores, addScore, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};
