import { EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  message,
  Table,
  Tag,
  Tooltip,
  Dropdown,
  Menu,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBloodRequests } from "../services/bloodService";

// Status mapping
const statusMap = {
  dangcho: { text: "Đang chờ", color: "gold" }, // Yellow
  tuchoi: { text: "Từ chối", color: "red" }, // Red
  huy: { text: "Hủy", color: "gray" }, // Gray
  xacnhan: { text: "Xác nhận", color: "blue" }, // Blue
  dahien: { text: "Đã hiến", color: "green" }, // Green
};

export default function BloodDonationManager() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Manage pagination
  const [total, setTotal] = useState(0); // Total number of items
  const [statusFilter, setStatusFilter] = useState(""); // Track selected filter status
  const navigate = useNavigate();

  // Fetch requests with applied filters
  const fetchRequests = async (page, status = "") => {
    setLoading(true);
    try {
      const data = await getBloodRequests(status ? { page, status } : { page });
      setRequests(data.content || []);
      setTotal(data.totalElements || 0); // Set the total number of items
    } catch (e) {
      message.error(
        e?.response?.data?.message || "Lỗi lấy danh sách yêu cầu hiến máu"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(page, statusFilter);
  }, [page, statusFilter]);

  // Handle status filter change
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setPage(1); // Reset to first page when changing the filter
  };

  // Filter menu
  const filterMenu = {
    items: [
      {
        key: "all",
        label: "Tất cả",
        onClick: () => handleStatusFilter(""),
      },
      {
        key: "dangcho",
        label: "Đang chờ",
        onClick: () => handleStatusFilter("dangcho"),
      },
      {
        key: "tuchoi",
        label: "Từ chối",
        onClick: () => handleStatusFilter("tuchoi"),
      },
      {
        key: "huy",
        label: "Hủy",
        onClick: () => handleStatusFilter("huy"),
      },
      {
        key: "xacnhan",
        label: "Xác nhận",
        onClick: () => handleStatusFilter("xacnhan"),
      },
      {
        key: "dahien",
        label: "Đã hiến",
        onClick: () => handleStatusFilter("dahien"),
      },
    ],
  };

  // Table columns
  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "Tên người hiến",
      dataIndex: "nguoiHien", // This will show the name of the donor
      render: (nguoiHien) => {
        return <span>{nguoiHien.ten}</span>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      render: (status) => (
        <Tag color={statusMap[status]?.color}>{statusMap[status]?.text}</Tag>
      ),
    },
    {
      title: "Ngày yêu cầu",
      dataIndex: "ngayTao",
      render: (val) => new Date(val).toLocaleString("vi-VN"),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() =>
                navigate(`/employee/blood-donation-request/${record.id}`)
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Card title="🩸 Quản lý yêu cầu hiến máu">
      <div style={{ marginBottom: 16 }}>
        <Dropdown menu={filterMenu}>
          <Button>
            Lọc theo trạng thái <span>▼</span>
          </Button>
        </Dropdown>
      </div>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={requests}
        pagination={{
          current: page,
          total: total, // Set total items for pagination
          pageSize: 10, // Define how many items per page
          onChange: (page) => setPage(page), // Change page number
        }}
        variant="borderless"
        style={{ marginTop: 16 }}
        rowClassName={() => "custom-row"}
      />
    </Card>
  );
}
