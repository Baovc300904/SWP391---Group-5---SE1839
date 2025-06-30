import { format } from "date-fns";

/**
 * Safely formats a date value with error handling
 * @param {string|Date|number} dateValue - The date value to format
 * @param {string} formatString - The format string (default: "dd/MM/yyyy")
 * @param {string} fallback - The fallback value if date is invalid (default: "N/A")
 * @returns {string} Formatted date string or fallback value
 */
export const safeFormatDate = (dateValue, formatString = "dd/MM/yyyy", fallback = "N/A") => {
  if (!dateValue) return fallback;
  
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return fallback;
    return format(date, formatString);
  } catch (error) {
    console.error("Error formatting date:", error, "Date value:", dateValue);
    return fallback;
  }
};

/**
 * Safely formats a date with time
 * @param {string|Date|number} dateValue - The date value to format
 * @param {string} formatString - The format string (default: "dd/MM/yyyy HH:mm")
 * @param {string} fallback - The fallback value if date is invalid (default: "N/A")
 * @returns {string} Formatted date string or fallback value
 */
export const safeFormatDateTime = (dateValue, formatString = "dd/MM/yyyy HH:mm", fallback = "N/A") => {
  return safeFormatDate(dateValue, formatString, fallback);
};

/**
 * Safely formats a date for display in Vietnamese locale
 * @param {string|Date|number} dateValue - The date value to format
 * @param {string} fallback - The fallback value if date is invalid (default: "N/A")
 * @returns {string} Formatted date string or fallback value
 */
export const safeFormatDateVietnamese = (dateValue, fallback = "N/A") => {
  if (!dateValue) return fallback;
  
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return fallback;
    
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    console.error("Error formatting date in Vietnamese:", error, "Date value:", dateValue);
    return fallback;
  }
};

/**
 * Safely formats a date with time for display in Vietnamese locale
 * @param {string|Date|number} dateValue - The date value to format
 * @param {string} fallback - The fallback value if date is invalid (default: "N/A")
 * @returns {string} Formatted date string or fallback value
 */
export const safeFormatDateTimeVietnamese = (dateValue, fallback = "N/A") => {
  if (!dateValue) return fallback;
  
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return fallback;
    
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error("Error formatting date time in Vietnamese:", error, "Date value:", dateValue);
    return fallback;
  }
};

/**
 * Checks if a date value is valid
 * @param {string|Date|number} dateValue - The date value to check
 * @returns {boolean} True if the date is valid, false otherwise
 */
export const isValidDate = (dateValue) => {
  if (!dateValue) return false;
  
  try {
    const date = new Date(dateValue);
    return !isNaN(date.getTime());
  } catch (error) {
    return false;
  }
};

/**
 * Gets the relative time (e.g., "2 hours ago", "3 days ago")
 * @param {string|Date|number} dateValue - The date value to format
 * @param {string} fallback - The fallback value if date is invalid (default: "N/A")
 * @returns {string} Relative time string or fallback value
 */
export const getRelativeTime = (dateValue, fallback = "N/A") => {
  if (!dateValue) return fallback;
  
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return fallback;
    
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 1) return "Vừa xong";
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    
    return safeFormatDateVietnamese(dateValue);
  } catch (error) {
    console.error("Error getting relative time:", error, "Date value:", dateValue);
    return fallback;
  }
}; 