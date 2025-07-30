import { Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const { Search } = Input;

const VietnamMap = () => {
  const [position, setPosition] = useState([14.0583, 108.2772]); // Vị trí trung tâm Việt Nam (Hà Nội)

  // Tìm kiếm địa chỉ qua API Nominatim
  const handleSearch = async (value) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: value,
            format: "json",
            addressdetails: 1,
            limit: 1,
          },
        }
      );

      const location = response.data[0];
      if (location) {
        const lat = parseFloat(location.lat);
        const lon = parseFloat(location.lon);
        setPosition([lat, lon]); // Cập nhật vị trí tìm được
        message.success(`Vị trí tìm được: ${lat}, ${lon}`);
      } else {
        message.error("Không tìm thấy vị trí này.");
      }
    } catch (error) {
      message.error(error?.message || "Có lỗi xảy ra khi tìm kiếm vị trí.");
    }
  };

  return (
    <div>
      <Search
        placeholder="Tìm kiếm địa chỉ tại Việt Nam"
        onSearch={handleSearch}
        enterButton="Tìm"
        style={{ marginBottom: 20, maxWidth: 400 }}
      />
      <MapContainer center={position} zoom={13} style={{ height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            Vị trí: {position[0]}, {position[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default VietnamMap;
