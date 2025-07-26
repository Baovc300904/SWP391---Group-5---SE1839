import { Card, Tag, Button, Avatar, Divider } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogDetail } from "../../services/blogService";
import { IMAGE_BASE_URL } from "../../variables/baseUrl";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";

export default function BlogDetailUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlogDetail(id).then(setBlog);
  }, [id]);

  if (!blog)
    return <Card loading style={{ borderRadius: 18, margin: "32px auto" }} />;

  return (
    <Card
      style={{
        borderRadius: 22,
        boxShadow: "0 8px 30px rgba(123,31,162,0.07)",
        margin: "32px",
        overflow: "hidden",
        background: "#fff",
      }}
      bodyStyle={{ padding: 0 }}
      bordered={false}
      cover={
        blog.anh && (
          <img
            src={
              blog.anh.startsWith("http")
                ? blog.anh
                : `${IMAGE_BASE_URL}${blog.anh}`
            }
            alt={blog.tieuDe}
            style={{
              width: "100%",
              maxHeight: 340,
              objectFit: "cover",
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
              marginBottom: 0,
            }}
          />
        )
      }
      extra={
        <Button
          icon={<ArrowLeftOutlined />}
          style={{
            borderRadius: 20,
            background: "#f3e7fa",
            color: "#7b1fa2",
            fontWeight: 600,
            border: "none",
            margin: 16,
            position: "absolute",
            right: 0,
            top: 0,
          }}
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>
      }
    >
      <div style={{ padding: 32, paddingTop: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {blog.danhMuc && (
            <Tag color={blog.danhMuc.trangThai === 1 ? "purple" : "gray"}>
              {blog.danhMuc.tieuDe}
            </Tag>
          )}
          <span style={{ color: "#999", fontSize: 15, marginLeft: 6 }}>
            {blog.ngayTao
              ? new Date(blog.ngayTao).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : ""}
          </span>
        </div>

        <h1
          style={{
            fontWeight: 800,
            fontSize: 32,
            color: "#7b1fa2",
            margin: "10px 0 14px",
            lineHeight: 1.2,
            wordBreak: "break-word",
          }}
        >
          {blog.tieuDe}
        </h1>

        {/* Thông tin tác giả */}
        {/* <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar
            size={38}
            icon={<UserOutlined />}
            style={{
              background: "#e1bee7",
              color: "#7b1fa2",
              fontWeight: 700,
              fontSize: 20,
            }}
          />
          <span style={{ fontWeight: 600, color: "#7b1fa2", fontSize: 16 }}>
            {typeof blog.nguoiTao === "object"
              ? blog.nguoiTao?.ten || "Tác giả"
              : "Tác giả"}
          </span>
        </div> */}

        <Divider style={{ margin: "18px 0" }} />

        {/* Nội dung HTML */}
        <div
          style={{
            fontSize: 17,
            lineHeight: "1.7",
            color: "#222",
            minHeight: 160,
          }}
          className="blog-html-content"
          dangerouslySetInnerHTML={{ __html: blog.noiDung || "" }}
        />

        <Divider style={{ margin: "20px 0" }} />
        <div style={{ color: "#bbb", fontSize: 13, marginTop: 4 }}>
          Ngày cập nhật:{" "}
          <b>
            {blog.ngayCapNhat
              ? new Date(blog.ngayCapNhat).toLocaleString("vi-VN")
              : "-"}
          </b>
        </div>
      </div>
    </Card>
  );
}
