import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { summarizeText } from '../services/api';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    const result = await summarizeText(input);
    setSummary(result || 'No summary returned.');
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Enter a paragraph:</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Type or paste a paragraph..."
        value={input}
        onChangeText={setInput}
      />
      <Button title={loading ? 'Summarizing...' : 'Summarize'} onPress={handleSummarize} disabled={loading} />
      <Text style={styles.label}>Summary:</Text>
      <Text style={styles.output}>{summary}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 20, fontWeight: 'bold' },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    borderRadius: 8,
    marginBottom: 10,
  },
  output: {
    marginTop: 10,
    fontSize: 16,
  },
});
