import banner from "@/assets/imgs/banner.jpg";
import { Button } from "./Button";
import { useHistory } from "@/hooks/useHistory";

export function SwiperBanner() {
  const { push } = useHistory();
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          color: "#fff",
          top: "50%",
          transform: "translateY(-50%)",
          width: "40%",
          left: "60px",
        }}
      >
        <div style={{ fontSize: "60px" }}>
          Obtain your rewards through a simple survey
        </div>
        <div style={{ marginTop: "20px", lineHeight: "2" }}>
          What can we do for you? Likes a simple work environment, we provide
          professional technical support, and work and And a platform that is
          easy to get started with
        </div>
        <div>
          <Button
            style={{
              marginTop: "25px",
              width: "185px",
              height: "66px",
              background: "#ff743d",
              fontSize: "25px",
            }}
            onClick={() => {
              push("/login");
            }}
          >
            Join us
          </Button>
        </div>
      </div>
      <img src={banner} alt="" style={{ width: "100%", minHeight: "600px" }} />
    </div>
  );
}

export default SwiperBanner;
