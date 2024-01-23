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
          href={`https://web.bitlabs.ai?uid=${userId}&token=c5955c81-8b88-4e4e-aa50-589272bfc08b`}
          target="_blank"
        >
          打开
        </Button>
      </div>
    </div>
  );
}

export default SurveyxaWrap;
