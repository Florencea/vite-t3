import "dayjs/locale/zh-tw";
import "tailwindcss/tailwind.css";

import { StyleProvider } from "@ant-design/cssinjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCClientError, httpLink } from "@trpc/client";
import { App, ConfigProvider, message } from "antd";
import type { Locale } from "antd/es/locale";
import enUS from "antd/es/locale/en_US";
import zhTW from "antd/es/locale/zh_TW";
import { StrictMode, useCallback, useEffect, useMemo, useState } from "react";
import { HeadProvider } from "react-head";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../i18n";
import { theme } from "./theme";
import { trpc } from "./trpc";

interface Props {
  children?: React.ReactNode;
}

interface ProviderProps extends Props {
  container: HTMLElement;
}

const antdLocales: Record<string, Locale> = {
  "en-US": enUS,
  "zh-TW": zhTW,
};

export const Providers = ({ container, children }: ProviderProps) => {
  useEffect(() => {
    i18n.on("languageChanged", (lng) => {
      document.documentElement.setAttribute("lang", lng);
    });
    window.document.documentElement.lang = i18n.language;
  }, []);
  return (
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <HeadProvider
          headTags={[<title key="title">{import.meta.env.VITE_TITLE}</title>]}
        >
          <ApiProvider>
            <AntdProvider container={container}>{children}</AntdProvider>
          </ApiProvider>
        </HeadProvider>
      </I18nextProvider>
    </StrictMode>
  );
};

const AntdProvider = ({ container, children }: ProviderProps) => {
  const { i18n } = useTranslation();
  return (
    <ConfigProvider
      getPopupContainer={() => container}
      locale={antdLocales[i18n.language]}
      theme={theme}
      autoInsertSpaceInButton={false}
    >
      <StyleProvider hashPriority="high">
        <App>{children}</App>
      </StyleProvider>
    </ConfigProvider>
  );
};

const ApiProvider = ({ children }: Props) => {
  const [msg, msgContext] = message.useMessage();
  const { i18n } = useTranslation();
  const retry = useCallback(
    (_: number, err: unknown) => {
      if (err instanceof TRPCClientError && err.message !== "") {
        void msg.error(err.message, 4.5);
      }
      return false;
    },
    [msg],
  );
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry, refetchOnWindowFocus: false },
          mutations: { retry },
        },
      }),
  );
  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpLink({
            url: import.meta.env.VITE_API_ENDPOINT_TRPC,
            headers: {
              "Accept-Language": i18n.language,
            },
          }),
        ],
      }),
    [i18n.language],
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {msgContext}
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};
