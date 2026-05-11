import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function TrackScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Track Transfer</Text>

      {/* Transaction Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Transaction ID</Text>

        <Text style={styles.transactionId}>FRX78291023</Text>

        <View style={styles.divider} />

        {/* Timeline */}
        <View style={styles.timeline}>
          <View style={styles.timelineItem}>
            <View style={styles.greenDot} />
            <View>
              <Text style={styles.statusTitle}>Payment Received</Text>

              <Text style={styles.statusSub}>Today • 10:10 AM</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.greenDot} />
            <View>
              <Text style={styles.statusTitle}>Money Sent</Text>

              <Text style={styles.statusSub}>Today • 10:20 AM</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.activeDot} />
            <View>
              <Text style={styles.activeTitle}>In Transit</Text>

              <Text style={styles.statusSub}>Expected in 15 mins</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.grayDot} />
            <View>
              <Text style={styles.pendingTitle}>Delivered</Text>

              <Text style={styles.pendingSub}>Waiting...</Text>
            </View>
          </View>
        </View>
      </View>

      {/* AI Insight */}
      <View style={styles.aiCard}>
        <Text style={styles.aiTitle}>AI Monitoring ✨</Text>

        <Text style={styles.aiText}>
          No fraud risk detected. Transfer route optimized for fastest delivery.
        </Text>
      </View>

      {/* ETA Card */}
      <View style={styles.etaCard}>
        <Text style={styles.etaLabel}>Estimated Delivery</Text>

        <Text style={styles.etaTime}>15 Minutes</Text>
      </View>

      {/* Support Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Contact Support</Text>
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
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 28,
    padding: 25,
    borderWidth: 1,
    borderColor: "#222",
  },

  label: {
    color: "#777",
    fontSize: 14,
  },

  transactionId: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#222",
    marginVertical: 25,
  },

  timeline: {
    gap: 28,
  },

  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  greenDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#4ade80",
    marginRight: 18,
  },

  activeDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#8BFF5C",
    marginRight: 18,
    borderWidth: 4,
    borderColor: "#1f3d15",
  },

  grayDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#444",
    marginRight: 18,
  },

  statusTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },

  activeTitle: {
    color: "#8BFF5C",
    fontSize: 17,
    fontWeight: "700",
  },

  pendingTitle: {
    color: "#777",
    fontSize: 17,
    fontWeight: "600",
  },

  statusSub: {
    color: "#777",
    marginTop: 5,
  },

  pendingSub: {
    color: "#555",
    marginTop: 5,
  },

  aiCard: {
    backgroundColor: "#1a1025",
    borderRadius: 25,
    padding: 22,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#402060",
  },

  aiTitle: {
    color: "#c084fc",
    fontSize: 18,
    fontWeight: "700",
  },

  aiText: {
    color: "#ddd",
    marginTop: 12,
    lineHeight: 22,
  },

  etaCard: {
    backgroundColor: "#111",
    borderRadius: 25,
    padding: 22,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#222",
  },

  etaLabel: {
    color: "#777",
    fontSize: 15,
  },

  etaTime: {
    color: "white",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 12,
  },

  button: {
    backgroundColor: "#8BFF5C",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 17,
  },
});
