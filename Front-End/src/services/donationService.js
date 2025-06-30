// donationService.js
import instance from "../api/axiosConfig";

// Gửi yêu cầu hiến máu
export const donateBloodRequest = async (data) => {
  const res = await instance.post("/api/blood-donation-requests", data);
  return res.data;
};

// Lấy danh sách yêu cầu hiến máu
export const getDonationRequests = async (
  page = 1,
  trangthai = "dangcho",
  keyword = ""
) => {
  const res = await instance.get("/api/blood-donation-requests", {
    params: { page, trangthai, keyword },
  });
  return res.data;
};

// Hủy yêu cầu hiến máu
export const cancelRequest = async (id) => {
  const res = await instance.post(`/api/blood-donation-requests/${id}/cancel`);
  return res.data;
};

// Cập nhật yêu cầu hiến máu
export const updateRequest = async (data) => {
  const res = await instance.put(
    `/api/blood-donation-requests/${data.id}`,
    data
  );
  return res.data;
};
