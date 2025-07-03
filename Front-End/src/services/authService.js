import instance from "../api/axiosConfig";

// Login API
export const login = async (data) => {
  const res = await instance.post("/api/auth/login", data);
  return res.data;
};

// Register API
export const register = async (data) => {
  // data = {
  //   ten, tendangnhap, matkhau, email, sodienthoai,
  //   ngaysinh, gioitinh, diachi, nhommau, yeuToRh,
  //   tiensubenh, cannang, chieucao
  // }
  const res = await instance.post("/api/auth/register", data);
  return res.data;
};
