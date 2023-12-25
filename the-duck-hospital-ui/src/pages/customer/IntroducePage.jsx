import { Box, Typography } from "@mui/material";
import React from "react";

function IntroducePage(props) {
  return (
    <Box>
      <Box
        sx={{
          "@media (min-width:992px)": {
            ".d-lg-block": {
              display: "block !important",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundImage:
              "url(https://res.cloudinary.com/dsmvlvfy5/image/upload/v1703400921/blur-04.4f6865d2_tvrj9b.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",

            backgroundPositionX: "50% !important",
            backgroundPositionY: "center !important",
            backgroundAttachment: "fixed",
            height: "unset",
            alignItems: "center",
            paddingTop: "60px !important",
            paddingBottom: "80px !important",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "15px auto",
            }}
          >
            <div className="col">
              <Typography
                variant="h1"
                className="text-center"
                sx={{
                  textAlign: "center",
                  zIndex: 2,
                  color: "#fff",
                  fontSize: "2.6rem",
                  fontWeight: 550,
                }}
              >
                VỀ CHÚNG TÔI
              </Typography>
            </div>
          </div>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#fff",
          margin: "-50px auto 120px",
          borderRadius: "5px",
          minHeight: "300px",
          maxWidth: "1140px",
          border: "1px solid #ebebeb",
          padding: "30px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            paddingX: "15px",
            marginX: "auto",
          }}
        >
          <Box
            sx={{
              marginBottom: "15px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                marginBottom: "1rem",
                fontWeight: 400,
                lineHeight: 1.5,
                textAlign: "justify",
              }}
            >
              Chào mừng bạn đến với{" "}
              <span
                style={{
                  fontWeight: 500,
                }}
              >
                The Duck Hospital
              </span>
              , nơi chúng tôi cam kết cung cấp dịch vụ chăm sóc sức khỏe hàng
              đầu và tiện lợi cho cộng đồng. Chúng tôi tự hào giới thiệu ứng
              dụng đăng ký khám bệnh trực tuyến The Duck Hospital nơi sẽ mang
              đến một giải pháp tiếp cận y tế thông minh cho bạn và cả gia đình.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                marginBottom: "1rem",
                fontWeight: 400,
                lineHeight: 1.5,
                textAlign: "justify",
              }}
            >
              The Duck Hospital – Đăng Ký và Đặt khám Online là nơi sẽ giúp bạn
              quản lý sức khỏe cá nhân của mình một cách dễ dàng và hiệu quả
              hơn. Với triết lý lấy người dùng làm trung tâm, chúng tôi đã thiết
              kế ứng dụng này với mong muốn mang đến trải nghiệm tốt nhất cho
              bạn thông qua sự kết hợp của nhiều công nghệ số khác nhau và các
              quy trình quản trị tại cơ sở y tế, phù hợp với môi trường chăm sóc
              sức khỏe mở, linh hoạt và trực tuyến.
            </Typography>
            <br />
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                marginBottom: "1rem",
                fontWeight: 400,
                lineHeight: 1.5,
                textAlign: "justify",
              }}
            >
              Đến với The Duck Hospital bạn sẽ được trải nghiệm nhiều tính năng
              nổi bật như:
            </Typography>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "30px",
                marginBottom: "1rem",
              }}
            >
              <li>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    marginBottom: "8px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "justify",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>
                    Đăng ký khám bệnh trực tuyến:
                  </span>{" "}
                  Với tính năng này, bạn có thể đăng ký khám bệnh qua trang web
                  The Duck Hospital mà không cần phải đến bệnh viện và xếp hàng
                  chờ đợi. Chúng tôi hỗ trợ đặt lịch khám theo bác sĩ để giúp
                  bạn linh hoạt trong việc chọn thời gian phù hợp.
                </Typography>
              </li>
              <li>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    marginBottom: "8px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "justify",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>
                    Thanh toán tiền khám bệnh:
                  </span>{" "}
                  Thao tác thanh toán tiền khám cũng trở nên dễ dàng hơn bao giờ
                  hết. Bạn có thể lựa chọn từ nhiều hình thức thanh toán như thẻ
                  quốc tế, thẻ ATM nội địa, Internet Banking, VNPay...
                </Typography>
              </li>
              <li>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    marginBottom: "8px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "justify",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>Tạo hồ sơ bệnh nhân:</span>{" "}
                  Ứng dụng cho phép bạn tạo hồ sơ cá nhân của mình để theo dõi
                  sức khỏe và lịch sử bệnh lý. Thông tin từ hồ sơ này sẽ giúp
                  bác sĩ hiểu rõ hơn về tình trạng sức khỏe của bạn và cung cấp
                  các phương pháp chữa trị phù hợp.
                </Typography>
              </li>
              <li>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    marginBottom: "8px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "justify",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>
                    Quản lý hồ sơ bệnh nhân:
                  </span>{" "}
                  Bạn có thể dễ dàng cập nhật và theo dõi thông tin y tế của
                  mình qua ứng dụng, giúp bạn tự quản lý sức khỏe một cách tối
                  ưu.
                </Typography>
              </li>
              <li>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    marginBottom: "8px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "justify",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>
                    Quản lý phiếu khám bệnh:
                  </span>{" "}
                  Thông qua tính năng này, bạn có thể theo dõi lịch hẹn và quản
                  lý phiếu khám bệnh của mình. Điều này đảm bảo bạn không bỏ lỡ
                  bất kỳ cuộc hẹn nào và tiết kiệm thời gian chờ đợi.Quản lý
                  phiếu khám bệnh:
                </Typography>
              </li>
            </ul>

            <br />
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                marginBottom: "1rem",
                fontWeight: 400,
                lineHeight: 1.5,
                textAlign: "justify",
              }}
            >
              Hãy trải nghiệm và sử dụng ứng dụng The Dụck Hospital - Đăng Ký và
              Đặt khám Online để tận hưởng sức khỏe tốt hơn và cuộc sống thuận
              lợi hơn. Chúng tôi luôn sẵn sàng phục vụ bạn một cách tận tâm và
              chuyên nghiệp.
            </Typography>
            <br />
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                marginBottom: "1rem",
                fontWeight: 400,
                lineHeight: 1.5,
                textAlign: "justify",
              }}
            >
              Cảm ơn bạn đã tin tưởng và đồng hành cùng The Duck Hospital . Trân
              trọng!
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default IntroducePage;
