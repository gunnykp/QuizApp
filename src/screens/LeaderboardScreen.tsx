import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { GameContext } from '../context/GameContext';

const LeaderboardScreen: React.FC = ({ navigation }) => {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return null;
  }

  const { attempts, scores, resetGame } = gameContext;

  const handlePlayAgain = () => {
    if (attempts >= 10) {
      resetGame();
    }
    navigation.navigate('Quiz', { reset: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leaderboard</Text>
      <FlatList
        data={scores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.scoreText}>{`Attempt ${index + 1}: ${item} points`}</Text>
        )}
      />
      <Button title="Play Again" onPress={handlePlayAgain} color="#6200ee" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  scoreText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 5
  }
});

export default LeaderboardScreen;
