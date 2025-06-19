-- MySQL dump 10.13  Distrib 9.3.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: blooddonate
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BaiViet`
--

DROP TABLE IF EXISTS `BaiViet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BaiViet` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `TieuDe` text NOT NULL,
  `DanhMucId` int NOT NULL,
  `Anh` varchar(255) NOT NULL,
  `NoiDung` text NOT NULL,
  `LuotXem` int DEFAULT '0',
  `NguoiTao` int NOT NULL,
  `TrangThai` int DEFAULT '1' COMMENT '0 inactive, 1 active',
  `NgayTao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `NgayCapNhat` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `FK_BaiViet_DanhMuc` (`DanhMucId`),
  CONSTRAINT `FK_BaiViet_DanhMuc` FOREIGN KEY (`DanhMucId`) REFERENCES `DanhMucBaiViet` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BaiViet`
--

LOCK TABLES `BaiViet` WRITE;
/*!40000 ALTER TABLE `BaiViet` DISABLE KEYS */;
INSERT INTO `BaiViet` VALUES (1,'23232',1,'uploads/blogs/1750218589022_232571300.jpg','23232',0,1,0,'2025-06-18 03:20:34','2025-06-18 03:49:49');
/*!40000 ALTER TABLE `BaiViet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DanhMucBaiViet`
--

DROP TABLE IF EXISTS `DanhMucBaiViet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DanhMucBaiViet` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `TieuDe` text NOT NULL,
  `NoiDung` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TrangThai` int DEFAULT '1' COMMENT '0 inactive, 1 active',
  `NgayTao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `NgayCapNhat` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DanhMucBaiViet`
--

