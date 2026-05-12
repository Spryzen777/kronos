import { useState, useEffect, useCallback } from 'react'
import { useLocalSearchParams } from 'expo-router'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { API } from '../constants/api'
import { getToken } from '../constants/storage'

const CURRENCIES = [
  { code: 'USD', flag: '🇺🇸', rate: 1 },
  { code: 'INR', flag: '🇮🇳', rate: 83.26 },
  { code: 'AED', flag: '🇦🇪', rate: 3.67 },
  { code: 'EUR', flag: '🇪🇺', rate: 0.92 },
  { code: 'GBP', flag: '🇬🇧', rate: 0.79 },
  { code: 'SGD', flag: '🇸🇬', rate: 1.34 },
]

const routes = [
  { id: 'crypto', name: 'Crypto Rail', sub: 'Fastest Route', fee: '$1.20', time: '5 mins' },
  { id: 'wise', name: 'Wise Transfer', sub: 'Balanced Option', fee: '$2.80', time: '15 mins' },
  { id: 'bank', name: 'Bank Transfer', sub: 'Traditional Route', fee: '$4.50', time: '2 hrs' },
]

export default function SendScreen() {
  const params = useLocalSearchParams()

  const [step, setStep] = useState(1)
  const [recipientEmail, setRecipientEmail] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState(CURRENCIES[0])
  const [toCurrency, setToCurrency] = useState(CURRENCIES[1])
  const [showFromPicker, setShowFromPicker] = useState(false)
  const [showToPicker, setShowToPicker] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState('crypto')
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [confirmedData, setConfirmedData] = useState<any>(null)

  useEffect(() => {
    if (params.prefillEmail) setRecipientEmail(params.prefillEmail as string)
    if (params.prefillName) setRecipientName(params.prefillName as string)
  }, [])

  const parsedAmount = parseFloat(amount)
  const validAmount = !isNaN(parsedAmount) && parsedAmount > 0

  const convertedAmount = validAmount
    ? ((parsedAmount * toCurrency.rate) / fromCurrency.rate).toFixed(2)
    : '0.00'

  const exchangeRate = (toCurrency.rate / fromCurrency.rate).toFixed(4)

  const handleSend = async () => {
    if (!validAmount) {
      Alert.alert('Invalid Amount', 'Enter a valid number greater than 0')
      return
    }
    setLoading(true)
    try {
      const token = await getToken()
      const res = await fetch(API.sendTransfer, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          recipientEmail,
          amount: parsedAmount,
          currency: fromCurrency.code,
        })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      setConfirmedData({
        recipientName,
        recipientEmail,
        amount,
        fromCurrency,
        toCurrency,
        convertedAmount,
        route: routes.find(r => r.id === selectedRoute),
      })
      setShowSuccess(true)
    } catch (err: any) {
      Alert.alert('Transfer Failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  const resetAndGoHome = () => {
    setShowSuccess(false)
    setStep(1)
    setRecipientEmail('')
    setRecipientName('')
    setAmount('')
    setFromCurrency(CURRENCIES[0])
    setToCurrency(CURRENCIES[1])
    setSelectedRoute('crypto')
    setConfirmedData(null)
    router.push('/dashboard')
  }

  const Stepper = () => (
    <View style={styles.stepRow}>
      {[1,2,3,4].map((s, i) => (
        <View key={s} style={{ flexDirection: 'row', alignItems: 'center', flex: i < 3 ? 1 : 0 }}>
          <View style={[styles.step, step >= s && styles.activeStep]}>
            <Text style={[styles.stepText, step >= s && styles.activeStepText]}>{s}</Text>
          </View>
          {i < 3 && <View style={[styles.line, step > s && styles.activeLine]} />}
        </View>
      ))}
    </View>
  )

  const BackButton = ({ onPress }: { onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={styles.backBtn}>
      <Text style={styles.backText}>← Back</Text>
    </TouchableOpacity>
  )

  // STEP 1
  if (step === 1) return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Send Money</Text>
        <Stepper />
        <Text style={styles.stepLabel}>Recipient Details</Text>

        <TextInput
          placeholder="Recipient Name"
          placeholderTextColor="#666"
          style={styles.input}
          value={recipientName}
          onChangeText={setRecipientName}
        />
        <TextInput
          placeholder="Recipient Email"
          placeholderTextColor="#666"
          style={styles.input}
          value={recipientEmail}
          onChangeText={setRecipientEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={[styles.button, (!recipientEmail || !recipientName) && styles.buttonDisabled]}
          disabled={!recipientEmail || !recipientName}
          onPress={() => setStep(2)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )

  // STEP 2
  if (step === 2) return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Send Money</Text>
        <Stepper />
        <BackButton onPress={() => setStep(1)} />
        <Text style={styles.stepLabel}>Amount & Currency</Text>

        <TextInput
          placeholder="Enter amount"
          placeholderTextColor="#666"
          style={styles.input}
          value={amount}
          onChangeText={(v) => setAmount(v.trim())}
          keyboardType="numeric"
        />

        <View style={styles.amountCard}>
          <Text style={styles.label}>You Send</Text>
          <Text style={styles.amount}>{fromCurrency.flag} {amount || '0'} {fromCurrency.code}</Text>
          <Text style={styles.rate}>1 {fromCurrency.code} = {exchangeRate} {toCurrency.code}</Text>
          <Text style={styles.converted}>Recipient gets: {toCurrency.flag} {convertedAmount} {toCurrency.code}</Text>

          <View style={styles.currencyRow}>
            <TouchableOpacity style={styles.currencyBox} onPress={() => setShowFromPicker(true)}>
              <Text style={styles.currencyText}>{fromCurrency.flag} {fromCurrency.code}</Text>
              <Text style={styles.dropArrow}>▼</Text>
            </TouchableOpacity>
            <Text style={styles.arrow}>→</Text>
            <TouchableOpacity style={styles.currencyBox} onPress={() => setShowToPicker(true)}>
              <Text style={styles.currencyText}>{toCurrency.flag} {toCurrency.code}</Text>
              <Text style={styles.dropArrow}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, !validAmount && styles.buttonDisabled]}
          disabled={!validAmount}
          onPress={() => setStep(3)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showFromPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.pickerCard}>
            <Text style={styles.pickerTitle}>Select Currency</Text>
            {CURRENCIES.filter(c => c.code !== toCurrency.code).map(c => (
              <TouchableOpacity key={c.code} style={styles.pickerItem} onPress={() => { setFromCurrency(c); setShowFromPicker(false) }}>
                <Text style={styles.pickerText}>{c.flag} {c.code}</Text>
                {fromCurrency.code === c.code && <Text style={styles.check}>✓</Text>}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.pickerClose} onPress={() => setShowFromPicker(false)}>
              <Text style={styles.pickerCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showToPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.pickerCard}>
            <Text style={styles.pickerTitle}>Select Currency</Text>
            {CURRENCIES.filter(c => c.code !== fromCurrency.code).map(c => (
              <TouchableOpacity key={c.code} style={styles.pickerItem} onPress={() => { setToCurrency(c); setShowToPicker(false) }}>
                <Text style={styles.pickerText}>{c.flag} {c.code}</Text>
                {toCurrency.code === c.code && <Text style={styles.check}>✓</Text>}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.pickerClose} onPress={() => setShowToPicker(false)}>
              <Text style={styles.pickerCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )

  // STEP 3
  if (step === 3) return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Send Money</Text>
        <Stepper />
        <BackButton onPress={() => setStep(2)} />
        <Text style={styles.stepLabel}>Choose Route</Text>

        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>✨ AI Recommendation</Text>
          <Text style={styles.aiText}>Crypto Rail currently offers the lowest fee and fastest transfer route for your amount.</Text>
        </View>

        <Text style={styles.routeTitle}>Compare Routes</Text>
        {routes.map(r => (
          <TouchableOpacity
            key={r.id}
            style={[styles.routeCard, selectedRoute === r.id && styles.routeSelected]}
            onPress={() => setSelectedRoute(r.id)}
          >
            <View>
              <Text style={styles.routeName}>{r.name}</Text>
              <Text style={styles.routeSub}>{r.sub}</Text>
            </View>
            <View>
              <Text style={styles.routeFee}>{r.fee}</Text>
              <Text style={styles.routeTime}>{r.time}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={() => setStep(4)}>
          <Text style={styles.buttonText}>Continue Transfer</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )

  // STEP 4
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Send Money</Text>
        <Stepper />
        <BackButton onPress={() => setStep(3)} />
        <Text style={styles.stepLabel}>Confirm Transfer</Text>

        <View style={styles.confirmCard}>
          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>Recipient</Text>
            <Text style={styles.modalValue}>{recipientName}</Text>
          </View>
          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>Email</Text>
            <Text style={styles.modalValue}>{recipientEmail}</Text>
          </View>
          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>You Send</Text>
            <Text style={styles.modalValue}>{fromCurrency.flag} {amount} {fromCurrency.code}</Text>
          </View>
          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>They Receive</Text>
            <Text style={styles.modalValue}>{toCurrency.flag} {convertedAmount} {toCurrency.code}</Text>
          </View>
          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>Route</Text>
            <Text style={styles.modalValue}>{routes.find(r => r.id === selectedRoute)?.name}</Text>
          </View>
          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>Fee</Text>
            <Text style={styles.modalValue}>{routes.find(r => r.id === selectedRoute)?.fee}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSend} disabled={loading}>
          {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Confirm & Send</Text>}
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showSuccess} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.successCircle}>
              <Text style={styles.successIcon}>✓</Text>
            </View>
            <Text style={styles.modalTitle}>Transfer Sent!</Text>
            <Text style={styles.modalSubtitle}>Your money is on its way</Text>
            <View style={styles.modalDivider} />
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Recipient</Text>
              <Text style={styles.modalValue}>{confirmedData?.recipientName}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Amount Sent</Text>
              <Text style={styles.modalValue}>{confirmedData?.fromCurrency?.flag} {confirmedData?.amount} {confirmedData?.fromCurrency?.code}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>They Receive</Text>
              <Text style={styles.modalValue}>{confirmedData?.toCurrency?.flag} {confirmedData?.convertedAmount} {confirmedData?.toCurrency?.code}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Route</Text>
              <Text style={styles.modalValue}>{confirmedData?.route?.name}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Status</Text>
              <Text style={styles.modalBalance}>✅ Success</Text>
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={resetAndGoHome}>
              <Text style={styles.modalButtonText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "white", fontSize: 32, fontWeight: "700", marginBottom: 25 },
  stepRow: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  step: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#1a1a1a", justifyContent: "center", alignItems: "center" },
  activeStep: { backgroundColor: "#8BFF5C" },
  stepText: { color: "#666", fontWeight: "700" },
  activeStepText: { color: "#000" },
  line: { flex: 1, height: 2, backgroundColor: "#222" },
  activeLine: { backgroundColor: "#8BFF5C" },
  stepLabel: { color: "#777", fontSize: 14, marginBottom: 20 },
  backBtn: { marginBottom: 16 },
  backText: { color: "#8BFF5C", fontSize: 16 },
  input: { backgroundColor: "#111", borderRadius: 18, padding: 18, color: "white", marginBottom: 18, borderWidth: 1, borderColor: "#222" },
  amountCard: { backgroundColor: "#111", borderRadius: 28, padding: 25, marginTop: 5, borderWidth: 1, borderColor: "#222" },
  label: { color: "#777" },
  amount: { color: "white", fontSize: 30, fontWeight: "700", marginTop: 12 },
  rate: { color: "#4ade80", marginTop: 10 },
  converted: { color: "#8BFF5C", marginTop: 6, fontWeight: "600" },
  currencyRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 25 },
  currencyBox: { backgroundColor: "#1a1a1a", paddingVertical: 14, paddingHorizontal: 20, borderRadius: 18, flexDirection: 'row', alignItems: 'center', gap: 8 },
  currencyText: { color: "white", fontSize: 16, fontWeight: "600" },
  dropArrow: { color: "#666", fontSize: 10 },
  arrow: { color: "#8BFF5C", fontSize: 26, fontWeight: "700" },
  aiCard: { backgroundColor: "#1a1025", borderRadius: 25, padding: 22, marginBottom: 25, borderWidth: 1, borderColor: "#402060" },
  aiTitle: { color: "#c084fc", fontSize: 18, fontWeight: "700" },
  aiText: { color: "#ddd", marginTop: 12, lineHeight: 22 },
  routeTitle: { color: "white", fontSize: 22, fontWeight: "700", marginBottom: 20 },
  routeCard: { backgroundColor: "#111", borderRadius: 22, padding: 20, marginBottom: 18, borderWidth: 1, borderColor: "#222", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  routeSelected: { borderColor: "#8BFF5C", backgroundColor: "#0a1f00" },
  routeName: { color: "white", fontSize: 18, fontWeight: "700" },
  routeSub: { color: "#777", marginTop: 5 },
  routeFee: { color: "#8BFF5C", fontSize: 20, fontWeight: "700", textAlign: "right" },
  routeTime: { color: "#777", marginTop: 5, textAlign: "right" },
  confirmCard: { backgroundColor: "#111", borderRadius: 28, padding: 25, borderWidth: 1, borderColor: "#222", marginBottom: 20 },
  button: { backgroundColor: "#8BFF5C", padding: 18, borderRadius: 18, alignItems: "center", marginTop: 20 },
  buttonDisabled: { backgroundColor: "#3a5c2a" },
  buttonText: { color: "#000", fontWeight: "700", fontSize: 18 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: "#111", borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 30, borderWidth: 1, borderColor: "#222" },
  pickerCard: { backgroundColor: "#111", borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 30, borderWidth: 1, borderColor: "#222" },
  pickerTitle: { color: "white", fontSize: 20, fontWeight: "700", marginBottom: 20 },
  pickerItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderColor: "#222" },
  pickerText: { color: "white", fontSize: 18 },
  check: { color: "#8BFF5C", fontSize: 20, fontWeight: "700" },
  pickerClose: { marginTop: 20, padding: 16, alignItems: 'center' },
  pickerCloseText: { color: "#777", fontSize: 16 },
  successCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#8BFF5C", justifyContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 20 },
  successIcon: { fontSize: 40, color: "#000", fontWeight: "700" },
  modalTitle: { color: "white", fontSize: 28, fontWeight: "700", textAlign: "center" },
  modalSubtitle: { color: "#777", fontSize: 15, textAlign: "center", marginTop: 8, marginBottom: 25 },
  modalDivider: { height: 1, backgroundColor: "#222", marginBottom: 20 },
  modalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 18 },
  modalLabel: { color: "#777", fontSize: 15 },
  modalValue: { color: "white", fontSize: 15, fontWeight: "600" },
  modalBalance: { color: "#8BFF5C", fontSize: 15, fontWeight: "700" },
  modalButton: { backgroundColor: "#8BFF5C", padding: 18, borderRadius: 18, alignItems: "center", marginTop: 15 },
  modalButtonText: { color: "#000", fontWeight: "700", fontSize: 18 },
})