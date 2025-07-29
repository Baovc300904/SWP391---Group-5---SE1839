import { Card, Row, Col, Input, Tag, Button, Skeleton, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { getBlogs } from "../../services/blogService";
import { IMAGE_BASE_URL } from "../../variables/baseUrl";

export default function BlogTabUser() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  // Fetch blogs with pagination & search
  const fetchBlogs = async (page = 1, query = "") => {
    setLoading(true);
    try {
      // Nếu API hỗ trợ search & phân trang thì truyền vào params (ví dụ: { page, search })
      const res = await getBlogs({ page, keyword: query, size: 10 });
      setBlogs(res?.content || []);
      setTotal(res?.totalElements || 0);
      setCurrent(res?.number + 1 || 1);
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(current, search);
  }, [current, search]);

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          marginBottom: 22,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 24, color: "#7b1fa2" }}>
          📝 Bài viết - Chia sẻ kiến thức
        </span>
        <Input.Search
          placeholder="Tìm kiếm bài viết..."
          allowClear
          onSearch={setSearch}
          style={{ width: 260, borderRadius: 18 }}
        />
      </div>
      <Row gutter={[24, 24]}>
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <Col xs={24} md={12} lg={8} key={idx}>
                <Card
                  loading
                  bordered
                  style={{ borderRadius: 18, minHeight: 320 }}
                >
                  <Skeleton.Image style={{ width: "100%", height: 120 }} />
                  <Skeleton active paragraph={{ rows: 2 }} />
                </Card>
              </Col>
            ))
          : blogs.map((blog) => (
              <Col xs={24} md={12} lg={8} key={blog.id}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 18,
                    boxShadow: "0 4px 14px rgba(123,31,162,0.09)",
                    minHeight: 320,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  cover={
                    blog.anh ? (
                      <img
                        alt={blog.tieuDe}
                        src={
                          blog.anh.startsWith("http")
                            ? blog.anh
                            : `${IMAGE_BASE_URL}${blog.anh}`
                        }
                        style={{
                          borderTopLeftRadius: 18,
                          borderTopRightRadius: 18,
                          height: 160,
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: 160,
                          borderTopLeftRadius: 18,
                          borderTopRightRadius: 18,
                          background: "#f3e7fa",
                        }}
                      />
                    )
                  }
                  actions={[
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => navigate(`/user/blogs/${blog.id}`)}
                      style={{ color: "#7b1fa2", fontWeight: 600 }}
                    >
                      Xem chi tiết
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={
                      <span style={{ fontWeight: 700, color: "#7b1fa2" }}>
                        {blog.tieuDe}
                      </span>
                    }
                    description={
                      <>
                        <div style={{ minHeight: 48, margin: "8px 0" }}>
                          {(blog.noiDung || "")
                            .replace(/<[^>]+>/g, "") // remove HTML
                            .slice(0, 120)}
                          {blog.noiDung && blog.noiDung.length > 120
                            ? "..."
                            : ""}
                        </div>
                        <div>
                          {blog.danhMuc && (
                            <Tag color="purple">{blog.danhMuc.tieuDe}</Tag>
                          )}
                        </div>
                        <div
                          style={{ fontSize: 13, color: "#888", marginTop: 8 }}
                        >
                          {blog.ngayTao
                            ? new Date(blog.ngayTao).toLocaleDateString("vi-VN")
                            : ""}
                        </div>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
      </Row>
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <Pagination
          current={current}
          total={total}
          pageSize={10}
          showSizeChanger={false}
          onChange={setCurrent}
        />
      </div>
    </div>
  );
}
