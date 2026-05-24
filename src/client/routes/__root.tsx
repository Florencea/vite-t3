import { createRootRouteWithContext, redirect } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { useTRPC } from "../trpc";
import { Layout } from "../components/Layout";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  trpc: ReturnType<typeof useTRPC>;
}>()({
  beforeLoad: async ({ context, location, search }) => {
    const data = await context.queryClient.ensureQueryData(
      context.trpc.auth.getUserInfo.queryOptions(),
    );
    const isSuccess = (data as Record<string, unknown>)?.success === true;
    if (!isSuccess && location.pathname !== "/login") {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname + location.searchStr,
        },
        replace: true,
      });
    }
    if (isSuccess && location.pathname === "/login") {
      const redirectPath = (search as Record<string, unknown>).redirect;
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: typeof redirectPath === "string" ? redirectPath : "/",
        replace: true,
      });
    }
  },
  component: Layout,
});
