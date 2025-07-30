# hienmauapi

## Tổng quan
Dự án `hienmauapi` là hệ thống backend cho một ứng dụng quản lý hiến máu. Nó cung cấp các API để quản lý người dùng, các hoạt động hiến máu, yêu cầu máu, thông báo và nhiều chức năng khác. Backend này được thiết kế để hỗ trợ hoạt động của hệ thống hiến máu một cách hiệu quả và an toàn.

## Chức năng
- **Quản lý người dùng**: Xử lý đăng ký, xác thực và kiểm soát truy cập dựa trên vai trò.
- **Hoạt động hiến máu**: Quản lý các sự kiện và hoạt động hiến máu.
- **Yêu cầu máu**: Hỗ trợ tạo, cập nhật và quản lý các yêu cầu hiến máu và nhận máu.
- **Thông báo**: Gửi thông báo đến người dùng về các sự kiện hiến máu và cập nhật.
- **Hỗ trợ khách hàng**: Quản lý các yêu cầu hỗ trợ và lịch sử hỗ trợ của người dùng.
- **Quản lý blog**: Thực hiện các thao tác CRUD cho blog và danh mục blog.
- **Bảng điều khiển**: Cung cấp thống kê và thông tin chi tiết cho quản trị viên.

## Công nghệ sử dụng
- **Java**: Ngôn ngữ lập trình chính.
- **Spring Boot**: Framework để xây dựng ứng dụng backend.
  - Spring Security: Xác thực và phân quyền.
  - Spring Data JPA: Tương tác với cơ sở dữ liệu.
  - Spring Web: Xây dựng các API RESTful.
- **MySQL**: Cơ sở dữ liệu quan hệ để lưu trữ dữ liệu ứng dụng.
- **Hibernate**: Framework ORM để thao tác với cơ sở dữ liệu.
- **JWT**: Xác thực người dùng an toàn.
- **Maven**: Công cụ quản lý build và phụ thuộc.

## Cấu hình
Ứng dụng sử dụng các thuộc tính cấu hình sau:

```properties
spring.application.name=blooddonate
spring.datasource.url=jdbc:mysql://localhost:3306/blooddonate
spring.datasource.username=root
spring.datasource.password=123456
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
spring.web.cors.allowed-origins=*
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

## Cách chạy
1. Clone repository.
2. Cấu hình kết nối cơ sở dữ liệu trong `application.properties`.
3. Build dự án bằng Maven:
   ```bash
   mvn clean install
   ```
4. Chạy ứng dụng:
   ```bash
   mvn spring-boot:run
   ```

## Cấu trúc thư mục
- `src/main/java/org/fpt/blooddonate`: Chứa mã nguồn chính của ứng dụng.
  - `configs`: Các file cấu hình cho ứng dụng.
  - `controllers`: Các REST controller để xử lý yêu cầu API.
  - `dtos`: Các đối tượng truyền dữ liệu cho payload yêu cầu và phản hồi.
  - `exceptions`: Xử lý ngoại lệ tùy chỉnh.
  - `middlewares`: Các thành phần middleware như bộ lọc JWT.
  - `models`: Các lớp thực thể đại diện cho bảng cơ sở dữ liệu.
  - `repositories`: Các interface cho thao tác cơ sở dữ liệu.
  - `services`: Các triển khai logic nghiệp vụ.
  - `utils`: Các lớp tiện ích.
- `src/main/resources`: Chứa các file cấu hình như `application.properties`.

## Giấy phép
Dự án này được cấp phép theo giấy phép MIT.
