import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { authAPI } from "../services/api";

export default function OTPScreen() {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useLocalSearchParams();
    const email = params.email as string;

    const verifyOtp = async () => {
        if (!otp || otp.length !== 6) {
            Alert.alert('Error', 'Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            await authAPI.verifyOTP(email, otp);
            Alert.alert('Success', 'Account verified!');
            router.replace('/dashboard');
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.error || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify Your Email</Text>
            <Text style={styles.subtitle}>Enter the OTP sent to {email}</Text>
            <TextInput
             style={styles.input}
             placeholder="Enter OTP Code"
             value={otp}
             onChangeText={setOtp}
             keyboardType="numeric"
             maxLength={6}
            />

            <Button title="Verify OTP" onPress={verifyOtp}/>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
    },
});

