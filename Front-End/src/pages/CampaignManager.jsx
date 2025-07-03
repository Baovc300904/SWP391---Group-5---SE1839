import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Table,
  Tag,
  Tooltip,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getCampaigns, createCampaign } from "../services/campaignService";

const statusMap = {
  sapdienra: { label: "Sắp diễn ra", color: "#42a5f5" }, // Blue
  dangdienra: { label: "Đang diễn ra", color: "#43a047" }, // Green
  daketthuc: { label: "Đã kết thúc", color: "#bdbdbd" }, // Grey
};

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("sapdienra");
  const [addModal, setAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, total: 0 });
  const navigate = useNavigate();

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getCampaigns(page, status);
      setCampaigns(res?.content || []);
      setPagination({
        page: res.number + 1,
        total: res.totalElements,
      });
    } catch (e) {
      message.error(
        e?.response?.data?.message || "Lỗi tải danh sách chiến dịch"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [status]);

  const handleAddCampaign = async (values) => {
    setAddLoading(true);
    try {
      await createCampaign({
        ...values,
        ngayBatDau: values.ngayBatDau.format("YYYY-MM-DD"),
        ngayKetThuc: values.ngayKetThuc.format("YYYY-MM-DD"),
      });
      message.success("Tạo chiến dịch thành công!");
      setAddModal(false);
      form.resetFields();
      fetchData(pagination.page);
    } catch (e) {
      message.error(e?.response?.data?.message || "Tạo chiến dịch thất bại!");
    } finally {
      setAddLoading(false);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Tên chiến dịch",
      dataIndex: "ten",
      render: (text, record) => (
        <Button
          type="link"
          style={{ padding: 0, fontWeight: 600 }}
          onClick={() => navigate(`/campaigns-manager/detail/${record.id}`)}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Thời gian",
      render: (_, record) => (
        <span>
          <Tag color="blue" style={{ marginRight: 4 }}>
            {dayjs(record.ngayBatDau).format("DD/MM/YYYY")}
          </Tag>
          <span style={{ margin: "0 6px", color: "#999" }}>→</span>
          <Tag color="volcano">
            {dayjs(record.ngayKetThuc).format("DD/MM/YYYY")}
          </Tag>
        </span>
      ),
      align: "center",
    },
    {
      title: "Địa điểm",
      dataIndex: "diaDiem",
      render: (val) => val || <i>Chưa cập nhật</i>,
    },
    {
      title: "Số lượng cần",
      dataIndex: "soLuongNguoiToiDa",
      align: "center",
      render: (v) => <b>{v}</b>,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThaiHoatDong",
      render: (v) => (
        <Tag
          color={statusMap[v]?.color || "#bdbdbd"}
          style={{
            fontWeight: 600,
            borderRadius: 12,
            fontSize: 14,
            padding: "2px 12px",
          }}
        >
          {statusMap[v]?.label || v}
        </Tag>
      ),
      align: "center",
    },
    {
      title: "Hành động",
      align: "center",
      render: (_, record) => (
        <Tooltip title="Xem chi tiết">
          <Button
            icon={<EyeOutlined />}
            size="small"
            style={{ borderRadius: 6, background: "#fff" }}
            onClick={() => navigate(`/campaigns-manager/detail/${record.id}`)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Card
      title="🩸 Danh sách chiến dịch hiến máu"
      style={{
        borderRadius: 20,
        boxShadow: "0 4px 24px rgba(66, 41, 132, 0.08)",
        overflow: "hidden",
      }}
      extra={
        <div style={{ display: "flex", gap: 12 }}>
          <Select
            value={status}
            onChange={setStatus}
            style={{
              width: 160,
              borderRadius: 10,
              background: "#fff4f4",
            }}
            options={Object.entries(statusMap).map(([key, val]) => ({
              value: key,
              label: val.label,
            }))}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddModal(true)}
            style={{
              borderRadius: 8,
              background: "#c2185b",
              borderColor: "#c2185b",
              fontWeight: 600,
            }}
          >
            Thêm chiến dịch
          </Button>
        </div>
      }
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={campaigns}
        pagination={{
          current: pagination.page,
          total: pagination.total,
          pageSize: 10,
          onChange: (page) => fetchData(page),
        }}
        bordered={false}
        style={{ marginTop: 16 }}
        scroll={{ x: true }}
      />

      <Modal
        title={
          <span style={{ fontWeight: 600, fontSize: 20, color: "#c2185b" }}>
            Thêm chiến dịch hiến máu mới
          </span>
        }
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
        centered
        style={{ borderRadius: 16 }}
        bodyStyle={{ marginTop: 16 }}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddCampaign}
          preserve={false}
        >
          <Form.Item
            label={<span style={{ color: "#c2185b" }}>Tên chiến dịch</span>}
            name="ten"
            rules={[
              { required: true, message: "Vui lòng nhập tên chiến dịch" },
            ]}
          >
            <Input
              placeholder="Nhập tên chiến dịch"
              style={{
                borderRadius: 24,
                height: 42,
                background: "#fff",
                border: "1px solid #e0e0e0",
              }}
            />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#c2185b" }}>Địa điểm</span>}
            name="diaDiem"
            rules={[{ required: true, message: "Vui lòng nhập địa điểm" }]}
          >
            <Input
              placeholder="Nhập địa điểm diễn ra"
              style={{
                borderRadius: 24,
                height: 42,
                background: "#fff",
                border: "1px solid #e0e0e0",
              }}
            />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#c2185b" }}>Mô tả</span>}
            name="moTa"
          >
            <Input.TextArea
              rows={3}
              placeholder="Thông tin mô tả chi tiết"
              style={{
                borderRadius: 18,
                background: "#fff",
                border: "1px solid #e0e0e0",
                padding: 10,
              }}
            />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#c2185b" }}>Ngày bắt đầu</span>}
            name="ngayBatDau"
            rules={[{ required: true, message: "Chọn ngày bắt đầu" }]}
          >
            <DatePicker style={{ width: "100%", borderRadius: 18 }} />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#c2185b" }}>Ngày kết thúc</span>}
            name="ngayKetThuc"
            rules={[{ required: true, message: "Chọn ngày kết thúc" }]}
          >
            <DatePicker style={{ width: "100%", borderRadius: 18 }} />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ color: "#c2185b" }}>Số lượng người tối đa</span>
            }
            name="soLuongNguoiToiDa"
            rules={[{ required: true, message: "Nhập số lượng người tối đa" }]}
          >
            <InputNumber
              min={1}
              style={{
                width: "100%",
                borderRadius: 24,
                background: "#fff",
                border: "1px solid #e0e0e0",
                height: 42,
              }}
              placeholder="VD: 100"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              loading={addLoading}
              style={{
                width: "100%",
                background: "#c2185b",
                borderColor: "#c2185b",
                borderRadius: 30,
                height: 48,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Thêm chiến dịch
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
