# @dropinblog/nextjs-rendered

[![npm version](https://img.shields.io/npm/v/%40dropinblog%2Fnextjs-rendered.svg)](https://www.npmjs.com/package/@dropinblog/nextjs-rendered) [![npm downloads](https://img.shields.io/npm/dm/%40dropinblog%2Fnextjs-rendered.svg)](https://www.npmjs.com/package/@dropinblog/nextjs-rendered) [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

An easy-to-use package for integrating [DropInBlog](https://dropinblog.com/) in Next.js applications. This package provides a seamless way to fetch and display your DropInBlog content with full SEO support and React component integration.

## Features

- Fetch and render DropInBlog content in Next.js apps
- SEO ready: helpers to generate Next.js metadata from API responses
- Pagination for main list, categories, and authors
- XML sitemap
- RSS feeds

## Getting Started

### Prerequisites

Before using this package, you'll need:

1. A [DropInBlog](https://dropinblog.com/) account
2. Your DropInBlog API token and blog ID
3. A Next.js project (version 13 or higher recommended)

### Installation

Install the package using npm:

```sh
npm install @dropinblog/nextjs-rendered
```

Or using yarn:

```sh
yarn add @dropinblog/nextjs-rendered
```

Or using pnpm:

```sh
pnpm add @dropinblog/nextjs-rendered
```

### Environment variables

Create a .env.local file in the root of your Next.js project and add your DropInBlog credentials:

```env
DROPINBLOG_TOKEN=your_api_token_here
DROPINBLOG_BLOG_ID=your_blog_id_here
```

Notes:
- Do not commit .env.local to version control.
- In Vercel or other hosting, set these as environment variables in the dashboard.

## Usage

### 1. Setup Your API Client

File: lib/dib.ts

```ts
import DibApi from "@dropinblog/api-client";

export const dibApi = new DibApi(
  process.env.DROPINBLOG_TOKEN!, // Your DropInBlog API token
  process.env.DROPINBLOG_BLOG_ID! // Your DropInBlog blog ID
);
```

### 2. Configure Your Routes

**Main Blog Page:**

File: app/blog/page.tsx

```tsx
import { dibApi } from '@/lib/dib';
import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';

export const generateMetadata = async () => 
  dibUtils.generateMetadataFromFetcher(dibApi.fetchMainList);

export default async function BlogPage() {
  const { body_html, head_data } = await dibApi.fetchMainList();
  return <DibBlog body_html={body_html} head_data={head_data} />;
}
```

File: app/blog/page/[page]/page.tsx

```tsx
import { dibApi } from '@/lib/dib';
import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';

export const generateMetadata = async ({ params }: { params: { page: string } }) =>
  dibUtils.generateMetadataFromFetcher(dibApi.fetchMainList, { pagination: params.page });

export default async function BlogPagePaginated({ params }: { params: { page: string } }) {
  const { body_html, head_data } = await dibApi.fetchMainList({ pagination: params.page });
  return <DibBlog body_html={body_html} head_data={head_data} />;
}
```

**Single Post Page:**

File: app/blog/[slug]/page.tsx

```tsx
import { dibApi } from '@/lib/dib';
import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => dibUtils.generateMetadataFromFetcher(dibApi.fetchPost, params);

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { body_html, head_data } = await dibApi.fetchPost({ slug });
  return <DibBlog body_html={body_html} head_data={head_data} />;
}
```

**Category Pages (with pagination):**

File: app/blog/category/[slug]/page.tsx

```tsx
import { dibApi } from '@/lib/dib';
import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';

// Route: /blog/category/[slug]
export const generateMetadata = async ({ params }: { params: { slug: string } }) =>
  dibUtils.generateMetadataFromFetcher(dibApi.fetchCategories, { slug: params.slug });

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { body_html, head_data } = await dibApi.fetchCategories({ slug: params.slug });
  return <DibBlog body_html={body_html} head_data={head_data} />;
}
```

File: app/blog/category/[slug]/page/[page]/page.tsx

```tsx
import { dibApi } from '@/lib/dib';
import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';

export const generateMetadata = async ({ params }: { params: { slug: string; page: string } }) =>
  dibUtils.generateMetadataFromFetcher(dibApi.fetchCategories, { slug: params.slug, pagination: params.page });

export default async function CategoryPagePaginated({ params }: { params: { slug: string; page: string } }) {
  const { body_html, head_data } = await dibApi.fetchCategories({ slug: params.slug, pagination: params.page });
  return <DibBlog body_html={body_html} head_data={head_data} />;
}
```

**Author Pages (with pagination):**

File: app/blog/author/[slug]/page.tsx

```tsx
import { dibApi } from '@/lib/dib';
import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';

export const generateMetadata = async ({ params }: { params: { slug: string } }) =>
  dibUtils.generateMetadataFromFetcher(dibApi.fetchAuthor, { slug: params.slug });

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const { body_html, head_data } = await dibApi.fetchAuthor({ slug: params.slug });
  return <DibBlog body_html={body_html} head_data={head_data} />;
}
```

File: app/blog/author/[slug]/page/[page]/page.tsx

```tsx
import { dibApi } from '@/lib/dib';
import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';

export const generateMetadata = async ({ params }: { params: { slug: string; page: string } }) =>
  dibUtils.generateMetadataFromFetcher(dibApi.fetchAuthor, { slug: params.slug, pagination: params.page });

export default async function AuthorPagePaginated({ params }: { params: { slug: string; page: string } }) {
  const { body_html, head_data } = await dibApi.fetchAuthor({ slug: params.slug, pagination: params.page });
  return <DibBlog body_html={body_html} head_data={head_data} />;
}
```

**Sitemap**

File: app/blog/sitemap.ts

```ts
import { dibApi } from '@/lib/dib';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const json = await dibApi.fetchSitemap();

    const urlRegex = /<url>([\s\S]*?)<\/url>/g;
    const locRegex = /<loc>(.*?)<\/loc>/;
    const lastmodRegex = /<lastmod>(.*?)<\/lastmod>/;

    const urls: MetadataRoute.Sitemap = [];
    const matches = json.data.sitemap.match(urlRegex) || [];

    for (const urlBlock of matches) {
        const locMatch = urlBlock.match(locRegex);
        const lastmodMatch = urlBlock.match(lastmodRegex);

        if (locMatch) {
            urls.push({
                url: locMatch[1],
                lastModified: lastmodMatch ? lastmodMatch[1] : undefined,
            });
        }
    }

    return urls;
}
```

**Feeds**

File: app/api/dib/feed/route.ts

```ts
import { dibApi } from '@/lib/dib';
import { NextResponse } from 'next/server';

export async function GET() {
    const json = await dibApi.fetchBlogFeed();
    return new NextResponse(json.data.feed, {
        headers: {
            'Content-Type': json.data.content_type,
        },
    });
}
```

## Requirements

- Node.js 18+
- Next.js 13+

## Contributing

Issues and PRs are welcome! Please file bugs and feature requests on the GitHub repo and include as much detail as possible.

## License

ISC

## Links

- [DropInBlog Website](https://dropinblog.com/)
- [DropInBlog API Documentation](https://dropinblog.readme.io/reference/api-reference)
- [GitHub Repository](https://github.com/DropInBlog/nextjs-rendered)
- [npm Package](https://www.npmjs.com/package/@dropinblog/nextjs-rendered)
