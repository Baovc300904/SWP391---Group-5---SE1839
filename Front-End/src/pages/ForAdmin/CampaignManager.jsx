import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
  message,
  Popconfirm,
  Tag,
  Card,
  Row,
  Col,
  Statistic,
  Spin,
  Alert
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { getAllCampaigns, createCampaign, updateCampaign, deleteCampaign } from '../../services/api/campaignService';
import { safeFormatDateVietnamese } from '../../utils/dateUtils';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

export default function CampaignManager() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchCampaigns = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllCampaigns(page, statusFilter, searchKeyword);
      setCampaigns(res.content || []);
      setCurrentPage(res.number + 1);
      setTotal(res.totalElements);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      
      // Hiển thị thông báo lỗi cụ thể hơn
      let errorMessage = 'Không thể tải danh sách hoạt động hiến máu';
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
        errorMessage = 'Lỗi kết nối: Backend server không khả dụng hoặc CORS chưa được cấu hình. Vui lòng kiểm tra backend server và cấu hình CORS.';
      } else if (error.response?.status === 404) {
        errorMessage = 'API endpoint không tìm thấy. Vui lòng kiểm tra backend controller.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Lỗi server. Vui lòng kiểm tra backend logs.';
      }
      
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [statusFilter, searchKeyword]);

  const handleCreate = () => {
    setEditingCampaign(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingCampaign(record);
    form.setFieldsValue({
      ten: record.ten,
      diaDiem: record.diaDiem,
      moTa: record.moTa,
      soLuongNguoiToiDa: record.soLuongNguoiToiDa,
      ngayBatDau: dayjs(record.ngayBatDau),
      ngayKetThuc: dayjs(record.ngayKetThuc),
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCampaign(id);
      message.success('Xóa hoạt động hiến máu thành công');
      fetchCampaigns(currentPage);
    } catch (error) {
      console.error('Error deleting campaign:', error);
      message.error('Không thể xóa hoạt động hiến máu');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const data = {
        ...values,
        ngayBatDau: values.ngayBatDau.format('YYYY-MM-DD'),
        ngayKetThuc: values.ngayKetThuc.format('YYYY-MM-DD'),
      };

      if (editingCampaign) {
        await updateCampaign(editingCampaign.id, data);
        message.success('Cập nhật hoạt động hiến máu thành công');
      } else {
        await createCampaign(data);
        message.success('Tạo hoạt động hiến máu thành công');
      }

      setModalVisible(false);
      fetchCampaigns(currentPage);
    } catch (error) {
      console.error('Error saving campaign:', error);
      message.error('Không thể lưu hoạt động hiến máu');
    }
  };

  const getStatusTag = (status) => {
    const statusMap = {
      'sapdienra': { color: 'blue', text: 'Sắp diễn ra' },
      'dangdienra': { color: 'green', text: 'Đang diễn ra' },
      'daketthuc': { color: 'red', text: 'Đã kết thúc' },
      'dahuy': { color: 'orange', text: 'Đã hủy' }
    };
    const statusInfo = statusMap[status] || { color: 'default', text: status };
    return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
  };

  const columns = [
    {
      title: 'Tên hoạt động',
      dataIndex: 'ten',
      key: 'ten',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Địa điểm',
      dataIndex: 'diaDiem',
      key: 'diaDiem',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'ngayBatDau',
      key: 'ngayBatDau',
      width: 120,
      render: (date) => safeFormatDateVietnamese(date),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'ngayKetThuc',
      key: 'ngayKetThuc',
      width: 120,
      render: (date) => safeFormatDateVietnamese(date),
    },
    {
      title: 'Số lượng',
      key: 'soLuong',
      width: 120,
      render: (_, record) => (
        <span>
          {record.soLuongNguoiDangKyHienTai || 0}/{record.soLuongNguoiToiDa}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThaiHoatDong',
      key: 'trangThaiHoatDong',
      width: 120,
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleEdit(record)}
            title="Xem chi tiết"
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            title="Chỉnh sửa"
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              title="Xóa"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const stats = {
    total: campaigns.length,
    upcoming: campaigns.filter(c => c.trangThaiHoatDong === 'sapdienra').length,
    ongoing: campaigns.filter(c => c.trangThaiHoatDong === 'dangdienra').length,
    completed: campaigns.filter(c => c.trangThaiHoatDong === 'daketthuc').length,
  };

  if (error) {
    return (
      <div style={{ padding: '24px' }}>
        <Alert
          message="Lỗi kết nối Backend"
          description={
            <div>
              <p>{error}</p>
              <div style={{ marginTop: '16px' }}>
                <h4>🔧 Hướng dẫn khắc phục:</h4>
                <ol style={{ marginLeft: '20px' }}>
                  <li>Đảm bảo backend server đang chạy trên port 8080</li>
                  <li>Kiểm tra cấu hình CORS trong backend</li>
                  <li>Restart backend server sau khi thay đổi cấu hình</li>
                  <li>Kiểm tra database connection</li>
                </ol>
                <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
                  💡 Xem file <code>CORS_FIX_GUIDE.md</code> để có hướng dẫn chi tiết
                </p>
              </div>
            </div>
          }
          type="error"
          showIcon
          action={
            <Button size="small" danger onClick={() => fetchCampaigns()}>
              Thử lại
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2>Quản lý hoạt động hiến máu</h2>
      </div>

      {/* Statistics */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số hoạt động"
              value={stats.total}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Sắp diễn ra"
              value={stats.upcoming}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đang diễn ra"
              value={stats.ongoing}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đã kết thúc"
              value={stats.completed}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Actions */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Input
              placeholder="Tìm kiếm theo tên..."
              prefix={<SearchOutlined />}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onPressEnter={() => fetchCampaigns(1)}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Trạng thái"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              style={{ width: '100%' }}
            >
              <Option value="sapdienra">Sắp diễn ra</Option>
              <Option value="dangdienra">Đang diễn ra</Option>
              <Option value="daketthuc">Đã kết thúc</Option>
              <Option value="dahuy">Đã hủy</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreate}
            >
              Thêm mới
            </Button>
          </Col>
          <Col span={4}>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => fetchCampaigns(currentPage)}
            >
              Làm mới
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={campaigns}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            total: total,
            pageSize: 20,
            showSizeChanger: false,
            onChange: (page) => {
              setCurrentPage(page);
              fetchCampaigns(page);
            },
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Modal */}
      <Modal
        title={editingCampaign ? 'Chỉnh sửa hoạt động hiến máu' : 'Thêm hoạt động hiến máu mới'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="ten"
            label="Tên hoạt động"
            rules={[{ required: true, message: 'Vui lòng nhập tên hoạt động' }]}
          >
            <Input placeholder="Nhập tên hoạt động hiến máu" />
          </Form.Item>

          <Form.Item
            name="diaDiem"
            label="Địa điểm"
            rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
          >
            <Input placeholder="Nhập địa điểm tổ chức" />
          </Form.Item>

          <Form.Item
            name="moTa"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <TextArea
              rows={4}
              placeholder="Nhập mô tả chi tiết về hoạt động"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ngayBatDau"
                label="Ngày bắt đầu"
                rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ngayKetThuc"
                label="Ngày kết thúc"
                rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="soLuongNguoiToiDa"
            label="Số lượng người tối đa"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng người tối đa' }]}
          >
            <InputNumber
              min={1}
              style={{ width: '100%' }}
              placeholder="Nhập số lượng người tối đa"
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingCampaign ? 'Cập nhật' : 'Tạo mới'}
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
