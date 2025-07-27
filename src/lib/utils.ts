import { Metadata } from 'next';

type HeadData = {
  title?: string;
  description?: string;
  canonical_url?: string;
  rss_url?: string;
  seo_url_next?: string;
  seo_url_prev?: string;
  image?: string;
  css?: string;
  schema?: string;
};

type FetcherResult = {
  head_data: HeadData;
};

export function generateHeadMetadata(head: HeadData): Metadata {
  const meta: Metadata = {
    title: head.title,
    description: head.description,
    alternates: {
      canonical: head.canonical_url,
      types: {
        'application/rss+xml': head.rss_url ?? null,
      },
    },
    openGraph: {
      type: 'article',
      title: head.title,
      description: head.description,
      url: head.canonical_url,
      images: head.image ? [head.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: head.title,
      description: head.description,
      images: head.image ? [head.image] : undefined,
    },
    robots: {
      follow: true,
      index: true,
    },
    other: {
      ...(head.seo_url_next && { 'link:next': head.seo_url_next }),
      ...(head.seo_url_prev && { 'link:prev': head.seo_url_prev }),
    },
  };

  return meta;
}

export async function generateMetadataFromFetcher<TParams = any>(
  fetcher: Function,
  params?: TParams | Promise<TParams>
): Promise<Metadata> {
  if (typeof fetcher !== 'function') {
    throw new Error('Fetcher must be a function');
  }

  let resolvedParams;
  if (params) {
    resolvedParams = await Promise.resolve(params);
  }

  const { head_data } = resolvedParams
    ? await fetcher(resolvedParams)
    : await fetcher();
  return generateHeadMetadata(head_data);
}
