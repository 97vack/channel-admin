import customer from "@/assets/imgs/customer.jpg";
import bitlabs from "@/assets/imgs/bitlabs.png";
import sushiads from "@/assets/imgs/sushiads.png";
import tol from "@/assets/imgs/tol.png";
import rev from "@/assets/imgs/rev.png";
import sav from "@/assets/imgs/say.png";
import { useRef } from "react";
import { Flex, Radio } from "antd";

export function LoveUs() {
  return (
    <div style={{ background: "#fff", marginTop: "180px" }}>
      <div style={{ color: "#333", fontSize: "40px", marginBottom: "50px" }}>
        Support our customers
      </div>
      <div>
        <img src={customer} alt="" style={{ width: "100%" }} />
      </div>
    </div>
  );
}

function OurAmazingCustomer() {
  const imgs = useRef([
    { img: bitlabs },
    { img: sushiads },
    { img: tol },
    { img: rev },
    { img: sav },
  ]).current;
  const renerImgs = (
    <Flex gap={30} align="center">
      {imgs.map((v) => (
        <div style={{ width: "25%" }} key={v.img}>
          <img src={v.img} alt="" />
        </div>
      ))}
    </Flex>
  );
  return (
    <div style={{ marginTop: "180px" }}>
      <div
        style={{
          color: "#333",
          fontSize: "45px",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        Our amazing customer
      </div>
      <div style={{ marginTop: "30px" }}>{renerImgs}</div>
    </div>
  );
}

export function Customer() {
  return (
    <div style={{ marginTop: "150px" }}>
      <OurAmazingCustomer />
      <LoveUs />
    </div>
  );
}
