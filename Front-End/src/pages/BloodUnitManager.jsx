import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Table,
  Tag,
  Tooltip,
  DatePicker,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  cancelBloodUnitWarehouse,
  getBloodUnitWarehouses,
  testedBloodUnitWarehouse,
} from "../services/unitBloodService";
import moment from "moment";

// Cập nhật lại statusMap theo phản hồi dữ liệu
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
  const navigate = useNavigate();

  const fetchBloodUnits = async () => {
    setLoading(true);
    try {
      const data = await getBloodUnitWarehouses({ status: "choxetnghiem" });
      setBloodUnits(data.content || []);
    } catch (e) {
      message.error(
        e?.response?.data?.message || "Lỗi lấy danh sách kho đơn vị máu"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBloodUnits();
  }, []);

  const handleCancelBloodUnit = async (values) => {
    setLoading(true);
    try {
      await cancelBloodUnitWarehouse(selectedBloodUnit.id, {
        ghiChu: values.ghiChu,
      });
      message.success("Đơn vị máu đã bị hủy!");
      setModalVisible(false);
      fetchBloodUnits(); // Refresh data
    } catch (e) {
      message.error(e?.response?.data?.message || "Hủy đơn vị máu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleTestBloodUnit = async (values) => {
    setLoading(true);
    try {
      const formattedDate = moment(values.ngayHetHan).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      await testedBloodUnitWarehouse(selectedBloodUnit.id, {
        ketQuaXetNghiem: values.ketQuaXetNghiem,
        ngayHetHan: formattedDate, // Submit date in the required format
      });
      message.success("Xét nghiệm thành công!");
      setModalVisible(false);
      fetchBloodUnits(); // Refresh data
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
      render: (nhomMau) => nhomMau.ten,
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      render: (val) => (val ? new Date(val).toLocaleString("vi-VN") : "-"),
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
        <Tag color={statusMap[status]?.color}>{statusMap[status]?.text}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          {/* <Tooltip title="Xem chi tiết">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() =>
                navigate(`/admin/blood-unit-warehouses/${record.id}`)
              }
            />
          </Tooltip> */}
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
    <>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={bloodUnits}
        pagination={false}
        bordered={false}
        style={{ marginTop: 16 }}
      />

      {/* Modal for Cancel or Test */}
      <Modal
        title={
          modalType === "cancel" ? "Hủy đơn vị máu" : "Xét nghiệm thành công"
        }
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
        width={500}
        style={{ borderRadius: 16 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={
            modalType === "cancel" ? handleCancelBloodUnit : handleTestBloodUnit
          }
        >
          {modalType === "cancel" && (
            <>
              <Form.Item
                label={<span style={{ color: "#6200ea" }}>Ghi chú</span>}
                name="ghiChu"
                rules={[{ required: true, message: "Vui lòng nhập ghi chú!" }]}
              >
                <Input.TextArea placeholder="Nhập ghi chú hủy" />
              </Form.Item>
            </>
          )}

          {modalType === "test" && (
            <>
              <Form.Item
                label={
                  <span style={{ color: "#6200ea" }}>Kết quả xét nghiệm</span>
                }
                name="ketQuaXetNghiem"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập kết quả xét nghiệm!",
                  },
                ]}
              >
                <Input placeholder="Kết quả xét nghiệm" />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#6200ea" }}>Ngày hết hạn</span>}
                name="ngayHetHan"
                rules={[
                  { required: true, message: "Vui lòng nhập ngày hết hạn!" },
                ]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  style={{
                    width: "100%",
                    borderRadius: 30,
                    padding: "10px",
                    border: "1px solid #f1cfd5",
                  }}
                />
              </Form.Item>
            </>
          )}

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
    </>
  );
}
