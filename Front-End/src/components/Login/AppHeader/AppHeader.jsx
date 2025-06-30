import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./AppHeader.css";

export default function AppHeader() {
  return (
    <header className="custom-header">
      <div className="header-title">BLOOD BANK MANAGEMENT SYSTEM</div>
      <nav className="header-nav">
        <span>
          <HomeOutlined /> Home
        </span>
      </nav>
    </header>
  );
}
