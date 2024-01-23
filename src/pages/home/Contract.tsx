import { Input } from "antd";
import { useForm, Form } from "react-form-simple";
import { Button } from "./Button";

export function Contract() {
  const { render } = useForm({ email: "", name: "" });
  return (
    <div style={{ marginTop: "120px" }}>
      <div
        style={{
          color: "#333",
          fontSize: "50px",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Contract us
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginTop: "80px",
        }}
      >
        <Form direction="column" formStyle={{ width: "20%" }}>
          {render("email", { label: "email" })(<Input />)}
          {render("name", { label: "name" })(<Input />)}
        </Form>
        <div style={{ flex: 1, marginLeft: "30px" }}>
          {render("content", { fullWidth: true })(
            <Input.TextArea rows={12} style={{ width: "100%" }} />
          )}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button style={{ fontSize: "20px", height: "40px" }}>Submit</Button>
      </div>
    </div>
  );
}

export default Contract;
