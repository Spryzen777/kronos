import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>

        <Text style={styles.welcome}>Welcome, Aarav 👋</Text>

        <Text style={styles.subText}>
          Sign in to continue your global journey
        </Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputSection}>
        <TextInput
          placeholder="Username or Email"
          placeholderTextColor="#666"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          style={styles.input}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Signup Section */}
      <View style={styles.footerSection}>
        <Text style={styles.signupText}>New to RemitIQ?</Text>

        <TouchableOpacity
          style={styles.signupTouch}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.signupButton}>Create an Account</Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          Secure AI-powered global transfers
        </Text>
      </View>
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

  profileSection: {
    alignItems: "center",
    marginBottom: 50,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#8BFF5C",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  avatarText: {
    fontSize: 38,
    fontWeight: "700",
    color: "#000",
  },

  welcome: {
    color: "white",
    fontSize: 34,
    fontWeight: "700",
  },

  subText: {
    color: "#777",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },

  inputSection: {
    marginBottom: 25,
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
  },

  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },

  footerSection: {
    alignItems: "center",
    marginTop: 35,
  },

  signupText: {
    color: "#777",
    fontSize: 15,
  },

  signupTouch: {
    padding: 10,
  },

  signupButton: {
    color: "#8BFF5C",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8,
  },

  bottomText: {
    color: "#555",
    textAlign: "center",
    marginTop: 30,
    fontSize: 13,
  },
});
