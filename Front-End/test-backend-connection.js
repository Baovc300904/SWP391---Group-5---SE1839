// Test script để kiểm tra kết nối backend
// Chạy bằng: node test-backend-connection.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

async function testBackendConnection() {
  console.log('🔍 Testing backend connection...');
  console.log('📍 Backend URL:', BASE_URL);
  
  try {
    // Test 1: Basic connectivity
    console.log('\n1️⃣ Testing basic connectivity...');
    const response = await axios.get(`${BASE_URL}/api/blood-donation-activities`, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173'
      }
    });
    
    console.log('✅ Backend is reachable!');
    console.log('📊 Response status:', response.status);
    console.log('📄 Response data:', response.data);
    
  } catch (error) {
    console.log('❌ Backend connection failed!');
    
    if (error.code === 'ECONNREFUSED') {
      console.log('🚨 Backend server is not running on port 8080');
      console.log('💡 Please start your Spring Boot application');
    } else if (error.code === 'ECONNABORTED') {
      console.log('⏰ Request timeout - backend might be slow');
    } else if (error.response) {
      console.log('📡 Backend responded with error:', error.response.status);
      console.log('📄 Error message:', error.response.data);
      
      if (error.response.status === 404) {
        console.log('🔍 API endpoint not found - check your controller mapping');
      }
    } else {
      console.log('❓ Unknown error:', error.message);
    }
  }
  
  try {
    // Test 2: CORS preflight
    console.log('\n2️⃣ Testing CORS preflight...');
    const corsResponse = await axios.options(`${BASE_URL}/api/blood-donation-activities`, {
      timeout: 5000,
      headers: {
        'Origin': 'http://localhost:5173',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    console.log('✅ CORS preflight successful!');
    console.log('📊 CORS headers:', corsResponse.headers);
    
  } catch (error) {
    console.log('❌ CORS preflight failed!');
    console.log('🚨 CORS is not properly configured in backend');
    console.log('💡 Please add CORS configuration to your Spring Boot app');
  }
}

// Run the test
testBackendConnection(); 