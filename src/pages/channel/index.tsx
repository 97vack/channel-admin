import { Button, Table, Tooltip, Tag } from "antd";
import { useRequest } from "@/hooks/useRequest";
import { useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import { useLoginStateStore } from "@/store/useLoginStateStore";

export function Channel() {
  const { run, loading, data } = useRequest(
    "/channel/admantum/get_admantum_offerList",
    {
      formatResult(res) {
        return res.data.offers;
      },
    }
  );

  const { run: getUserVirtualCurrency, data: virtualCurrency } = useRequest(
    "/channel/admantum/getUserVirtualCurrency",
    {
      method: "post",
    }
  );

  const columns: ColumnsType<any> = [
    {
      title: "标题",
      key: "offer_title",
      dataIndex: "offer_title",
      ellipsis: true,
      render: (title: any) => {
        return <div>{title}</div>;
      },
      fixed: "left",
      width: 200,
    },
    {
      title: "国家",
      dataIndex: "offer_countries",
      width: 300,
      ellipsis: true,
      render: (countries: any) => {
        return <div>{countries}(新西兰)</div>;
      },
    },
    {
      title: "描述",
      dataIndex: "offer_description",
      ellipsis: {
        showTitle: false,
      },
      width: 100,
      render: (text: any) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            <div
              style={{
                width: "300px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                wordBreak: "keep-all",
              }}
            >
              {text}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "积分",
      dataIndex: "offer_virtual_currency",
    },
    {
      title: "状态",
      dataIndex: "status",
      render(status) {
        return (
          <Tag color={Number(status) === 1 ? "success" : "processing"}>
            {Number(status) === 1 ? "已完成" : "未完成"}
          </Tag>
        );
      },
    },
    {
      title: "跳转",
      dataIndex: "action",
      fixed: "right",
      width: 150,
      render: (_: any, record: any) => {
        return (
          <div>
            <Button type="link" href={record.offer_link} target="_blank">
              跳转
            </Button>
          </div>
        );
      },
    },
  ];

  console.log(virtualCurrency);

  useEffect(() => {
    run();
    getUserVirtualCurrency();
  }, []);

  const userId = useLoginStateStore.getState().state.userId;

  return (
    <div>
      <div>积分: {virtualCurrency || 0}</div>
      <Button
        type="link"
        target="_blank"
        href={`https://www.admantum.com/offers?appid=33560&uid=${userId}`}
      >
        直接打开优惠墙
      </Button>
      <Table
        style={{ marginTop: "20px" }}
        scroll={{ x: true }}
        sticky
        // tableLayout="fixed"
        loading={loading}
        dataSource={data}
        columns={columns}
        rowKey={(record) => {
          return record.offer_id;
        }}
      />
    </div>
  );
}

export default Channel;
