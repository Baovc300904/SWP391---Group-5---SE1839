import instance from "../api/axiosConfig";

export const getSupportTickets = async (params) => {
  // params = { page, keyword }
  const res = await instance.get("/api/support-tickets", { params });
  return res.data;
};

export const getSupportTicketDetail = async (id) => {
  const res = await instance.get(`/api/support-tickets/${id}`);
  return res.data;
};

export const updateSupportTicketStatus = async (id, data) => {
  // data = { trangThai, ghiChu }
  const res = await instance.post(
    `/api/support-tickets/${id}/change-status`,
    data
  );
  return res.data;
};
