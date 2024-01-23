import React, { useEffect, useState } from "react";
import type { MenuProps, MenuTheme } from "antd";
import { Menu as AntdMenu } from "antd";
import { css } from "@emotion/css";
import { useHistory } from "@/hooks/useHistory";
import { useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

type MenuItemsTypes = MenuItem & {
  route?: string;
};

function findAncestorKeyByPathname(
  items: any[],
  pathname: string
): string | undefined {
  for (const item of items) {
    if (item.pathname === pathname) {
      return item.key;
    }

    if (item.children) {
      const ancestorKeyInChild = findAncestorKeyByPathname(
        item.children,
        pathname
      );
      if (ancestorKeyInChild) {
        return item.key;
      }
    }
  }

  return undefined;
}

const items: any[] = [
  {
    label: "Dashbord",
    key: "dashbord",
    children: [
      {
        label: "渠道列表",
        key: "/dashbord/channelList",
        pathname: "/dashbord/channelList",
      },
    ],
  },
  {
    label: "渠道",
    key: "channel",
    children: [
      {
        label: "admantum",
        key: "/channel/admantum",
        pathname: "/channel/admantum",
      },
      {
        label: "surveyxa",
        key: "/channel/surveyxa",
        pathname: "/channel/surveyxa",
      },
      {
        label: "bitLabs",
        key: "/channel/bitLabs",
        pathname: "/channel/bitLabs",
      },
    ],
  },
];

export const Menu: React.FC = () => {
  const [openKeys, setOpenKeys] = useState<any>([]);

  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    setOpenKeys([findAncestorKeyByPathname(items, location.pathname)]);
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    const item = (e.item as any).props;
    history.push(item.pathname);
  };

  return (
    <>
      <AntdMenu
        theme="dark"
        onClick={onClick}
        onOpenChange={(e) => {
          setOpenKeys(e);
        }}
        style={{ width: 230 }}
        openKeys={openKeys}
        selectedKeys={[location.pathname]}
        mode="inline"
        items={items}
        className={css({
          "&.ant-menu-root": {
            background: "#313653 !important",
            userSelect: "none",
          },
          ".ant-menu-sub": {
            background: "#313752 !important",
          },
        })}
      />
    </>
  );
};

export default Menu;
