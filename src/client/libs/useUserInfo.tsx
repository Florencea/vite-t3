import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_ROUTE, MENU_ITEMS } from "../constants/routes";
import type { FileRouteTypes } from "../routeTree.gen";
import { trpc } from "../trpc";

export const useUserInfo = () => {
  const { t } = useTranslation("routes");
  const navigate = useNavigate();
  const routerState = useRouterState();
  const userInfo = trpc.auth.getUserInfo.useQuery();
  const queryClient = useQueryClient();

  const menuItems = useMemo(() => {
    return MENU_ITEMS.filter(({ icon }) => Boolean(icon)).map((item) => ({
      ...item,
      label: `${t(item.key as FileRouteTypes["fullPaths"])}`,
    }));
  }, [t]);

  useEffect(() => {
    if (
      userInfo.isFetched &&
      !userInfo.data?.success &&
      routerState.location.pathname !== LOGIN_ROUTE
    ) {
      void navigate({ to: LOGIN_ROUTE, replace: true });
    }
    if (
      userInfo.isFetched &&
      userInfo.data?.success &&
      routerState.location.pathname === LOGIN_ROUTE
    ) {
      void navigate({ to: "/", replace: true });
    }
  }, [
    navigate,
    queryClient,
    routerState.location.pathname,
    userInfo.data?.success,
    userInfo.isFetched,
  ]);

  return {
    isLogin: !!userInfo.data?.success,
    account: userInfo.data?.account ?? undefined,
    menuItems,
  };
};
