import about from "@/assets/imgs/about-us.png";

export function About() {
  return (
    <div style={{ marginTop: "120px" }}>
      <div
        style={{
          textAlign: "center",
          color: "#333",
          fontWeight: "600",
          fontSize: "50px",
        }}
      >
        About us
      </div>
      <div style={{ display: "flex", alignItems: "end", marginTop: "100px" }}>
        <img src={about} alt="" style={{ width: "400px" }} />
        <div style={{ paddingBottom: "60px", marginLeft: "60px" }}>
          <div style={{ color: "#333", fontWeight: "600", fontSize: "50px" }}>
            Obtain your rewards through a simple surveyQuestionnaire survey
          </div>
          <div
            style={{ marginTop: "35px", color: "#666666", fontSize: "18px" }}
          >
            professional services, from which you can receive corresponding
            compensation Every day, many platforms join us and let's face the
            task of earning commission through questionnaire surveys together
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
