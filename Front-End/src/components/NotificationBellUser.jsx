import { BellOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Descriptions,
  Dropdown,
  Image,
  List,
  Modal,
  Spin,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  getNotificationDetail,
  getNotificationsActive,
} from "../services/notificationService";
import { IMAGE_BASE_URL } from "../variables/baseUrl";

const trangThaiMap = {
  1: { label: "Đang hoạt động", color: "green" },
  0: { label: "Ngừng", color: "default" },
};

export default function NotificationBellUser() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [detailModal, setDetailModal] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Lấy 10 thông báo mới nhất
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await getNotificationsActive({
        page: 1,
        size: 10,
      });
      setNotifications(data?.content || []);
    } catch {
      // lỗi thì không show message (ẩn)
    } finally {
      setLoading(false);
    }
  };

  // Mở dropdown mới fetch lại
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Xem chi tiết notification
  const handleShowDetail = async (id) => {
    setDetailLoading(true);
    try {
      const data = await getNotificationDetail(id);
      setDetailData(data);
      setDetailModal(true);
    } catch {
      // Có thể show error nếu muốn
    } finally {
      setDetailLoading(false);
    }
  };

  const dropdownContent = (
    <div
      style={{
        minWidth: 340,
        maxWidth: 380,
        maxHeight: 480,
        overflowY: "auto",
        padding: 10,
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 4px 24px #3332",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 12,
          color: "#c2185b",
        }}
      >
        Thông báo mới
      </div>
      {loading ? (
        <Spin />
      ) : notifications?.length === 0 ? (
        <div style={{ textAlign: "center", padding: 24, color: "#999" }}>
          Không có thông báo nào.
        </div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              style={{ padding: "12px 0", cursor: "pointer" }}
              onClick={() => handleShowDetail(item.id)}
            >
              <List.Item.Meta
                avatar={
                  item.anh ? (
                    <Avatar
                      shape="square"
                      src={IMAGE_BASE_URL + item.anh}
                      size={48}
                      style={{ borderRadius: 10, background: "#ffe6ec" }}
                    />
                  ) : (
                    <Avatar
                      shape="square"
                      size={48}
                      style={{
                        borderRadius: 10,
                        background: "#f8bbd0",
                        fontWeight: 700,
                        fontSize: 22,
                        color: "#c2185b",
                      }}
                    >
                      <BellOutlined />
                    </Avatar>
                  )
                }
                title={
                  <div style={{ fontWeight: 600, color: "#c2185b" }}>
                    {item.tieuDe}
                    {item.trangThai === 1 && (
                      <Tag color="green" style={{ marginLeft: 8 }}>
                        Mới
                      </Tag>
                    )}
                  </div>
                }
                description={
                  <div>
                    <div
                      style={{
                        color: "#444",
                        maxHeight: 38,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginBottom: 2,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: item.noiDung,
                      }}
                    />
                    <div style={{ color: "#888", fontSize: 12 }}>
                      {item.ngayBatDau &&
                        `Hiệu lực: ${dayjs(item.ngayBatDau).format(
                          "DD/MM"
                        )} - ${dayjs(item.ngayKetThuc).format("DD/MM")}`}
                      {item.ngayTao && (
                        <span style={{ float: "right" }}>
                          {dayjs(item.ngayTao).format("HH:mm DD/MM")}
                        </span>
                      )}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}

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
        width={600}
        bodyStyle={{ paddingTop: 18, paddingBottom: 2 }}
        destroyOnHidden
      >
        {detailLoading ? (
          <Spin />
        ) : (
          detailData && (
            <div>
              <Descriptions
                column={1}
                bordered
                style={{ borderRadius: 14, background: "#fff9fa" }}
              >
                <Descriptions.Item label="Tiêu đề">
                  <span style={{ fontWeight: 600 }}>{detailData.tieuDe}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Ảnh">
                  {detailData.anh ? (
                    <Image src={IMAGE_BASE_URL + detailData.anh} width={160} />
                  ) : (
                    <Tag color="gray">Không có</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Nội dung">
                  <div
                    style={{ maxHeight: 140, overflow: "auto" }}
                    dangerouslySetInnerHTML={{ __html: detailData.noiDung }}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian hiệu lực">
                  {detailData.ngayBatDau
                    ? `${dayjs(detailData.ngayBatDau).format("DD/MM/YYYY")}${detailData.ngayKetThuc
                      ? " - " +
                      dayjs(detailData.ngayKetThuc).format("DD/MM/YYYY")
                      : ""
                    }`
                    : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo">
                  {detailData.ngayTao &&
                    dayjs(detailData.ngayTao).format("HH:mm DD/MM/YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  <Tag
                    color={
                      trangThaiMap[detailData.trangThai]?.color || "default"
                    }
                  >
                    {trangThaiMap[detailData.trangThai]?.label ||
                      detailData.trangThai}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>

              {/* Thông tin người tạo */}
              {detailData.nguoiTao && (
                <div style={{ marginTop: 18 }}>
                  <div
                    style={{
                      color: "#c2185b",
                      fontWeight: 600,
                      marginBottom: 10,
                    }}
                  >
                    👤 Thông tin người tạo
                  </div>
                  <Descriptions
                    column={1}
                    bordered
                    size="small"
                    style={{
                      borderRadius: 12,
                      background: "#f8f7ff",
                      border: "1px solid #f5f5f5",
                    }}
                    labelStyle={{ fontWeight: 600, minWidth: 90 }}
                  >
                    <Descriptions.Item label="Tên">
                      {detailData.nguoiTao.ten}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày sinh">
                      {detailData.nguoiTao.ngaySinh &&
                        dayjs(detailData.nguoiTao.ngaySinh).format(
                          "DD/MM/YYYY"
                        )}
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
                        {detailData.nguoiTao.vaiTro?.toUpperCase()}
                      </Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              )}
            </div>
          )
        )}
      </Modal>
    </div>
  );

  return (
    <Dropdown
      dropdownRender={() => dropdownContent}
      trigger={["click"]}
      open={open}
      onOpenChange={handleOpenChange}
      placement="bottomRight"
      arrow
    >
      <Badge count={0} color="black" offset={[-2, 2]}>
        <BellOutlined
          style={{
            fontSize: 24,
            color: "#fff",
            cursor: "pointer",
            marginLeft: 16,
          }}
        />
      </Badge>
    </Dropdown>
  );
}
