import { StyleSheet, Text, View } from "react-native";

import { router } from "expo-router";
import { useEffect } from "react";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/welcome" as any);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FluxRemit AI</Text>

      <Text style={styles.tagline}>Smart AI-Powered Remittance</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    color: "#8BFF5C",
    fontSize: 42,
    fontWeight: "800",
  },

  tagline: {
    color: "#777",
    marginTop: 18,
    fontSize: 16,
  },
});
