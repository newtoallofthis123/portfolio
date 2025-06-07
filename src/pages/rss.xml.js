import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  let posts = await getCollection("blog");
  posts = posts.filter((post) => !post.data.draft);
  posts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  return rss({
    // `<title>` field in output xml
    title: "Ishan Writes",
    stylesheet: "/rss/styles.xsl",
    // `<description>` field in output xml
    description: "The Noob writes about tech and anything he wants to :)",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site ?? "https://noobscience.in",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      image: post.data.img ? post.data.img.src : null,
      author: post.data.author,
      emoji: post.data.emoji,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
