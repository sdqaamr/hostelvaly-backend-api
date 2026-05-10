import express from 'express'
import {
  getUsers,
  getProfile,
  register,
  verifyEmail,
  resendOtp,
  loginUser,
  switchUserRole,
  changePassword,
  forgotPassword,
  resetPassword,
  updateProfile,
  logout,
  toggleUserStatus,
  updateProfilePicture,
  deleteProfilePicture
} from '../controllers/users.js'
import { verifyToken, authorizeRoles } from '../middlewares/auth.js'
import checkBannedUser from '../middlewares/checkBanned.js'
import { checkRequestBody } from '../middlewares/validateRequest.js'
import upload from '../middlewares/upload.js'
import { uploadToCloudinary } from '../middlewares/cloudinary.js'
import validateId from '../middlewares/validateId.js'
const router = express.Router()

router.get(
  '/',
  verifyToken,
  checkBannedUser,
  authorizeRoles({ admin: true, owner: false, student: false }, 'Users'),
  getUsers
)
router.get('/me', verifyToken, getProfile)
router.post('/register', checkRequestBody, register)
router.post('/verify-email', checkRequestBody, verifyEmail)
router.post('/resend-otp', checkRequestBody, resendOtp)
router.post('/login', checkRequestBody, loginUser)
router.patch('/switch-role', verifyToken, checkBannedUser, switchUserRole)
router.put('/', verifyToken, checkBannedUser, checkRequestBody, updateProfile)
router.patch(
  '/profile-picture',
  verifyToken,
  checkBannedUser,
  upload.single('profilePicture'),
  uploadToCloudinary,
  updateProfilePicture
)
router.delete(
  '/profile-picture',
  verifyToken,
  checkBannedUser,
  deleteProfilePicture
)
router.put(
  '/change-password',
  verifyToken,
  checkBannedUser,
  checkRequestBody,
  changePassword
)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
// router.delete("/logout", verifyToken, logout);
router.patch(
  '/:id/toggle',
  verifyToken,
  validateId,
  authorizeRoles({ admin: true, owner: false, student: false }, 'Users'),
  toggleUserStatus
)

export default router
