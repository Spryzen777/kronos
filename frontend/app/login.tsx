import { useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { API } from '../constants/api'
import { saveToken, saveUser } from '../constants/storage'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(API.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      await saveToken(data.token)
      await saveUser(data.user)
      router.push('/dashboard')
    } catch (err: any) {
      Alert.alert('Login Failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>R</Text>
        </View>
        <Text style={styles.welcome}>Welcome Back 👋</Text>
        <Text style={styles.subText}>Sign in to continue your global journey</Text>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Log In</Text>}
      </TouchableOpacity>

      <View style={styles.footerSection}>
        <Text style={styles.signupText}>New to RemitIQ?</Text>
        <TouchableOpacity style={styles.signupTouch} onPress={() => router.push('/signup')}>
          <Text style={styles.signupButton}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 25, justifyContent: "center" },
  profileSection: { alignItems: "center", marginBottom: 50 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#8BFF5C", justifyContent: "center", alignItems: "center", marginBottom: 25 },
  avatarText: { fontSize: 38, fontWeight: "700", color: "#000" },
  welcome: { color: "white", fontSize: 34, fontWeight: "700" },
  subText: { color: "#777", marginTop: 10, fontSize: 16, textAlign: "center" },
  inputSection: { marginBottom: 25 },
  input: { backgroundColor: "#111", borderRadius: 18, padding: 18, color: "white", marginBottom: 18, borderWidth: 1, borderColor: "#222" },
  button: { backgroundColor: "#8BFF5C", padding: 18, borderRadius: 18, alignItems: "center" },
  buttonText: { color: "#000", fontSize: 18, fontWeight: "700" },
  footerSection: { alignItems: "center", marginTop: 35 },
  signupText: { color: "#777", fontSize: 15 },
  signupTouch: { padding: 10 },
  signupButton: { color: "#8BFF5C", fontSize: 16, fontWeight: "700", marginTop: 8 },
});