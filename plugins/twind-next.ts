import {
  defineConfig,
  extract,
  setup,
} from "https://esm.sh/twind@1.0.0-next.39";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.0.0-next.39";

const config = defineConfig({
  presets: [presetTailwind()],
});
const tw = setup(config);

import { Plugin } from "../server.ts";

export default function twind(): Plugin {
  return {
    name: "twind-next",
    render(ctx) {
      const res = ctx.render();
      const { html, css } = extract(res.htmlText);
      console.log(res);
      console.log(html, css);
      return {};
    },
  };
}
