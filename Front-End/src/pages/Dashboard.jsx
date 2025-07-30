import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spin, message } from "antd";
import {
  UserOutlined,
  ProjectOutlined,
  MessageOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { getDashboardAnalysis } from "../services/dashboardService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

// Định nghĩa icon và màu cho từng loại số liệu
const statMeta = [
  {
    key: "totalBloodReceiveRequest",
    title: "YÊU CẦU NHẬN MÁU",
    icon: <ProjectOutlined />,
    color: "#ff9800",
  },
  {
    key: "totalBloodDonationRequest",
    title: "YÊU CẦU HIẾN MÁU",
    icon: <UserOutlined />,
    color: "#e91e63",
  },
  {
    key: "totalBloodUnitWareHouse",
    title: "ĐƠN VỊ MÁU TỒN",
    icon: <MessageOutlined />,
    color: "#00bcd4",
  },
  {
    key: "totalBlood",
    title: "TỔNG SỐ LƯỢNG MÁU",
    icon: <TeamOutlined />,
    color: "#8bc34a",
  },
  {
    key: "totalEmployee",
    title: "NHÂN VIÊN",
    icon: <UserOutlined />,
    color: "#4caf50",
  },
  {
    key: "totalCustomer",
    title: "KHÁCH HÀNG",
    icon: <TeamOutlined />,
    color: "#9c27b0",
  },
  {
    key: "totalBloodDonationActivity",
    title: "HOẠT ĐỘNG HIẾN MÁU",
    icon: <ProjectOutlined />,
    color: "#03a9f4",
  },
  {
    key: "totalBlog",
    title: "BÀI VIẾT",
    icon: <MessageOutlined />,
    color: "#ffb300",
  },
];

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardAnalysis();
        // Tạo mảng stats cho cards
        const mappedStats = statMeta?.map((meta) => ({
          ...meta,
          value: res[meta.key] ?? 0,
        }));
        setStats(mappedStats);

        // Tạo chartData từ các chỉ số chính (có thể chọn 4-6 cái nổi bật nhất)
        setChartData(
          mappedStats?.map((item) => ({
            label: item.title,
            value: item.value,
            color: item.color,
          }))
        );
      } catch {
        message.error("Lỗi lấy dữ liệu dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <Spin size="large" />;
  if (!stats.length) return null;

  // Chia thành các row, mỗi row 4 card (8 chỉ số chia làm 2 hàng)
  const statRows = [];
  for (let i = 0; i < stats?.length; i += 4) {
    statRows.push(stats?.slice(i, i + 4));
  }

  return (
    <>
      {statRows.map((row, idx) => (
        <Row gutter={16} style={{ marginBottom: 20 }} key={idx}>
          {row.map((item) => (
            <Col span={6} key={item.key}>
              <Card
                bordered={false}
                style={{ background: item.color, color: "#fff" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: 28 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: "bold" }}>
                      {item.value}
                    </div>
                    <div>{item.title}</div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
      <Card title="Thống kê tổng quan (Chart)" bordered={false}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              fill="#e91e63"
              radius={[16, 16, 0, 0]}
              // Nếu muốn mỗi cột một màu:
              // label={{ position: 'top' }}
              // isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
}
