import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View, ScrollView } from "react-native";
import { authAPI, userAPI, kycAPI, healthCheck } from "../services/api";

export default function APITestScreen() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testHealthCheck = async () => {
    setLoading(true);
    try {
      await healthCheck();
      addResult("✅ Health check passed - API is accessible");
    } catch (error: any) {
      addResult(`❌ Health check failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testSignup = async () => {
    setLoading(true);
    try {
      const testEmail = `test${Date.now()}@example.com`;
      const testPassword = "testpassword123";
      
      await authAPI.signup(testEmail, testPassword);
      addResult(`✅ Signup successful for ${testEmail}`);
    } catch (error: any) {
      addResult(`❌ Signup failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testUserProfile = async () => {
    setLoading(true);
    try {
      await userAPI.getProfile();
      addResult("✅ User profile endpoint accessible");
    } catch (error: any) {
      addResult(`❌ User profile failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Test Screen</Text>
      <Text style={styles.subtitle}>Test your Heroku backend endpoints</Text>

      <View style={styles.buttonContainer}>
        <Button 
          title="Test Health Check" 
          onPress={testHealthCheck}
          disabled={loading}
        />
        <Button 
          title="Test Signup" 
          onPress={testSignup}
          disabled={loading}
        />
        <Button 
          title="Test User Profile" 
          onPress={testUserProfile}
          disabled={loading}
        />
        <Button 
          title="Clear Results" 
          onPress={clearResults}
          color="#666"
        />
      </View>

      <ScrollView style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Test Results:</Text>
        {results.map((result, index) => (
          <Text key={index} style={styles.resultText}>
            {result}
          </Text>
        ))}
        {results.length === 0 && (
          <Text style={styles.noResults}>No tests run yet</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 30,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  resultText: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  noResults: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});
