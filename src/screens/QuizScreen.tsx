import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Question from '../components/Question';
import { questions } from '../data/questions';
import { shuffleArray } from '../utils/shuffleArray';
import { GameContext } from '../context/GameContext';

const QuizScreen: React.FC = ({ navigation, route }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const gameContext = useContext(GameContext);

  useEffect(() => {
    if (!gameContext) {
      return;
    }

    const loadQuestions = () => {
      const shuffled = shuffleArray(questions).map(q => ({
        ...q,
        answers: shuffleArray(q.answers)
      }));
      setShuffledQuestions(shuffled);
      setCurrentQuestionIndex(0);
      setScore(0);
    };

    loadQuestions();

    if (route.params?.reset) {
      loadQuestions();
    }
  }, [route.params?.reset, gameContext]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    if (answer === currentQuestion.correct) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (gameContext) {
        gameContext.addScore(score);
      }
      navigation.navigate('Leaderboard');
    }
  };

  if (shuffledQuestions.length === 0) {
    return <Text>Loading...</Text>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Question
        question={currentQuestion.question}
        answers={currentQuestion.answers}
        onAnswer={handleAnswer}
      />
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
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  answerButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center'
  },
  answerButtonText: {
    color: '#fff',
    fontSize: 18
  }
});

export default QuizScreen;
