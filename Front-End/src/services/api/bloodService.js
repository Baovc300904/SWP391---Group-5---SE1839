import instance from "../../api/axiosConfig";

// Lấy danh sách bloods
export const getBloods = async (params) => {
  const res = await instance.get("/api/bloods", { params });
  return res.data;
};

// Lấy detail 1 blood
export const getBloodDetail = async (id) => {
  const res = await instance.get(`/api/bloods/${id}`);
  return res.data;
};

// Thêm mới blood
export const createBlood = async (data) => {
  const res = await instance.post("/api/bloods", data);
  return res.data;
};

// Cập nhật blood
export const updateBlood = async (id, data) => {
  const res = await instance.put(`/api/bloods/${id}`, data);
  return res.data;
};

// Xóa blood
export const deleteBlood = async (id) => {
  const res = await instance.delete(`/api/bloods/${id}`);
  return res.data;
};
