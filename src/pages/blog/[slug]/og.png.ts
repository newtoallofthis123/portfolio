import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';
import { createElement } from 'react';

export const prerender = true;

export async function getStaticPaths() {
  const blogPosts = await getCollection('blog');

  return blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return new Response('Not found', { status: 404 });
  }

  // Fetch the blog post
  const post = await getEntry('blog', slug);

  if (!post) {
    return new Response('Post not found', { status: 404 });
  }

  const { title, description, author, date, emoji } = post.data;
  const themeColor = "#111";

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Fetch font data (JetBrains Mono from Google Fonts)
  const fontResponse = await fetch(
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap'
  );
  const fontCss = await fontResponse.text();

  // Extract font URL from CSS
  const fontUrl = fontCss.match(/src: url\((.+?)\) format\('(truetype|woff2?)'\)/)?.[1];

  let fontData: ArrayBuffer;
  if (fontUrl) {
    const fontFileResponse = await fetch(fontUrl);
    fontData = await fontFileResponse.arrayBuffer();
  } else {
    // Fallback: fetch JetBrains Mono directly
    const fallbackFontResponse = await fetch(
      'https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/JetBrainsMono-Regular.ttf'
    );
    fontData = await fallbackFontResponse.arrayBuffer();
  }

  // Create SVG using Satori
  const svg = await satori(
    createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          padding: '80px',
          justifyContent: 'space-between',
          fontFamily: 'JetBrains Mono',
        },
      },
      // Header
      createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          },
        },
        // Emoji if available
        emoji &&
          createElement(
            'div',
            {
              style: {
                color: themeColor,
                fontSize: '80px',
                marginBottom: '20px',
              },
            },
            emoji
          ),
        // Title
        createElement(
          'div',
          {
            style: {
              fontSize: '72px',
              fontWeight: 700,
              color: '#111',
              lineHeight: 1.2,
              marginBottom: '20px',
            },
          },
          title
        ),
        // Description
        description &&
          createElement(
            'div',
            {
              style: {
                fontSize: '32px',
                color: '#111',
                lineHeight: 1.4,
                marginTop: '20px',
              },
            },
            description.slice(0, 150) + (description.length > 150 ? '...' : '')
          )
      ),
      // Footer
      createElement(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
          },
        },
        // Author and date
        createElement(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            },
          },
          createElement(
            'div',
            {
              style: {
                fontSize: '28px',
                color: themeColor,
                fontWeight: 700,
              },
            },
            author
          ),
          createElement(
            'div',
            {
              style: {
                fontSize: '24px',
                color: '#111',
              },
            },
            formattedDate
          )
        ),
        // Site branding
        createElement(
          'div',
          {
            style: {
              fontSize: '32px',
              color: themeColor,
              fontWeight: 700,
            },
          },
          'noobscience.in'
        )
      )
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'JetBrains Mono',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  // Convert SVG to PNG using Sharp
  const png = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  // Return the image
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
