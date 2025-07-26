import instance from "../api/axiosConfig";

// Lấy danh sách thông báo (Notification)
export const getNotifications = async (params) => {
  // params: { page, pageSize, keyword, ... }
  const res = await instance.get("/api/notifications", { params });
  return res.data;
};

export const getNotificationsActive = async (params) => {
  // params: { page, pageSize, keyword, ... }
  const res = await instance.get("/api/notifications/active", { params });
  return res.data;
};

// Lấy chi tiết 1 thông báo
export const getNotificationDetail = async (id) => {
  const res = await instance.get(`/api/notifications/${id}`);
  return res.data;
};

// Tạo mới thông báo (formData: gửi kèm file ảnh)
export const createNotification = async (formData) => {
  const res = await instance.post("/api/notifications", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Cập nhật thông báo
export const updateNotification = async (id, formData) => {
  const res = await instance.put(`/api/notifications/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Xoá thông báo
export const deleteNotification = async (id) => {
  const res = await instance.delete(`/api/notifications/${id}`);
  return res.data;
};
