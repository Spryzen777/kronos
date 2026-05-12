import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './modules/auth/auth.routes'
import userRoutes from './modules/user/user.routes'
import walletRoutes from './modules/wallet/wallet.routes'
import transferRoutes from './modules/transfer/transfer.routes'
import chatRoutes from './modules/chat/chat.routes'
import ratesRoutes from './modules/wallet/rates.routes'

const app = express()

app.use(cors({
  origin: '*',
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'RemitIQ API running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/wallet', walletRoutes)
app.use('/api/transfer', transferRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/wallet', ratesRoutes)

export default app