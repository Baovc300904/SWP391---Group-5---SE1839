import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Card,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  createBlogCategory,
  getBlogCategories,
} from "../../services/blogCategoryService";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";

export default function BlogCategoryTab() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getBlogCategories();
      setData(res || []);
    } catch (e) {
      message.error(e?.response?.data?.message || "Lỗi tải danh mục blog!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (values) => {
    try {
      await createBlogCategory({
        ...values,
        tieuDe: values.tieude, // Đổi tên nếu BE yêu cầu
      });
      message.success("Tạo danh mục thành công!");
      form.resetFields();
      setOpen(false);
      fetchData();
    } catch (e) {
      message.error(e?.response?.data?.message || "Tạo danh mục thất bại!");
    }
  };

  // Table columns
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      align: "center",
      width: 60,
    },
    {
      title: "Tiêu đề",
      dataIndex: "tieuDe",
      render: (text, record) => (
        <Button
          type="link"
          style={{ padding: 0, fontWeight: 600 }}
          onClick={() =>
            navigate(`/admin/blogs-manager/category-detail/${record.id}`)
          }
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "noidung",
      render: (v) => v || <i style={{ color: "#b0b0b0" }}>Không có</i>,
    },
    {
      title: "Chi tiết",
      align: "center",
      width: 90,
      render: (_, record) => (
        <Tooltip title="Xem chi tiết">
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() =>
              navigate(`/employee/blogs-manager/category-detail/${record.id}`)
            }
            style={{ borderRadius: 8, background: "#fff" }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Card
      title="📚 Danh mục Blog"
      style={{
        borderRadius: 20,
        boxShadow: "0 4px 18px rgba(33,150,243,0.12)",
        overflow: "hidden",
      }}
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
          style={{
            borderRadius: 8,
            fontWeight: 600,
            background: "#1976d2",
            borderColor: "#1976d2",
          }}
        >
          Thêm danh mục
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={false}
        style={{ marginTop: 16 }}
        scroll={{ x: true }}
      />

      {/* Modal Thêm mới */}
      <Modal
        title={
          <span style={{ fontWeight: 600, fontSize: 19, color: "#1976d2" }}>
            Thêm danh mục blog mới
          </span>
        }
        open={open}
        onCancel={() => setOpen(false)}
        okText="Thêm"
        cancelText="Huỷ"
        onOk={() => form.submit()}
        okButtonProps={{
          style: {
            borderRadius: 30,
            background: "#1976d2",
            borderColor: "#1976d2",
          },
        }}
        cancelButtonProps={{ style: { borderRadius: 30 } }}
        centered
        style={{ borderRadius: 16 }}
        bodyStyle={{ marginTop: 12 }}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="tieude"
            label={<span style={{ color: "#1976d2" }}>Tiêu đề</span>}
            rules={[{ required: true, message: "Nhập tiêu đề!" }]}
          >
            <Input
              placeholder="Nhập tiêu đề danh mục"
              style={{
                borderRadius: 24,
                height: 40,
                paddingLeft: 14,
                backgroundColor: "#fefefe",
                border: "1px solid #bbdefb",
              }}
            />
          </Form.Item>
          <Form.Item
            name="noidung"
            label={<span style={{ color: "#1976d2" }}>Nội dung</span>}
          >
            <Input.TextArea
              rows={3}
              style={{
                borderRadius: 18,
                padding: 10,
                backgroundColor: "#fefefe",
                border: "1px solid #bbdefb",
              }}
              placeholder="Mô tả về danh mục blog (nếu có)"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
