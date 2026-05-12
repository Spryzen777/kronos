import { useState, useRef } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { API } from '../constants/api'
import { getToken } from '../constants/storage'

type Message = {
  role: 'user' | 'ai'
  text: string
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: '✨ Hi! Ask me anything about transfers, rates, or fees.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<ScrollView>(null)

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const token = await getToken()
      const res = await fetch(API.chat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.reply || data.error }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Something went wrong.' }])
    } finally {
      setLoading(false)
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      <Text style={styles.subTitle}>Smart transfer insights powered by AI</Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.map((m, i) => (
            <View
              key={i}
              style={m.role === 'ai' ? styles.aiMessage : styles.userMessage}
            >
              <Text style={m.role === 'ai' ? styles.aiText : styles.userText}>
                {m.text}
              </Text>
            </View>
          ))}
          {loading && (
            <View style={styles.aiMessage}>
              <ActivityIndicator color="#8BFF5C" />
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ask AI anything..."
            placeholderTextColor="#666"
            style={styles.input}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={send}
          />
          <TouchableOpacity style={styles.sendButton} onPress={send}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 20, paddingTop: 20 },
  title: { color: 'white', fontSize: 32, fontWeight: '700' },
  subTitle: { color: '#777', marginTop: 8, marginBottom: 25 },
  aiMessage: { backgroundColor: '#1a1025', padding: 18, borderRadius: 22, marginBottom: 18, alignSelf: 'flex-start', maxWidth: '88%', borderWidth: 1, borderColor: '#402060' },
  aiText: { color: 'white', lineHeight: 22, fontSize: 15 },
  userMessage: { backgroundColor: '#8BFF5C', padding: 18, borderRadius: 22, marginBottom: 18, alignSelf: 'flex-end', maxWidth: '85%' },
  userText: { color: '#000', fontWeight: '600', lineHeight: 22 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#111', borderRadius: 18, padding: 18, color: 'white', borderWidth: 1, borderColor: '#222' },
  sendButton: { width: 55, height: 55, borderRadius: 18, backgroundColor: '#8BFF5C', justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
  sendText: { color: '#000', fontSize: 20, fontWeight: '700' },
})