LOCK TABLES `DanhMucBaiViet` WRITE;
/*!40000 ALTER TABLE `DanhMucBaiViet` DISABLE KEYS */;
INSERT INTO `DanhMucBaiViet` VALUES (1,'Tieude','noidung',0,'2025-06-17 17:03:00','2025-06-17 17:04:06');
/*!40000 ALTER TABLE `DanhMucBaiViet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HoatDongHienMau`
--

DROP TABLE IF EXISTS `HoatDongHienMau`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HoatDongHienMau` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Ten` varchar(255) NOT NULL,
  `NgayBatDau` datetime NOT NULL,
  `NgayKetThuc` datetime NOT NULL,
  `DiaDiem` varchar(255) NOT NULL,
  `MoTa` text,
  `SoLuongNguoiToiDa` int DEFAULT NULL,
  `SoLuongNguoiDangKyHienTai` int DEFAULT '0',
  `NguoiTaoId` int DEFAULT NULL,
  `TrangThaiHoatDong` enum('sapdienra','dangdienra','daketthuc','huy') DEFAULT NULL,
  `NgayTao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `NgayCapNhat` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `NguoiTaoId` (`NguoiTaoId`),
  CONSTRAINT `hoatdonghienmau_ibfk_1` FOREIGN KEY (`NguoiTaoId`) REFERENCES `NguoiDung` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HoatDongHienMau`
--

LOCK TABLES `HoatDongHienMau` WRITE;
/*!40000 ALTER TABLE `HoatDongHienMau` DISABLE KEYS */;
INSERT INTO `HoatDongHienMau` VALUES (2,'Blood Donation Day 2025','2025-07-10 00:00:00','2025-07-12 00:00:00','FPT University, Hanoi','A humanitarian blood donation event aiming to save hundreds of lives.',200,20,1,'sapdienra','2025-06-18 13:38:26','2025-06-18 13:46:59'),(3,'Blood Donation Day 2025','2025-07-10 00:00:00','2025-07-12 00:00:00','FPT University, Hanoi','A humanitarian blood donation event aiming to save hundreds of lives.',200,0,1,'sapdienra','2025-06-18 13:45:07','2025-06-18 13:45:29'),(4,'Blood Donation Day 2025','2025-07-10 00:00:00','2025-07-12 00:00:00','FPT University, Hanoi','A humanitarian blood donation event aiming to save hundreds of lives.',200,0,1,'sapdienra','2025-06-18 13:45:41','2025-06-18 13:45:41');
/*!40000 ALTER TABLE `HoatDongHienMau` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LichSuLienHeHoTro`
--

DROP TABLE IF EXISTS `LichSuLienHeHoTro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LichSuLienHeHoTro` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NguoiHoTroId` int DEFAULT NULL,
  `HoTroId` int NOT NULL,
  `GhiChu` text NOT NULL,
  `TrangThai` enum('moi','dangxuly','hoanthanh','dahuy') NOT NULL DEFAULT 'moi',
  `NgayTao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `NgayCapNhat` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `FK_LichSu_NguoiHoTro` (`NguoiHoTroId`),
  KEY `FK_LichSu_HoTro` (`HoTroId`),
  CONSTRAINT `FK_LichSu_HoTro` FOREIGN KEY (`HoTroId`) REFERENCES `YeuCauLienHeHoTro` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_LichSu_NguoiHoTro` FOREIGN KEY (`NguoiHoTroId`) REFERENCES `NguoiDung` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LichSuLienHeHoTro`
--

LOCK TABLES `LichSuLienHeHoTro` WRITE;
/*!40000 ALTER TABLE `LichSuLienHeHoTro` DISABLE KEYS */;
INSERT INTO `LichSuLienHeHoTro` VALUES (1,NULL,1,'User create new support ticket','moi','2025-06-18 07:18:43','2025-06-18 07:18:43'),(2,NULL,2,'User create new support ticket','moi','2025-06-18 07:18:57','2025-06-18 07:18:57'),(3,NULL,3,'User create new support ticket','moi','2025-06-18 07:18:57','2025-06-18 07:18:57'),(4,NULL,4,'User create new support ticket','moi','2025-06-18 07:18:58','2025-06-18 07:18:58'),(5,NULL,5,'User create new support ticket','moi','2025-06-18 09:04:45','2025-06-18 09:04:45'),(6,1,1,'Co van de','dangxuly','2025-06-18 09:07:23','2025-06-18 09:07:23'),(7,1,1,'Co van de','dangxuly','2025-06-18 09:07:24','2025-06-18 09:07:24'),(8,1,1,'Co van de','dangxuly','2025-06-18 09:08:04','2025-06-18 09:08:04'),(9,1,1,'Co van de','dangxuly','2025-06-18 09:08:05','2025-06-18 09:08:05'),(10,1,1,'Co van de','dangxuly','2025-06-18 09:09:10','2025-06-18 09:09:10'),(11,1,1,'Co van de','dangxuly','2025-06-18 09:10:34','2025-06-18 09:10:34'),(12,1,1,'Co van de','dangxuly','2025-06-18 09:11:00','2025-06-18 09:11:00'),(13,1,1,'Co van de','dangxuly','2025-06-18 09:11:00','2025-06-18 09:11:00'),(14,1,1,'Co van de','dangxuly','2025-06-18 09:14:01','2025-06-18 09:14:01'),(15,1,1,'Co van de','dangxuly','2025-06-18 09:14:03','2025-06-18 09:14:03'),(16,1,1,'Co van de','dangxuly','2025-06-18 09:14:20','2025-06-18 09:14:20'),(17,1,1,'Co van de','dangxuly','2025-06-18 09:17:53','2025-06-18 09:17:53'),(18,1,1,'Co van de','dangxuly','2025-06-18 09:32:26','2025-06-18 09:32:26');
/*!40000 ALTER TABLE `LichSuLienHeHoTro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NguoiDung`
--

DROP TABLE IF EXISTS `NguoiDung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NguoiDung` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Ten` varchar(100) NOT NULL,
  `TenDangNhap` varchar(50) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `SoDienThoai` varchar(20) DEFAULT NULL,
  `NgaySinh` date DEFAULT NULL,
  `GioiTinh` enum('nam','nu','khac') DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `NhomMauId` int NOT NULL,
  `YeuToRh` enum('+','-') DEFAULT NULL,
  `TienSuBenh` text,
  `CanNang` decimal(5,2) DEFAULT NULL,
  `ChieuCao` decimal(5,2) DEFAULT NULL,
  `VaiTro` enum('nguoidung','nhanvien','admin') NOT NULL,
  `TrangThai` int DEFAULT '1' COMMENT '0 inactive, 1 active',
  `NgayTao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `NgayCapNhat` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `TenDangNhap` (`TenDangNhap`),
  UNIQUE KEY `Email` (`Email`),
  KEY `FK_NguoiDung_NhomMau` (`NhomMauId`),
  CONSTRAINT `FK_NguoiDung_NhomMau` FOREIGN KEY (`NhomMauId`) REFERENCES `NhomMau` (`Id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NguoiDung`
--

LOCK TABLES `NguoiDung` WRITE;
/*!40000 ALTER TABLE `NguoiDung` DISABLE KEYS */;
INSERT INTO `NguoiDung` VALUES (1,'Nguyễn Văn B','nguyenvana','$2a$10$/pmROSektMnBdh5PoaMsceeeM5VV7jCTjaXbm1SnLjHT1inad128O','nguyenvana@example.com','0987654321','2000-05-15','nam','123 Lê Lợi, Quận 1, TP.HCM',1,'+','Không có',60.50,170.20,'nguoidung',0,'2025-06-17 16:27:58','2025-06-18 10:08:41'),(2,'Nguyễn Văn B','nguyenvanb','$2a$10$VC54ZP3rPK4F93dkGmzVqeLtLdmudhGoyfgjh9ypVCnHhx3GcwAY.','nguyenvanb@example.com','0987654321','2000-05-15','nam','123 Lê Lợi, Quận 1, TP.HCM',1,'+','Không có',60.50,170.20,'nguoidung',1,'2025-06-17 16:39:25','2025-06-17 16:39:25');
/*!40000 ALTER TABLE `NguoiDung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NhomMau`
--

DROP TABLE IF EXISTS `NhomMau`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NhomMau` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Ten` varchar(255) NOT NULL,
  `Mota` text,
  `TrangThai` int DEFAULT '1' COMMENT '0 inactive, 1 active',
  `NgayTao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `NgayCapNhat` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Ten` (`Ten`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NhomMau`
--

LOCK TABLES `NhomMau` WRITE;
/*!40000 ALTER TABLE `NhomMau` DISABLE KEYS */;
INSERT INTO `NhomMau` VALUES (1,'test','aaaa',0,'2025-06-17 15:25:18','2025-06-18 09:40:13'),(2,'C','adfsd',1,'2025-06-18 09:39:07','2025-06-18 09:39:07');
/*!40000 ALTER TABLE `NhomMau` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `YeuCauHienMau`
--

DROP TABLE IF EXISTS `YeuCauHienMau`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `YeuCauHienMau` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NguoiHienId` int NOT NULL,
  `HoatDongHienMauId` int DEFAULT NULL,
  `NgayHienMauDuKien` date NOT NULL,
  `NgayPhucHoiGanNhat` date DEFAULT NULL,
  `GhiChu` text,
  `NguoiDuyetId` int DEFAULT NULL,
  `NgayDuyet` timestamp NULL DEFAULT NULL,
  `LoaiHien` enum('toanphan','hongcau','tieucau','huyettuong') NOT NULL DEFAULT 'toanphan',
  `TrangThai` enum('dangcho','xacnhan','dahien','huy','tuchoi') NOT NULL DEFAULT 'dangcho',
  `NgayTao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `NgayCapNhat` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `NguoiHienId` (`NguoiHienId`),
  KEY `HoatDongHienMauId` (`HoatDongHienMauId`),
  KEY `NguoiDuyetId` (`NguoiDuyetId`),
  CONSTRAINT `yeucauhienmau_ibfk_1` FOREIGN KEY (`NguoiHienId`) REFERENCES `NguoiDung` (`Id`),
  CONSTRAINT `yeucauhienmau_ibfk_2` FOREIGN KEY (`HoatDongHienMauId`) REFERENCES `HoatDongHienMau` (`Id`),
  CONSTRAINT `yeucauhienmau_ibfk_3` FOREIGN KEY (`NguoiDuyetId`) REFERENCES `NguoiDung` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `YeuCauHienMau`
--

LOCK TABLES `YeuCauHienMau` WRITE;
/*!40000 ALTER TABLE `YeuCauHienMau` DISABLE KEYS */;
INSERT INTO `YeuCauHienMau` VALUES (1,1,NULL,'2025-07-20','2025-01-15','Đã từng hiến máu 3 lần. Yêu cầu xét nghiệm trước.',1,'2025-06-18 14:36:58','toanphan','xacnhan','2025-06-18 14:27:49','2025-06-18 14:36:58'),(2,1,NULL,'2025-07-20','2025-01-15','Đã từng hiến máu 3 lần. Yêu cầu xét nghiệm trước.',NULL,NULL,'toanphan','dangcho','2025-06-18 15:00:57','2025-06-18 15:00:57'),(3,1,NULL,'2025-07-20','2025-01-15','Đã từng hiến máu 3 lần. Yêu cầu xét nghiệm trước.',NULL,NULL,'toanphan','dangcho','2025-06-18 15:01:08','2025-06-18 15:01:08');
/*!40000 ALTER TABLE `YeuCauHienMau` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `YeuCauLienHeHoTro`
--

DROP TABLE IF EXISTS `YeuCauLienHeHoTro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `YeuCauLienHeHoTro` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NguoiDungId` int NOT NULL,
  `HoTen` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `SoDienThoai` varchar(20) NOT NULL,
  `TieuDe` varchar(255) NOT NULL,
  `NoiDung` text NOT NULL,
  `TrangThai` enum('moi','dangxuly','hoanthanh','dahuy') NOT NULL DEFAULT 'moi',
  `NgayTao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `NgayCapNhat` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `FK_YeuCau_NguoiDung` (`NguoiDungId`),
  CONSTRAINT `FK_YeuCau_NguoiDung` FOREIGN KEY (`NguoiDungId`) REFERENCES `NguoiDung` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `YeuCauLienHeHoTro`
--

LOCK TABLES `YeuCauLienHeHoTro` WRITE;
/*!40000 ALTER TABLE `YeuCauLienHeHoTro` DISABLE KEYS */;
INSERT INTO `YeuCauLienHeHoTro` VALUES (1,1,'ngujuyenfd','nguyensonghao@gmail.com','0975030714','tieude','fefdfd','dangxuly','2025-06-18 07:18:43','2025-06-18 09:07:23'),(2,1,'ngujuyenfd','nguyensonghao@gmail.com','0975030714','tieude','fefdfd','moi','2025-06-18 07:18:57','2025-06-18 07:18:57'),(3,1,'ngujuyenfd','nguyensonghao@gmail.com','0975030714','tieude','fefdfd','moi','2025-06-18 07:18:57','2025-06-18 07:18:57'),(4,1,'ngujuyenfd','nguyensonghao@gmail.com','0975030714','tieude','fefdfd','moi','2025-06-18 07:18:58','2025-06-18 07:18:58'),(5,1,'ngujuyenfd','nguyensonghao@gmail.com','0975030714','tieude','fefdfd','moi','2025-06-18 09:04:45','2025-06-18 09:04:45');
/*!40000 ALTER TABLE `YeuCauLienHeHoTro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'blooddonate'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-18 22:19:54
