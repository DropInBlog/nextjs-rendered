# nextjs-page-fetcher

DropInBlog page fetcher for Next.js projects.

## Features

- Fetch and render DropInBlog content in Next.js apps
- SEO metadata generation
- Easy integration with React components

## Installation

```sh
npm install @dropinblog/nextjs-page-fetcher
```

## Usage

### 1. Initialize the API

```ts
import DibApi from '@dropinblog/nextjs-page-fetcher';

const api = new DibApi('YOUR_TOKEN', 'YOUR_BLOG_ID');
```

### 2. Genarate metadata

```ts
import { dibApi } from '@/lib/api';
import { DibPageFetcher, dibUtils } from '@dropinblog/nextjs-page-fetcher';
import React from 'react';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => dibUtils.generateMetadataFromFetcher(dibApi.fetchPost, params);
```

### 3. Render Content

```tsx
import { dibApi } from '@/lib/api';
import { DibPageFetcher, dibUtils } from '@dropinblog/nextjs-page-fetcher';
import React from 'react';

export default async function Blog({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const { body_html, head_data } = await dibApi.fetchPost({
    slug,
  });
  return <DibPageFetcher body_html={body_html} head_data={head_data} />;
}
```

### 4. Generate Metadata (with pagination)

```ts
import { dibApi } from '@/lib/api';
import { DibPageFetcher, dibUtils } from '@dropinblog/nextjs-page-fetcher';

export const generateMetadata = async ({
  params,
}: {
  params: { pagination: string; slug: string };
}) => dibUtils.generateMetadataFromFetcher(dibApi.fetchAuthor, params);
```

### 5. Render Content (with pagination)

```tsx
export default async function AuthorPagination({
  params,
}: {
  params: { pagination: string; slug: string };
}) {
  const { pagination, slug } = await params;
  const { body_html, head_data } = await dibApi.fetchAuthor({
    slug,
    pagination,
  });
  return <DibPageFetcher body_html={body_html} head_data={head_data} />;
}
```

## API Reference

### `DibApi`

- `constructor(token: string, blogId: string)`
- `fetchMainList({ pagination? })`
- `fetchPost({ slug })`
- `fetchCategories({ slug, pagination? })`
- `fetchAuthor({ slug, pagination? })`

### `DibPageFetcher`

React component to render fetched blog content.

**Props:**

- `body_html: string`
- `head_data: { css?: string; schema?: string }`

### `dibUtils`

- `generateHeadMetadata(head_data)`
- `generateMetadataFromFetcher(fetcher, params?)`

## License

ISC

## Author

Mohamed Nidal Touhami
