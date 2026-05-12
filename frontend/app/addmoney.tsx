import { useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Modal,
    Alert,
} from "react-native";
import { router } from 'expo-router'
import { API } from '../constants/api'
import { getToken } from '../constants/storage'

export default function AddMoneyScreen() {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [newBalance, setNewBalance] = useState(0)

  const handleAddMoney = async () => {
    if (!amount || !method) return
    setLoading(true)
    try {
      const token = await getToken()
      console.log('Token:', token)
      console.log('Calling:', API.addMoney)
      const res = await fetch(API.addMoney, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: parseFloat(amount) })
      })
      console.log('Status:', res.status)
      const data = await res.json()
      console.log('Data:', JSON.stringify(data))
      if (data.balance !== undefined) {
        setNewBalance(data.balance)
        setShowSuccess(true)
      } else {
        Alert.alert('Error', data.error || data.message || 'Something went wrong')
      }
    } catch (err: any) {
      console.log('FETCH ERROR:', err.message)
      Alert.alert('Network Error', 'Cannot reach server. Check your IP in api.ts')
    } finally {
      setLoading(false)
    }
  }

  const methods = [
    { id: 'card', label: '💳 Debit / Credit Card' },
    { id: 'bank', label: '🏦 Bank Transfer' },
    { id: 'upi', label: '📱 UPI Payment' },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Money</Text>

      <Text style={styles.label}>Enter Amount</Text>
      <TextInput
        placeholder="Enter amount"
        placeholderTextColor="#666"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Payment Method</Text>
      {methods.map(m => (
        <TouchableOpacity
          key={m.id}
          style={[styles.methodCard, method === m.id && styles.methodSelected]}
          onPress={() => setMethod(m.id)}
        >
          <Text style={styles.methodText}>{m.label}</Text>
          {method === m.id && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.button, (!amount || !method) && styles.buttonDisabled]}
        onPress={handleAddMoney}
        disabled={loading || !amount || !method}
      >
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Add Money</Text>}
      </TouchableOpacity>

      <Modal visible={showSuccess} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.successCircle}>
              <Text style={styles.successIcon}>✓</Text>
            </View>
            <Text style={styles.modalTitle}>Money Added!</Text>
            <Text style={styles.modalSubtitle}>Your wallet has been topped up</Text>
            <View style={styles.modalDivider} />
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Amount Added</Text>
              <Text style={styles.modalValue}>${parseFloat(amount || '0').toFixed(2)}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Payment Method</Text>
              <Text style={styles.modalValue}>{methods.find(m => m.id === method)?.label}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>New Balance</Text>
              <Text style={styles.modalBalance}>${newBalance.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => { setShowSuccess(false); router.back() }}
            >
              <Text style={styles.modalButtonText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "white", fontSize: 30, fontWeight: "700", marginBottom: 25 },
  label: { color: "white", fontSize: 16, marginBottom: 12, marginTop: 15 },
  input: { backgroundColor: "#111", borderRadius: 18, padding: 18, color: "white", borderWidth: 1, borderColor: "#222", fontSize: 16 },
  methodCard: { backgroundColor: "#111", borderRadius: 18, padding: 18, marginBottom: 15, borderWidth: 1, borderColor: "#222", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  methodSelected: { borderColor: "#8BFF5C", backgroundColor: "#0a1f00" },
  methodText: { color: "white", fontSize: 16 },
  check: { color: "#8BFF5C", fontSize: 20, fontWeight: "700" },
  button: { backgroundColor: "#8BFF5C", padding: 18, borderRadius: 18, alignItems: "center", marginTop: 35 },
  buttonDisabled: { backgroundColor: "#3a5c2a" },
  buttonText: { color: "#000", fontWeight: "700", fontSize: 18 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: "#111", borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 30, borderWidth: 1, borderColor: "#222" },
  successCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#8BFF5C", justifyContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 20 },
  successIcon: { fontSize: 40, color: "#000", fontWeight: "700" },
  modalTitle: { color: "white", fontSize: 28, fontWeight: "700", textAlign: "center" },
  modalSubtitle: { color: "#777", fontSize: 15, textAlign: "center", marginTop: 8, marginBottom: 25 },
  modalDivider: { height: 1, backgroundColor: "#222", marginBottom: 20 },
  modalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 18 },
  modalLabel: { color: "#777", fontSize: 15 },
  modalValue: { color: "white", fontSize: 15, fontWeight: "600" },
  modalBalance: { color: "#8BFF5C", fontSize: 18, fontWeight: "700" },
  modalButton: { backgroundColor: "#8BFF5C", padding: 18, borderRadius: 18, alignItems: "center", marginTop: 15 },
  modalButtonText: { color: "#000", fontWeight: "700", fontSize: 18 },
});