import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function RecipientScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recipients</Text>

      <View style={styles.card}>
        <Text style={styles.name}>Vikram Singh</Text>

        <Text style={styles.country}>UAE • Emirates NBD</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>Rahul Sharma</Text>

        <Text style={styles.country}>USA • Chase Bank</Text>
      </View>
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

  card: {
    backgroundColor: "#111",
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
  },

  name: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  country: {
    color: "#777",
    marginTop: 8,
  },
});
