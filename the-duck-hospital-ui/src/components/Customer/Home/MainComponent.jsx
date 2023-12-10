import { Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";

function MainComponent(props) {
  const isSmallDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <section className="back-ground">
      <div className="overlay"></div>
      <div className="container">
        <div className="row slider-text">
          <div className="col-md-8 text-center">
            <Typography
              variant="h3"
              className="mb-5"
              style={{
                textTransform: "uppercase",
                fontWeight: "400",
                lineHeight: "1.2",
                marginBottom: "20px",
              }}
            >
              Chúng tôi ở đây <br />
              là vì sức khỏe của bạn
            </Typography>
            {isSmallDown ? (
              <p
                className="mb-5"
                style={{
                  marginBottom: "20px",
                }}
              >
                Người có sức khỏe là người có hy vọng <br /> Người có hy vọng là
                người có tất cả <br /> Hãy trao cho chúng tôi niềm tin <br />{" "}
                Chúng tôi sẽ trao lại cho bạn hy vọng
              </p>
            ) : (
              <p
                className="mb-5"
                style={{
                  marginBottom: "20px",
                }}
              >
                Người có sức khỏe là người có hy vọng - Người có hy vọng là
                người có tất cả.
                <br /> Hãy trao cho chúng tôi niềm tin - Chúng tôi sẽ trao lại
                cho bạn hy vọng
              </p>
            )}
            <Button
              className="btn btn-primary btn-outline-white px-5 py-3"
              size="large"
              sx={{
                background: "#179ecf",
                color: "#fff",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              Tìm hiểu về chúng tôi
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainComponent;
