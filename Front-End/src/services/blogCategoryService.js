import instance from "../api/axiosConfig";

export const getBlogCategories = async () => {
  const res = await instance.get("/api/blog-categories");
  return res.data;
};

export const createBlogCategory = async (data) => {
  const res = await instance.post("/api/blog-categories", data);
  return res.data;
};

export const getBlogCategoryDetail = async (id) => {
  const res = await instance.get(`/api/blog-categories/${id}`);
  return res.data;
};

export const updateBlogCategory = async (id, data) => {
  const res = await instance.put(`/api/blog-categories/${id}`, data);
  return res.data;
};
