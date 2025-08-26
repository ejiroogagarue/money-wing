import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MoneyWing</Text>
      <Text style={styles.subtitle}>Send money to Uganda seamlessly</Text>

      <View style={styles.buttonContainer}>
        <Link href="/signup" asChild>
          <Button title="Create Account" />
        </Link>
        <Button
          title="Login"
          onPress={() => alert("Login screen coming soon!")}
          color="#666"
        ></Button>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    gap: 10,
  }
});