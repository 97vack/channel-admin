import { Header } from "./Hearer";
import { SwiperBanner } from "./Swiper";
import { Contract } from "./Contract";
import { Customer } from "./Customer";
import { About } from "./About";
import { useRef } from "react";

function Home() {
  const aboutRef = useRef<any>(null);
  const customerRef = useRef<any>(null);
  const contractRef = useRef<any>(null);
  const homeRef = useRef<any>(null);
  return (
    <div style={{ paddingBottom: "80px" }}>
      <div ref={homeRef}></div>
      <Header
        onClick={(v: any) => {
          const refMap = {
            home: () => {
              homeRef.current.scrollIntoView({ behavior: "smooth" });
            },
            about: () => {
              aboutRef.current.scrollIntoView({ behavior: "smooth" });
            },
            customer: () => {
              customerRef.current.scrollIntoView({ behavior: "smooth" });
            },
            contract: () => {
              contractRef.current.scrollIntoView({ behavior: "smooth" });
            },
          };
          (refMap as any)[v.ele]();
        }}
      />
      <SwiperBanner />

      <div style={{ width: "70%", margin: "0 auto" }}>
        <div ref={aboutRef}></div>
        <About />
        <div ref={customerRef}></div>
        <Customer />
        <div ref={contractRef}></div>
        <Contract />
      </div>
    </div>
  );
}

export default Home;
