import instance from "../api/axiosConfig";

// Lấy danh sách kho đơn vị máu
export const getBloodUnitWarehouses = async (params) => {
  const res = await instance.get("/api/admin/blood-unit-warehouses", {
    params,
  });
  return res.data;
};

// Hủy kho đơn vị máu
export const cancelBloodUnitWarehouse = async (id, data) => {
  const res = await instance.post(
    `/api/admin/blood-unit-warehouses/${id}/cancel`,
    data
  );
  return res.data;
};

// Xác nhận kho đơn vị máu
export const testedBloodUnitWarehouse = async (id, data) => {
  const res = await instance.post(
    `/api/admin/blood-unit-warehouses/${id}/tested`,
    data
  );
  return res.data;
};
