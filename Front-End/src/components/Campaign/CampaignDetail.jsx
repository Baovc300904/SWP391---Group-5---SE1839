import {
  Button,
  Card,
  DatePicker,
  Descriptions,
  Form,
  Input,
  InputNumber,
  message,
  Tag,
  Table,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCampaignDetail,
  updateCampaign,
} from "../../services/campaignService";

const statusLabels = {
  sapdienra: "Sắp diễn ra",
  dangdienra: "Đang diễn ra",
  daketthuc: "Đã kết thúc",
};

const statusColors = {
  sapdienra: "blue",
  dangdienra: "green",
  daketthuc: "gray",
};

// Map trạng thái yêu cầu hiến máu
const requestStatusMap = {
  dangcho: { label: "Đang chờ", color: "orange" },
  xacnhan: { label: "Đã xác nhận", color: "blue" },
  dahien: { label: "Đã hiến", color: "green" },
  huy: { label: "Đã hủy", color: "red" },
  tuchoi: { label: "Từ chối", color: "gray" },
};

const loaiHienMap = {
  toanphan: { label: "Toàn phần", color: "blue" },
  huyettuong: { label: "Huyết tương", color: "green" },
  hongcau: { label: "Hồng cầu", color: "orange" },
  tieucau: { label: "Tiểu cầu", color: "purple" },
};

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await getCampaignDetail(id);
      const found = res?.id
        ? res
        : res?.content?.find?.((c) => String(c.id) === id);
      if (found) {
        setCampaign(found);
        form.setFieldsValue({
          ...found,
          ngayBatDau: dayjs(found.ngayBatDau),
          ngayKetThuc: dayjs(found.ngayKetThuc),
        });
      }
    } catch {
      message.error("Không lấy được dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
    // eslint-disable-next-line
  }, [id]);

  const handleUpdate = async (values) => {
    try {
      await updateCampaign(id, {
        ...values,
        ngayBatDau: values.ngayBatDau.format("YYYY-MM-DD"),
        ngayKetThuc: values.ngayKetThuc.format("YYYY-MM-DD"),
        trangthai: campaign?.trangThaiHoatDong,
      });
      message.success("Cập nhật thành công");
      setEditMode(false);
      fetchDetail();
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  if (!campaign) return <Card loading={loading} />;

  const status = campaign?.trangThaiHoatDong;

  // Cột bảng danh sách yêu cầu hiến máu
  const columns = [
    {
      title: "Ngày hiến dự kiến",
      dataIndex: "ngayHienMauDuKien",
      render: (v) => dayjs(v).format("DD/MM/YYYY"),
      align: "center",
    },
    {
      title: "Loại hiến",
      dataIndex: "loaiHien",
      render: (v) => (
        <Tag color={loaiHienMap[v]?.color || "default"}>
          {loaiHienMap[v]?.label || v}
        </Tag>
      ),
      align: "center",
    },
    {
      title: "Số lượng (ml)",
      dataIndex: "soLuong",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      render: (v) => (
        <Tag color={requestStatusMap[v]?.color || "default"}>
          {requestStatusMap[v]?.label || v}
        </Tag>
      ),
      align: "center",
    },
    {
      title: "Người hiến",
      dataIndex: ["nguoiHien", "ten"],
      align: "center",
    },
    {
      title: "Người duyệt",
      dataIndex: ["nguoiDuyet", "ten"],
      render: (v) => v || <i>Chưa duyệt</i>,
      align: "center",
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      render: (v) => v || <i>Không có</i>,
      align: "center",
    },
  ];

  return (
    <Card
      title={`📋 Chi tiết chiến dịch: ${campaign.ten}`}
      extra={
        <div style={{ display: "flex", gap: 12 }}>
          <Button onClick={() => navigate(-1)} style={{ borderRadius: 30 }}>
            Quay lại
          </Button>
          {!editMode && (
            <Button
              type="primary"
              onClick={() => setEditMode(true)}
              style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }} // Xanh dương nổi bật
            >
              Chỉnh sửa
            </Button>
          )}
        </div>
      }
      loading={loading}
    >
      {!editMode ? (
        <>
          <Descriptions bordered column={2} size="middle">
            <Descriptions.Item label="Tên chiến dịch">
              {campaign.ten}
            </Descriptions.Item>
            <Descriptions.Item label="Địa điểm">
              {campaign.diaDiem}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian" span={2}>
              <Tag color="blue">
                {dayjs(campaign.ngayBatDau).format("DD/MM/YYYY")}
              </Tag>
              {"  →  "}
              <Tag color="volcano">
                {dayjs(campaign.ngayKetThuc).format("DD/MM/YYYY")}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Tag color={statusColors[status]} style={{ fontWeight: 600 }}>
                  {statusLabels[status]}
                </Tag>
                {status !== "daketthuc" && status !== "huy" && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button
                      size="small"
                      onClick={async () => {
                        const formValues = form.getFieldsValue([
                          "ten",
                          "diaDiem",
                          "moTa",
                          "ngayBatDau",
                          "ngayKetThuc",
                        ]);
                        try {
                          await updateCampaign(id, {
                            ...formValues,
                            ngayBatDau:
                              formValues.ngayBatDau.format("YYYY-MM-DD"),
                            ngayKetThuc:
                              formValues.ngayKetThuc.format("YYYY-MM-DD"),
                            trangthai: "dangdienra",
                          });
                          message.success(
                            "Đã cập nhật trạng thái: Đang diễn ra"
                          );
                          fetchDetail();
                        } catch (er) {
                          message.error(
                            er?.response?.data?.message || "Cập nhật thất bại"
                          );
                        }
                      }}
                    >
                      Cập nhật: Đang diễn ra
                    </Button>

                    <Button
                      size="small"
                      onClick={async () => {
                        const formValues = form.getFieldsValue([
                          "ten",
                          "diaDiem",
                          "moTa",
                          "ngayBatDau",
                          "ngayKetThuc",
                        ]);
                        try {
                          await updateCampaign(id, {
                            ...formValues,
                            ngayBatDau:
                              formValues.ngayBatDau.format("YYYY-MM-DD"),
                            ngayKetThuc:
                              formValues.ngayKetThuc.format("YYYY-MM-DD"),
                            trangthai: "daketthuc",
                          });
                          message.success(
                            "Đã cập nhật trạng thái: Đã kết thúc"
                          );
                          fetchDetail();
                        } catch (er) {
                          message.error(
                            er?.response?.data?.message || "Cập nhật thất bại"
                          );
                        }
                      }}
                    >
                      Cập nhật: Đã kết thúc
                    </Button>
                  </div>
                )}
              </div>
            </Descriptions.Item>

            <Descriptions.Item label="Số người tối đa">
              {campaign.soLuongNguoiToiDa}
            </Descriptions.Item>
            <Descriptions.Item label="Số người đã đăng ký">
              <b>
                {campaign.soLuongNguoiDangKyHienTai ?? "-"}
                {campaign.soLuongNguoiToiDa
                  ? ` / ${campaign.soLuongNguoiToiDa}`
                  : ""}
              </b>
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={2}>
              {campaign.moTa || (
                <span style={{ color: "#aaa" }}>Chưa có mô tả</span>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Người tạo" span={2}>
              {campaign.nguoiTao?.ten}{" "}
              <Tag color="purple" style={{ marginLeft: 8 }}>
                {campaign.nguoiTao?.email}
              </Tag>
              <div style={{ color: "#888", fontSize: 13 }}>
                {campaign.nguoiTao?.soDienThoai}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {dayjs(campaign.ngayTao).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {dayjs(campaign.ngayCapNhat).format("DD/MM/YYYY")}
            </Descriptions.Item>
          </Descriptions>

          {/* DANH SÁCH YÊU CẦU HIẾN MÁU */}
          <Card
            title="Danh sách yêu cầu hiến máu"
            size="small"
            style={{ marginTop: 32, borderRadius: 14 }}
            bodyStyle={{ padding: 0 }}
            headStyle={{ fontWeight: 600, fontSize: 17, background: "#f9f9f9" }}
          >
            <div style={{ padding: 16 }}>
              {campaign.danhSachYeuCauHieuMau &&
              campaign.danhSachYeuCauHieuMau.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={campaign.danhSachYeuCauHieuMau}
                  rowKey="id"
                  pagination={false}
                  size="small"
                  bordered
                />
              ) : (
                <div style={{ textAlign: "center", color: "#999" }}>
                  Chưa có yêu cầu hiến máu nào
                </div>
              )}
            </div>
          </Card>
        </>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            label="Tên chiến dịch"
            name="ten"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa điểm"
            name="diaDiem"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="moTa">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            name="ngayBatDau"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            name="ngayKetThuc"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Số lượng người tối đa" name="soLuongNguoiToiDa">
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 12 }}
            >
              Lưu thay đổi
            </Button>
            <Button onClick={() => setEditMode(false)}>Hủy</Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
}
