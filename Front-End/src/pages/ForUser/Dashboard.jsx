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
} from "antd";
import { useNavigate } from "react-router-dom";
import { getUpcomingCampaigns } from "../../services/campaignService";
import {
  FilePdfOutlined,
  BankOutlined,
  BookOutlined,
  InfoCircleOutlined,
  HeartTwoTone,
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
        padding: "36px 10vw 80px 10vw",
        background: "linear-gradient(120deg, #e3f2fd 0%, #bbdefb 100%)",
      }}
    >
      {/* Section Info */}
      <Row gutter={28} style={{ marginBottom: 32 }}>
        <Col xs={24} md={12}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 24px rgba(33,150,243,0.07)",
              background:
                "linear-gradient(90deg,#fff 70%,rgba(227,242,253,0.34) 100%)",
            }}
            bodyStyle={{ padding: 30, minHeight: 240 }}
          >
            <Title
              level={4}
              style={{ color: "#1976d2", marginBottom: 10, fontWeight: 800 }}
            >
              <BankOutlined style={{ fontSize: 23, marginRight: 8 }} />
              Cơ sở y tế & kiến thức về máu
            </Title>
            <Paragraph style={{ color: "#222", marginBottom: 15 }}>
              <InfoCircleOutlined
                style={{ color: "#2196f3", marginRight: 6 }}
              />
              Tra cứu <b>cơ sở y tế</b> tiếp nhận hiến máu, tìm hiểu{" "}
              <b>kiến thức nhóm máu</b>, quyền lợi người hiến & lưu ý sức khoẻ.
            </Paragraph>
            <Row gutter={12}>
              <Col>
                                  <Button
                    icon={<FilePdfOutlined />}
                    style={{
                      color: "#1976d2",
                      borderColor: "#64b5f6",
                      borderRadius: 30,
                      fontWeight: 600,
                    }}
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/TaiLieuNhomMau_ChuyenSau.docx';
                      link.download = 'TaiLieuNhomMau_ChuyenSau.docx';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    Tài liệu nhóm máu
                  </Button>
              </Col>
              <Col>
                <Button
                  href="/"
                  icon={<BookOutlined />}
                  style={{
                    color: "#1976d2",
                    borderColor: "#ffbaba",
                    borderRadius: 30,
                    fontWeight: 600,
                  }}
                  target="_blank"
                >
                  Cơ sở y tế
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              minHeight: 240,
              boxShadow: "0 4px 24px rgba(74,20,140,0.07)",
              background:
                "linear-gradient(90deg,#fff 70%,rgba(237,231,246,0.2) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            bodyStyle={{ padding: 30 }}
          >
            <Title
              level={4}
              style={{
                                  color: "#1976d2",
                marginBottom: 10,
                fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              <HeartTwoTone
                twoToneColor="#1976d2"
                style={{ marginRight: 12 }}
              />
              Hiến máu - Giọt máu cho đi, cuộc đời ở lại!
            </Title>
            <Paragraph style={{ color: "#444", fontSize: 15 }}>
                              <span style={{ color: "#1976d2", fontWeight: 600 }}>
                  Đăng ký hiến máu ngay!
                </span>{" "}
              Tham gia các chiến dịch và góp phần cứu sống cộng đồng.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Banner Section */}
      <Card
        style={{
          background:
            "url('https://png.pngtree.com/background/20210711/original/pngtree-geometric-gradient-creative-blood-donation-poster-background-material-picture-image_1127152.jpg') center/cover no-repeat",
          padding: "68px 20px 56px 20px",
          color: "#fff",
          borderRadius: "18px",
          boxShadow: "0 8px 28px rgba(44,62,80,0.08)",
          marginBottom: 42,
          textAlign: "center",
          border: "none",
        }}
        bodyStyle={{ background: "rgba(255,255,255,0.02)" }}
      >
        <Title
          level={1}
          style={{
            fontWeight: 800,
            letterSpacing: 2,
            textShadow: "0 2px 10px rgba(123,31,162,0.09)",
          }}
        >
          Chào mừng đến với cộng đồng hiến máu
        </Title>
        <Paragraph
          style={{
            fontSize: 19,
            textShadow: "0 2px 10px rgba(244,67,54,0.08)",
          }}
        >
          Hãy cùng chung tay lan tỏa nghĩa cử cao đẹp, trao giọt máu – gửi hy
          vọng!
        </Paragraph>
      </Card>

      <Divider
        orientation="left"
        plain
        style={{
          color: "#1976d2",
          fontSize: 19,
          fontWeight: 700,
          margin: "38px 0 34px 0",
        }}
      >
        🩸 Các hoạt động hiến máu sắp diễn ra
      </Divider>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <Spin size="large" />
        </div>
      ) : (
        <List
          grid={{ gutter: 32, column: 2 }}
          dataSource={campaigns}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: "0 4px 18px rgba(123,31,162,0.10)",
                  transition: "box-shadow 0.2s",
                  border: "1px solid #e3f2fd",
                  minHeight: 260,
                }}
                bodyStyle={{ padding: 24 }}
                onClick={() => navigate(`/user/campaigns-detail/${item.id}`)}
                title={
                  <Text
                    strong
                    style={{
                      color: "#1976d2",
                      fontSize: 18,
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    {item.ten}
                  </Text>
                }
                extra={
                  <Tooltip title="Xem chi tiết">
                    <Button
                      shape="round"
                      size="small"
                      style={{
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        fontWeight: 600,
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </Tooltip>
                }
              >
                <Tag color="geekblue" style={{ marginBottom: 8 }}>
                  {item.diaDiem}
                </Tag>
                <Paragraph
                  style={{
                    color: "#555",
                    minHeight: 54,
                    margin: "10px 0 16px 0",
                  }}
                  ellipsis={{ rows: 2, expandable: false }}
                >
                  {item.moTa}
                </Paragraph>
                <Row gutter={12}>
                  <Col>
                    <Tag color="gold" style={{ fontSize: 14 }}>
                      <b>Bắt đầu:</b> {item.ngayBatDau}
                    </Tag>
                  </Col>
                  <Col>
                    <Tag color="volcano" style={{ fontSize: 14 }}>
                      <b>Kết thúc:</b> {item.ngayKetThuc}
                    </Tag>
                  </Col>
                  <Col>
                    <Tag color="green" style={{ fontSize: 14 }}>
                      {item.soLuongNguoiDangKyHienTai}/{item.soLuongNguoiToiDa}{" "}
                      người đăng ký
                    </Tag>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      )}

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Pagination
          current={page}
          total={total}
          pageSize={20}
          showSizeChanger={false}
          onChange={(p) => fetchCampaigns(p)}
        />
      </div>
    </div>
  );
}
