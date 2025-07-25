import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Spin,
  Tag,
  message,
  Row,
  Col,
  Tooltip,
  Space,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  ManOutlined,
  WomanOutlined,
  InfoCircleOutlined,
  HeartTwoTone,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { getUsersNearMe } from "../../services/userService";

const genderMap = {
  nam: { icon: <ManOutlined />, label: "Nam", color: "#2196f3" },
  nu: { icon: <WomanOutlined />, label: "Nữ", color: "#e91e63" },
  khac: { icon: <InfoCircleOutlined />, label: "Khác", color: "#757575" },
};

export default function UserNearMe() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsersNearMe();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      message.error(
        e?.response?.data?.message || "Lỗi lấy danh sách người dùng gần bạn!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <h3 style={{ margin: "8px 0 24px 0", fontWeight: 600 }}>
        <span role="img" aria-label="search">
          🔍
        </span>{" "}
        Người dùng gần bạn
      </h3>
      {loading ? (
        <Spin style={{ display: "block", margin: "48px auto" }} size="large" />
      ) : users.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, fontStyle: "italic" }}>
          Không tìm thấy người dùng nào gần bạn.
        </div>
      ) : (
        <Row gutter={[20, 20]}>
          {users.map((user) => (
            <Col
              key={user.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              style={{ display: "flex" }}
            >
              <Card
                style={{
                  borderRadius: 16,
                  width: "100%",
                  minHeight: 210,
                  background: "#fafcff",
                  boxShadow: "0 2px 12px rgba(44,62,80,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                styles={{ body: { padding: 20 } }}
              >
                <Space direction="vertical" size={4} style={{ width: "100%" }}>
                  <Space align="center">
                    <Avatar
                      size={56}
                      icon={<UserOutlined />}
                      style={{
                        background: "#E1BEE7",
                        color: "#6A1B9A",
                        marginRight: 6,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 17,
                          color: "#6A1B9A",
                        }}
                      >
                        {user.ten}
                      </div>
                      <div>
                        {user.nhomMau && (
                          <Tag color="magenta" style={{ marginBottom: 3 }}>
                            Nhóm máu: {user.nhomMau.ten}
                            {user.yeuToRh}
                          </Tag>
                        )}
                        {typeof user.distance !== "undefined" && (
                          <Tag color="blue" style={{ marginBottom: 3 }}>
                            Cách bạn: {parseFloat(user.distance).toFixed(2)} km
                          </Tag>
                        )}
                      </div>
                    </div>
                  </Space>
                  <div style={{ marginTop: 8 }}>
                    <MailOutlined style={{ marginRight: 6 }} />
                    <span>{user.email}</span>
                  </div>
                  <div>
                    <PhoneOutlined style={{ marginRight: 6 }} />
                    <span>{user.soDienThoai}</span>
                  </div>
                  <div>
                    <Tooltip title="Giới tính">
                      <span>
                        {genderMap[user.gioiTinh]?.icon}{" "}
                        <Tag color={genderMap[user.gioiTinh]?.color || "#ccc"}>
                          {genderMap[user.gioiTinh]?.label ||
                            user.gioiTinh ||
                            "?"}
                        </Tag>
                      </span>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="Tiền sử bệnh">
                      <HeartTwoTone twoToneColor="#eb2f96" />{" "}
                      {user.tienSuBenh || <span>Không có</span>}
                    </Tooltip>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
