import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

import { router } from "expo-router";

export default function SignupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account 🚀</Text>

      <Text style={styles.subText}>Start your global transfer journey</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#666"
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#666"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#666"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginTouch}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.loginText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 25,
    justifyContent: "center",
  },

  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "700",
  },

  subText: {
    color: "#777",
    marginTop: 10,
    marginBottom: 40,
  },

  input: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 18,
    color: "white",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#222",
  },

  button: {
    backgroundColor: "#8BFF5C",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 18,
  },

  loginTouch: {
    padding: 12,
    marginTop: 20,
  },

  loginText: {
    color: "#8BFF5C",
    textAlign: "center",
    fontSize: 15,
  },
});
