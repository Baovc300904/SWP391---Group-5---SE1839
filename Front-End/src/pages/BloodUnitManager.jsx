import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Table,
  Tag,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  cancelBloodUnitWarehouse,
  getBloodUnitWarehouses,
  testedBloodUnitWarehouse,
} from "../services/unitBloodService";

// Mapping status
const statusMap = {
  sansang: { text: "Sẵn sàng", color: "gold" },
  dasudung: { text: "Đã sử dụng", color: "green" },
  huybo: { text: "Hủy bỏ", color: "red" },
  choxetnghiem: { text: "Chờ xét nghiệm", color: "blue" },
};

export default function BloodUnitWarehouseList() {
  const [bloodUnits, setBloodUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // "cancel" or "test"
  const [selectedBloodUnit, setSelectedBloodUnit] = useState(null);
  const [form] = Form.useForm();
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Fetch blood units
  const fetchBloodUnits = async (page, status = "") => {
    setLoading(true);
    try {
      const params = { page, size: 10 };
      if (status) params.status = status;
      const data = await getBloodUnitWarehouses(params);
      setBloodUnits(data.content || []);
      setTotal(data.totalElements || 0);
    } catch (e) {
      message.error(
        e?.response?.data?.message || "Lỗi lấy danh sách kho đơn vị máu"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBloodUnits(page, statusFilter);
  }, [page, statusFilter]);

  // Filter menu
  const filterMenu = {
    items: [
      {
        key: "all",
        label: "Tất cả",
        onClick: () => {
          setStatusFilter("");
          setPage(1);
        },
      },
      {
        key: "sansang",
        label: "Sẵn sàng",
        onClick: () => {
          setStatusFilter("sansang");
          setPage(1);
        },
      },
      {
        key: "dasudung",
        label: "Đã sử dụng",
        onClick: () => {
          setStatusFilter("dasudung");
          setPage(1);
        },
      },
      {
        key: "huybo",
        label: "Hủy bỏ",
        onClick: () => {
          setStatusFilter("huybo");
          setPage(1);
        },
      },
      {
        key: "choxetnghiem",
        label: "Chờ xét nghiệm",
        onClick: () => {
          setStatusFilter("choxetnghiem");
          setPage(1);
        },
      },
    ],
  };

  const handleCancelBloodUnit = async (values) => {
    setLoading(true);
    try {
      await cancelBloodUnitWarehouse(selectedBloodUnit.id, {
        ghiChu: values.ghiChu,
      });
      message.success("Đơn vị máu đã bị hủy!");
      setModalVisible(false);
      fetchBloodUnits(page, statusFilter);
    } catch (e) {
      message.error(e?.response?.data?.message || "Hủy đơn vị máu thất bại!");
    } finally {
      setLoading(false);
    }
  };
  const handleTestBloodUnit = async (values) => {
    setLoading(true);
    try {
      const formattedDate = dayjs(values.ngayHetHan).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      await testedBloodUnitWarehouse(selectedBloodUnit.id, {
        ketQuaXetNghiem: values.ketQuaXetNghiem,
        ngayHetHan: formattedDate,
      });
      message.success("Xét nghiệm thành công!");
      setModalVisible(false);
      fetchBloodUnits(page, statusFilter);
    } catch (e) {
      message.error(e?.response?.data?.message || "Xét nghiệm thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "Nhóm máu",
      dataIndex: "nhomMau",
      render: (nhomMau) => nhomMau?.ten,
    },
    {
      title: "Ngày lấy máu",
      dataIndex: "ngayLayMau",
      render: (val) => (val ? new Date(val).toLocaleDateString("vi-VN") : "-"),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "ngayHetHan",
      render: (val) => (val ? new Date(val).toLocaleDateString("vi-VN") : "-"),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      render: (soLuong) => soLuong + " ml",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      render: (status) => (
        <Tag color={statusMap[status]?.color}>
          {statusMap[status]?.text || status}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          {/* Show Cancel and Test buttons only for 'Chờ xét nghiệm' status */}
          {record.trangThai === "choxetnghiem" && (
            <>
              <Tooltip title="Hủy đơn vị máu">
                <Button
                  icon={<CloseCircleOutlined />}
                  size="small"
                  onClick={() => {
                    setModalType("cancel");
                    setSelectedBloodUnit(record);
                    setModalVisible(true);
                    form.resetFields();
                  }}
                />
              </Tooltip>
              <Tooltip title="Xét nghiệm thành công">
                <Button
                  icon={<CheckCircleOutlined />}
                  size="small"
                  onClick={() => {
                    setModalType("test");
                    setSelectedBloodUnit(record);
                    setModalVisible(true);
                    form.resetFields();
                  }}
                />
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Card
      title="🩸 Danh sách kho đơn vị máu"
      extra={
        <Dropdown menu={filterMenu} trigger={["click"]}>
          <Button icon={<FilterOutlined />}>Lọc theo trạng thái</Button>
        </Dropdown>
      }
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={bloodUnits}
        pagination={{
          current: page,
          total: total,
          pageSize: 10,
          showSizeChanger: false,
          onChange: (newPage) => setPage(newPage),
        }}
        bordered={false}
        style={{ marginTop: 16 }}
      />

      {/* Modal for Cancel or Test */}
      <Modal
        title={
          modalType === "cancel" ? "Hủy đơn vị máu" : "Xét nghiệm thành công"
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
        width={500}
        style={{ borderRadius: 16 }}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={
            modalType === "cancel" ? handleCancelBloodUnit : handleTestBloodUnit
          }
        >
          {/* Cancel Note */}
          <Form.Item
            label={<span style={{ color: "#6200ea" }}>Ghi chú</span>}
            name="ghiChu"
            rules={[
              {
                required: modalType === "cancel",
                message: "Vui lòng nhập ghi chú!",
              },
            ]}
            style={{ display: modalType === "cancel" ? "block" : "none" }}
          >
            <Input.TextArea placeholder="Nhập ghi chú hủy" />
          </Form.Item>

          {/* Test Result */}
          <Form.Item
            label={<span style={{ color: "#6200ea" }}>Kết quả xét nghiệm</span>}
            name="ketQuaXetNghiem"
            rules={[
              {
                required: modalType === "test",
                message: "Vui lòng nhập kết quả xét nghiệm!",
              },
            ]}
            style={{ display: modalType === "test" ? "block" : "none" }}
          >
            <Input placeholder="Kết quả xét nghiệm" />
          </Form.Item>

          {/* Test Date */}
          <Form.Item
            label={<span style={{ color: "#6200ea" }}>Ngày hết hạn</span>}
            name="ngayHetHan"
            rules={[
              {
                required: modalType === "test",
                message: "Vui lòng nhập ngày hết hạn!",
              },
            ]}
            style={{ display: modalType === "test" ? "block" : "none" }}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              style={{
                width: "100%",
                borderRadius: 30,
                padding: "10px",
                border: "1px solid #f1cfd5",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                borderRadius: 30,
                backgroundColor: "#6200ea",
                borderColor: "#6200ea",
                height: "40px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {modalType === "cancel" ? "Hủy" : "Xét nghiệm thành công"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
