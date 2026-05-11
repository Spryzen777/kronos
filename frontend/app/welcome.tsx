import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Smart Money Transfers</Text>

        <Text style={styles.subtitle}>
          AI-powered remittance with faster, safer and cheaper global transfers.
        </Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/login" as any)}
        >
          <Text style={styles.primaryText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/login" as any)}
        >
          <Text style={styles.secondaryText}>Login To Existing Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
    padding: 30,
  },

  title: {
    color: "white",
    fontSize: 42,
    fontWeight: "800",
    marginTop: 120,
    lineHeight: 52,
  },

  subtitle: {
    color: "#777",
    fontSize: 17,
    marginTop: 20,
    lineHeight: 28,
  },

  bottom: {
    marginBottom: 40,
  },

  primaryButton: {
    backgroundColor: "#8BFF5C",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  primaryText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 18,
  },

  secondaryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
