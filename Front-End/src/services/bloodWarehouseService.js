import instance from "../api/axiosConfig";

export const getPendingBloodUnits = async (page = 1, keyword = "") => {
  const res = await instance.get(
    `/api/admin/blood-unit-warehouses?page=${page}&status=choxetnghiem&keyword=${keyword}`
  );
  return res.data;
};

export const markAsTested = async (id) => {
  const res = await instance.post(
    `/api/admin/blood-unit-warehouses/${id}/tested`
  );
  return res.data;
};

export const cancelTest = async (id) => {
  const res = await instance.post(
    `/api/admin/blood-unit-warehouses/${id}/cancel`
  );
  return res.data;
};
