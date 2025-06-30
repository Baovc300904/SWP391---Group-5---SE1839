import React, { useEffect, useState } from "react";
import { Card, Descriptions, Form, Input, Button, message } from "antd";
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
      await updateBlogCategory(id, values);
      message.success("Cập nhật thành công");
      setEditMode(false);
      fetchData();
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!category) return <Card loading={loading} />;

  return (
    <Card
      title={`Chi tiết danh mục: ${category.tieude}`}
      style={{ maxWidth: 700, margin: "40px auto" }}
      extra={<Button onClick={() => navigate(-1)}>Quay lại</Button>}
    >
      {!editMode ? (
        <>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Tiêu đề">
              {category.tieude}
            </Descriptions.Item>
            <Descriptions.Item label="Nội dung">
              {category.noidung}
            </Descriptions.Item>
          </Descriptions>
          <div style={{ textAlign: "right", marginTop: 24 }}>
            <Button type="primary" onClick={() => setEditMode(true)}>
              Chỉnh sửa
            </Button>
          </div>
        </>
      ) : (
        <Form
          layout="vertical"
          form={form}
          onFinish={handleUpdate}
          style={{ marginTop: 24 }}
        >
          <Form.Item name="tieude" label="Tiêu đề" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="noidung" label="Nội dung">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" style={{ marginRight: 8 }}>
              Lưu
            </Button>
            <Button onClick={() => setEditMode(false)}>Hủy</Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
}
