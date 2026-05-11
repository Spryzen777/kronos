import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.hello}>Hello, Aarav 👋</Text>

            <Text style={styles.subText}>Welcome back</Text>
          </View>

          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>A</Text>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>

          <Text style={styles.balance}>₹48,230.50</Text>

          <Text style={styles.currencyText}>≈ $573.16 • 3 Currencies</Text>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/addmoney")}
            >
              <Text style={styles.actionIcon}>💰</Text>
              <Text style={styles.actionText}>Add Money</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/send")}
            >
              <Text style={styles.actionIcon}>📤</Text>
              <Text style={styles.actionText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/recipient")}
            >
              <Text style={styles.actionIcon}>👥</Text>
              <Text style={styles.actionText}>Recipient</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/chat")}
            >
              <Text style={styles.actionIcon}>🤖</Text>
              <Text style={styles.actionText}>AI Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Insight */}
        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>✨ AI Transfer Insight</Text>

          <Text style={styles.aiText}>
            Best transfer route today is Crypto Rail with lowest fees and
            fastest delivery.
          </Text>
        </View>

        {/* Exchange Rate */}
        <View style={styles.exchangeCard}>
          <View style={styles.exchangeHeader}>
            <Text style={styles.exchangeTitle}>Live Exchange Rate</Text>

            <Text style={styles.exchangePair}>USD / INR</Text>
          </View>

          <Text style={styles.exchangeValue}>83.26</Text>

          <Text style={styles.exchangeGrowth}>▲ 0.42 (0.51%)</Text>

          {/* Fake Graph */}
          <View style={styles.graphBox}>
            <View style={styles.fakeGraph}>
              <View style={[styles.bar, { height: 30 }]} />
              <View style={[styles.bar, { height: 55 }]} />
              <View style={[styles.bar, { height: 45 }]} />
              <View style={[styles.bar, { height: 70 }]} />
              <View style={[styles.bar, { height: 60 }]} />
              <View style={[styles.bar, { height: 85 }]} />
            </View>
          </View>
        </View>

        {/* Recent Transfers */}
        <View style={styles.transferSection}>
          <View style={styles.transferHeader}>
            <Text style={styles.transferTitle}>Recent Transfers</Text>

            <Text style={styles.seeAll}>See All</Text>
          </View>

          <View style={styles.transferCard}>
            <View>
              <Text style={styles.transferName}>Vikram Singh</Text>

              <Text style={styles.transferCountry}>UAE • Delivered</Text>
            </View>

            <Text style={styles.transferAmount}>₹25,000</Text>
          </View>

          <View style={styles.transferCard}>
            <View>
              <Text style={styles.transferName}>Rahul Sharma</Text>

              <Text style={styles.transferCountry}>USA • Processing</Text>
            </View>

            <Text style={styles.transferAmount}>₹12,500</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.activeNavIcon}>🏠</Text>
          <Text style={styles.activeNavText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/send")}
        >
          <Text style={styles.navIcon}>📤</Text>
          <Text style={styles.navText}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/track")}
        >
          <Text style={styles.navIcon}>📍</Text>
          <Text style={styles.navText}>Track</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/chat")}
        >
          <Text style={styles.navIcon}>🤖</Text>
          <Text style={styles.navText}>AI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 25,
  },

  hello: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
  },

  subText: {
    color: "#777",
    marginTop: 4,
  },

  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8BFF5C",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },

  balanceCard: {
    backgroundColor: "#101010",
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 25,
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },

  balanceLabel: {
    color: "#777",
  },

  balance: {
    color: "white",
    fontSize: 38,
    fontWeight: "700",
    marginTop: 12,
  },

  currencyText: {
    color: "#666",
    marginTop: 8,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  actionButton: {
    alignItems: "center",
  },

  actionIcon: {
    fontSize: 24,
  },

  actionText: {
    color: "white",
    fontSize: 11,
    marginTop: 8,
  },

  aiCard: {
    backgroundColor: "#1a1025",
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 28,
    padding: 24,
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

  exchangeCard: {
    backgroundColor: "#101010",
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },

  exchangeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  exchangeTitle: {
    color: "#aaa",
  },

  exchangePair: {
    color: "#666",
  },

  exchangeValue: {
    color: "white",
    fontSize: 38,
    fontWeight: "700",
    marginTop: 15,
  },

  exchangeGrowth: {
    color: "#4ade80",
    marginTop: 8,
  },

  graphBox: {
    marginTop: 25,
  },

  fakeGraph: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 100,
  },

  bar: {
    width: 22,
    backgroundColor: "#8BFF5C",
    borderRadius: 12,
  },

  transferSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },

  transferHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  transferTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },

  seeAll: {
    color: "#8BFF5C",
  },

  transferCard: {
    backgroundColor: "#101010",
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#1f1f1f",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  transferName: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },

  transferCountry: {
    color: "#777",
    marginTop: 6,
  },

  transferAmount: {
    color: "#8BFF5C",
    fontSize: 18,
    fontWeight: "700",
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0d0d0d",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 18,
    borderTopWidth: 1,
    borderColor: "#1f1f1f",
  },

  navItem: {
    alignItems: "center",
  },

  navIcon: {
    fontSize: 22,
  },

  activeNavIcon: {
    fontSize: 22,
  },

  navText: {
    color: "#666",
    marginTop: 6,
    fontSize: 12,
  },

  activeNavText: {
    color: "#8BFF5C",
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
  },
});
