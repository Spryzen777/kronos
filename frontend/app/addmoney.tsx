import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddMoneyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Money</Text>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Wallet Balance</Text>

        <Text style={styles.balance}>₹48,230.50</Text>
      </View>

      {/* Amount Input */}
      <Text style={styles.label}>Enter Amount</Text>

      <TextInput
        placeholder="₹ Enter amount"
        placeholderTextColor="#666"
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Payment Methods */}
      <Text style={styles.label}>Payment Method</Text>

      <TouchableOpacity style={styles.methodCard}>
        <Text style={styles.methodText}>💳 Debit / Credit Card</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.methodCard}>
        <Text style={styles.methodText}>🏦 Bank Transfer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.methodCard}>
        <Text style={styles.methodText}>📱 UPI Payment</Text>
      </TouchableOpacity>

      {/* Add Money Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Money</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 25,
  },

  balanceCard: {
    backgroundColor: "#111",
    borderRadius: 28,
    padding: 25,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#222",
  },

  balanceLabel: {
    color: "#777",
    fontSize: 15,
  },

  balance: {
    color: "white",
    fontSize: 38,
    fontWeight: "700",
    marginTop: 12,
  },

  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 12,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 18,
    color: "white",
    borderWidth: 1,
    borderColor: "#222",
  },

  methodCard: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#222",
  },

  methodText: {
    color: "white",
    fontSize: 16,
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
    fontSize: 18,
  },
});
