import {
  ArrowLeftOutlined,
  CloseOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Descriptions,
  Form,
  Image,
  Input,
  message,
  Select,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogCategories } from "../../services/blogCategoryService";
import { getBlogDetail, updateBlog } from "../../services/blogService";
import { IMAGE_BASE_URL } from "../../variables/baseUrl";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getBlogDetail(id);
      setBlog(data);
      form.setFieldsValue({
        tieude: data.tieuDe,
        noidung: data.noiDung,
        danhmuc: data.danhMuc?.id, // gán sẵn id danh mục hiện tại
      });
    } catch {
      message.error("Lỗi tải dữ liệu bài viết");
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await getBlogCategories();
      setCategories(res || []);
    } catch {
      message.error("Lỗi tải danh sách danh mục");
    }
  };
  const handleUpdate = async (values) => {
    try {
      await updateBlog(id, {
        ...values,
        tieuDe: values.tieuDe,
        noiDung: values.noiDung,
      });
      message.success("Cập nhật thành công");
      setEditMode(false);
      fetchData();
    } catch {
      message.error("Cập nhật thất bại");
    }
  };
  const handleEdit = () => {
    setEditMode(true);
    fetchCategories();
  };
  useEffect(() => {
    fetchData();
  }, [id]); // eslint-disable-line

  if (!blog) return <Card loading={loading} />;

  // Định nghĩa helper cho trạng thái
  const trangThaiText = (val) => {
    if (val === 1) return <Tag color="green">Kích hoạt</Tag>;
    if (val === 0) return <Tag color="red">Ẩn</Tag>;
    return val;
  };

  // Format ngày
  const formatDate = (val) =>
    val ? new Date(val).toLocaleString("vi-VN") : "";

  return (
    <Card
      title={
        <span style={{ fontWeight: 600, color: "#7b1fa2" }}>
          Chi tiết bài viết: {blog.tieuDe}
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
            <Descriptions.Item label="ID">{blog.id}</Descriptions.Item>
            <Descriptions.Item label="Tiêu đề">{blog.tieuDe}</Descriptions.Item>
            <Descriptions.Item label="Ảnh">
              {blog.anh ? (
                <Image
                  src={
                    blog.anh.startsWith("http")
                      ? blog.anh
                      : `${IMAGE_BASE_URL}${blog.anh}`
                  }
                  width={120}
                  style={{ borderRadius: 8 }}
                  alt="Ảnh blog"
                  preview
                />
              ) : (
                "-"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Danh mục">
              {blog.danhMuc ? (
                <Descriptions
                  column={1}
                  bordered
                  size="small"
                  style={{ margin: 0, background: "transparent" }}
                >
                  <Descriptions.Item label="ID">
                    {blog.danhMuc.id}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tiêu đề">
                    {blog.danhMuc.tieuDe}
                  </Descriptions.Item>
                  <Descriptions.Item label="Nội dung">
                    {blog.danhMuc.noidung}
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    {trangThaiText(blog.danhMuc.trangThai)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày tạo">
                    {formatDate(blog.danhMuc.ngayTao)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày cập nhật">
                    {formatDate(blog.danhMuc.ngayCapNhat)}
                  </Descriptions.Item>
                </Descriptions>
              ) : (
                "-"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Nội dung">
              {blog.noiDung}
            </Descriptions.Item>
            <Descriptions.Item label="Lượt xem">
              {blog.luotXem}
            </Descriptions.Item>
            <Descriptions.Item label="Người tạo">
              {blog.nguoiTao}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {trangThaiText(blog.trangThai)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {formatDate(blog.ngayTao)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {formatDate(blog.ngayCapNhat)}
            </Descriptions.Item>
          </Descriptions>

          <div style={{ textAlign: "right", marginTop: 28 }}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEdit}
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
          <Form.Item
            name="tieude"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tieuDe!" }]}
          >
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
          <Form.Item
            name="danhmuc"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select
              placeholder="Chọn danh mục"
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.tieuDe,
              }))}
              showSearch
              optionFilterProp="label"
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
