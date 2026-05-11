import { Router } from 'express'
import { getMe, updateMe } from './user.controller'
import { protect } from '../../middleware/auth.middleware'

const router = Router()

router.get('/me', protect, getMe)
router.patch('/me', protect, updateMe)

export default router