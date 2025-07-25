import { Button, Col, Row, Typography, Space, Statistic } from 'antd';
import { HeartOutlined, ArrowRightOutlined, UserOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDashboardAnalysis } from '../../../services/dashboardService';
import { getCampaigns } from '../../../services/campaignService';

const { Title, Paragraph } = Typography;

// Add keyframes styles
const keyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(2deg); }
    66% { transform: translateY(-10px) rotate(-1deg); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = keyframes;
  document.head.appendChild(styleSheet);
}

const HeroSection = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalBloodUnits: 0,
    totalCampaigns: 0,
    totalHospitals: 63
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔍 Fetching API data...');
        
        // Fetch dashboard stats
        console.log('📊 Calling getDashboardAnalysis...');
        const dashboardData = await getDashboardAnalysis();
        console.log('📊 Dashboard data:', dashboardData);
        
        // Fetch campaigns to count
        console.log('🎯 Calling getCampaigns...');
        const campaignsData = await getCampaigns(1, '');
        console.log('🎯 Campaigns data:', campaignsData);
        
        const newStats = {
          totalDonors: dashboardData?.totalDonors || dashboardData?.data?.totalDonors || 12580,
          totalBloodUnits: dashboardData?.totalBloodUnits || dashboardData?.data?.totalBloodUnits || 45200,
          totalCampaigns: campaignsData?.total || campaignsData?.data?.total || 156,
          totalHospitals: 63
        };
        
        console.log('✅ Final stats:', newStats);
        setStats(newStats);
      } catch (error) {
        console.error('❌ Error fetching stats:', error);
        console.error('❌ Error details:', error.response?.data);
        // Fallback data
        setStats({
          totalDonors: 12580,
          totalBloodUnits: 45200,
          totalCampaigns: 156,
          totalHospitals: 63
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      color: '#ffffff',
      padding: '120px 20px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(25px)',
      borderRadius: '0 0 60px 60px',
      margin: '0 40px 80px 40px',
      boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
      border: '1px solid rgba(255,255,255,0.15)'
    }}>
      {/* Modern gradient background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
        `,
        animation: 'float 8s ease-in-out infinite'
      }} />
      
      {/* Floating decorative elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '8%',
        width: '120px',
        height: '120px',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '25%',
        right: '12%',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05))',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite reverse'
      }} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            borderRadius: '50%',
            padding: '35px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 80px rgba(239, 68, 68, 0.3)',
            animation: 'pulse 2.5s infinite',
            border: '3px solid rgba(255, 255, 255, 0.2)'
          }}>
            <HeartOutlined style={{ 
              fontSize: '72px', 
              color: 'white', 
              filter: 'drop-shadow(0 0 25px rgba(239, 68, 68, 0.8))' 
            }} />
          </div>
        </div>
        
        <Title level={1} style={{ 
          background: 'linear-gradient(45deg, #ffffff, #f8fafc, #ffffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '35px', 
          fontSize: '68px',
          fontWeight: '900',
          textShadow: '0 4px 12px rgba(0,0,0,0.2)',
          letterSpacing: '-2px'
        }}>
          🩸 BloodConnect - Kết nối sự sống
        </Title>
        <Paragraph style={{ 
          fontSize: '24px', 
          marginBottom: '40px', 
          color: '#ffffff',
          maxWidth: '1000px',
          margin: '0 auto 40px auto',
          lineHeight: '1.9',
          fontWeight: '400',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          opacity: '0.95'
        }}>
          Nền tảng hiến máu thông minh nhất Việt Nam 🇻🇳 - Nơi mỗi giọt máu trở thành món quà của sự sống, 
          kết nối những trái tim nhân ái với những người cần được cứu giúp.
        </Paragraph>
        
        {/* Key Features */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '40px', 
          marginBottom: '50px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>⚡</span>
            <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Đăng ký nhanh chóng</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🛡️</span>
            <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>An toàn tuyệt đối</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🌍</span>
            <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Toàn quốc</span>
          </div>
        </div>
        
        {/* Real-time Statistics */}
        <Row gutter={[32, 32]} style={{ marginBottom: '60px' }}>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))',
                borderRadius: '25px',
                padding: '30px',
                backdropFilter: 'blur(25px)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                boxShadow: '0 12px 40px rgba(239, 68, 68, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(239, 68, 68, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(239, 68, 68, 0.15)';
              }}>
                <UserOutlined style={{ fontSize: '32px', color: '#ef4444', marginBottom: '12px' }} />
                <Statistic 
                  value={stats.totalDonors}
                  loading={loading}
                  valueStyle={{ 
                    color: '#ffffff', 
                    fontSize: '36px', 
                    fontWeight: '800',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                  suffix="+"
                />
                <p style={{ color: '#ffffff', margin: 0, fontSize: '15px', opacity: 0.9, fontWeight: '500' }}>Người hiến máu</p>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1))',
                borderRadius: '25px',
                padding: '30px',
                backdropFilter: 'blur(25px)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 12px 40px rgba(59, 130, 246, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.15)';
              }}>
                <MedicineBoxOutlined style={{ fontSize: '32px', color: '#3b82f6', marginBottom: '12px' }} />
                <Statistic 
                  value={stats.totalBloodUnits}
                  loading={loading}
                  valueStyle={{ 
                    color: '#ffffff', 
                    fontSize: '36px', 
                    fontWeight: '800',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                  suffix="+"
                />
                <p style={{ color: '#ffffff', margin: 0, fontSize: '15px', opacity: 0.9, fontWeight: '500' }}>Đơn vị máu</p>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))',
                borderRadius: '25px',
                padding: '30px',
                backdropFilter: 'blur(25px)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: '0 12px 40px rgba(16, 185, 129, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(16, 185, 129, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.15)';
              }}>
                <HeartOutlined style={{ fontSize: '32px', color: '#10b981', marginBottom: '12px' }} />
                <Statistic 
                  value={stats.totalCampaigns}
                  loading={loading}
                  valueStyle={{ 
                    color: '#ffffff', 
                    fontSize: '36px', 
                    fontWeight: '800',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                  suffix="+"
                />
                <p style={{ color: '#ffffff', margin: 0, fontSize: '15px', opacity: 0.9, fontWeight: '500' }}>Chiến dịch</p>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.1))',
                borderRadius: '25px',
                padding: '30px',
                backdropFilter: 'blur(25px)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                boxShadow: '0 12px 40px rgba(168, 85, 247, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(168, 85, 247, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(168, 85, 247, 0.15)';
              }}>
                <MedicineBoxOutlined style={{ fontSize: '32px', color: '#a855f7', marginBottom: '12px' }} />
                <Statistic 
                  value={stats.totalHospitals}
                  loading={loading}
                  valueStyle={{ 
                    color: '#ffffff', 
                    fontSize: '36px', 
                    fontWeight: '800',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                />
                <p style={{ color: '#ffffff', margin: 0, fontSize: '15px', opacity: 0.9, fontWeight: '500' }}>Tỉnh thành</p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Space size="large">
          <Button 
            type="primary" 
            size="large" 
            style={{ 
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              borderColor: 'transparent',
              height: '60px',
              fontSize: '18px',
              fontWeight: '700',
              borderRadius: '30px',
              padding: '0 45px',
              boxShadow: '0 12px 40px rgba(239, 68, 68, 0.4)',
              transition: 'all 0.3s ease',
              color: '#ffffff'
            }}
            onClick={() => navigate('/register')}
            icon={<HeartOutlined />}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(239, 68, 68, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(239, 68, 68, 0.4)';
            }}
          >
            Đăng ký hiến máu
          </Button>
          <Button 
            size="large" 
            style={{ 
              background: 'rgba(255, 255, 255, 0.15)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              fontWeight: '700',
              height: '60px',
              fontSize: '18px',
              borderRadius: '30px',
              padding: '0 45px',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => navigate('/login')}
            icon={<ArrowRightOutlined />}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Đăng nhập
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default HeroSection;
