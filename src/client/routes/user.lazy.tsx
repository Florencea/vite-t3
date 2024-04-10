import { createLazyFileRoute } from "@tanstack/react-router";

const Page = () => {
  return <div>Hello /user!</div>;
};

export const Route = createLazyFileRoute("/user")({
  component: Page,
});
