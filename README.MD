# Xây dựng hệ thống quản lý bệnh viện

## Thành viên nhóm:

| STT | Họ tên               |   MSSV   |
| :-: | -------------------- | :------: |
|  1  | Nguyễn Minh Tú       | 20110741 |
|  2  | Nguyễn Quốc Bảo      | 20110179 |
|  3  | Nguyễn Ngọc Tuyết Vi | 20110748 |

## Các công cụ và công nghệ được sử dụng

- Ngôn ngữ lập trình: Java, JavaScript
- IDE/ Text Editor: IntelliJ IDEA Ultimate, Visual Studio Code
- Database: Microsoft SQL Server
- Back-end: Java Spring Boot
- Front-end: ReactJS

## Những tính năng chính

|                   | Tên chức năng                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Người dùng khách  | - Đăng nhập bằng số điện thoại hoặc tài khoản Microsoft. <br> - Đăng ký tài khoản bệnh nhân.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Bệnh nhân         | - Đăng xuất. <br> - Tạo hồ sơ bệnh nhân. <br> - Xem thông tin hồ sơ bệnh nhân. <br> - Chỉnh sửa thông tin hồ sơ bệnh nhân. <br> - Xóa hồ sơ bệnh nhân. <br> - Tìm hồ sơ bệnh nhân đã mất. <br> - Xem phiếu khám bệnh của hồ sơ bệnh nhân. <br> - Đặt lịch khám bệnh. <br> - Xem lịch sử khám chữa bệnh.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Điều dưỡng        | - Đăng xuất. <br> - Tạo hồ sơ cho bệnh nhân. <br> - Tiếp nhận bệnh nhân tại quầy và phòng khám. <br> - Cập nhật số thứ tự khám bệnh.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Bác sĩ            | - Đăng xuất. <br> - Tiếp nhận bệnh nhân vào khám bệnh. <br> - Tạo phiếu chuẩn đoán cho bệnh nhân. <br> - Tạo, xóa toa thuốc trong phiếu chuẩn đoán. <br> - Xuất toa thuốc cho bệnh nhân. <br> - Tạo, xóa dịch vụ xét nghiệm trong phiếu chuẩn đoán. <br> - Xuất phiếu xét nghiệm cho bệnh nhân. <br> - Xem kết quả xét nghiệm của bệnh nhân. <br> - Xem lịch sử khám bệnh của bệnh nhân. <br> - Xem lịch trực của bản thân.                                                                                                                                                                                                                                                                                                                              |
| Trưởng khoa       | - Có toàn bộ chức năng của bác sĩ. <br> - Tạo, sửa và xóa ca trực của các bác sĩ trong khoa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Bác sĩ xét nghiệm | - Đăng xuất. <br> - Tiếp nhận bệnh nhân vào xét nghiệm. <br> - Thêm báo cáo xét nghiệm cho bệnh nhân.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Quản lý           | - Đăng xuất. <br> - Thực hiện thống kê doanh thu, lượt đăng ký, phương thức thanh toán, bệnh nhân, lượt khám tại khoa. <br> - Xem danh sách các bệnh nhân và thông tin chi tiết của bệnh nhân. <br> - Xem danh sách các thanh toán và thông tin chi tiết của thanh toán. <br> - Quản lý nhân viên: Thêm, sửa, khóa, mở khóa nhân viên, xem thông tin lịch trực của nhân viên. <br> - Quản lý khoa: Thêm, sửa, khóa, mở khóa khoa, thêm hoặc xóa bác sĩ khỏi khoa, thêm hoặc xóa trưởng khoa. <br> - Quản lý phòng: Thêm, sửa, khóa, mở khóa phòng, xem thông tin lịch trực của phòng. <br> - Quản lý dịch vụ: Thêm, sửa, khóa, mở khóa dịch vụ. <br> - Quản lý thuốc: Thêm, sửa, khóa, mở khóa thuốc. <br> - Quản lý tài khoản: Khóa, mở khóa tài khoản. |

## Urls

