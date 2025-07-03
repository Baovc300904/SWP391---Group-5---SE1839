import instance from "../api/axiosConfig";

// Lấy danh sách user cho admin (có phân trang và role)
export const getUsers = async (page = 1, role = "nguoidung") => {
  const res = await instance.get(`/api/users`, {
    params: {
      page,
      role,
    },
  });
  return res.data;
};

// Lấy chi tiết user theo ID
export const getUserDetail = async (id) => {
  const res = await instance.get(`/api/users/${id}`);
  return res.data;
};

// Xoá user theo ID
export const deleteUser = async (id) => {
  const res = await instance.delete(`/api/users/${id}`);
  return res.data;
};

// Cập nhật hồ sơ người dùng
export const updateProfile = async (data) => {
  try {
    const res = await instance.post("/api/auth/update-profile", data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

// Đổi mật khẩu
export const changePassword = async (data) => {
  try {
    const res = await instance.post("/api/auth/change-password", data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

// Thêm mới employee
export const createEmployee = async (data) => {
  const res = await instance.post("/api/users/employee", data);
  return res.data;
};
