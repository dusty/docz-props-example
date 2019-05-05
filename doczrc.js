import { css } from "docz-plugin-css";
import path from "path";

export default {
  title: "Odin UI",
  files: "src/**/*.mdx",
  codeSandbox: false,
  plugins: [
    css({
      preprocessor: "sass",
      cssmodules: false
    })
  ],
  modifyBundlerConfig: config => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  }
};
