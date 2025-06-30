import instance from "../../api/axiosConfig";

// Mock data for development when backend is not available
const mockCampaigns = [
  {
    id: 1,
    ten: "Chiến dịch hiến máu nhân đạo tháng 1/2024",
    moTa: "Chiến dịch hiến máu nhân đạo được tổ chức tại Bệnh viện Chợ Rẫy với mục tiêu thu thập 500 đơn vị máu để phục vụ điều trị cho các bệnh nhân.",
    diaDiem: "Bệnh viện Chợ Rẫy - TP.HCM",
    ngayBatDau: "2024-01-20",
    ngayKetThuc: "2024-01-20",
    trangThaiHoatDong: "sapdienra",
    soLuongNguoiToiDa: 500,
    soLuongNguoiDangKyHienTai: 0,
    nguoiTao: { id: 1, ten: "Admin" },
    ngayTao: "2024-01-10T10:00:00",
    ngayCapNhat: "2024-01-10T10:00:00"
  },
  {
    id: 2,
    ten: "Hiến máu cứu người - Hành trình yêu thương",
    moTa: "Chương trình hiến máu tình nguyện được tổ chức tại Trung tâm Y tế quận 1, kêu gọi sự tham gia của cộng đồng để cứu giúp những bệnh nhân cần máu.",
    diaDiem: "Trung tâm Y tế quận 1 - TP.HCM",
    ngayBatDau: "2024-01-25",
    ngayKetThuc: "2024-01-25",
    trangThaiHoatDong: "sapdienra",
    soLuongNguoiToiDa: 300,
    soLuongNguoiDangKyHienTai: 0,
    nguoiTao: { id: 1, ten: "Admin" },
    ngayTao: "2024-01-12T14:30:00",
    ngayCapNhat: "2024-01-12T14:30:00"
  },
  {
    id: 3,
    ten: "Ngày hội hiến máu sinh viên",
    moTa: "Sự kiện hiến máu đặc biệt dành cho sinh viên các trường đại học, cao đẳng trên địa bàn TP.HCM với nhiều hoạt động bổ ích.",
    diaDiem: "Trường Đại học Bách Khoa TP.HCM",
    ngayBatDau: "2024-01-30",
    ngayKetThuc: "2024-01-30",
    trangThaiHoatDong: "sapdienra",
    soLuongNguoiToiDa: 400,
    soLuongNguoiDangKyHienTai: 0,
    nguoiTao: { id: 1, ten: "Admin" },
    ngayTao: "2024-01-15T09:15:00",
    ngayCapNhat: "2024-01-15T09:15:00"
  }
];

// Helper function to check if backend is available
const isBackendAvailable = async () => {
  try {
    await instance.get('/api/health', { timeout: 3000 });
    return true;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return false;
  }
};

// Lấy danh sách campaign theo page và trạng thái
export const getCampaigns = async (page = 1, status = "") => {
  const res = await instance.get(`/api/blood-donation-activities`, {
    params: { page, status },
  });
  return res.data;
};

// Tạo campaign mới
export const createCampaign = async (data) => {
  try {
    const res = await instance.post("/api/blood-donation-activities", data);
    return res.data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};

// Cập nhật campaign
export const updateCampaign = async (id, data) => {
  try {
    const res = await instance.put(`/api/blood-donation-activities/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw error;
  }
};

export const getUpcomingCampaigns = async (page = 1, status = 'sapdienra') => {
  try {
    const res = await instance.get(`/api/blood-donation-activities?page=${page}&status=${status}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching upcoming campaigns:', error);
    throw error;
  }
};

export const getAllCampaigns = async (page = 1, status = '', keyword = '') => {
  try {
    const params = new URLSearchParams();
    params.append('page', page);
    if (status) params.append('status', status);
    if (keyword) params.append('keyword', keyword);
    
    const res = await instance.get(`/api/blood-donation-activities?${params.toString()}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching all campaigns:', error);
    throw error;
  }
};

export const getCampaignById = async (id) => {
  try {
    const res = await instance.get(`/api/blood-donation-activities/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching campaign detail:', error);
    throw error;
  }
};

export const deleteCampaign = async (id) => {
  try {
    const res = await instance.delete(`/api/blood-donation-activities/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting campaign:', error);
    throw error;
  }
};
