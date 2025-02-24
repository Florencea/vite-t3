import { TeamOutlined } from "@ant-design/icons";
import { createRouter, useRouterState } from "@tanstack/react-router";
import type { inferReactQueryProcedureOptions } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import type { AppRouter } from "../../server/router";
import { routeTree } from "../routeTree.gen";

export const LOGIN_ROUTE = "/login";

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

type MenuItemsT = Required<MenuProps>["items"];

/**
 * Item won't appear in side menu if `icon` is `null`,
 */
export const MENU_ITEMS = [
  {
    label: "登入",
    key: "/login",
    icon: null,
    children: [],
  },
  {
    label: "帳號管理",
    key: "/user",
    icon: <TeamOutlined />,
  },
] satisfies MenuItemsT;

export const router = createRouter({
  routeTree: routeTree,
  basepath: import.meta.env.BASE_URL,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const useSiteTitle = () => {
  const { t } = useTranslation("routes");
  const {
    location: { pathname },
  } = useRouterState();

  const currentLabel = MENU_ITEMS.find(
    (item) => item?.key?.toString() === pathname,
  );

  return currentLabel
    ? `${t(currentLabel.key, { defaultValue: currentLabel.label })} - ${import.meta.env.VITE_TITLE}`
    : import.meta.env.VITE_TITLE;
};
