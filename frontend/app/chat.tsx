import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>AI Assistant</Text>

      <Text style={styles.subTitle}>Smart transfer insights powered by AI</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* AI Message */}
        <View style={styles.aiMessage}>
          <Text style={styles.aiText}>
            ✨ Best time to send INR → USD is between 6 PM - 9 PM today for
            lowest fees.
          </Text>
        </View>

        {/* User Message */}
        <View style={styles.userMessage}>
          <Text style={styles.userText}>Which transfer route is cheapest?</Text>
        </View>

        {/* AI Message */}
        <View style={styles.aiMessage}>
          <Text style={styles.aiText}>
            🚀 Crypto Rail currently offers the lowest fee and fastest delivery
            route.
          </Text>
        </View>

        {/* Fraud Alert */}
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>⚠ Fraud Detection</Text>

          <Text style={styles.alertText}>
            Recipient activity looks safe. No suspicious transactions detected.
          </Text>
        </View>

        {/* AI Insights */}
        <View style={styles.insightCard}>
          <Text style={styles.insightTitle}>📊 AI Insight</Text>

          <Text style={styles.insightText}>
            Sending tomorrow morning may increase fees by 12% due to exchange
            volatility.
          </Text>
        </View>

        {/* Suggested Questions */}
        <Text style={styles.suggestionTitle}>Suggested Questions</Text>

        <View style={styles.suggestionRow}>
          <TouchableOpacity style={styles.suggestionButton}>
            <Text style={styles.suggestionText}>Best exchange rate?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.suggestionButton}>
            <Text style={styles.suggestionText}>Cheapest route?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.suggestionRow}>
          <TouchableOpacity style={styles.suggestionButton}>
            <Text style={styles.suggestionText}>Transfer ETA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.suggestionButton}>
            <Text style={styles.suggestionText}>Fraud alerts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask AI anything..."
          placeholderTextColor="#666"
          style={styles.input}
        />

        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
  },

  subTitle: {
    color: "#777",
    marginTop: 8,
    marginBottom: 25,
  },

  aiMessage: {
    backgroundColor: "#1a1025",
    padding: 18,
    borderRadius: 22,
    marginBottom: 18,
    alignSelf: "flex-start",
    maxWidth: "88%",
    borderWidth: 1,
    borderColor: "#402060",
  },

  aiText: {
    color: "white",
    lineHeight: 22,
    fontSize: 15,
  },

  userMessage: {
    backgroundColor: "#8BFF5C",
    padding: 18,
    borderRadius: 22,
    marginBottom: 18,
    alignSelf: "flex-end",
    maxWidth: "85%",
  },

  userText: {
    color: "#000",
    fontWeight: "600",
    lineHeight: 22,
  },

  alertCard: {
    backgroundColor: "#251515",
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#552020",
    marginTop: 10,
  },

  alertTitle: {
    color: "#ff8a8a",
    fontSize: 17,
    fontWeight: "700",
  },

  alertText: {
    color: "#ddd",
    marginTop: 10,
    lineHeight: 22,
  },

  insightCard: {
    backgroundColor: "#111",
    padding: 22,
    borderRadius: 22,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#222",
  },

  insightTitle: {
    color: "#8BFF5C",
    fontSize: 18,
    fontWeight: "700",
  },

  insightText: {
    color: "#ddd",
    marginTop: 10,
    lineHeight: 22,
  },

  suggestionTitle: {
    color: "white",
    fontSize: 21,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 18,
  },

  suggestionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  suggestionButton: {
    backgroundColor: "#111",
    width: "48%",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#222",
  },

  suggestionText: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 18,
    color: "white",
    borderWidth: 1,
    borderColor: "#222",
  },

  sendButton: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: "#8BFF5C",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },

  sendText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "700",
  },
});
