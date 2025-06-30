import instance from "../../api/axiosConfig";

// For user pages - only active categories
export const getBlogCategories = async () => {
  try {
    const res = await instance.get("/api/blog-categories");
    // Filter only active categories (trangThai = 1)
    return res.data.filter(category => category.trangThai === 1);
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    throw error;
  }
};

// For user pages - only active categories
export const getAllCategories = async () => {
  try {
    const res = await instance.get("/api/blog-categories");
    // Filter only active categories (trangThai = 1)
    return res.data.filter(category => category.trangThai === 1);
  } catch (error) {
    console.error('Error fetching all categories:', error);
    throw error;
  }
};

// For admin pages - all categories including inactive ones
export const getAllCategoriesForAdmin = async () => {
  try {
    const res = await instance.get("/api/blog-categories");
    return res.data; // Return all categories without filtering
  } catch (error) {
    console.error('Error fetching categories for admin:', error);
    throw error;
  }
};

export const createBlogCategory = async (data) => {
  try {
    const res = await instance.post("/api/blog-categories", data);
    return res.data;
  } catch (error) {
    console.error('Error creating blog category:', error);
    throw error;
  }
};

export const getBlogCategoryDetail = async (id) => {
  try {
    const res = await instance.get(`/api/blog-categories/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching category detail:', error);
    throw error;
  }
};

export const updateBlogCategory = async (id, data) => {
  try {
    const res = await instance.put(`/api/blog-categories/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Error updating blog category:', error);
    throw error;
  }
};

export const deleteBlogCategory = async (id) => {
  try {
    const res = await instance.delete(`/api/blog-categories/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting blog category:', error);
    throw error;
  }
};
