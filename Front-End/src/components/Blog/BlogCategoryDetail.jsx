import React, { useEffect, useState } from "react";
import { Card, Descriptions, Form, Input, Button, message, Tag } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBlogCategoryDetail,
  updateBlogCategory,
} from "../../services/blogCategoryService";

export default function BlogCategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getBlogCategoryDetail(id);
      setCategory(data);
      form.setFieldsValue(data);
    } catch {
      message.error("Lỗi tải dữ liệu danh mục");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      await updateBlogCategory(id, { ...values, tieude: values.tieuDe });
      message.success("Cập nhật thành công");
      setEditMode(false);
      fetchData();
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  if (!category) return <Card loading={loading} />;

  const trangThaiText = (val) => {
    if (val === 1) return <Tag color="green">Kích hoạt</Tag>;
    if (val === 0) return <Tag color="red">Ẩn</Tag>;
    return val;
  };

  const formatDate = (val) =>
    val ? new Date(val).toLocaleString("vi-VN") : "";

  return (
    <Card
      title={
        <span style={{ fontWeight: 600, color: "#7b1fa2" }}>
          Chi tiết danh mục: {category.tieuDe}
        </span>
      }
      extra={
        <Button
          onClick={() => navigate(-1)}
          icon={<ArrowLeftOutlined />}
          style={{
            borderRadius: 24,
            borderColor: "#e1bee7",
            background: "#f3e7fa",
            color: "#7b1fa2",
            fontWeight: 600,
          }}
        >
          Quay lại
        </Button>
      }
      style={{
        borderRadius: 18,
        boxShadow: "0 4px 18px rgba(123,31,162,0.10)",
        overflow: "hidden",
      }}
    >
      {!editMode ? (
        <>
          <Descriptions
            column={1}
            bordered
            size="middle"
            style={{ borderRadius: 12 }}
          >
            <Descriptions.Item label="ID">{category.id}</Descriptions.Item>
            <Descriptions.Item label="Tiêu đề">
              {category.tieuDe}
            </Descriptions.Item>
            <Descriptions.Item label="Nội dung">
              {category.noidung}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {trangThaiText(category.trangThai)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {formatDate(category.ngayTao)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {formatDate(category.ngayCapNhat)}
            </Descriptions.Item>
          </Descriptions>
          <div style={{ textAlign: "right", marginTop: 28 }}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setEditMode(true)}
              style={{
                borderRadius: 24,
                fontWeight: 600,
                background: "#7b1fa2",
                borderColor: "#7b1fa2",
                padding: "0 32px",
                height: 40,
              }}
            >
              Chỉnh sửa
            </Button>
          </div>
        </>
      ) : (
        <Form
          layout="vertical"
          form={form}
          onFinish={handleUpdate}
          style={{
            marginTop: 32,
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Form.Item name="tieuDe" label="Tiêu đề" rules={[{ required: true }]}>
            <Input
              style={{
                borderRadius: 18,
                height: 38,
                border: "1px solid #e1bee7",
              }}
            />
          </Form.Item>
          <Form.Item name="noidung" label="Nội dung">
            <Input.TextArea
              rows={4}
              style={{ borderRadius: 18, border: "1px solid #e1bee7" }}
            />
          </Form.Item>
          <Form.Item>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}
            >
              <Button
                htmlType="submit"
                type="primary"
                icon={<SaveOutlined />}
                style={{
                  borderRadius: 24,
                  background: "#7b1fa2",
                  borderColor: "#7b1fa2",
                  fontWeight: 600,
                  minWidth: 100,
                  height: 38,
                }}
              >
                Lưu
              </Button>
              <Button
                onClick={() => setEditMode(false)}
                icon={<CloseOutlined />}
                style={{
                  borderRadius: 24,
                  background: "#fff",
                  color: "#7b1fa2",
                  borderColor: "#e1bee7",
                  fontWeight: 600,
                  minWidth: 100,
                  height: 38,
                }}
              >
                Hủy
              </Button>
            </div>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
}
