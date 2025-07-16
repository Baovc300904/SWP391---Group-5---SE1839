import instance from "../api/axiosConfig";

export const getDashboardAnalysis = async () => {
  const res = await instance.get("/api/dashboards/analysis");
  return res.data;
};
