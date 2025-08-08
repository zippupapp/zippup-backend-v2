import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// In-memory OTP storage (in production, use Redis)
const otpStorage = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, password, role = 'CUSTOMER' } = req.body;

    // Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email or phone' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate OTPs
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const phoneOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create session ID
    const sessionId = uuidv4();

    // Store registration data temporarily
    otpStorage.set(sessionId, {
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      emailOtp,
      phoneOtp,
      timestamp: new Date(),
      verified: {
        email: false,
        phone: false
      }
    });

    // In production, send actual OTPs via email/SMS
    console.log(`Email OTP for ${email}: ${emailOtp}`);
    console.log(`Phone OTP for ${phone}: ${phoneOtp}`);

    // For demo purposes, we'll include OTPs in response
    res.status(200).json({
      success: true,
      message: 'OTPs sent successfully',
      sessionId,
      // Remove these in production:
      demo: {
        emailOtp,
        phoneOtp
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
