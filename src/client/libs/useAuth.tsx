import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { RouterInputs } from "../constants/routes";
import { useTRPC } from "../trpc";
import { useAntdForm } from "./useAntdForm";

export const useAuth = () => {
  const trpc = useTRPC();
  const { t } = useTranslation("login");

  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onSuccess: () => {
        window.location.reload();
      },
    }),
  );
  const logout = useMutation(
    trpc.auth.logout.mutationOptions({
      onSuccess: () => {
        window.location.reload();
      },
    }),
  );

  const loginForm = useAntdForm<RouterInputs["auth"]["login"]>({
    formProps: {
      layout: "vertical",
      disabled: login.isPending,
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

  return { loginForm, isLoading: login.isPending, logout };
};
