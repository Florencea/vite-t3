import { TeamOutlined } from "@ant-design/icons";
import {
  createRouter,
  useRouterState,
  type RoutePaths,
} from "@tanstack/react-router";
import type { inferReactQueryProcedureOptions } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { ReactNode } from "react";
import type { AppRouter } from "../../server/router";
import { routeTree } from "../routeTree.gen";

export const LOGIN_ROUTE = "/login";

export type RoutePath = RoutePaths<typeof routeTree>;

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export interface MenuItemT {
  label: string;
  key: RoutePath;
  icon: ReactNode;
}

/**
 * Item won't appear in side menu if `icon` is `null`,
 */
export const MENU_ITEMS: MenuItemT[] = [
  {
    label: "登入",
    key: "/login",
    icon: null,
  },
  {
    label: "帳號管理",
    key: "/user",
    icon: <TeamOutlined />,
  },
];

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
  const {
    location: { pathname },
  } = useRouterState();

  const currentLabel = MENU_ITEMS.find(
    ({ key }) => key.toString() === pathname,
  )?.label?.toString();

  return currentLabel
    ? `${currentLabel} - ${import.meta.env.VITE_TITLE}`
    : import.meta.env.VITE_TITLE;
};
