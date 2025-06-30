import instance from "../../api/axiosConfig";

export const getBlogs = async () => {
  try {
    const res = await instance.get("/api/blogs");
    return res.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getAllBlogs = async () => {
  try {
    const res = await instance.get("/api/blogs");
    return res.data;
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    throw error;
  }
};

export const createBlog = async (data) => {
  try {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const res = await instance.post("/api/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const getBlogDetail = async (id) => {
  try {
    const res = await instance.get(`/api/blogs/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    throw error;
  }
};

export const updateBlog = async (id, formData) => {
  try {
    const res = await instance.put(`/api/blogs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const res = await instance.delete(`/api/blogs/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};
