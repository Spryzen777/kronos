import { useState, useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { API } from '../constants/api'
import { getToken, getUser } from '../constants/storage'

export default function DashboardScreen() {
  const [balance, setBalance] = useState(0)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const token = await getToken()
      const savedUser = await getUser()
      setUser(savedUser)

      const res = await fetch(API.walletBalance, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setBalance(data.balance)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.hello}>Hello, {user?.firstName || 'User'} 👋</Text>
            <Text style={styles.subText}>Welcome back</Text>
          </View>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>{user?.firstName?.[0] || 'U'}</Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balance}>${balance.toFixed(2)}</Text>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/addmoney')}>
              <Text style={styles.actionIcon}>💰</Text>
              <Text style={styles.actionText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/send')}>
              <Text style={styles.actionIcon}>📤</Text>
              <Text style={styles.actionText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/recipient')}>
              <Text style={styles.actionIcon}>👥</Text>
              <Text style={styles.actionText}>Recipient</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/chat')}>
              <Text style={styles.actionIcon}>🤖</Text>
              <Text style={styles.actionText}>AI Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>✨ AI Transfer Insight</Text>
          <Text style={styles.aiText}>Best transfer route today is Crypto Rail with lowest fees and fastest delivery.</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.activeNavIcon}>🏠</Text>
          <Text style={styles.activeNavText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/send')}>
          <Text style={styles.navIcon}>📤</Text>
          <Text style={styles.navText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/track')}>
          <Text style={styles.navIcon}>📍</Text>
          <Text style={styles.navText}>Track</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/chat')}>
          <Text style={styles.navIcon}>🤖</Text>
          <Text style={styles.navText}>AI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 20, marginBottom: 25 },
  hello: { color: "white", fontSize: 30, fontWeight: "700" },
  subText: { color: "#777", marginTop: 4 },
  profileCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#8BFF5C", justifyContent: "center", alignItems: "center" },
  profileText: { fontSize: 22, fontWeight: "700", color: "#000" },
  balanceCard: { backgroundColor: "#101010", marginHorizontal: 20, borderRadius: 30, padding: 25, borderWidth: 1, borderColor: "#1f1f1f" },
  balanceLabel: { color: "#777" },
  balance: { color: "white", fontSize: 38, fontWeight: "700", marginTop: 12 },
  actionsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 25 },
  actionButton: { alignItems: "center" },
  actionIcon: { fontSize: 24 },
  actionText: { color: "white", fontSize: 11, marginTop: 8 },
  aiCard: { backgroundColor: "#1a1025", marginHorizontal: 20, marginTop: 25, borderRadius: 28, padding: 24, borderWidth: 1, borderColor: "#402060" },
  aiTitle: { color: "#c084fc", fontSize: 18, fontWeight: "700" },
  aiText: { color: "#ddd", marginTop: 12, lineHeight: 22 },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#0d0d0d", flexDirection: "row", justifyContent: "space-around", paddingVertical: 18, borderTopWidth: 1, borderColor: "#1f1f1f" },
  navItem: { alignItems: "center" },
  navIcon: { fontSize: 22 },
  activeNavIcon: { fontSize: 22 },
  navText: { color: "#666", marginTop: 6, fontSize: 12 },
  activeNavText: { color: "#8BFF5C", marginTop: 6, fontSize: 12, fontWeight: "700" },
});