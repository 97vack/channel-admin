import { Table as AntdTable } from "antd";
import type { TableProps as AntdTableProps } from "antd";
import { TableWrap } from "./TableWrap";
import "./index.less";

export type TableProps = {} & AntdTableProps<any>;

export const Table = (props: TableProps) => {
  const { ...restProps } = props;
  return (
    <AntdTable
      scroll={{ x: true }}
      sticky
      // tableLayout="fixed"
      {...restProps}
    />
  );
};

Table.wrap = TableWrap;

export default Table;
