import React, { useEffect, useState } from "react";
import { List, Tag, Button, Typography, Pagination, Spin, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { getUpcomingCampaigns } from "../../../../services/api/campaignService";
import { safeFormatDateVietnamese } from "../../../../utils/dateUtils";

const { Title, Paragraph } = Typography;

export default function DashboardUser() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchCampaigns = async (pageIndex = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getUpcomingCampaigns(pageIndex);
      setCampaigns(res?.content || []);
      setPage(res?.number + 1 || 1);
      setTotal(res?.totalElements || 0);
    } catch (error) {
      console.error("Không thể tải danh sách hoạt động!", error);
      setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối hoặc thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "60px 20px",
          background: "linear-gradient(to right, #ffffff, #f3e5f5)",
        }}
      >
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
        
        <Alert
          message="Lỗi kết nối"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" danger onClick={() => fetchCampaigns()}>
              Thử lại
            </Button>
          }
          style={{ maxWidth: 600, margin: "0 auto" }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        background: "linear-gradient(to right, #ffffff, #f3e5f5)",
      }}
    >
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
          <div style={{ marginTop: 16, color: "#666" }}>
            Đang tải danh sách hoạt động...
          </div>
        </div>
      ) : campaigns.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <Alert
            message="Không có hoạt động nào"
            description="Hiện tại không có hoạt động hiến máu nào sắp diễn ra."
            type="info"
            showIcon
            style={{ maxWidth: 600, margin: "0 auto" }}
          />
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
                  <Tag color="gold">Bắt đầu: {safeFormatDateVietnamese(item.ngayBatDau)}</Tag>
                  <Tag color="volcano">Kết thúc: {safeFormatDateVietnamese(item.ngayKetThuc)}</Tag>
                  <Tag color="green">
                    {item.soLuongNguoiDangKyHienTai || 0}/{item.soLuongNguoiToiDa}{" "}
                    người đăng ký
                  </Tag>
                </div>

                <Button
                  type="primary"
                  shape="round"
                  onClick={() =>
                    navigate(`/campaigns-manager/detail/${item.id}`)
                  }
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

      {total > 20 && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Pagination
            current={page}
            total={total}
            pageSize={20}
            showSizeChanger={false}
            onChange={(p) => fetchCampaigns(p)}
          />
        </div>
      )}
    </div>
  );
}
