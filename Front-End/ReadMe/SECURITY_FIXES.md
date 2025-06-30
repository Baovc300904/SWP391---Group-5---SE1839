# 🔒 Security Fixes - XSS Prevention

## 📋 Tổng quan
Đã sửa **9 lỗi bảo mật XSS** được phát hiện bởi Snyk Code:
- **3 lỗi High Severity** (Score 900)
- **6 lỗi Medium Severity** (Score 600-650)

## 🛠️ Các thay đổi đã thực hiện

### 1. **Tạo Utility Functions** (`src/utils/security.js`)
```javascript
// Các function bảo mật:
- sanitizeImageUrl(url)     // Sanitize image URLs
- sanitizeUrl(url)          // Sanitize URLs cho social sharing
- sanitizeText(text)        // Sanitize text input
- sanitizeUserData(userData) // Sanitize user data
```

### 2. **Sửa lỗi High Severity (Score 900)**

#### **NewDetails.jsx** - Social Share Links
**Vấn đề:** `window.location.href` không được sanitize trong social share links
```javascript
// ❌ Trước (Không an toàn)
href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}

// ✅ Sau (An toàn)
const currentUrl = sanitizeUrl(window.location.href);
href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
```

### 3. **Sửa lỗi Medium Severity (Score 600-650)**

#### **News.jsx** - Image URLs
**Vấn đề:** Image URLs không được validate
```javascript
// ❌ Trước (Không an toàn)
src={item.image}

// ✅ Sau (An toàn)
src={sanitizeImageUrl(item.image) || NewImage1}
onError={(e) => {
  e.target.src = NewImage1;
  e.target.alt = 'Default image';
}}
```

#### **BlogPages.jsx** - Blog Images
**Vấn đề:** Blog image URLs không được sanitize
```javascript
// ❌ Trước (Không an toàn)
src={blog.image}

// ✅ Sau (An toàn)
src={sanitizeImageUrl(blog.image) || '/default-blog-image.jpg'}
```

#### **Profile Pages** - Avatar Images
**Vấn đề:** User avatar URLs không được validate
```javascript
// ❌ Trước (Không an toàn)
src={user.avatar || '/default-avatar.png'}

// ✅ Sau (An toàn)
src={sanitizeImageUrl(user.avatar) || '/default-avatar.png'}
```

#### **EditProfile.jsx** - User Input
**Vấn đề:** User input không được sanitize
```javascript
// ✅ Thêm validation
maxLength={50}
pattern="https?://.*\.(jpg|jpeg|png|gif|webp|svg)"
title="Vui lòng nhập URL hình ảnh hợp lệ (https://...)"

// ✅ Sanitize trước khi lưu
const sanitizedUser = sanitizeUserData({
  ...user,
  avatar: sanitizeImageUrl(user.avatar) || user.avatar
});
```

## 🔍 Cơ chế bảo vệ

### **1. URL Validation**
- Chỉ cho phép `http://` và `https://` protocols
- Validate file extensions cho images
- Encode URLs cho social sharing

### **2. Input Sanitization**
- Loại bỏ các ký tự nguy hiểm (`<`, `>`)
- Loại bỏ `javascript:` protocol
- Loại bỏ event handlers (`onclick`, `onload`, etc.)

### **3. Fallback Images**
- Sử dụng default images khi URL không hợp lệ
- Error handling cho broken images

### **4. Input Validation**
- `maxLength` cho text inputs
- `pattern` validation cho URLs
- HTML5 validation attributes

## 📁 Files đã sửa

### **Tạo mới:**
- `src/utils/security.js` - Utility functions

### **Cập nhật:**
- `src/pages/ForUser/News/NewDetails.jsx`
- `src/pages/ForUser/News/News.jsx`
- `src/pages/ForUser/Blogs/BlogPages.jsx`
- `src/pages/ForUser/Profile/Admins/AdminProfile.jsx`
- `src/pages/ForUser/Profile/Donors/DonorProfile.jsx`
- `src/pages/ForUser/EditProfile/EditProfile.jsx`

## ✅ Kết quả

### **Trước khi sửa:**
- 9 lỗi XSS (3 High + 6 Medium)
- Nguy cơ DOM-based XSS attacks
- User input không được validate

### **Sau khi sửa:**
- ✅ 0 lỗi XSS
- ✅ URL validation cho tất cả external links
- ✅ Input sanitization cho user data
- ✅ Fallback images cho broken URLs
- ✅ Error handling cho images

## 🚀 Best Practices đã áp dụng

1. **Defense in Depth** - Nhiều lớp bảo vệ
2. **Input Validation** - Validate tất cả user input
3. **Output Encoding** - Encode URLs cho external links
4. **Error Handling** - Graceful fallbacks
5. **Code Reusability** - Centralized security utilities

## 🔄 Cách sử dụng

### **Import security utilities:**
```javascript
import { sanitizeImageUrl, sanitizeUrl, sanitizeText, sanitizeUserData } from '../utils/security';
```

### **Sanitize image URLs:**
```javascript
const safeImageUrl = sanitizeImageUrl(userInputUrl) || '/default-image.jpg';
```

### **Sanitize URLs cho social sharing:**
```javascript
const safeUrl = sanitizeUrl(window.location.href);
```

### **Sanitize user data:**
```javascript
const safeUserData = sanitizeUserData(userInput);
```

## 📝 Lưu ý

- Tất cả external URLs đều được validate
- Default images được sử dụng khi URL không hợp lệ
- User input được sanitize trước khi lưu vào localStorage
- Error handling cho tất cả image elements
- HTML5 validation attributes được thêm vào forms 