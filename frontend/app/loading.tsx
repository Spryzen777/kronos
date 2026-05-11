import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { router } from "expo-router";
import { useEffect } from "react";

export default function LoadingScreen() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/success");
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#8BFF5C" />

      <Text style={styles.title}>Processing Transfer...</Text>

      <Text style={styles.subText}>
        AI fraud detection and transfer verification running
      </Text>

      <View style={styles.card}>
        <Text style={styles.step}>✅ Payment verified</Text>

        <Text style={styles.step}>✅ Exchange route optimized</Text>

        <Text style={styles.activeStep}>⏳ Sending transfer</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 30,
  },

  subText: {
    color: "#777",
    textAlign: "center",
    marginTop: 15,
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#111",
    width: "100%",
    borderRadius: 25,
    padding: 25,
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#222",
  },

  step: {
    color: "#4ade80",
    fontSize: 17,
    marginBottom: 20,
  },

  activeStep: {
    color: "#8BFF5C",
    fontSize: 17,
    fontWeight: "700",
  },
});
