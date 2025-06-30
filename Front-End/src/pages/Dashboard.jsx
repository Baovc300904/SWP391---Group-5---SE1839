import { Card, Col, Row, Table, Tag, Progress } from "antd";
import {
  UserOutlined,
  ProjectOutlined,
  MessageOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const stats = [
  { title: "DONORS", value: 3, icon: <UserOutlined />, color: "#e91e63" },
  { title: "CAMPAIGNS", value: 3, icon: <ProjectOutlined />, color: "#00bcd4" },
  {
    title: "NEW COMMENTS",
    value: 36,
    icon: <MessageOutlined />,
    color: "#8bc34a",
  },
  {
    title: "NEW VISITORS",
    value: 87,
    icon: <TeamOutlined />,
    color: "#ff9800",
  },
];

const columns = [
  { title: "#", dataIndex: "key", width: 40 },
  { title: "Task", dataIndex: "name" },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      let color, txt;
      switch (status) {
        case "donating":
          color = "green";
          txt = "Donating";
          break;
        case "todo":
          color = "blue";
          txt = "To Do";
          break;
        case "hold":
          color = "gold";
          txt = "On Hold";
          break;
        case "approval":
          color = "orange";
          txt = "Wait Approval";
          break;
        case "suspended":
          color = "red";
          txt = "Suspended";
          break;
        default:
          color = "default";
          txt = status;
      }
      return <Tag color={color}>{txt}</Tag>;
    },
  },
  { title: "Admin", dataIndex: "admin" },
  {
    title: "Progress",
    dataIndex: "progress",
    render: (p) => (
      <Progress
        percent={p}
        showInfo={false}
        status={p < 100 ? "active" : "success"}
      />
    ),
  },
];

const data = [
  {
    key: 1,
    name: "Bảo",
    status: "donating",
    admin: "Code-Projects",
    progress: 80,
  },
  {
    key: 2,
    name: "Khoa",
    status: "todo",
    admin: "Code-Projects",
    progress: 15,
  },
  {
    key: 3,
    name: "Hiếu",
    status: "hold",
    admin: "Code-Projects",
    progress: 50,
  },
  {
    key: 4,
    name: "Tuấn",
    status: "approval",
    admin: "Code-Projects",
    progress: 35,
  },
  {
    key: 5,
    name: "Minh",
    status: "suspended",
    admin: "Code-Projects",
    progress: 0,
  },
];

export default function Dashboard() {
  return (
    <>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        {stats.map((item, i) => (
          <Col span={6} key={i}>
            <Card
              bordered={false}
              style={{ background: item.color, color: "#fff" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 28 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: "bold" }}>
                    {item.value}
                  </div>
                  <div>{item.title}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Card
        title="Current Blood Donation Info"
        bordered={false}
        style={{ marginTop: 24 }}
      >
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>
    </>
  );
}
