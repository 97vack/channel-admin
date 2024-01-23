import { useRequest } from "@/hooks/useRequest";
import { Button } from "antd";
import { useEffect } from "react";
import { useLoginStateStore } from "@/store/useLoginStateStore";

export function SurveyxaWrap() {
  const { run: getUserVirtualCurrency, data: virtualCurrency } = useRequest(
    "/channel/xa/getUserVirtualCurrency",
    {
      method: "post",
    }
  );

  useEffect(() => {
    getUserVirtualCurrency();
  }, []);

  const userId = useLoginStateStore.getState().state.userId;

  return (
    <div>
      <div>积分: {virtualCurrency || 0}</div>
      <div>
        <Button
          rel="noreferrer"
          type="link"
          href={`https://www.surveyxa.com/offerwall?id=5968e544-580e-4d80-8ef5-25a9b500e848&uid=${userId}`}
          target="_blank"
        >
          打开
        </Button>
      </div>
    </div>
  );
}

export default SurveyxaWrap;
