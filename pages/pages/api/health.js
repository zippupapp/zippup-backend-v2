import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({
      status: 'ok',
      message: 'ZippUp API is running',
      database: 'connected',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      database: 'disconnected',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
}
File 7: pages/api/services.js
Create new file: pages/api/services.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // For now, return static services since we haven't populated the database yet
      const services = [
        {
          id: '1',
          name: 'Ride & Moving',
          category: 'TRANSPORT',
          description: 'Taxi, bike rides, delivery, moving services',
          examples: ['Taxi', 'Bike rides', 'Delivery', 'Moving trucks', 'etc.'],
          basePrice: 50,
          icon: '🚗',
          isActive: true
        },
        {
          id: '2',
          name: 'Personal Care',
          category: 'PERSONAL_CARE',
          description: 'Hair, massage, beauty services',
          examples: ['Hair styling', 'Massage', 'Manicure', 'Beauty treatments', 'etc.'],
          basePrice: 30,
          icon: '💅',
          isActive: true
        },
        {
          id: '3',
          name: 'Tech Services',
          category: 'TECH',
          description: 'Phone repair, computer fixing, electronics',
          examples: ['Phone repair', 'Computer fixing', 'TV repair', 'Electronics', 'etc.'],
          basePrice: 40,
          icon: '🔧',
          isActive: true
        },
        {
          id: '4',
          name: 'Construction',
          category: 'CONSTRUCTION',
          description: 'Builders, carpenters, electricians',
          examples: ['Builders', 'Carpenters', 'Electricians', 'Plumbers', 'etc.'],
          basePrice: 80,
          icon: '🏗️',
          isActive: true
        },
        {
          id: '5',
          name: 'Home Services',
          category: 'HOME',
          description: 'Cleaning, gardening, maintenance',
          examples: ['House cleaning', 'Gardening', 'Maintenance', 'Painting', 'etc.'],
          basePrice: 35,
          icon: '🏠',
          isActive: true
        },
        {
          id: '6',
          name: 'Emergency Services',
          category: 'EMERGENCY',
          description: 'Ambulance, fire, roadside assistance',
          examples: ['Ambulance', 'Fire services', 'Roadside assistance', 'Emergency repair', 'etc.'],
          basePrice: 100,
          icon: '🚨',
          isActive: true
        },
        {
          id: '7',
          name: 'Automobile',
          category: 'AUTOMOBILE',
          description: 'Car repair, mechanics, tire services',
          examples: ['Mechanics', 'Vulcanizer', 'Car wash', 'Auto repair', 'etc.'],
          basePrice: 60,
          icon: '🔧',
          isActive: true
        },
        {
          id: '8',
          name: 'Others',
          category: 'OTHERS',
          description: 'Events, catering, general services',
          examples: ['Events', 'Catering', 'General services', 'Photography', 'etc.'],
          basePrice: 45,
          icon: '🎉',
          isActive: true
        }
      ];

      return res.status(200).json({ 
        success: true, 
        services,
        total: services.length 
      });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Services error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
