import { useTranslation } from "react-i18next";
import type { RouterInputs } from "../constants/routes";
import { trpc } from "../trpc";
import { useAntdForm } from "./useAntdForm";

export const useAuth = () => {
  const { t } = useTranslation("login");

  const login = trpc.auth.login.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });
  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  const loginForm = useAntdForm<RouterInputs["auth"]["login"]>({
    formProps: {
      layout: "vertical",
      disabled: login.isLoading,
      onFinish: login.mutate,
    },
    formItemProps: {
      account: {
        name: "account",
        label: t("account"),
        rules: [{ required: true }],
      },
      password: {
        name: "password",
        label: t("password"),
        rules: [{ required: true }],
      },
    },
  });

  return { loginForm, isLoading: login.isLoading, logout };
};
