# hienmaucongdongviet

## Tổng quan
Dự án `Hiến Máu Cộng Đồng Việt` là hệ thống backend cho một ứng dụng quản lý hiến máu. Nó cung cấp các API để quản lý người dùng, các hoạt động hiến máu, yêu cầu máu, thông báo và nhiều chức năng khác. Backend này được thiết kế để hỗ trợ hoạt động của hệ thống hiến máu một cách hiệu quả và an toàn.

## Chức năng
### Quản lý người dùng
- Xử lý đăng ký tài khoản.
- Xác thực người dùng thông qua JWT.
- Phân quyền truy cập dựa trên vai trò (người dùng, quản trị viên).

### Hoạt động hiến máu
- Tạo và quản lý các sự kiện hiến máu.
- Cập nhật thông tin chi tiết về các sự kiện hiến máu.
- Theo dõi số lượng người tham gia hiến máu.

### Yêu cầu hiến máu
- Người dùng có thể tạo yêu cầu hiến máu.
- Quản lý trạng thái yêu cầu hiến máu (đang chờ, đã xử lý).
- Cập nhật thông tin liên quan đến yêu cầu hiến máu.

### Yêu cầu nhận máu
- Bệnh viện hoặc cá nhân có thể tạo yêu cầu nhận máu.
- Quản lý trạng thái yêu cầu nhận máu (đang chờ, đã xử lý).
- Theo dõi lịch sử các yêu cầu nhận máu.

### Thông báo
- Gửi thông báo đến người dùng về các sự kiện hiến máu.
- Cập nhật trạng thái yêu cầu hiến máu hoặc nhận máu qua thông báo.

### Hỗ trợ khách hàng
- Người dùng có thể gửi yêu cầu hỗ trợ.
- Quản lý lịch sử các yêu cầu hỗ trợ.
- Cung cấp phản hồi nhanh chóng cho người dùng.

### Quản lý blog
- Tạo, cập nhật, xóa và xem các bài viết blog.
- Quản lý danh mục blog.

### Bảng điều khiển
- Cung cấp thống kê chi tiết về số lượng máu hiến, máu nhận.
- Hiển thị thông tin tổng quan về các hoạt động hiến máu.

## Công nghệ sử dụng
- **Ngôn ngữ lập trình**: Java
- **Framework**: Spring Boot
  - **Spring Security**: Để xác thực và phân quyền người dùng.
  - **Spring Data JPA**: Để tương tác với cơ sở dữ liệu thông qua ORM.
  - **Spring Web**: Để xây dựng các API RESTful.
- **Cơ sở dữ liệu**: MySQL
  - **Hibernate**: Framework ORM để ánh xạ các đối tượng Java với cơ sở dữ liệu.
- **Xác thực**: JSON Web Token (JWT) để bảo mật và xác thực người dùng.
- **Công cụ build**: Maven để quản lý phụ thuộc và build dự án.
- **Công cụ khác**:
  - **Lombok**: Giảm boilerplate code trong các class Java.
  - **ModelMapper**: Để ánh xạ giữa các DTO và entity.
  - **JUnit**: Để viết và chạy các unit test.
  - **Postman**: Để lưu trữ và kiểm thử API.

### Chi tiết công nghệ
- **Spring Security**: Cung cấp các cơ chế bảo mật như xác thực dựa trên JWT, phân quyền theo vai trò, và bảo vệ các endpoint API.
- **Spring Data JPA**: Tích hợp với Hibernate để thực hiện các thao tác CRUD trên cơ sở dữ liệu một cách dễ dàng và hiệu quả.
- **Hibernate**: Hỗ trợ ánh xạ các class Java thành các bảng trong cơ sở dữ liệu, đồng thời cung cấp các tính năng như lazy loading và caching.
- **Lombok**: Tự động sinh mã như getter, setter, constructor, giúp giảm thiểu mã lặp.
- **ModelMapper**: Hỗ trợ chuyển đổi dữ liệu giữa các lớp DTO và entity một cách nhanh chóng và chính xác.
- **JUnit**: Framework kiểm thử phổ biến để đảm bảo chất lượng mã nguồn thông qua các unit test.
- **Postman**: Công cụ phổ biến để kiểm thử API và lưu trữ các bộ sưu tập API.

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
