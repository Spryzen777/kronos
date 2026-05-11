import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './modules/auth/auth.routes'
import userRoutes from './modules/user/user.routes'

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

export default app