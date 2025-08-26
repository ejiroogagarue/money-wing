import { Button, StyleSheet, Text, View } from "react-native";

export default function DashboardScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to MoneyWing!</Text>
            <Text style={styles.subtitle}>Your onboarding is complete</Text>
            <View style={styles.featureList}>
                <Text style={styles.feature}>Email Verified</Text>
                <Text style={styles.feature}>Account Created</Text>
                <Text style={styles.feature}>Ready to Send Money</Text>
            </View>

            <Button
             title="Start Sending Money"
             onPress={() => alert('This will be built in Week 2!')}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1E40AF',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 30,
    },
    featureList: {
        marginBottom: 30,
        alignItems: 'center',
    },
    feature: {
        fontSize: 16,
        marginBottom: 10,
        color: '#4B5563',
    },
});

