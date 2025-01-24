import { type ThemeConfig } from "antd";

/**
 * 主題色 (自 global.css 讀取)
 */
const PRIMARY_COLOR = getComputedStyle(
  document.documentElement,
).getPropertyValue("--color-primary");

/**
 * 全域 antd 主題
 */
export const theme: ThemeConfig = {
  cssVar: true,
  token: {
    colorPrimary: PRIMARY_COLOR,
    colorInfo: PRIMARY_COLOR,
  },
};
