import { createFileRoute } from "@tanstack/react-router";
import { Empty } from "antd";
import logo from "../assets/logo.png";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Empty
        image={logo}
        styles={{
          image: {
            filter: "grayscale(1)",
            opacity: 0.3,
            userSelect: "none",
            pointerEvents: "none",
          },
        }}
        description={false}
      />
    </div>
  );
}
