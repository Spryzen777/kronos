import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";

export default function SendScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <Text style={styles.title}>Send Money</Text>

        {/* Steps */}
        <View style={styles.stepRow}>
          <View style={styles.activeStep}>
            <Text style={styles.stepText}>1</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.step}>
            <Text style={styles.stepText}>2</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.step}>
            <Text style={styles.stepText}>3</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.step}>
            <Text style={styles.stepText}>4</Text>
          </View>
        </View>

        {/* Inputs */}
        <TextInput
          placeholder="Recipient Name"
          placeholderTextColor="#666"
          style={styles.input}
        />

        <TextInput
          placeholder="Account Number"
          placeholderTextColor="#666"
          style={styles.input}
        />

        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#666"
          style={styles.input}
        />

        <TextInput
          placeholder="Bank Name"
          placeholderTextColor="#666"
          style={styles.input}
        />

        <TextInput
          placeholder="BIC / SWIFT Code"
          placeholderTextColor="#666"
          style={styles.input}
        />

        {/* Amount Card */}
        <View style={styles.amountCard}>
          <Text style={styles.label}>You Send</Text>

          <Text style={styles.amount}>₹50,000</Text>

          <Text style={styles.rate}>1 INR = 0.04325 AED</Text>

          {/* Currency */}
          <View style={styles.currencyRow}>
            <View style={styles.currencyBox}>
              <Text style={styles.currencyText}>🇮🇳 INR</Text>
            </View>

            <Text style={styles.arrow}>→</Text>

            <View style={styles.currencyBox}>
              <Text style={styles.currencyText}>🇦🇪 AED</Text>
            </View>
          </View>
        </View>

        {/* AI Recommendation */}
        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>✨ AI Recommendation</Text>

          <Text style={styles.aiText}>
            Crypto Rail currently offers the lowest fee and fastest transfer
            route.
          </Text>
        </View>

        {/* Routes */}
        <Text style={styles.routeTitle}>Compare Routes</Text>

        {/* Route 1 */}
        <View style={styles.routeCard}>
          <View>
            <Text style={styles.routeName}>Crypto Rail</Text>

            <Text style={styles.routeSub}>Fastest Route</Text>
          </View>

          <View>
            <Text style={styles.routeFee}>₹120</Text>

            <Text style={styles.routeTime}>5 mins</Text>
          </View>
        </View>

        {/* Route 2 */}
        <View style={styles.routeCard}>
          <View>
            <Text style={styles.routeName}>Wise Transfer</Text>

            <Text style={styles.routeSub}>Balanced Option</Text>
          </View>

          <View>
            <Text style={styles.routeFee}>₹280</Text>

            <Text style={styles.routeTime}>15 mins</Text>
          </View>
        </View>

        {/* Route 3 */}
        <View style={styles.routeCard}>
          <View>
            <Text style={styles.routeName}>Bank Transfer</Text>

            <Text style={styles.routeSub}>Traditional Route</Text>
          </View>

          <View>
            <Text style={styles.routeFee}>₹450</Text>

            <Text style={styles.routeTime}>2 hrs</Text>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/loading" as any)}
        >
          <Text style={styles.buttonText}>Continue Transfer</Text>
        </TouchableOpacity>
      </ScrollView>
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

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  activeStep: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#8BFF5C",
    justifyContent: "center",
    alignItems: "center",
  },

  step: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },

  stepText: {
    color: "#000",
    fontWeight: "700",
  },

  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#222",
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

  amountCard: {
    backgroundColor: "#111",
    borderRadius: 28,
    padding: 25,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#222",
  },

  label: {
    color: "#777",
  },

  amount: {
    color: "white",
    fontSize: 36,
    fontWeight: "700",
    marginTop: 12,
  },

  rate: {
    color: "#4ade80",
    marginTop: 10,
  },

  currencyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },

  currencyBox: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 18,
  },

  currencyText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  arrow: {
    color: "#8BFF5C",
    fontSize: 26,
    fontWeight: "700",
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

  routeTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 20,
  },

  routeCard: {
    backgroundColor: "#111",
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#222",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  routeName: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  routeSub: {
    color: "#777",
    marginTop: 5,
  },

  routeFee: {
    color: "#8BFF5C",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "right",
  },

  routeTime: {
    color: "#777",
    marginTop: 5,
    textAlign: "right",
  },

  button: {
    backgroundColor: "#8BFF5C",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 18,
  },
});
