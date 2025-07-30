import React, { useEffect, useState } from "react";
import {
  List,
  Tag,
  Button,
  Typography,
  Pagination,
  Spin,
  Card,
  Row,
  Col,
  Divider,
  Tooltip,
  Avatar,
  Space,
  Progress,
  Statistic,
} from "antd";
import { useNavigate } from "react-router-dom";
import { getUpcomingCampaigns } from "../../services/campaignService";
import {
  FilePdfOutlined,
  BankOutlined,
  BookOutlined,
  InfoCircleOutlined,
  HeartTwoTone,
  CalendarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  HeartOutlined,
  SafetyOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function DashboardUser() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchCampaigns = async (pageIndex = 1) => {
    setLoading(true);
    try {
      const res = await getUpcomingCampaigns(pageIndex);
      setCampaigns(res?.content || []);
      setPage(res?.number + 1 || 1);
      setTotal(res?.totalElements || 0);
    } catch {
      // toast error nếu muốn
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Background Elements with Images */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "300px",
          height: "300px",
          backgroundImage: "url('https://images.unsplash.com/photo-1615461065929-4cc9af3b2b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          opacity: 0.1,
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: "200px",
          height: "200px",
          backgroundImage: "url('https://images.unsplash.com/photo-1615461065929-4cc9af3b2b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          opacity: 0.1,
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <div style={{ padding: "40px 5% 80px 5%", position: "relative" }}>
        {/* Hero Section */}
        <Card
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            marginBottom: "40px",
            border: "none",
            backdropFilter: "blur(10px)",
            backgroundImage: "url('https://images.unsplash.com/photo-1615461065929-4cc9af3b2b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
          styles={{ body: { padding: "60px 40px" } }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <Avatar
              size={120}
              style={{
                background: "linear-gradient(135deg, #d4a574 0%, #b08968 100%)",
                marginBottom: "20px",
                border: "2px solid #e2e8f0",
              }}
              icon={<HeartTwoTone twoToneColor="#fff" style={{ fontSize: "60px" }} />}
            />
            <Title
              level={1}
              style={{
                color: "#1e293b",
                marginBottom: "16px",
                fontSize: "48px",
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              Chào mừng đến với cộng đồng hiến máu
            </Title>
            <Paragraph
              style={{
                fontSize: "20px",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6",
                textAlign: "center",
              }}
            >
              Hãy cùng chung tay lan tỏa nghĩa cử cao đẹp, trao giọt máu – gửi hy vọng cho cuộc sống!
            </Paragraph>
          </div>

          {/* Stats Cards */}
          <Row gutter={[32, 32]} justify="center">
            
          </Row>
        </Card>

        {/* Information Cards */}
        <Row gutter={[32, 32]} style={{ marginBottom: "50px" }}>
          <Col xs={24} lg={12}>
            <Card
              hoverable
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "20px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                border: "none",
                height: "100%",
                backdropFilter: "blur(10px)",
                transition: "transform 0.3s ease",
              }}
              styles={{ body: { padding: "40px" } }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundImage: "url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: "16px",
                    border: "3px solid #d4a574",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BankOutlined style={{ fontSize: "28px", color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }} />
                </div>
                <Title level={3} style={{ color: "#1e293b", marginBottom: "16px", fontWeight: "700" }}>
                  Cơ sở y tế & Kiến thức
                </Title>
              </div>
              <Paragraph style={{ color: "#64748b", fontSize: "16px", lineHeight: "1.6", marginBottom: "32px" }}>
                Tra cứu <b>cơ sở y tế</b> tiếp nhận hiến máu, tìm hiểu <b>kiến thức nhóm máu</b>,
                quyền lợi người hiến và lưu ý sức khỏe.
              </Paragraph>
              <Space size="middle" wrap>
                <Button
                  type="primary"
                  size="large"
                  icon={<FilePdfOutlined />}
                  style={{
                    background: "#1e293b",
                    border: "none",
                    borderRadius: "12px",
                    height: "48px",
                    fontWeight: "600",
                    boxShadow: "0 4px 15px rgba(30,41,59,0.3)",
                  }}
                  href="/"
                  target="_blank"
                >
                  Tài liệu nhóm máu
                </Button>
                <Button
                  size="large"
                  icon={<BookOutlined />}
                  style={{
                    borderColor: "#1e293b",
                    color: "#1e293b",
                    borderRadius: "12px",
                    height: "48px",
                    fontWeight: "600",
                  }}
                  href="/"
                  target="_blank"
                >
                  Cơ sở y tế
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              hoverable
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "20px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                border: "none",
                height: "100%",
                backdropFilter: "blur(10px)",
                transition: "transform 0.3s ease",
              }}
              styles={{ body: { padding: "40px" } }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundImage: "url('https://th.bing.com/th/id/OIP.NBAY_o0y5lfBixoPQrViqwHaE8?w=276&h=184&c=7&r=0&o=5&pid=1.7')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: "16px",
                    border: "3px solid #d4a574",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HeartTwoTone twoToneColor="#fff" style={{ fontSize: "28px", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }} />
                </div>
                <Title level={3} style={{ color: "#1e293b", marginBottom: "16px", fontWeight: "700" }}>
                  Hiến máu tình nguyện
                </Title>
              </div>
              <Paragraph style={{ color: "#64748b", fontSize: "16px", lineHeight: "1.6", marginBottom: "32px" }}>
                <span style={{ color: "#d4a574", fontWeight: "600" }}>Đăng ký hiến máu ngay!</span>{" "}
                Tham gia các chiến dịch và góp phần cứu sống cộng đồng.
              </Paragraph>
              <Progress
                percent={75}
                status="active"
                strokeColor={{
                  from: '#d4a574',
                  to: '#b08968',
                }}
                style={{ marginBottom: "24px" }}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <RiseOutlined style={{ color: "#d4a574", marginRight: "8px" }} />
                <Text style={{ color: "#64748b" }}>Mục tiêu hiến máu tháng này</Text>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Campaigns Section */}
        <Card
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
            border: "none",
            marginBottom: "40px",
            backdropFilter: "blur(10px)",
          }}
          styles={{ body: { padding: "40px" } }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundImage: "url('https://th.bing.com/th/id/OIP.zL2tPyi1QEsz5WOv2XTB0wHaFK?w=286&h=199&c=7&r=0&o=7&pid=1.7&rm=3')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginBottom: "20px",
                margin: "0 auto 20px auto",
                border: "3px solid #d4a574",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CalendarOutlined style={{ fontSize: "36px", color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }} />
            </div>
            <Title
              level={2}
              style={{
                color: "#1e293b",
                marginBottom: "16px",
                fontWeight: "700",
              }}
            >
              🩸 Các hoạt động hiến máu sắp diễn ra
            </Title>
            <Paragraph style={{ color: "#64748b", fontSize: "18px" }}>
              Tham gia ngay để góp phần cứu sống nhiều người
            </Paragraph>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <Spin size="large" />
              <div style={{ marginTop: "20px", color: "#64748b" }}>
                Đang tải danh sách chiến dịch...
              </div>
            </div>
          ) : (
            <List
              grid={{
                gutter: [32, 32],
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 2,
                xxl: 3
              }}
              dataSource={campaigns}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    hoverable
                    style={{
                      background: "#fff",
                      borderRadius: "20px",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      border: "1px solid #f0f0f0",
                      height: "100%",
                      overflow: "hidden",
                      position: "relative",
                    }}
                    styles={{ body: { padding: "32px" } }}
                    onClick={() => navigate(`/user/campaigns-detail/${item.id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
                    }}
                  >
                    {/* Background Image Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "120px",
                        backgroundImage: "url('https://images.unsplash.com/photo-1615461065929-4cc9af3b2b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "20px 20px 0 0",
                        opacity: 0.8,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "120px",
                        background: "linear-gradient(180deg, rgba(212,165,116,0.8) 0%, rgba(176,137,104,0.3) 100%)",
                        borderRadius: "20px 20px 0 0",
                      }}
                    />

                    <div style={{ marginBottom: "20px", position: "relative", zIndex: 1, paddingTop: "100px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                        <Title
                          level={4}
                          style={{
                            color: "#1e293b",
                            marginBottom: "0",
                            fontWeight: "700",
                            fontSize: "20px",
                            lineHeight: "1.3",
                            flex: 1,
                          }}
                          ellipsis={{ rows: 2 }}
                        >
                          {item.ten}
                        </Title>
                        <Button
                          type="primary"
                          size="small"
                          style={{
                            background: "#1e293b",
                            border: "none",
                            borderRadius: "20px",
                            fontWeight: "600",
                            marginLeft: "12px",
                            flexShrink: 0,
                          }}
                        >
                          Chi tiết
                        </Button>
                      </div>

                      <Space style={{ marginBottom: "16px" }}>
                        <Tag
                          icon={<EnvironmentOutlined />}
                          color="geekblue"
                          style={{
                            borderRadius: "12px",
                            padding: "4px 12px",
                            fontSize: "14px",
                            fontWeight: "500"
                          }}
                        >
                          {item.diaDiem}
                        </Tag>
                      </Space>
                    </div>

                    <Paragraph
                      style={{
                        color: "#64748b",
                        fontSize: "15px",
                        lineHeight: "1.6",
                        marginBottom: "24px",
                        minHeight: "60px",
                      }}
                      ellipsis={{ rows: 3, expandable: false }}
                    >
                      {item.moTa}
                    </Paragraph>

                    <div style={{ marginTop: "auto" }}>
                      <Row gutter={[8, 8]} style={{ marginBottom: "16px" }}>
                        <Col span={24}>
                          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                            <ClockCircleOutlined style={{ color: "#10b981", marginRight: "8px" }} />
                            <Text style={{ color: "#10b981", fontWeight: "600" }}>
                              {item.ngayBatDau}
                            </Text>
                            <Text style={{ color: "#64748b", margin: "0 8px" }}>đến</Text>
                            <Text style={{ color: "#d4a574", fontWeight: "600" }}>
                              {item.ngayKetThuc}
                            </Text>
                          </div>
                        </Col>
                      </Row>

                      <div style={{
                        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        padding: "16px",
                        borderRadius: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}>
                        <div>
                          <Text style={{ color: "#64748b", fontSize: "14px" }}>Đã đăng ký</Text>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <UserOutlined style={{ color: "#1e293b", marginRight: "6px" }} />
                            <Text style={{ fontWeight: "700", fontSize: "18px", color: "#1e293b" }}>
                              {item.soLuongNguoiDangKyHienTai}/{item.soLuongNguoiToiDa}
                            </Text>
                          </div>
                        </div>
                        <Progress
                          type="circle"
                          size={50}
                          percent={Math.round((item.soLuongNguoiDangKyHienTai / item.soLuongNguoiToiDa) * 100)}
                          strokeColor={{
                            '0%': '#d4a574',
                            '100%': '#b08968',
                          }}
                          format={(percent) => (
                            <span style={{ fontSize: "12px", fontWeight: "600" }}>
                              {percent}%
                            </span>
                          )}
                        />
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          )}

          {campaigns.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Pagination
                current={page}
                total={total}
                pageSize={20}
                showSizeChanger={false}
                onChange={(p) => fetchCampaigns(p)}
                style={{
                  "& .ant-pagination-item-active": {
                    background: "linear-gradient(135deg, #d4a574 0%, #b08968 100%)",
                  }
                }}
              />
            </div>
          )}
        </Card>
      </div>

      {/* CSS Animation */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-20px); 
          }
        }
      `}</style>
    </div>
  );
}
