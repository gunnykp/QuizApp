import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuestionProps {
  question: string;
  answers: string[];
  onAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, answers, onAnswer }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
      {answers.map((answer, index) => (
        <TouchableOpacity key={index} style={styles.answerButton} onPress={() => onAnswer(answer)}>
          <Text style={styles.answerButtonText}>{answer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  questionText: {
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
    alignItems: 'center'
  },
  answerButtonText: {
    color: '#fff',
    fontSize: 18
  }
});

export default Question;
