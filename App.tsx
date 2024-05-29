// App.tsx
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { GameProvider } from './src/context/GameContext';

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppNavigator />
    </GameProvider>
  );
};

export default App;