1. [Font-end deploy với Firebase]()
2. [Diagrams (Class Diagram, Sequence Diagram, Activity Diagram, Use Cases)](https://app.diagrams.net/#G1Wsjw0nT924APhNPSe_pyxop5M0Kck5tE)
3. [File báo cáo](https://minhtunguyen-my.sharepoint.com/:w:/g/personal/baobao_minhtunguyen_onmicrosoft_com/Ef6XF8Eh_D1DueTpRPFfSvYBSujaRHg_bLJmuiJ5qo5coQ?e=1XhIym)
4. [Github](https://github.com/MinhTuMTN/TheDuckHospital)
5. [Test case](https://minhtunguyen-my.sharepoint.com/:x:/g/personal/tuyetvi_minhtunguyen_onmicrosoft_com/Ebibym9lZ6FOo2lzRCIy3BEB-hj1H5nBzu9snPC3-TR8vQ?e=7nwyzc)
6. [Automation test code](https://github.com/MinhTuMTN/TheDuckHospital/tree/main/automation-test)

## Cài đặt và cấu hình

**1. Database**  
Để cấu hình database, tiến hành cấu hình trong file [application.properties](https://github.com/MinhTuMTN/TheDuckHospital/blob/main/TheDuckHospitalAPI/src/main/resources/application.properties) của back-end  
![Cấu hình Database](Images/config_database.png)

**2. Cloudinary**  
Hệ thống dùng Cloudinary để lưu trữ toàn bộ tập tin, hình ảnh. Để thay đổi, cấu hình đường dẫn Cloudinary trong file [application.properties](https://github.com/MinhTuMTN/TheDuckHospital/blob/main/TheDuckHospitalAPI/src/main/resources/application.properties) của back-end  
![Cấu hình Cloudinary URL](Images/config_cloudinary.png)  
**3. Microsoft Graph**  
Ngoài ra, hệ thống còn dùng Microsoft Graph API để thực hiện tác vụ tạo email cho nhân viên. Có thể bỏ qua bằng cách nhập email thủ công ở chức năng tạo nhân viên.  
![Cấu hình Microsoft Graph API](Images/config_MS_Graph.png)

**4. Google App Password**  
Google App Password dùng để đăng nhập vào gmail của hệ thống. Gmail này có công dụng gửi OTP thông qua email cho nhân viên. Tương tự những cài đặt trên, ta cũng cần thay đổi trong file [application.properties](https://github.com/MinhTuMTN/TheDuckHospital/blob/main/TheDuckHospitalAPI/src/main/resources/application.properties) của back-end  
![Config Gmail và Test Date](Images/config_gmail_and_date_test.png)

**5. Cấu hình ngày hệ thống cho mục đích kiểm thử**  
Đối với một số tác vụ cần phải đúng ngày mới có thể thực hiện như điều dưỡng chỉ có thể xem những ca trực trong một ngày. Để có thể chỉ định ngày cụ thể cho hệ thống, ta cần cấu hình thuộc tính **setting.date** trong file [application.properties](https://github.com/MinhTuMTN/TheDuckHospital/blob/main/TheDuckHospitalAPI/src/main/resources/application.properties) của back-end

**6. Cấu hình đường dẫn Back-end cho Front-end**
Front-end tiến hành call API đến Back-end để có thể truy vấn dữ liệu. Cấu hình đường dẫn Back-end bằng cách thay đổi biến môi trường **REACT_APP_BASE_URL** trong file [.env](https://github.com/MinhTuMTN/TheDuckHospital/blob/main/the-duck-hospital-ui/.env)  
![Cấu hình back-end URL](Images/config_backend_url.png)

## Một số hình ảnh

### Bệnh nhân (Mobile Version)

![Mobile Version](/Images/mobile.png)

### Bệnh nhân

![1](/Images/1.png)
![2](/Images/2.png)
![3](/Images/3.png)
![4](/Images/4.png)
![5](/Images/5.png)
![6](/Images/6.png)
![7](/Images/7.png)
![8](/Images/8.png)

### Điều dưỡng

![9](/Images/9.png)
![10](/Images/10.png)

### Bác sĩ

![11](/Images/11.png)
![12](/Images/12.png)

### Trưởng khoa

![13](/Images/13.png)
![14](/Images/14.png)

### Admin

![15](/Images/15.png)
![16](/Images/16.png)
