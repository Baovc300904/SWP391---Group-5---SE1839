import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Input,
  Button,
  Tag,
  Modal,
  Form,
  DatePicker,
  Pagination,
  message,
  Tooltip,
  Space,
  Upload,
  Descriptions,
  Popconfirm,
  Image,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  getNotifications,
  getNotificationDetail,
  createNotification,
  updateNotification,
  deleteNotification,
} from "../services/notificationService";
import dayjs from "dayjs";
import { IMAGE_BASE_URL } from "../variables/baseUrl";

const { RangePicker } = DatePicker;
const trangThaiMap = {
  1: { label: "Đang hoạt động", color: "green" },
  0: { label: "Ngừng", color: "default" },
};

export default function NotificationManager() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Modal
  const [detailModal, setDetailModal] = useState(false);
  const [detailData, setDetailData] = useState(null);

  // Tạo/sửa modal
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();
  const [editLoading, setEditLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // Fetch list
  const fetchNotifications = async (pageIndex = 1, keywordVal = "") => {
    setLoading(true);
    try {
      const data = await getNotifications({
        page: pageIndex,
        keyword: keywordVal,
      });
      setNotifications(data?.content || []);
      setPage((data?.number ?? 0) + 1);
      setTotal(data?.totalElements || 0);
    } catch (e) {
      message.error(e?.message || "Lỗi tải danh sách thông báo!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Search
  const handleSearch = () => {
    fetchNotifications(1, keyword);
  };

  // Xem chi tiết
  const showDetail = async (id) => {
    setLoading(true);
    try {
      const data = await getNotificationDetail(id);
      setDetailData(data);
      setDetailModal(true);
    } catch {
      message.error("Không tải được chi tiết!");
    } finally {
      setLoading(false);
    }
  };

  // Xoá
  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      message.success("Đã xoá thông báo");
      fetchNotifications(page, keyword);
    } catch {
      message.error("Xoá thất bại!");
    }
  };

  // Hiện modal tạo mới / sửa
  const showEdit = (record = null) => {
    setEditId(record?.id || null);
    if (record) {
      // Nếu là edit: set ảnh preview đúng url
      const imgFullUrl = record.anh
        ? record.anh.startsWith("http")
          ? record.anh
          : IMAGE_BASE_URL + record.anh
        : null;
      setImageUrl(imgFullUrl);
      form.setFieldsValue({
        tieuDe: record.tieuDe,
        noiDung: record.noiDung,
        dateRange: [
          record.ngayBatDau ? dayjs(record.ngayBatDau) : null,
          record.ngayKetThuc ? dayjs(record.ngayKetThuc) : null,
        ],
        anh: record.anh
          ? [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: imgFullUrl,
              },
            ]
          : [],
      });
    } else {
      setImageUrl(null);
      form.resetFields();
    }
    setEditModal(true);
  };

  // Upload ảnh preview trong form
  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    if (e && e.fileList && e.fileList.length > 0) {
      const file = e.fileList[0];
      if (file.originFileObj)
        setImageUrl(URL.createObjectURL(file.originFileObj));
      else if (file.url) setImageUrl(file.url); // Ảnh cũ từ BE
      return e.fileList;
    }
    setImageUrl(null);
    return [];
  };

  // Submit tạo/sửa
  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      setEditLoading(true);

      const formData = new FormData();
      formData.append("tieude", values.tieuDe);
      formData.append("noidung", values.noiDung);
      if (values.dateRange?.[0])
        formData.append("ngayBatDau", values.dateRange[0].format("YYYY-MM-DD"));
      if (values.dateRange?.[1])
        formData.append(
          "ngayKetThuc",
          values.dateRange[1].format("YYYY-MM-DD")
        );

      // Chỉ gửi ảnh khi vừa upload mới
      if (values.anh && values.anh.length) {
        const file = values.anh[0];
        if (file.originFileObj) {
          formData.append("anh", file.originFileObj);
        }
        // Nếu không có originFileObj, là ảnh cũ hoặc vừa xoá (không gửi gì, BE giữ nguyên)
      }
      // Nếu values.anh.length === 0 => ảnh bị remove, có thể gửi null hoặc rỗng nếu muốn BE xoá ảnh

      if (editId) {
        await updateNotification(editId, formData);
        message.success("Cập nhật thành công!");
      } else {
        await createNotification(formData);
        message.success("Tạo mới thành công!");
      }
      setEditModal(false);
      fetchNotifications(page, keyword);
    } catch (e) {
      if (e?.errorFields) return;
      message.error("Lưu thất bại!");
    } finally {
      setEditLoading(false);
    }
  };

  // Table columns mapping chuẩn theo key của API
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      align: "center",
      width: 55,
    },
    {
      title: "Ảnh",
      dataIndex: "anh",
      align: "center",
      width: 100,
      render: (v) =>
        v ? (
          <Image
            src={`${IMAGE_BASE_URL}${v}`}
            alt="img"
            width={60}
            height={38}
            style={{
              objectFit: "cover",
              borderRadius: 8,
              boxShadow: "0 2px 10px #f8bbd040",
            }}
            preview={false}
          />
        ) : (
          <Tag color="gray">Không có</Tag>
        ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "tieuDe",
      render: (text) => (
        <span style={{ fontWeight: 600, color: "#c2185b" }}>{text}</span>
      ),
      ellipsis: true,
    },
    {
      title: "Thời gian",
      render: (_, r) => (
        <span>
          <Tag color="blue" style={{ marginRight: 4 }}>
            {dayjs(r.ngayBatDau).format("DD/MM/YYYY")}
          </Tag>
          <span style={{ color: "#999" }}>→</span>
          <Tag color="volcano" style={{ marginLeft: 4 }}>
            {dayjs(r.ngayKetThuc).format("DD/MM/YYYY")}
          </Tag>
        </span>
      ),
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      render: (v) => (v ? dayjs(v).format(" DD/MM/YYYY") : ""),
      align: "center",
      width: 130,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      align: "center",
      width: 120,
      render: (v) => (
        <Tag
          color={trangThaiMap[v]?.color || "default"}
          style={{ borderRadius: 8 }}
        >
          {trangThaiMap[v]?.label || v}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              size="small"
              style={{ borderRadius: 8, background: "#fff" }}
              onClick={() => showDetail(record.id)}
            />
          </Tooltip>
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              size="small"
              style={{ borderRadius: 8, background: "#fffde7" }}
              onClick={() => showEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Xoá thông báo?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              style={{ borderRadius: 8, background: "#fff3e0" }}
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={
        <span style={{ fontWeight: 600, fontSize: 22, color: "#c2185b" }}>
          🔔 Quản lý thông báo
        </span>
      }
      style={{
        borderRadius: 20,
        boxShadow: "0 4px 24px rgba(66, 41, 132, 0.08)",
        overflow: "hidden",
      }}
      extra={
        <div style={{ display: "flex", gap: 12 }}>
          <Input.Search
            placeholder="Tìm tiêu đề..."
            enterButton={<SearchOutlined />}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onSearch={handleSearch}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showEdit(null)}
            style={{
              borderRadius: 10,
              background: "#c2185b",
              borderColor: "#c2185b",
              fontWeight: 600,
            }}
          >
            Thêm thông báo
          </Button>
        </div>
      }
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={notifications}
        loading={loading}
        pagination={false}
        bordered={false}
        style={{ marginTop: 12 }}
        scroll={{ x: true }}
      />

      <div style={{ textAlign: "center", marginTop: 28 }}>
        <Pagination
          current={page}
          total={total}
          pageSize={10}
          showSizeChanger={false}
          onChange={(p) => fetchNotifications(p, keyword)}
          style={{ display: "inline-block" }}
        />
      </div>

      {/* Modal chi tiết */}
      <Modal
        open={detailModal}
        title={
          <span style={{ color: "#c2185b", fontWeight: 600, fontSize: 20 }}>
            Chi tiết thông báo
          </span>
        }
        onCancel={() => setDetailModal(false)}
        footer={null}
        width={700}
        destroyOnClose
      >
        {detailData && (
          <div>
            <Descriptions
              column={1}
              bordered
              style={{ borderRadius: 16, background: "#fff9fa" }}
            >
              <Descriptions.Item label="Tiêu đề">
                <span style={{ fontWeight: 600 }}>{detailData.tieuDe}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Ảnh">
                {detailData.anh ? (
                  <Image
                    src={`${IMAGE_BASE_URL}${detailData.anh}`}
                    width={180}
                  />
                ) : (
                  <Tag color="gray">Không có</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Nội dung">
                <div
                  style={{ maxHeight: 240, overflow: "auto" }}
                  dangerouslySetInnerHTML={{ __html: detailData.noiDung }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Ngày bắt đầu">
                {detailData.ngayBatDau &&
                  dayjs(detailData.ngayBatDau).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày kết thúc">
                {detailData.ngayKetThuc &&
                  dayjs(detailData.ngayKetThuc).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {detailData.ngayTao &&
                  dayjs(detailData.ngayTao).format("HH:mm DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày cập nhật">
                {detailData.ngayCapNhat &&
                  dayjs(detailData.ngayCapNhat).format("HH:mm DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag
                  color={trangThaiMap[detailData.trangThai]?.color || "default"}
                >
                  {trangThaiMap[detailData.trangThai]?.label ||
                    detailData.trangThai}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
            {detailData.nguoiTao && (
              <Card
                size="small"
                title={
                  <span style={{ color: "#c2185b" }}>
                    👤 Thông tin người tạo
                  </span>
                }
                style={{
                  marginTop: 16,
                  borderRadius: 12,
                  background: "#faf4fa",
                  border: "1px solid #f5f5f5",
                }}
                bodyStyle={{ padding: 16 }}
              >
                <Descriptions
                  column={2}
                  size="small"
                  colon={false}
                  labelStyle={{ fontWeight: 600, minWidth: 90 }}
                >
                  <Descriptions.Item label="Tên">
                    {detailData.nguoiTao.ten}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày sinh">
                    {detailData.nguoiTao.ngaySinh &&
                      dayjs(detailData.nguoiTao.ngaySinh).format("DD/MM/YYYY")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Giới tính">
                    {detailData.nguoiTao.gioiTinh === "nam"
                      ? "Nam"
                      : detailData.nguoiTao.gioiTinh === "nu"
                      ? "Nữ"
                      : detailData.nguoiTao.gioiTinh}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vai trò">
                    <Tag color="#1976d2" style={{ borderRadius: 8 }}>
                      {detailData.nguoiTao.vaiTro.toUpperCase()}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            )}
          </div>
        )}
      </Modal>

      {/* Modal tạo/sửa */}
      <Modal
        open={editModal}
        title={
          <span style={{ fontWeight: 600, color: "#c2185b", fontSize: 20 }}>
            {editId ? "Cập nhật thông báo" : "Thêm mới thông báo"}
          </span>
        }
        onCancel={() => setEditModal(false)}
        onOk={handleEdit}
        okText={editId ? "Cập nhật" : "Tạo mới"}
        confirmLoading={editLoading}
        destroyOnClose
        width={480}
        bodyStyle={{ paddingTop: 18, paddingBottom: 2 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="tieuDe"
            label={<span style={{ color: "#c2185b" }}>Tiêu đề</span>}
            rules={[{ required: true, message: "Nhập tiêu đề" }]}
          >
            <Input
              placeholder="Tiêu đề"
              style={{
                borderRadius: 18,
                height: 44,
                background: "#fff",
                border: "1px solid #e0e0e0",
              }}
            />
          </Form.Item>
          <Form.Item
            name="noiDung"
            label={<span style={{ color: "#c2185b" }}>Nội dung</span>}
            rules={[{ required: true, message: "Nhập nội dung" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Nội dung"
              style={{
                borderRadius: 18,
                background: "#fff",
                border: "1px solid #e0e0e0",
                padding: 10,
              }}
            />
          </Form.Item>
          <Form.Item
            name="dateRange"
            label={<span style={{ color: "#c2185b" }}>Thời gian áp dụng</span>}
            rules={[
              { required: true, message: "Chọn ngày bắt đầu và kết thúc" },
            ]}
          >
            <RangePicker
              format="DD/MM/YYYY"
              style={{ width: "100%", borderRadius: 14 }}
              popupStyle={{ borderRadius: 14 }}
            />
          </Form.Item>
          <Form.Item
            name="anh"
            label={
              <span style={{ color: "#c2185b" }}>
                Ảnh {`${editId ? "(Không sửa)" : ""}`}
              </span>
            }
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            {!editId && (
              <Upload
                maxCount={1}
                beforeUpload={() => false}
                listType="picture"
                accept="image/*"
                showUploadList={{
                  showRemoveIcon: true,
                  showPreviewIcon: false,
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    borderRadius: 14,
                    background: "#fff",
                    fontWeight: 600,
                  }}
                >
                  Chọn ảnh
                </Button>
              </Upload>
            )}
            {imageUrl && (
              <div style={{ marginTop: 10 }}>
                <Image
                  src={imageUrl}
                  width={110}
                  style={{
                    borderRadius: 8,
                    boxShadow: "0 2px 10px #f8bbd080",
                  }}
                />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
