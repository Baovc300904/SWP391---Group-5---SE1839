import instance from "../api/axiosConfig";

export const getBlogs = async () => {
  const res = await instance.get("/api/blogs");
  return res.data;
};

export const createBlog = async (data) => {
  const res = await instance.post("/api/blogs", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getBlogDetail = async (id) => {
  const res = await instance.get(`/api/blogs/${id}`);
  return res.data;
};

export const updateBlog = async (id, formData) => {
  const res = await instance.put(`/api/blogs/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const deleteBlog = async (id) => {
  const res = await instance.delete(`/api/blogs/${id}`);
  return res.data;
};
