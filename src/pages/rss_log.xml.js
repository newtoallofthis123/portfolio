import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  let logs = await getCollection("gsoc_log");
  logs = logs.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  return rss({
    // `<title>` field in output xml
    title: "Ishan's Gsoc Dev Log",
    stylesheet: "/rss/styles.xsl",
    // `<description>` field in output xml
    description: "My DevLog for all the stuff I do for SWHKD",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site ?? "https://noobscience.in/gsoc/logs",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: logs.map((log) => ({
      title: log.data.title,
      pubDate: log.data.date,
      description: log.data.description,
      commit:
        log.data.commit ?? "https://github.com/newtoallofthis123/swhkd/commits",
      workType: log.data.workType,
      link: `/gsoc/logs/${log.slug}/`,
      content: sanitizeHtml(parser.render(log.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
