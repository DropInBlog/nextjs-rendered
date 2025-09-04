# nextjs-rendered

DropInBlog page fetcher for Next.js projects.

## Features

- Fetch and render DropInBlog content in Next.js apps
- SEO metadata generation
- Easy integration with React components
- Supports pagination and author/category filtering

## Installation

```sh
npm install @dropinblog/nextjs-rendered
```

## Usage

### 1. Initialize the API

```ts
import DibApi from '@dropinblog/nextjs-rendered';

const api = new DibApi('YOUR_TOKEN', 'YOUR_BLOG_ID');
```

### 2. Generate Metadata

```ts
import { dibApi } from '@/lib/api';
import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => dibUtils.generateMetadataFromFetcher(dibApi.fetchPost, params);
```

### 3. Render Blog Content

```tsx
import { dibApi } from '@/lib/api';
import { DibBlog } from '@dropinblog/nextjs-rendered';

export default async function Blog({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { body_html, head_data } = await dibApi.fetchPost({ slug });
  return <DibBlog body_html={body_html} head_data={head_data} />;
}
```

### 4. Generate Metadata (with pagination)

```ts
import { dibApi } from '@/lib/api';
import { dibUtils } from '@dropinblog/nextjs-rendered';

export const generateMetadata = async ({
  params,
}: {
  params: { pagination: string; slug: string };
}) => dibUtils.generateMetadataFromFetcher(dibApi.fetchAuthor, params);
```

### 5. Render Author Content (with pagination)

```tsx
import { dibApi } from '@/lib/api';
import { DibBlog } from '@dropinblog/nextjs-rendered';

export default async function AuthorPagination({
  params,
}: {
  params: { pagination: string; slug: string };
}) {
  const { pagination, slug } = params;
  const { body_html, head_data } = await dibApi.fetchAuthor({
    slug,
    pagination,
  });
  return <DibBlog body_html={body_html} head_data={head_data} />;
}
```

## Requirements

- Node.js 18+

## API Reference

See the official DropInBlog API documentation for more details:  
[DropInBlog API Reference](https://dropinblog.readme.io/reference/api-reference)

### `DibApi`

- `constructor(token: string, blogId: string)`
- `fetchMainList({ pagination? })`
- `fetchPost({ slug })`
- `fetchCategories({ slug, pagination? })`
- `fetchAuthor({ slug, pagination? })`
- `fetchSitemap()`
- `fetchBlogFeed()`
- `fetchCategoryFeed({ slug })`
- `fetchAuthorFeed({ slug })`

### `DibBlog`

React component to render fetched blog content.

**Props:**

- `body_html: string`
- `head_data: { css?: string; schema?: string }`

### `dibUtils`

- `generateHeadMetadata(head_data)`
- `generateMetadataFromFetcher(fetcher, params?)`

## License

ISC

## Links

- [DropInBlog](https://dropinblog.com/)
