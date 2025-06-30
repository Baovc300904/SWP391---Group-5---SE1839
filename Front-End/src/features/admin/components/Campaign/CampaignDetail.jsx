import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Descriptions,
  Tag,
  Form,
  Input,
  DatePicker,
  InputNumber,
  message,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getCampaigns, updateCampaign } from "../../services/campaignService";

const statusColors = {
  sapdienra: "blue",
  dangdienra: "green",
  daketthuc: "gray",
};

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await getCampaigns(1); // hoặc tạo getCampaignById nếu có
      const found = res?.content?.find((c) => String(c.id) === id);
      if (found) {
        setCampaign(found);
        form.setFieldsValue({
          ...found,
          ngayBatDau: dayjs(found.ngayBatDau),
          ngayKetThuc: dayjs(found.ngayKetThuc),
        });
      }
    } catch {
      message.error("Không lấy được dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleUpdate = async (values) => {
    try {
      await updateCampaign(id, {
        ...values,
        ngayBatDau: values.ngayBatDau.format("YYYY-MM-DD"),
        ngayKetThuc: values.ngayKetThuc.format("YYYY-MM-DD"),
      });
      message.success("Cập nhật thành công");
      setEditMode(false);
      fetchDetail();
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  if (!campaign) return <Card loading={loading} />;

  return (
    <Card
      title={`📋 Chi tiết chiến dịch: ${campaign.ten}`}
      extra={
        <Button onClick={() => navigate(-1)} style={{ borderRadius: 30 }}>
          Quay lại
        </Button>
      }
      style={{ margin: "40px auto", borderRadius: 20 }}
    >
      {!editMode ? (
        <>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Tên chiến dịch">{campaign?.ten}</Descriptions.Item>
            <Descriptions.Item label="Địa điểm">{campaign?.diaDiem}</Descriptions.Item>
            <Descriptions.Item label="Ngày bắt đầu">{campaign?.ngayBatDau}</Descriptions.Item>
            <Descriptions.Item label="Ngày kết thúc">{campaign?.ngayKetThuc}</Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={2}>{campaign?.moTa}</Descriptions.Item>
            <Descriptions.Item label="Số lượng người tối đa">{campaign?.soLuongNguoiToiDa}</Descriptions.Item>
            <Descriptions.Item label="Số lượng người đăng ký hiện tại">{campaign?.soLuongNguoiDangKyHienTai}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái hoạt động">{campaign?.trangThaiHoatDong}</Descriptions.Item>
          </Descriptions>
          <div style={{ textAlign: "right", marginTop: 20 }}>
            <Button type="primary" onClick={() => setEditMode(true)}>
              Chỉnh sửa
            </Button>
          </div>
        </>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            label="Tên chiến dịch"
            name="ten"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa điểm"
            name="diaDiem"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="moTa">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            name="ngayBatDau"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            name="ngayKetThuc"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Số lượng người tối đa" name="soLuongNguoiToiDa">
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 12 }}
            >
              Lưu thay đổi
            </Button>
            <Button onClick={() => setEditMode(false)}>Hủy</Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
}
