import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Form,
  DatePicker,
  notification,
  Modal,
  Select,
  Card,
  Typography,
  Pagination,
  Row,
  Col,
  Tag,
} from "antd";
import {
  createBloodReceiveRequest,
  getBloodReceiveRequests,
  updateBloodReceiveRequest,
  deleteBloodReceiveRequest,
} from "../../services/bloodReceiveRequestService";
import { getBloods } from "../../services/bloodService";
import moment from "moment";

const { Title } = Typography;

const BloodRequestPage = () => {
  const [form] = Form.useForm();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("dangcho");
  const [keyword, setKeyword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [bloodOptions, setBloodOptions] = useState([]);
  const [componentOptions] = useState([
    { value: "toanphan", label: "Toàn phần" },
    { value: "hongcau", label: "Hồng cầu" },
    { value: "tieucau", label: "Tiểu cầu" },
    { value: "huyettuong", label: "Huyết tương" },
  ]);

  const [editingRequest, setEditingRequest] = useState(null); // State for the request being edited
  const [isUpdating, setIsUpdating] = useState(false); // Track if it's for updating

  // Fetch blood types
  useEffect(() => {
    async function fetchBloodTypes() {
      try {
        const res = await getBloods();
        const resMapped =
          res.map((item) => ({ value: item.id, label: item.ten })) || [];
        setBloodOptions(resMapped);
      } catch {
        notification.error({
          message: "Lỗi",
          description: "Không thể tải danh sách nhóm máu!",
        });
      }
    }
    fetchBloodTypes();
  }, []);

  // Fetch requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = { page, status, keyword, size: pageSize };
      const data = await getBloodReceiveRequests(params);
      setRequests(data.content);
      setTotal(data.totalElements);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: error.message || "Không thể tải yêu cầu nhận máu!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [status, keyword, page, pageSize]);

  const handleUpdate = (request) => {
    setEditingRequest(request); // Set the request to be edited
    setIsUpdating(true); // Set flag to indicate it's for updating

    // Open the modal and set initial values for the form
    form.setFieldsValue({
      diaChiNhanMau: request.diaChiNhanMau,
      ngayNhanMauDuKien: request.ngayNhanMauDuKien
        ? moment(request.ngayNhanMauDuKien)
        : null,
      nhomMau: request.nhomMau?.id,
      soLuongDonVi: request.soLuongDonVi,
      thanhPhanMauCan: request.thanhPhanMauCan,
      lyDo: request.lyDo,
      sucKhoeHienTai: request.sucKhoeHienTai,
      dangMangThai: request.dangMangThai,
      macBenhTruyenNhiem: request.macBenhTruyenNhiem,
    });

    setIsModalVisible(true); // Open the modal
  };

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      ngayNhanMauDuKien: values.ngayNhanMauDuKien.format("YYYY-MM-DD"), // Format the date correctly
      soLuongDonVi: Number(values.soLuongDonVi),
    };

    try {
      if (isUpdating) {
        await updateBloodReceiveRequest(editingRequest.id, formattedValues); // Update existing request
        notification.success({ message: "Yêu cầu nhận máu đã được cập nhật!" });
      } else {
        await createBloodReceiveRequest(formattedValues); // Create new request
        notification.success({ message: "Yêu cầu nhận máu đã được tạo!" });
      }
      form.resetFields();

      setIsModalVisible(false);
      fetchRequests();
      setEditingRequest(null); // Reset editing request
      setIsUpdating(false); // Reset the update flag
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: error.message || "Không thể tạo yêu cầu nhận máu!",
      });
    }
  };

  // Handle cancel request
  const handleCancelRequest = async (id) => {
    try {
      await deleteBloodReceiveRequest(id); // Trigger cancel API
      notification.success({
        message: "Yêu cầu nhận máu đã được hủy!",
      });
      fetchRequests();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: error.message || "Không thể hủy yêu cầu!",
      });
    }
  };

  // Render requests as cards
  const renderRequests = () => {
    return (
      <Row gutter={[16, 16]}>
        {requests.map((request) => (
          <Col key={request.id} span={8} style={{ display: "flex" }}>
            <Card
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 16px rgba(233, 30, 99, 0.08)",
                background: "#fff",
                width: "100%",
                height: "100%",
                display: "flex",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Title level={4} style={{ margin: 0 }}>
                      {request.diaChiNhanMau}
                    </Title>
                    <span style={{ color: "#b71c1c", fontWeight: 600 }}>
                      {request?.ngayNhanMauDuKien}
                    </span>
                  </div>

                  <div
                    style={{ display: "flex", gap: "32px", marginBottom: 6 }}
                  >
                    <p>
                      <strong>Nhóm máu:</strong> {request.nhomMau?.ten}
                    </p>
                    <p>
                      <strong>Thành phần máu:</strong>{" "}
                      <Tag color="cyan">
                        {
                          componentOptions.find(
                            (option) => option.value === request.thanhPhanMauCan
                          )?.label
                        }
                      </Tag>
                    </p>
                  </div>

                  <div
                    style={{ display: "flex", gap: "32px", marginBottom: 6 }}
                  >
                    <p>
                      <strong>Đang mang thai:</strong>{" "}
                      {request.dangMangThai === 1 ? "Có" : "Không"}
                    </p>
                    <p>
                      <strong>Mắc bệnh truyền nhiễm:</strong>{" "}
                      {request.macBenhTruyenNhiem === 1 ? "Có" : "Không"}
                    </p>
                  </div>
                  <div
                    style={{ display: "flex", gap: "32px", marginBottom: 6 }}
                  >
                    <p>
                      <strong>Số lượng:</strong> {request.soLuongDonVi} ml
                    </p>
                    <p>
                      <strong>Trạng thái:</strong>{" "}
                      <Tag color={getStatusColor(request.trangThai)}>
                        {getStatusLabel(request.trangThai)}
                      </Tag>
                    </p>
                  </div>
                  <p>
                    <strong>Sức khỏe hiện tại:</strong>{" "}
                    {request.sucKhoeHienTai || (
                      <i style={{ color: "#b0b0b0" }}>-</i>
                    )}
                  </p>
                  <p>
                    <strong>Lý do:</strong>{" "}
                    {request.lyDo || <i style={{ color: "#b0b0b0" }}>-</i>}
                  </p>
                </div>
                {/* Button group */}
                {request.trangThai === "dangcho" && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 8,
                    }}
                  >
                    <Button
                      type="danger"
                      onClick={() => handleCancelRequest(request.id)}
                      style={{
                        borderRadius: "12px",
                        padding: "8px 16px",
                        background:
                          request.trangThai !== "dangcho" ? "grey" : "#d48806",
                        color: "white",
                      }}
                      disabled={request.trangThai !== "dangcho"}
                    >
                      Hủy yêu cầu
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => handleUpdate(request)}
                      style={{
                        marginLeft: "10px",
                        borderRadius: "12px",
                        padding: "8px 16px",
                      }}
                      disabled={request.trangThai !== "dangcho"}
                    >
                      Cập nhật
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "dangcho":
        return "orange"; // Pending
      case "xacnhan":
        return "green"; // Confirmed
      case "tuchoi":
        return "red"; // Rejected
      case "dahien":
        return "blue"; // Donated
      default:
        return "gray"; // Default
    }
  };

  // Function to get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case "dangcho":
        return "Đang chờ";
      case "xacnhan":
        return "Đã xác nhận";
      case "tuchoi":
        return "Từ chối";
      case "dahien":
        return "Đã hiến";
      default:
        return "Chưa xác định";
    }
  };

  // Pagination handler
  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  // Show modal form
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRequest(null); // Reset editing request
    setIsUpdating(false); // Reset update flag
  };

  useEffect(() => {
    if (editingRequest === null) form.resetFields();
  }, [editingRequest]);

  return (
    <div style={{ padding: "20px" }}>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: "rgb(74, 20, 140)",
          borderColor: "rgb(74, 20, 140)",
          color: "#fff",
          marginBottom: 20,
        }}
      >
        Yêu cầu nhận máu
      </Button>

      {/* Search bar for filtering requests */}
      <div style={{ marginBottom: 20 }}>
        <Select
          value={status}
          onChange={(value) => setStatus(value)}
          style={{ width: 120, marginRight: 10 }}
        >
          <Select.Option value="dangcho">Đang chờ</Select.Option>
          <Select.Option value="xacnhan">Đã xác nhận</Select.Option>
          <Select.Option value="tuchoi">Từ chối</Select.Option>
          <Select.Option value="dahien">Đã hiến</Select.Option>
        </Select>

        <Input
          placeholder="Tìm kiếm theo lý do"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 200 }}
        />
      </div>

      {/* Render requests */}
      {renderRequests()}

      {/* Pagination */}
      <Pagination
        current={page}
        total={total}
        pageSize={pageSize}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={["5", "10", "20", "50"]}
        style={{ marginTop: 12 }}
      />

      {/* Modal form */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={780}
      >
        <Title level={3} style={{ color: "#1976d2", textAlign: "center" }}>
          {editingRequest ? "Chỉnh sửa yêu cầu nhận máu" : "Yêu cầu nhận máu"}
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginBottom: 20 }}
        >
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label={
                  <span style={{ color: "#1976d2" }}>Thành phần máu cần</span>
                }
                name="thanhPhanMauCan"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thành phần máu cần!",
                  },
                ]}
              >
                <Select options={componentOptions} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label={
                  <span style={{ color: "#1976d2" }}>
                    Ngày nhận máu dự kiến
                  </span>
                }
                name="ngayNhanMauDuKien"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày nhận máu!" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#1976d2" }}>Nhóm máu</span>}
                name="nhomMau"
                rules={[{ required: true, message: "Vui lòng chọn nhóm máu!" }]}
              >
                <Select options={bloodOptions} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#1976d2" }}>Đang mang thai</span>}
                name="dangMangThai"
                rules={[{ required: true, message: "Vui lòng chọn!" }]}
              >
                <Select style={{ width: "100%" }}>
                  <Select.Option value={1}>Có</Select.Option>
                  <Select.Option value={0}>Không</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <span style={{ color: "#1976d2" }}>
                    Mắc bệnh truyền nhiễm
                  </span>
                }
                name="macBenhTruyenNhiem"
                rules={[{ required: true, message: "Vui lòng chọn!" }]}
              >
                <Select style={{ width: "100%" }}>
                  <Select.Option value={1}>Có</Select.Option>
                  <Select.Option value={0}>Không</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <span style={{ color: "#1976d2" }}>Số lượng đơn vị máu</span>
                }
                name="soLuongDonVi"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng đơn vị máu!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập số lượng đơn vị"
                  style={{
                    borderRadius: 30,
                    height: 42,
                    paddingLeft: 20,
                    backgroundColor: "#fefefe",
                    border: "1px solid #bbdefb",
                  }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <span style={{ color: "#1976d2" }}>Địa chỉ nhận máu</span>
                }
                name="diaChiNhanMau"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ nhận máu!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập địa chỉ nhận máu"
                  style={{
                    borderRadius: 30,
                    height: 42,
                    paddingLeft: 20,
                    backgroundColor: "#fefefe",
                    border: "1px solid #bbdefb",
                  }}
                />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#1976d2" }}>Lý do</span>}
                name="lyDo"
                rules={[{ required: true, message: "Vui lòng nhập lý do!" }]}
              >
                <Input
                  placeholder="Nhập lý do"
                  style={{
                    borderRadius: 30,
                    height: 42,
                    paddingLeft: 20,
                    backgroundColor: "#fefefe",
                    border: "1px solid #bbdefb",
                  }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <span style={{ color: "#1976d2" }}>Sức khỏe hiện tại</span>
                }
                name="sucKhoeHienTai"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập sức khỏe hiện tại!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập tình trạng sức khỏe"
                  style={{
                    borderRadius: 30,
                    height: 42,
                    paddingLeft: 20,
                    backgroundColor: "#fefefe",
                    border: "1px solid #bbdefb",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ textAlign: "center", marginTop: 12 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                borderRadius: 30,
                height: 42,
                minWidth: 160,
                background: "#1976d2",
                borderColor: "#1976d2",
                fontWeight: "bold",
              }}
            >
              {editingRequest ? "Cập nhật" : "Yêu cầu nhận máu"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BloodRequestPage;
