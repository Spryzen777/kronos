import { useState, useCallback } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { LineChart } from 'react-native-chart-kit';
import { API } from '../constants/api'
import { getToken, getUser } from '../constants/storage'

const SCREEN_WIDTH = Dimensions.get('window').width

const CURRENCY_PAIRS = [
  { code: 'INR', flag: '🇮🇳', label: 'USD → INR' },
  { code: 'AED', flag: '🇦🇪', label: 'USD → AED' },
  { code: 'EUR', flag: '🇪🇺', label: 'USD → EUR' },
  { code: 'GBP', flag: '🇬🇧', label: 'USD → GBP' },
  { code: 'SGD', flag: '🇸🇬', label: 'USD → SGD' },
]

export default function DashboardScreen() {
  const [balance, setBalance] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [rates, setRates] = useState<Record<string, number>>({})
  const [selectedCurrency, setSelectedCurrency] = useState('INR')
  const [updatedAt, setUpdatedAt] = useState('')

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [])
  )

  const loadData = async () => {
    try {
      const token = await getToken()
      const savedUser = await getUser()
      setUser(savedUser)

      const [balRes, ratesRes] = await Promise.all([
        fetch(API.walletBalance, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(API.rates, { headers: { Authorization: `Bearer ${token}` } }),
      ])

      const balData = await balRes.json()
      setBalance(balData.balance)

      const ratesData = await ratesRes.json()
      if (ratesData.rates) {
        setRates(ratesData.rates)
        setUpdatedAt(ratesData.updatedAt || '')
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Generate fake sparkline around real rate
  const getChartData = (code: string) => {
    const base = rates[code] || 1
    const variance = base * 0.01
    return Array.from({ length: 7 }, (_, i) =>
      parseFloat((base + (Math.random() - 0.5) * variance).toFixed(4))
    )
  }

  const selectedRate = rates[selectedCurrency]
  const chartData = getChartData(selectedCurrency)
  const selectedPair = CURRENCY_PAIRS.find(c => c.code === selectedCurrency)!

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.hello}>Hello, {user?.firstName || 'User'} 👋</Text>
            <Text style={styles.subText}>Welcome back</Text>
          </View>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>{user?.firstName?.[0] || 'U'}</Text>
          </View>
        </View>

        {/* Balance Card */}
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

        {/* Live Rates Card */}
        <View style={styles.ratesCard}>
          <View style={styles.ratesHeader}>
            <Text style={styles.ratesTitle}>📈 Live Exchange Rates</Text>
            {updatedAt ? (
              <Text style={styles.ratesUpdated}>Live</Text>
            ) : (
              <Text style={styles.ratesUpdated}>Loading...</Text>
            )}
          </View>

          {/* Currency Selector */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.currencyTabs}>
            {CURRENCY_PAIRS.map(c => (
              <TouchableOpacity
                key={c.code}
                style={[styles.tab, selectedCurrency === c.code && styles.tabActive]}
                onPress={() => setSelectedCurrency(c.code)}
              >
                <Text style={styles.tabFlag}>{c.flag}</Text>
                <Text style={[styles.tabText, selectedCurrency === c.code && styles.tabTextActive]}>
                  {c.code}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Rate Display */}
          {selectedRate ? (
            <>
              <View style={styles.rateRow}>
                <View>
                  <Text style={styles.rateLabel}>{selectedPair.label}</Text>
                  <Text style={styles.rateValue}>
                    1 USD = {selectedRate.toFixed(4)} {selectedCurrency}
                  </Text>
                </View>
                <View style={styles.liveBadge}>
                  <Text style={styles.liveBadgeText}>● LIVE</Text>
                </View>
              </View>

              {/* Sparkline Chart */}
              <LineChart
                data={{
                  labels: ['', '', '', '', '', '', ''],
                  datasets: [{ data: chartData }]
                }}
                width={SCREEN_WIDTH - 80}
                height={100}
                withDots={false}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLabels={false}
                withHorizontalLabels={false}
                chartConfig={{
                  backgroundColor: 'transparent',
                  backgroundGradientFrom: '#111',
                  backgroundGradientTo: '#111',
                  color: () => '#8BFF5C',
                  strokeWidth: 2,
                  propsForBackgroundLines: { stroke: 'transparent' },
                }}
                bezier
                style={styles.chart}
              />
            </>
          ) : (
            <Text style={styles.loadingText}>Fetching live rates...</Text>
          )}

          {/* All Rates Row */}
          <View style={styles.allRatesRow}>
            {CURRENCY_PAIRS.map(c => (
              <TouchableOpacity key={c.code} style={styles.rateChip} onPress={() => setSelectedCurrency(c.code)}>
                <Text style={styles.rateChipFlag}>{c.flag}</Text>
                <Text style={styles.rateChipCode}>{c.code}</Text>
                <Text style={styles.rateChipValue}>
                  {rates[c.code] ? rates[c.code].toFixed(2) : '...'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Card */}
        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>✨ AI Transfer Insight</Text>
          <Text style={styles.aiText}>Best transfer route today is Crypto Rail with lowest fees and fastest delivery.</Text>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
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
  )
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
  ratesCard: { backgroundColor: "#101010", marginHorizontal: 20, marginTop: 25, borderRadius: 30, padding: 22, borderWidth: 1, borderColor: "#1f1f1f" },
  ratesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  ratesTitle: { color: "white", fontSize: 18, fontWeight: "700" },
  ratesUpdated: { color: "#8BFF5C", fontSize: 12, fontWeight: "600" },
  currencyTabs: { marginBottom: 18 },
  tab: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: "#1a1a1a", marginRight: 8, alignItems: 'center', flexDirection: 'row', gap: 6 },
  tabActive: { backgroundColor: "#1a2e0a", borderWidth: 1, borderColor: "#8BFF5C" },
  tabFlag: { fontSize: 16 },
  tabText: { color: "#666", fontSize: 13, fontWeight: "600" },
  tabTextActive: { color: "#8BFF5C" },
  rateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  rateLabel: { color: "#666", fontSize: 13 },
  rateValue: { color: "white", fontSize: 22, fontWeight: "700", marginTop: 4 },
  liveBadge: { backgroundColor: "#0a2e0a", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  liveBadgeText: { color: "#8BFF5C", fontSize: 11, fontWeight: "700" },
  chart: { marginLeft: -10, marginTop: 4 },
  loadingText: { color: "#666", fontSize: 14, textAlign: 'center', paddingVertical: 20 },
  allRatesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  rateChip: { backgroundColor: "#1a1a1a", borderRadius: 14, padding: 10, alignItems: 'center', minWidth: 60 },
  rateChipFlag: { fontSize: 18 },
  rateChipCode: { color: "#666", fontSize: 11, marginTop: 4 },
  rateChipValue: { color: "#8BFF5C", fontSize: 13, fontWeight: "700", marginTop: 2 },
  aiCard: { backgroundColor: "#1a1025", marginHorizontal: 20, marginTop: 25, borderRadius: 28, padding: 24, borderWidth: 1, borderColor: "#402060" },
  aiTitle: { color: "#c084fc", fontSize: 18, fontWeight: "700" },
  aiText: { color: "#ddd", marginTop: 12, lineHeight: 22 },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#0d0d0d", flexDirection: "row", justifyContent: "space-around", paddingVertical: 18, borderTopWidth: 1, borderColor: "#1f1f1f" },
  navItem: { alignItems: "center" },
  navIcon: { fontSize: 22 },
  activeNavIcon: { fontSize: 22 },
  navText: { color: "#666", marginTop: 6, fontSize: 12 },
  activeNavText: { color: "#8BFF5C", marginTop: 6, fontSize: 12, fontWeight: "700" },
})