import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user")({
  component: Page,
});

function Page() {
  return <div>Hello /user!</div>;
}
