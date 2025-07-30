import instance from "../api/axiosConfig";

// Lấy danh sách campaign theo page và trạng thái
export const getCampaigns = async (page = 1, status = "") => {
  const res = await instance.get(`/api/blood-donation-activities`, {
    params: { page, status },
  });
  return res.data;
};

export const getCampaignDetail = async (id) => {
  const res = await instance.get(`/api/blood-donation-activities/detail/${id}`);
  return res.data;
};

// Tạo campaign mới
export const createCampaign = async (data) => {
  const res = await instance.post(`/api/blood-donation-activities`, data);
  return res.data;
};

// Cập nhật campaign
export const updateCampaign = async (id, data) => {
  const res = await instance.put(`/api/blood-donation-activities/${id}`, data);
  return res.data;
};

export const getUpcomingCampaigns = async (page = 1) => {
  const res = await instance.get(
    `/api/blood-donation-activities?page=${page}&status=sapdienra`
  );
  return res.data;
};
