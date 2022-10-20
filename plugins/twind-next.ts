import {
  defineConfig,
  extract,
  setup,
} from "https://esm.sh/twind@1.0.0-next.39";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.0.0-next.39";
import { JSX, options as preactOptions, VNode } from "preact";

declare module "preact" {
  namespace JSX {
    interface DOMAttributes<Target extends EventTarget> {
      class?: string;
      className?: string;
    }
  }
}

const setupPreactTailwindHook = () => {
  const originalHook = preactOptions.vnode;
  // deno-lint-ignore no-explicit-any
  preactOptions.vnode = (vnode: VNode<JSX.DOMAttributes<any>>) => {
    if (typeof vnode.type === "string" && typeof vnode.props === "object") {
      const { props } = vnode;
      const classes: string[] = [];
      if (props.class) {
        classes.push(tw(props.class));
        props.class = undefined;
      }
      if (props.className) {
        classes.push(tw(props.className));
      }
      if (classes.length) {
        props.class = classes.join(" ");
      }
    }

    originalHook?.(vnode);
  };
};

const STYLE_ELEMENT_ID = "__FRSH_TWIND";

const config = defineConfig({
  presets: [presetTailwind()],
});
const tw = setup(config);

import { Plugin } from "../server.ts";

export default function twind(): Plugin {
  setupPreactTailwindHook();
  return {
    name: "twind-next",
    render(ctx) {
      const res = ctx.render();
      const { html, css } = extract(res.htmlText);
      console.log(res);
      console.log(html, css);
      return {
        styles: [{ cssText: css, id: STYLE_ELEMENT_ID }],
      };
    },
  };
}
