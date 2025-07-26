import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Input,
  Button,
  Tag,
  Modal,
  Form,
  Select,
  Pagination,
  message,
  Tooltip,
  Badge,
  Descriptions,
  Space,
  Timeline,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  getSupportTickets,
  getSupportTicketDetail,
  updateSupportTicketStatus,
} from "../services/supportService";

const { Option } = Select;

const statusMap = {
  moi: { color: "blue", text: "Mới" },
  dangxuly: { color: "orange", text: "Đang xử lý" },
  hoanthanh: { color: "green", text: "Hoàn thành" },
  dahuy: { color: "red", text: "Đã huỷ" },
};

export default function SupportTicketManager() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Chi tiết và modal
  const [detailModal, setDetailModal] = useState(false);
  const [detailData, setDetailData] = useState(null);
  // Modal đổi trạng thái
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchTickets = async (pageIndex = 1, keywordVal = "") => {
    setLoading(true);
    try {
      const data = await getSupportTickets({
        page: pageIndex,
        keyword: keywordVal,
      });
      setTickets(data?.content || []);
      setPage((data?.number ?? 0) + 1);
      setTotal(data?.totalElements || 0);
    } catch (e) {
      message.error(e?.response?.data?.message || "Lỗi tải danh sách yêu cầu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Xem chi tiết
  const showDetail = async (id) => {
    setLoading(true);
    try {
      const data = await getSupportTicketDetail(id);
      setDetailData(data);
      setDetailModal(true);
    } catch {
      message.error("Không tải được chi tiết!");
    } finally {
      setLoading(false);
    }
  };

  // Đổi trạng thái
  const showEdit = (id, currentStatus) => {
    setEditId(id);
    form.setFieldsValue({ trangThai: currentStatus, ghiChu: "" });
    setEditModal(true);
  };

  const handleEdit = async () => {
    setEditLoading(true);
    try {
      const { trangThai, ghiChu } = form.getFieldsValue();
      await updateSupportTicketStatus(editId, {
        trangthai: trangThai,
        ghichu: ghiChu,
      });

      setEditModal(false);
      fetchTickets(page, keyword);
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật trạng thái!");
      console.error("Error updating support ticket:", error);
    } finally {
      message.success("Cập nhật trạng thái thành công!");
      fetchTickets();
      setEditLoading(false);
    }
  };

  // Tìm kiếm
  const handleSearch = () => {
    fetchTickets(1, keyword);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 60,
      align: "center",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      render: (v) => <b>{v}</b>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "SĐT",
      dataIndex: "soDienThoai",
    },
    {
      title: "Tiêu đề",
      dataIndex: "tieuDe",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      render: (v) => (
        <Badge color={statusMap[v]?.color} text={statusMap[v]?.text || v} />
      ),
      filters: Object.entries(statusMap).map(([key, value]) => ({
        text: value.text,
        value: key,
      })),
      onFilter: (value, record) => record.trangThai === value,
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              onClick={() => showDetail(record.id)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Đổi trạng thái">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => showEdit(record.id, record.trangThai)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="📨 Quản lý yêu cầu hỗ trợ"
      extra={
        <Input.Search
          placeholder="Tìm kiếm theo tên, email, SĐT, tiêu đề..."
          enterButton={<SearchOutlined />}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 350, borderRadius: 20 }}
        />
      }
      style={{
        borderRadius: 20,
        boxShadow: "0 4px 18px #e1bee780",
      }}
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={tickets}
        loading={loading}
        pagination={false}
        bordered
        size="middle"
      />

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <Pagination
          current={page}
          total={total}
          pageSize={10}
          showSizeChanger={false}
          onChange={(p) => fetchTickets(p, keyword)}
        />
      </div>

      {/* Modal chi tiết */}
      <Modal
        open={detailModal}
        title="Chi tiết yêu cầu hỗ trợ"
        onCancel={() => setDetailModal(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        {detailData && (
          <>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="Họ tên">
                {detailData.hoTen}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {detailData.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {detailData.soDienThoai}
              </Descriptions.Item>
              <Descriptions.Item label="Tiêu đề">
                {detailData.tieuDe}
              </Descriptions.Item>
              <Descriptions.Item label="Nội dung">
                {detailData.noiDung}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={statusMap[detailData.trangThai]?.color}>
                  {statusMap[detailData.trangThai]?.text ||
                    detailData.trangThai}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {detailData.ngayTao &&
                  new Date(detailData.ngayTao).toLocaleString("vi-VN")}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày cập nhật">
                {detailData.ngayCapNhat &&
                  new Date(detailData.ngayCapNhat).toLocaleString("vi-VN")}
              </Descriptions.Item>
            </Descriptions>

            {/* Hiển thị lịch sử xử lý (nếu có) */}
            {detailData.histories && detailData.histories.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <h4 style={{ fontWeight: 700, marginBottom: 12 }}>
                  Lịch sử xử lý
                </h4>
                <Timeline>
                  {detailData.histories.map((h) => (
                    <Timeline.Item
                      color={statusMap[h.trangThai]?.color || "gray"}
                      key={h.id}
                    >
                      <div>
                        <div>
                          <b>{statusMap[h.trangThai]?.text || h.trangThai}</b> -{" "}
                          {new Date(h.ngayTao).toLocaleString("vi-VN")}
                        </div>
                        <div>
                          {h.supporter
                            ? `Nhân viên: ${h.supporter.ten} - ${h.supporter.email}`
                            : "Người dùng tạo"}
                        </div>
                        <div>Ghi chú: {h.ghiChu}</div>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            )}
          </>
        )}
      </Modal>

      {/* Modal đổi trạng thái */}
      <Modal
        open={editModal}
        title="Cập nhật trạng thái yêu cầu"
        onCancel={() => setEditModal(false)}
        onOk={handleEdit}
        okText="Cập nhật"
        confirmLoading={editLoading}
        destroyOnClose
        width={420}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="trangThai"
            label="Trạng thái"
            rules={[{ required: true, message: "Chọn trạng thái" }]}
          >
            <Select>
              <Option value="moi">Mới</Option>
              <Option value="dangxuly">Đang xử lý</Option>
              <Option value="hoanthanh">Hoàn thành</Option>
              <Option value="dahuy">Đã huỷ</Option>
            </Select>
          </Form.Item>
          <Form.Item name="ghiChu" label="Ghi chú">
            <Input.TextArea placeholder="Thêm ghi chú (nếu có)" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
