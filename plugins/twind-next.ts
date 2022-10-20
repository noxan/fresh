import { Plugin } from "../server.ts";

export default function twind(): Plugin {
  return {
    name: "twind-next",
    render(ctx) {
      const res = ctx.render();
      console.log(res);
      return {};
    },
  };
}
