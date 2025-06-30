// Security utilities to prevent XSS attacks

/**
 * Sanitize image URLs to prevent XSS attacks
 * @param {string} url - The URL to sanitize
 * @returns {string} - Sanitized URL or empty string if invalid
 */
export const sanitizeImageUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return '';
    }
    // Only allow common image extensions
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasValidExtension = allowedExtensions.some(ext => 
      urlObj.pathname.toLowerCase().includes(ext)
    );
    if (!hasValidExtension) {
      return '';
    }
    return url;
  } catch {
    return '';
  }
};

/**
 * Sanitize URLs for social sharing
 * @param {string} url - The URL to sanitize
 * @returns {string} - Encoded URL or empty string if invalid
 */
export const sanitizeUrl = (url) => {
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return '';
    }
    return encodeURIComponent(url);
  } catch {
    return '';
  }
};

/**
 * Sanitize text input to prevent XSS
 * @param {string} text - The text to sanitize
 * @returns {string} - Sanitized text
 */
export const sanitizeText = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  // Remove potentially dangerous characters
  return text
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Validate and sanitize user input
 * @param {object} userData - User data object
 * @returns {object} - Sanitized user data
 */
export const sanitizeUserData = (userData) => {
  if (!userData || typeof userData !== 'object') return {};
  
  return {
    name: sanitizeText(userData.name || ''),
    email: userData.email || '',
    role: sanitizeText(userData.role || ''),
    avatar: sanitizeImageUrl(userData.avatar || '')
  };
}; 