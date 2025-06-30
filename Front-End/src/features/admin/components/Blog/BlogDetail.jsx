import React, { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Form,
  Input,
  Button,
  Select,
  Upload,
  Image,
  message,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogDetail, updateBlog } from "../../services/blogService";
import { getBlogCategories } from "../../services/blogCategoryService";
import { UploadOutlined } from "@ant-design/icons";
import MySlateEditor from "../MySlateEditor";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch blog & categories
  const fetchData = async () => {
    try {
      const [detail, cat] = await Promise.all([
        getBlogDetail(id),
        getBlogCategories(),
      ]);
      setBlog(detail);
      setCategories(cat);
    } catch {
      message.error("Lỗi khi tải dữ liệu");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Set fields value when edit mode ON
  useEffect(() => {
    if (editMode && blog) {
      form.setFieldsValue({
        tieude: blog.tieude,
        noidung: blog.noidung,
        danhmuc: blog.danhmuc?.id,
        anh: [],
      });
    }
  }, [editMode, blog, form]);

  const handleUpdate = async (values) => {
    try {
      const formData = new FormData();
      formData.append("tieude", values.tieude);
      formData.append("noidung", values.noidung);
      formData.append("danhmuc", values.danhmuc);
      if (values.anh?.[0]?.originFileObj) {
        formData.append("anh", values.anh[0].originFileObj);
      }

      await updateBlog(id, formData);
      message.success("Cập nhật thành công");
      setEditMode(false);
      fetchData();
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  if (!blog) return <Card loading />;

  return (
    <Card
      title={`Chi tiết blog: ${blog.tieude}`}
      style={{ maxWidth: 900, margin: "40px auto" }}
      extra={<Button onClick={() => navigate(-1)}>Quay lại</Button>}
    >
      {!editMode ? (
        <>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Tiêu đề">{blog.tieude}</Descriptions.Item>
            <Descriptions.Item label="Danh mục">
              {blog.danhmuc?.tieude}
            </Descriptions.Item>
            <Descriptions.Item label="Ảnh">
              {blog.anh ? (
                <Image
                  src={`http://localhost:8080/${blog.anh}`}
                  alt="Ảnh blog"
                  width={200}
                />
              ) : (
                <i>Chưa có ảnh</i>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Nội dung">
              {/* Hiển thị nội dung blog, có thể dùng component Slate readonly nếu muốn đẹp hơn */}
              <div style={{ padding: 8, background: "#fafafa" }}>
                {/* Nếu blog.noidung là HTML string thì dùng dangerouslySetInnerHTML,
                    Nếu là JSON Slate thì parse rồi dùng Slate readonly component */}
                <span>
                  {typeof blog.noidung === "string" &&
                  blog.noidung.startsWith("[") ? (
                    "Nội dung dạng Slate (JSON). Hiện bạn có thể viết component render readonly cho đẹp hơn."
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: blog.noidung }} />
                  )}
                  {/* Để chuẩn nhất, nên viết 1 SlateReadonly render JSON Slate, hoặc giữ như trên */}
                </span>
              </div>
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
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          style={{ marginTop: 24 }}
          preserve={false}
        >
          <Form.Item
            name="tieude"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="noidung"
            label="Nội dung"
            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
          >
            <MySlateEditor />
          </Form.Item>
          <Form.Item
            name="anh"
            label="Ảnh"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload beforeUpload={() => false} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="danhmuc"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.tieude,
              }))}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" style={{ marginRight: 8 }}>
              Lưu thay đổi
            </Button>
            <Button onClick={() => setEditMode(false)}>Hủy</Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
}
