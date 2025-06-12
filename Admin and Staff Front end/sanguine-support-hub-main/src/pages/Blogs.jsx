
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import StaffSidebar from "@/components/StaffSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Eye, Calendar } from "lucide-react";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const blogs = [
    {
      id: 1,
      title: "Tầm quan trọng của việc hiến máu",
      author: "BS. Nguyễn Văn A",
      publishDate: "2024-06-01",
      status: "published",
      views: 1250,
      category: "Giáo dục"
    },
    {
      id: 2,
      title: "Hướng dẫn chuẩn bị trước khi hiến máu",
      author: "BS. Trần Thị B",
      publishDate: "2024-05-28",
      status: "draft",
      views: 0,
      category: "Hướng dẫn"
    },
    {
      id: 3,
      title: "Những câu hỏi thường gặp về hiến máu",
      author: "BS. Lê Minh C",
      publishDate: "2024-05-25",
      status: "published",
      views: 980,
      category: "FAQ"
    }
  ];

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Đã xuất bản</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800">Bản nháp</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <StaffSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Quản lý blog</h1>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tạo bài viết mới
              </Button>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle>Tìm kiếm bài viết</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo tiêu đề hoặc tác giả..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Blogs List */}
            <Card>
              <CardHeader>
                <CardTitle>Danh sách bài viết ({filteredBlogs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBlogs.map((blog) => (
                    <div key={blog.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-medium">{blog.title}</h3>
                            <p className="text-sm text-muted-foreground">Tác giả: {blog.author}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {new Date(blog.publishDate).toLocaleDateString('vi-VN')}
                              </span>
                              <span className="text-xs text-muted-foreground">• {blog.views} lượt xem</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{blog.category}</Badge>
                            {getStatusBadge(blog.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Blogs;
