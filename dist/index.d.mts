import React from 'react';
import { Metadata } from 'next';

interface DibBlogProps {
    body_html?: string;
    head_html?: string;
    head_data?: {
        title: string;
        rss_url: string;
        seo_url_next: string;
        css: string;
    };
    head_items?: {
        title: string;
        'og:title': string;
        'twitter:title': string;
        rss_rl: string;
        seo_url_next: string;
        js: string;
        css: string;
    };
}
declare const DibBlog: {
    BodyTag: React.FC<DibBlogProps>;
    HeadTag: React.FC<DibBlogProps>;
};

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
declare function generateHeadMetadata(head: HeadData): Metadata;
declare function generateMetadataFromFetcher<TParams = any>(fetcher: Function, params?: TParams | Promise<TParams>): Promise<Metadata>;

declare const utils_generateHeadMetadata: typeof generateHeadMetadata;
declare const utils_generateMetadataFromFetcher: typeof generateMetadataFromFetcher;
declare namespace utils {
  export {
    utils_generateHeadMetadata as generateHeadMetadata,
    utils_generateMetadataFromFetcher as generateMetadataFromFetcher,
  };
}

export { DibBlog, utils as dibUtils };
