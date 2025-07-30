import instance from "../api/axiosConfig";

// Lấy danh sách yêu cầu nhận máu
export const getBloodReceiveRequests = async (params) => {
  const res = await instance.get("/api/blood-receive-requests", { params });
  return res.data;
};

// Lấy chi tiết yêu cầu nhận máu
export const getBloodReceiveRequestDetail = async (id) => {
  const res = await instance.get(`/api/blood-receive-requests/${id}`);
  return res.data;
};

// Thêm mới yêu cầu nhận máu
export const createBloodReceiveRequest = async (data) => {
  const res = await instance.post("/api/blood-receive-requests", data);
  return res.data;
};

// Cập nhật yêu cầu nhận máu
export const updateBloodReceiveRequest = async (id, data) => {
  const res = await instance.put(`/api/blood-receive-requests/${id}`, data);
  return res.data;
};

// Xóa yêu cầu nhận máu
export const deleteBloodReceiveRequest = async (id) => {
  const res = await instance.post(`/api/blood-receive-requests/${id}/cancel`);
  return res.data;
};
