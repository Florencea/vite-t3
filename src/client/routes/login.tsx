import { createFileRoute } from "@tanstack/react-router";
import { Button, Card, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { I18nSwitcher } from "../components/i18n-switcher";
import { useAuth } from "../libs/useAuth";

export const Route = createFileRoute("/login")({
  component: Page,
});

function Page() {
  const { t } = useTranslation("login");
  const { loginForm, isLoading } = useAuth();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card title={t("login")} extra={[<I18nSwitcher key="i18nswicher" />]}>
        <Form {...loginForm.formProps}>
          <Form.Item {...loginForm.formItemProps.account}>
            <Input autoFocus />
          </Form.Item>
          <Form.Item {...loginForm.formItemProps.password}>
            <Input.Password />
          </Form.Item>
          <Button
            loading={isLoading}
            disabled={isLoading}
            type="primary"
            htmlType="submit"
            block
          >
            {t("submit")}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
