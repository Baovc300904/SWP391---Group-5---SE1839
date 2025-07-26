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
import { getBloodReceiveRequests } from "../services/receiveBloodAdminService";

// Status mapping based on Enum values (TrangThai Enum)
const statusMap = {
  dangcho: { text: "Đang chờ", color: "gold" }, // Yellow
  dacomau: { text: "Đã có máu", color: "blue" }, // Blue
  dangketnoi: { text: "Đang kết nối", color: "cyan" }, // Cyan
  dahoanthanh: { text: "Đã hoàn thành", color: "green" }, // Green
  huy: { text: "Hủy", color: "gray" }, // Gray
};

export default function BloodReceiveRequestManager() {
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
      const data = await getBloodReceiveRequests(
        status ? { page, status } : { page }
      );
      setRequests(data.content || []);
      setTotal(data.totalElements || 0); // Set the total number of items
    } catch (e) {
      message.error(
        e?.response?.data?.message || "Lỗi lấy danh sách yêu cầu nhận máu"
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
        key: "dahoanthanh",
        label: "Đã hoàn thành",
        onClick: () => handleStatusFilter("dahoanthanh"),
      },
      {
        key: "huy",
        label: "Hủy",
        onClick: () => handleStatusFilter("huy"),
      },
    ],
  };

  // Table columns
  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "Tên người nhận",
      dataIndex: "nguoiNhan",
      render: (nguoiNhan) => <span>{nguoiNhan.ten}</span>,
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
      render: (val) => new Date(val).toLocaleString("vi-VN"), // Formatting timestamp
    },
    {
      title: "Ngày duyệt",
      dataIndex: "ngayDuyet",
      render: (val) =>
        val ? new Date(val).toLocaleString("vi-VN") : "Chưa duyệt", // Formatting timestamp
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() =>
                navigate(`/employee/receive-blood-manager/${record.id}`)
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Card title="🩸 Quản lý yêu cầu nhận máu">
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
        bordered={false}
        style={{ marginTop: 16 }}
        rowClassName={() => "custom-row"}
      />
    </Card>
  );
}
