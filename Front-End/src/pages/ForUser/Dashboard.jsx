import React, { useEffect, useState } from "react";
import {
  List,
  Tag,
  Button,
  Typography,
  Pagination,
  Spin,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import { getUpcomingCampaigns } from "../../services/campaignService";

const { Title, Paragraph } = Typography;

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
      console.error("Không thể tải danh sách hoạt động!");
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
        padding: "60px 20px",
        background: "linear-gradient(to right, #ffffff, #f3e5f5)",
      }}
    >
      {/* Banner Section */}
      <div
        style={{
          background:
            "url('https://png.pngtree.com/background/20210711/original/pngtree-geometric-gradient-creative-blood-donation-poster-background-material-picture-image_1127152.jpg') no-repeat center center",
          backgroundSize: "cover",
          padding: "80px 20px",
          color: "#fff",
          textAlign: "center",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <Title
          level={1}
          style={{
            color: "rgb(74, 20, 140)",
            fontWeight: 700,
          }}
        >
          Chào mừng đến với các hoạt động hiến máu
        </Title>
        <Paragraph
          style={{
            color: "rgb(74, 20, 140)",
            fontSize: "18px",
          }}
        >
          Tham gia cùng chúng tôi trong các chiến dịch hiến máu sắp tới để góp
          phần cứu sống những người cần máu.
        </Paragraph>
      </div>

      <Title
        level={2}
        style={{
          textAlign: "center",
          color: "#4a148c",
          marginBottom: 40,
        }}
      >
        🩸 Các hoạt động hiến máu sắp diễn ra
      </Title>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <Spin size="large" />
        </div>
      ) : (
        <List
          grid={{ gutter: 24, column: 2 }}
          dataSource={campaigns}
          renderItem={(item) => (
            <List.Item>
              <div
                style={{
                  background: "#ffffffcc",
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                  transition: "0.3s",
                }}
              >
                <Title level={4} style={{ color: "#6a1b9a" }}>
                  {item.ten}
                </Title>

                <Tag color="geekblue" style={{ marginBottom: 12 }}>
                  {item.diaDiem}
                </Tag>

                <Paragraph style={{ color: "#555", minHeight: 80 }}>
                  {item.moTa?.length > 180
                    ? item.moTa.substring(0, 180) + "..."
                    : item.moTa}
                </Paragraph>

                <div style={{ marginTop: 12, marginBottom: 12 }}>
                  <Tag color="gold">Bắt đầu: {item.ngayBatDau}</Tag>
                  <Tag color="volcano">Kết thúc: {item.ngayKetThuc}</Tag>
                  <Tag color="green">
                    {item.soLuongNguoiDangKyHienTai}/{item.soLuongNguoiToiDa}{" "}
                    người đăng ký
                  </Tag>
                </div>

                <Button
                  type="primary"
                  shape="round"
                  onClick={() => navigate(`/user/campaigns-detail/${item.id}`)}
                  style={{
                    backgroundColor: "#ec407a",
                    borderColor: "#ec407a",
                  }}
                >
                  Xem chi tiết
                </Button>
              </div>
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
