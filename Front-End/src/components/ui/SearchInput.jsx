import React, { memo } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchInput.css";

const SearchInput = memo(({
  placeholder = "Tìm kiếm...",
  value,
  onChange,
  onSearch,
  className = "",
  size = "medium",
  showIcon = true,
  disabled = false,
  ...props
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  const sizeClasses = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-2",
    large: "px-5 py-3 text-lg"
  };

  return (
    <div className={`search-input-wrapper position-relative ${className}`}>
      {showIcon && (
        <FaSearch className="search-icon" />
      )}
      <input
        type="text"
        className={`search-input ${sizeClasses[size]} ${showIcon ? 'pl-10' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        {...props}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput; 