import React from 'react';
import { Metadata } from 'next';

interface DibBlogProps {
    body_html: string;
    head_data: {
        css?: string;
        schema?: string;
    };
}
declare const DibBlog: React.FC<DibBlogProps>;

type APIData = {
    body_html: string;
    head_data: Record<string, string>;
};
declare class DibApi {
    private token;
    private blogId;
    constructor(token: string, blogId: string);
    private getOptions;
    getToken: () => string;
    getBlogId: () => string;
    fetchMainList: ({ pagination, }?: {
        pagination?: string;
    }) => Promise<APIData>;
    fetchPost: ({ slug }: {
        slug: string;
    }) => Promise<APIData>;
    fetchCategories: ({ slug, pagination, }: {
        slug: string;
        pagination?: string;
    }) => Promise<APIData>;
    fetchAuthor: ({ slug, pagination, }: {
        slug: string;
        pagination?: string;
    }) => Promise<APIData>;
    fetchSitemap: () => Promise<any>;
    fetchBlogFeed: () => Promise<any>;
    fetchCategoryFeed: ({ slug }: {
        slug: string;
    }) => Promise<any>;
    fetchAuthorFeed: ({ slug }: {
        slug: string;
    }) => Promise<any>;
}

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

export { DibApi, DibBlog, utils as dibUtils };
