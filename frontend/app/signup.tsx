import { useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { API } from '../constants/api'
import { saveToken, saveUser } from '../constants/storage'

export default function SignupScreen() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!firstName || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill all fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(API.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, password })
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)

      const loginRes = await fetch(API.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const loginData = await loginRes.json()
      await saveToken(loginData.token)
      await saveUser(loginData.user)
      router.push('/dashboard')
    } catch (err: any) {
      Alert.alert('Signup Failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account 🚀</Text>
      <Text style={styles.subText}>Start your global transfer journey</Text>

      <TextInput placeholder="First Name" placeholderTextColor="#666" style={styles.input} value={firstName} onChangeText={setFirstName} />
      <TextInput placeholder="Last Name" placeholderTextColor="#666" style={styles.input} value={lastName} onChangeText={setLastName} />
      <TextInput placeholder="Email" placeholderTextColor="#666" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Phone" placeholderTextColor="#666" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput placeholder="Password" placeholderTextColor="#666" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Create Account</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginTouch} onPress={() => router.push('/login')}>
        <Text style={styles.loginText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 25, justifyContent: "center" },
  title: { color: "white", fontSize: 34, fontWeight: "700" },
  subText: { color: "#777", marginTop: 10, marginBottom: 40 },
  input: { backgroundColor: "#111", borderRadius: 18, padding: 18, color: "white", marginBottom: 18, borderWidth: 1, borderColor: "#222" },
  button: { backgroundColor: "#8BFF5C", padding: 18, borderRadius: 18, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#000", fontWeight: "700", fontSize: 18 },
  loginTouch: { padding: 12, marginTop: 20 },
  loginText: { color: "#8BFF5C", textAlign: "center", fontSize: 15 },
});