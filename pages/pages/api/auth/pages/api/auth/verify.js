import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const otpStorage = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId, emailOtp, phoneOtp } = req.body;

    if (!sessionId || !emailOtp || !phoneOtp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const registrationData = otpStorage.get(sessionId);
    
    if (!registrationData) {
      return res.status(400).json({ error: 'Invalid session or expired' });
    }

    if (registrationData.emailOtp !== emailOtp || registrationData.phoneOtp !== phoneOtp) {
      return res.status(400).json({ error: 'Invalid OTP codes' });
    }

    const user = await prisma.user.create({
      data: {
        name: registrationData.name,
        email: registrationData.email,
        phone: registrationData.phone,
        password: registrationData.password,
        role: registrationData.role,
        isEmailVerified: true,
        isPhoneVerified: true
      }
    });

    await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 0
      }
    });

    otpStorage.delete(sessionId);

    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
