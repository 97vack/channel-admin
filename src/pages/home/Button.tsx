import { css } from "@emotion/css";
import React from "react";
import { Button as AntdButton } from "antd";
import type { ButtonProps } from "antd";

export function Button({ children, ...rests }: ButtonProps) {
  return (
    <AntdButton
      className={css({
        "&:active": {
          opacity: ".6",
        },
      })}
      {...rests}
      style={{
        background: "#ff743d",
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "5px",
        border: "none",
        color: "#fff",
        ...rests.style,
      }}
    >
      {children}
    </AntdButton>
  );
}
