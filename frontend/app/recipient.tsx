import { useState, useCallback } from 'react'
import {
  SafeAreaView, ScrollView, StyleSheet, Text,
  TouchableOpacity, View, ActivityIndicator, Modal, Alert
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { API } from '../constants/api'
import { getToken, getUser } from '../constants/storage'

export default function RecipientsScreen() {
  const [loading, setLoading] = useState(true)
  const [recipients, setRecipients] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [showDetail, setShowDetail] = useState(false)

  useFocusEffect(useCallback(() => {
    loadData()
  }, []))

  const loadData = async () => {
    setLoading(true)
    try {
      const token = await getToken()
      const user = await getUser()

      const res = await fetch(API.transferHistory, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      const transfers = data.history || []

      const map: Record<string, any> = {}
      transfers.forEach((t: any) => {
        // Only show transfers YOU sent
        const isMe = t.sender?.id === user?.id
        if (!isMe) return
        const email = t.recipient?.email
        if (!email) return
        if (!map[email]) {
          map[email] = {
            id: t.recipient?.id,
            email,
            firstName: t.recipient?.firstName || email.split('@')[0],
            lastName: t.recipient?.lastName || '',
            transfers: []
          }
        }
        map[email].transfers.push(t)
      })

      setRecipients(Object.values(map))
    } catch (err) {
      Alert.alert('Error', 'Could not load recipients')
    } finally {
      setLoading(false)
    }
  }

  const totalSent = (transfers: any[]) =>
    transfers.reduce((sum, t) => sum + parseFloat(t.amount), 0).toFixed(2)

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })

  const handleResend = () => {
    setShowDetail(false)
    router.push({
      pathname: '/send',
      params: {
        prefillEmail: selected?.email,
        prefillName: `${selected?.firstName} ${selected?.lastName}`.trim()
      }
    })
  }

  if (loading) return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator color="#8BFF5C" size="large" style={{ marginTop: 100 }} />
    </SafeAreaView>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Recipients</Text>
        <Text style={styles.subtitle}>People you've sent money to</Text>

        {recipients.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>👤</Text>
            <Text style={styles.emptyText}>No recipients yet</Text>
            <Text style={styles.emptySub}>Send money to someone and they'll appear here</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/send')}>
              <Text style={styles.buttonText}>Send Money</Text>
            </TouchableOpacity>
          </View>
        ) : (
          recipients.map((r, i) => (
            <TouchableOpacity key={i} style={styles.card} onPress={() => { setSelected(r); setShowDetail(true) }}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{r.firstName?.[0]?.toUpperCase() || '?'}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{r.firstName} {r.lastName}</Text>
                <Text style={styles.email}>{r.email}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.txCount}>{r.transfers.length} transfer{r.transfers.length !== 1 ? 's' : ''}</Text>
                <Text style={styles.totalSentText}>${totalSent(r.transfers)}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Detail Modal */}
      <Modal visible={showDetail} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <ScrollView showsVerticalScrollIndicator={false}>

              {/* Header */}
              <View style={styles.sheetHeader}>
                <View style={styles.avatarLarge}>
                  <Text style={styles.avatarLargeText}>{selected?.firstName?.[0]?.toUpperCase() || '?'}</Text>
                </View>
                <View style={styles.sheetHeaderText}>
                  <Text style={styles.sheetName}>{selected?.firstName} {selected?.lastName}</Text>
                  <Text style={styles.sheetEmail}>{selected?.email}</Text>
                </View>
                <TouchableOpacity style={styles.resendBtn} onPress={handleResend}>
                  <Text style={styles.resendIcon}>📤</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.divider} />

              {/* Total */}
              <View style={styles.totalCard}>
                <Text style={styles.totalLabel}>Total Sent</Text>
                <Text style={styles.totalAmount}>${totalSent(selected?.transfers || [])}</Text>
              </View>

              <View style={styles.divider} />

              {/* History */}
              <Text style={styles.historyTitle}>Transaction History</Text>
              {(selected?.transfers || []).map((t: any, i: number) => (
                <View key={i} style={styles.txRow}>
                  <View>
                    <Text style={styles.txAmount}>{t.currency || 'USD'} {parseFloat(t.amount).toFixed(2)}</Text>
                    <Text style={styles.txDate}>{formatDate(t.createdAt)}</Text>
                  </View>
                  <View style={[styles.badge, t.status === 'SUCCESS' ? styles.badgeGreen : styles.badgeYellow]}>
                    <Text style={styles.badgeText}>{t.status}</Text>
                  </View>
                </View>
              ))}

              <TouchableOpacity style={styles.closeBtn} onPress={() => setShowDetail(false)}>
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "white", fontSize: 32, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#666", fontSize: 14, marginBottom: 25 },
  emptyCard: { backgroundColor: "#111", borderRadius: 28, padding: 40, alignItems: 'center', borderWidth: 1, borderColor: "#222", marginTop: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { color: "white", fontSize: 20, fontWeight: "700", marginBottom: 8 },
  emptySub: { color: "#666", fontSize: 14, textAlign: 'center', marginBottom: 24 },
  card: { backgroundColor: "#111", borderRadius: 22, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: "#222", flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#1a2e0a", justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  avatarText: { color: "#8BFF5C", fontSize: 20, fontWeight: "700" },
  info: { flex: 1 },
  name: { color: "white", fontSize: 16, fontWeight: "700" },
  email: { color: "#666", fontSize: 12, marginTop: 3 },
  right: { alignItems: 'flex-end' },
  txCount: { color: "#666", fontSize: 12 },
  totalSentText: { color: "#8BFF5C", fontSize: 15, fontWeight: "700", marginTop: 3 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: "#111", borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 28, borderWidth: 1, borderColor: "#222", maxHeight: '85%' },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatarLarge: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#1a2e0a", justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  avatarLargeText: { color: "#8BFF5C", fontSize: 26, fontWeight: "700" },
  sheetHeaderText: { flex: 1 },
  sheetName: { color: "white", fontSize: 20, fontWeight: "700" },
  sheetEmail: { color: "#666", fontSize: 13, marginTop: 3 },
  resendBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#1a2e0a", justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "#8BFF5C" },
  resendIcon: { fontSize: 20 },
  divider: { height: 1, backgroundColor: "#222", marginVertical: 18 },
  totalCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#1a2e0a", borderRadius: 16, padding: 18 },
  totalLabel: { color: "#8BFF5C", fontSize: 14 },
  totalAmount: { color: "#8BFF5C", fontSize: 24, fontWeight: "700" },
  historyTitle: { color: "white", fontSize: 18, fontWeight: "700", marginBottom: 14 },
  txRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#1a1a1a", borderRadius: 14, padding: 16, marginBottom: 10 },
  txAmount: { color: "white", fontSize: 15, fontWeight: "700" },
  txDate: { color: "#666", fontSize: 12, marginTop: 3 },
  badge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  badgeGreen: { backgroundColor: "#0a2e0a" },
  badgeYellow: { backgroundColor: "#2e2a0a" },
  badgeText: { color: "#8BFF5C", fontSize: 11, fontWeight: "700" }
})