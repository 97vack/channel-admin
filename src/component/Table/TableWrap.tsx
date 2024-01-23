import React from "react";

export type TableWrapProps = {
  getTop?: () => React.ReactNode;
  getTable?: () => React.ReactNode;
};

export const TableWrap = (props: TableWrapProps) => {
  const { getTop, getTable } = props;

  const isExitTop = !!getTop;
  const isExitTable = !!getTable;

  const renderSearch = isExitTop && <div>{getTop?.()}</div>;
  const renderTable = isExitTable && (
    <div style={{ flex: 1 }}>{getTable?.()}</div>
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {renderSearch}
      {renderTable}
    </div>
  );
};

export default TableWrap;
