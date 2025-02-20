import sharedConfig from "@ng-youth/tailwind-config";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@ng-youth/ui/dist/**/*.js",
    "./node_modules/@ng-youth/block-editor/dist/**/*.js",
    "../../packages/config-tailwind/node_modules/@nextui-org/theme/dist/components/(navbar|listbox).js",
  ],
  presets: [sharedConfig],
};
export default config;
