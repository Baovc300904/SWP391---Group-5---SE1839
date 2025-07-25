import React from 'react';
import { Button, Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function TestPage() {
  return (
    <div style={{ padding: '20px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', color: '#1890ff' }}>
          🩸 Blood Donation Management System
        </Title>
        <Paragraph>
          Welcome to the Blood Donation Management System! This is a test page to verify the application is working correctly.
        </Paragraph>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" size="large">
            Test Button
          </Button>
        </div>
      </Card>
    </div>
  );
}
