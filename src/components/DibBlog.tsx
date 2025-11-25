import React from 'react';

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

function removeNewLines(str: string): string {
  return str.replace(/\n/g, '');
}

const HeadTag: React.FC<DibBlogProps> = ({ head_html }) => {
  return (
    <>
      {/* Head content */}
      {head_html && (
        <head
          dangerouslySetInnerHTML={{ __html: head_html }}
          suppressHydrationWarning={true}
        />
      )}
    </>
  );
};

const BodyTag: React.FC<DibBlogProps> = ({ body_html }) => {
  return (
    <>
      {/* Main content */}
      {body_html && (
        <main
          dangerouslySetInnerHTML={{ __html: removeNewLines(body_html) }}
          suppressHydrationWarning={true}
        />
      )}
    </>
  );
};

const DibBlog: {
  BodyTag: React.FC<DibBlogProps>;
  HeadTag: React.FC<DibBlogProps>;
} = {
  BodyTag,
  HeadTag,
};

export default DibBlog;
