import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MENU_ITEMS } from "../constants/routes";
import type { FileRouteTypes } from "../routeTree.gen";
import { useTRPC } from "../trpc";

export const useUserInfo = () => {
  const trpc = useTRPC();
  const { t } = useTranslation("routes");
  const userInfo = useQuery(trpc.auth.getUserInfo.queryOptions());

  const menuItems = useMemo(() => {
    return MENU_ITEMS.filter(({ icon }) => Boolean(icon)).map((item) => ({
      ...item,
      label: `${t(item.key as FileRouteTypes["fullPaths"])}`,
    }));
  }, [t]);

  return {
    isLogin: !!userInfo.data?.success,
    account: userInfo.data?.account ?? undefined,
    menuItems,
  };
};
