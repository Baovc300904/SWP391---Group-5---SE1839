import instance from "../api/axiosConfig";

// Lấy danh sách yêu cầu nhận máu
export const getBloodReceiveRequests = async (params) => {
  const res = await instance.get("/api/admin/blood-receive-requests", {
    params,
  });
  return res.data;
};

// Lấy chi tiết yêu cầu nhận máu
export const getBloodReceiveRequestDetail = async (id) => {
  const res = await instance.get(`/api/admin/blood-receive-requests/${id}`);
  return res.data;
};

// Cập nhật trạng thái yêu cầu nhận máu (Chuyển sang đã có máu, Hủy, Hoàn thành...)
export const updateBloodReceiveRequestStatus = async (id, action, data) => {
  let endpoint = "";

  switch (action) {
    case "available": // Chuyển trạng thái sang đã có máu
      endpoint = `/api/admin/blood-receive-requests/${id}/available`;
      break;
    case "reject": // Hủy yêu cầu
      endpoint = `/api/admin/blood-receive-requests/${id}/reject`;
      break;
    case "complete": // Hoàn thành yêu cầu
      endpoint = `/api/admin/blood-receive-requests/${id}/complete`;
      break;
    default:
      throw new Error("Invalid action type");
  }

  const res = await instance.post(endpoint, data);
  return res.data;
};

// Lấy danh sách kho đơn vị máu có trạng thái "sansang"
export const getBloodUnitWarehouses = async () => {
  const res = await instance.get("/api/admin/blood-unit-warehouses", {
    params: { status: "sansang" },
  });
  return res.data;
};

// Lấy danh sách đơn vị máu phù hợp với nhóm máu trong yêu cầu nhận máu
export const getAvailableBloodUnitWarehouses = async (requestId) => {
  const res = await instance.get(
    `/api/admin/blood-receive-requests/${requestId}/list-available-blood-unit-warehouse`
  );
  return res.data;
};

// Lấy danh sách đơn vị máu đã sử dụng cho yêu cầu nhận máu
export const getUsedBloodUnits = async (requestId) => {
  const res = await instance.get(
    `/api/admin/blood-receive-requests/${requestId}/list-blood-unit-used`
  );
  return res.data;
};
