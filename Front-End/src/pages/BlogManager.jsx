import React from "react";
import { Card, Tabs } from "antd";
import BlogCategoryTab from "../components/Blog/BlogCategoryTab";
import BlogTab from "../components/Blog/BlogTab";

export default function BlogManager() {
  return (
    <Card title="Quản lý Blog" style={{ borderRadius: 12 }}>
      <Tabs defaultActiveKey="category">
        <Tabs.TabPane tab="Danh mục blog" key="category">
          <BlogCategoryTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Danh sách blog" key="blog">
          <BlogTab />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}
