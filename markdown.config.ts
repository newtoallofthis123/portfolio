import remarkHtml from 'remark-html';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeMathJaxSvg from 'rehype-mathjax';

export default {
    remarkPlugins: [remarkHtml, remarkMath],
    rehypePlugins: [
        rehypeMathJaxSvg,
        rehypeSlug,
        [
            rehypeAutolinkHeadings,
            {
                behavior: 'wrap',
                properties: {
                    className: 'heading',
                },
            },
        ],
    ],
};
