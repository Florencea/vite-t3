import { createLazyFileRoute } from "@tanstack/react-router";
import { Empty } from "antd";
import logo from "../assets/logo.png";

const Page = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Empty
        image={logo}
        imageStyle={{
          filter: "grayscale(1)",
          opacity: 0.3,
          userSelect: "none",
          pointerEvents: "none",
        }}
        description={false}
      />
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Page,
});
