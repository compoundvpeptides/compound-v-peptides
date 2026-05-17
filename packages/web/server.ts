import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import honoApp from "./src/api/index";

const app = new Hono();
app.route("/", honoApp);
app.use("/*", serveStatic({ root: "./dist" }));
app.get("*", async (c) => {
  const file = Bun.file(new URL("./dist/index.html", import.meta.url).pathname);
  const html = await file.text();
  return c.html(html);
});

const port = Number(process.env.PORT) || 3000;
console.log(`Compound V running on port ${port}`);
export default { fetch: app.fetch, port };
