// pages/BloodWarehouse.js
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Input,
  Card,
  Tooltip,
  Popconfirm,
  Pagination,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  getPendingBloodUnits,
  markAsTested,
  cancelTest,
} from "../services/bloodWarehouseService";

export default function BloodWarehouse() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState("");

  const fetchData = async (pageIndex = 1) => {
    setLoading(true);
    try {
      const res = await getPendingBloodUnits(pageIndex, keyword);
      setData(res?.content || []);
      setTotal(res?.totalElements || 0);
      setPage(res?.number + 1 || 1);
    } catch {
      message.error("Lỗi khi tải dữ liệu kho máu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTested = async (id) => {
    try {
      await markAsTested(id);
      message.success("Đã đánh dấu xét nghiệm thành công!");
      fetchData(page);
    } catch {
      message.error("Thao tác thất bại!");
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelTest(id);
      message.success("Đã huỷ đơn vị máu!");
      fetchData(page);
    } catch {
      message.error("Thao tác thất bại!");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "Người hiến",
      dataIndex: ["nguoiHien", "ten"],
      render: (_, record) =>
        record.nguoiHien?.ten || record.nguoiHien?.tenDangNhap || "-",
    },
    {
      title: "Mã đơn vị",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: "Nhóm máu",
      dataIndex: ["nhomMau", "ten"],
      key: "nhomMau",
    },
    {
      title: "Yếu tố Rh",
      dataIndex: "yeuToRh",
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Tooltip title="Xét nghiệm thành công">
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => handleTested(record.id)}
            />
          </Tooltip>
          <Popconfirm
            title="Bạn có chắc muốn huỷ đơn vị máu này?"
            onConfirm={() => handleCancel(record.id)}
            okText="Huỷ"
            cancelText="Không"
          >
            <Button danger icon={<CloseCircleOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Card
      title="🧪 Danh sách đơn vị máu chờ xét nghiệm"
      style={{ maxWidth: 1200, margin: "auto", borderRadius: 16 }}
    >
      <div style={{ marginBottom: 16, display: "flex", gap: 12 }}>
        <Input
          placeholder="Tìm theo mã..."
          style={{ width: 300 }}
          onChange={(e) => setKeyword(e.target.value)}
          onPressEnter={() => fetchData(1)}
          prefix={<SearchOutlined />}
        />
        <Button type="primary" onClick={() => fetchData(1)}>
          Tìm kiếm
        </Button>
      </div>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Pagination
          current={page}
          pageSize={20}
          total={total}
          onChange={(p) => fetchData(p)}
        />
      </div>
    </Card>
  );
}
