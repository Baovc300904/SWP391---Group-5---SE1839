import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Typography,
  Tag,
  notification,
  Spin,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Pagination,
} from "antd";
import {
  getDonationRequests,
  cancelRequest,
  updateRequest,
} from "../../services/donationService";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

const loaiHienMap = {
  toanphan: { label: "Toàn Phần", color: "blue" },
  huyettuong: { label: "Huyết Tương", color: "green" },
  hongcau: { label: "Hồng Cầu", color: "orange" },
  tieucau: { label: "Tiểu Cầu", color: "purple" },
};

const trangThaiOptions = [
  { value: "", label: "Tất cả" },
  { value: "dangcho", label: "Đang chờ" },
  { value: "xacnhan", label: "Đã xác nhận" },
  { value: "dahien", label: "Đã hiến" },
  { value: "huy", label: "Đã hủy" },
  { value: "tuchoi", label: "Từ chối" },
];

export default function BloodDonationRequests() {
  const [donationRequests, setDonationRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterTrangThai, setFilterTrangThai] = useState("");
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // Lấy danh sách yêu cầu hiến máu theo trang và filter trạng thái
  const fetchDonationRequests = async (
    currentPage = page,
    trangThai = filterTrangThai
  ) => {
    setLoading(true);
    try {
      // Truyền filterTrangThai nếu API có support, nếu không bỏ đi
      const res = await getDonationRequests(currentPage, trangThai, "");
      setDonationRequests(res.content || []);
      setTotal(res.totalElements || 0);
      setPage(res.pageable?.pageNumber + 1 || 1); // vì API trả pageNumber từ 0
      setPageSize(res.pageable?.pageSize || 10);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description:
          error.message || "Không thể tải danh sách yêu cầu hiến máu!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRequest = async (id) => {
    try {
      await cancelRequest(id);
      notification.success({
        message: "Yêu cầu hiến máu đã bị hủy thành công!",
      });
      fetchDonationRequests(page, filterTrangThai);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description:
          error.message || "Đã xảy ra lỗi khi hủy yêu cầu. Vui lòng thử lại.",
      });
    }
  };

  const handleEditRequest = (item) => {
    setSelectedRequest(item);
    form.setFieldsValue({
      ngayHienMauDuKien: item.ngayHienMauDuKien
        ? moment(item.ngayHienMauDuKien)
        : null,
      ngayPhucHoiGanNhat: item.ngayPhucHoiGanNhat
        ? moment(item.ngayPhucHoiGanNhat)
        : null,
      ghiChu: item.ghiChu,
      loaiHien: item.loaiHien,
      soLuong: item.soLuong,
      sucKhoeHienTai: item.sucKhoeHienTai || "",
      dangMangThai: item.dangMangThai,
      macBenhTruyenNhiem: item.macBenhTruyenNhiem,
    });
    setVisible(true);
  };

  const handleUpdateRequest = async (values) => {
    try {
      const updatedData = {
        id: selectedRequest.id,
        ngayHienMauDuKien: values.ngayHienMauDuKien.format("YYYY-MM-DD"),
        ngayPhucHoiGanNhat: values.ngayPhucHoiGanNhat.format("YYYY-MM-DD"),
        ghiChu: values.ghiChu,
        loaiHien: values.loaiHien,
        trangThai: "dangcho",
        soLuong: values.soLuong,
        sucKhoeHienTai: values.sucKhoeHienTai,
        dangMangThai: Number(values.dangMangThai),
        macBenhTruyenNhiem: Number(values.macBenhTruyenNhiem),
      };
      await updateRequest(updatedData);
      notification.success({
        message: "Cập nhật yêu cầu hiến máu thành công!",
      });
      setVisible(false);
      fetchDonationRequests(page, filterTrangThai);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description:
          error.message ||
          "Đã xảy ra lỗi khi cập nhật yêu cầu. Vui lòng thử lại.",
      });
    }
  };

  useEffect(() => {
    fetchDonationRequests(1, filterTrangThai);
    // eslint-disable-next-line
  }, [filterTrangThai]);

  useEffect(() => {
    fetchDonationRequests(page, filterTrangThai);
    // eslint-disable-next-line
  }, [page]);

  // Khi chọn filter trạng thái sẽ reset về trang 1
  const handleFilterChange = (value) => {
    setFilterTrangThai(value);
    setPage(1);
  };

  return (
    <div
      style={{
        padding: "60px 20px",
        background: "linear-gradient(to right, #ffffff, #e3f2fd)",
        minHeight: "100vh",
      }}
    >
      <Title
        level={2}
        style={{
          textAlign: "center",
          color: "#1976d2",
          marginBottom: 40,
        }}
      >
        Danh sách yêu cầu hiến máu
      </Title>

      {/* Bộ lọc trạng thái */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col>
          <Select
            value={filterTrangThai}
            onChange={handleFilterChange}
            style={{ width: 200 }}
          >
            {trangThaiOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
              gap: "20px",
              paddingBottom: "40px",
            }}
          >
            {donationRequests.map((item) => (
              <Card
                key={item.id}
                style={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                }}
                title={`Ngày hiến: ${item.ngayHienMauDuKien}`}
              >
                <div>
                  <Tag color={loaiHienMap[item.loaiHien]?.color || "default"}>
                    {loaiHienMap[item.loaiHien]?.label || item.loaiHien}
                  </Tag>
                  <Tag color="gold">{item.soLuong} ml</Tag>
                  <Tag
                    color={
                      item.trangThai === "dangcho"
                        ? "orange"
                        : item.trangThai === "xacnhan"
                        ? "blue"
                        : item.trangThai === "dahien"
                        ? "green"
                        : item.trangThai === "huy"
                        ? "red"
                        : item.trangThai === "tuchoi"
                        ? "gray"
                        : "default"
                    }
                  >
                    {item.trangThai === "dangcho"
                      ? "Đang chờ"
                      : item.trangThai === "xacnhan"
                      ? "Đã xác nhận"
                      : item.trangThai === "dahien"
                      ? "Đã hiến"
                      : item.trangThai === "huy"
                      ? "Đã hủy"
                      : item.trangThai === "tuchoi"
                      ? "Từ chối"
                      : "Không xác định"}
                  </Tag>
                </div>
                <p>
                  <strong>Ghi chú:</strong> {item.ghiChu}
                </p>
                <p>
                  <strong>Người duyệt:</strong>{" "}
                  {item.nguoiDuyet ? item.nguoiDuyet.ten : "Chưa duyệt"}
                </p>
                <p>
                  <strong>Người hiến:</strong> {item.nguoiHien.ten}
                </p>
                <p>
                  <strong>Sức khoẻ hiện tại:</strong>{" "}
                  {item.sucKhoeHienTai ?? "Chưa cập nhật"}
                </p>
                <p>
                  <strong>Đang mang thai:</strong>{" "}
                  {item.dangMangThai === 1 ? "Có" : "Không"}
                </p>
                <p>
                  <strong>Mắc bệnh truyền nhiễm:</strong>{" "}
                  {item.macBenhTruyenNhiem === 1 ? "Có" : "Không"}
                </p>
                <Button
                  type="danger"
                  onClick={() => handleCancelRequest(item.id)}
                  style={{
                    borderRadius: "12px",
                    padding: "8px 16px",
                    background:
                      item.trangThai !== "dangcho" ? "grey" : "#d48806",
                    color: "white",
                  }}
                  disabled={item.trangThai !== "dangcho"}
                >
                  Hủy yêu cầu
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleEditRequest(item)}
                  style={{
                    marginLeft: "10px",
                    borderRadius: "12px",
                    padding: "8px 16px",
                  }}
                  disabled={item.trangThai !== "dangcho"}
                >
                  Cập nhật
                </Button>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={total}
              onChange={(p, size) => {
                setPage(p);
                setPageSize(size);
              }}
              showSizeChanger={false}
            />
          </div>
        </>
      )}

      {/* Modal Form Cập nhật yêu cầu hiến máu */}
      <Modal
        title="Cập nhật yêu cầu hiến máu"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={700}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateRequest}
          initialValues={{
            hoatDongHienMauId: selectedRequest?.hoatDongHienMauId,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ngày hiến máu dự kiến"
                name="ngayHienMauDuKien"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày hiến máu!" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày phục hồi gần nhất"
                name="ngayPhucHoiGanNhat"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày phục hồi!" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Loại hiến máu"
                name="loaiHien"
                rules={[
                  { required: true, message: "Vui lòng chọn loại hiến máu!" },
                ]}
              >
                <Select placeholder="Chọn loại hiến máu">
                  <Option value="toanphan">Toàn Phần</Option>
                  <Option value="hongcau">Hồng Cầu</Option>
                  <Option value="tieucau">Tiểu Cầu</Option>
                  <Option value="huyettuong">Huyết Tương</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số lượng máu hiến"
                name="soLuong"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn số lượng máu hiến!",
                  },
                ]}
              >
                <Select>
                  <Option value={350}>350 ml</Option>
                  <Option value={250}>250 ml</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Sức khoẻ hiện tại"
                name="sucKhoeHienTai"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tình trạng sức khoẻ!",
                  },
                ]}
              >
                <Input placeholder="Nhập tình trạng sức khoẻ..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Đang mang thai"
                name="dangMangThai"
                rules={[{ required: true, message: "Vui lòng chọn!" }]}
              >
                <Select placeholder="Chọn">
                  <Option value={1}>Có</Option>
                  <Option value={0}>Không</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Mắc bệnh truyền nhiễm"
                name="macBenhTruyenNhiem"
                rules={[{ required: true, message: "Vui lòng chọn!" }]}
              >
                <Select placeholder="Chọn">
                  <Option value={1}>Có</Option>
                  <Option value={0}>Không</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Ghi chú" name="ghiChu">
                <Input.TextArea placeholder="Nhập ghi chú nếu có..." />
              </Form.Item>
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              height: 48,
              borderRadius: 30,
              background: "#2196f3",
              borderColor: "#2196f3",
              fontSize: 16,
              fontWeight: 600,
              marginTop: 16,
            }}
          >
            Cập nhật
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
