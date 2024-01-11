import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div id="error-page" style={{ width: "600px", margin: "100px auto" }}>
      <h1>Error</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
