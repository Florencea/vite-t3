import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { router } from "./constants/routes";
import { Providers } from "./providers";

const container = document.getElementById("root");
if (!container)
  throw new Error("react root element `#root` does not exist in DOM");

createRoot(container).render(
  <Providers container={container}>
    <RouterProvider router={router} />
  </Providers>,
);
