import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";

export default function SuccessScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Success Icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.check}>✅</Text>
      </View>

      {/* Success Text */}
      <Text style={styles.title}>Transfer Successful</Text>

      <Text style={styles.subText}>
        Your money transfer has been completed successfully.
      </Text>

      {/* Transaction Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Amount Sent</Text>

          <Text style={styles.value}>₹50,000</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Recipient</Text>

          <Text style={styles.value}>Vikram Singh</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>ETA</Text>

          <Text style={styles.value}>5 Minutes</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID</Text>

          <Text style={styles.value}>FRX78291023</Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.buttonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    padding: 25,
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  check: {
    fontSize: 80,
  },

  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
  },

  subText: {
    color: "#777",
    textAlign: "center",
    marginTop: 15,
    lineHeight: 22,
    marginBottom: 40,
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 28,
    padding: 25,
    borderWidth: 1,
    borderColor: "#222",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  label: {
    color: "#777",
    fontSize: 15,
  },

  value: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },

  button: {
    backgroundColor: "#8BFF5C",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 35,
  },

  buttonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 17,
  },
});
