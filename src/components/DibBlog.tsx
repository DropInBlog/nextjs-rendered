import React from 'react';

interface DibBlogProps {
  body_html: string | undefined;
  head_data: {
    css?: string | undefined;
    schema?: string | undefined;
  } | undefined;
}

function removeNewLines(str: string): string {
  return str.replace(/\n/g, '');
}

const DibBlog: React.FC<DibBlogProps> = ({ body_html, head_data }) => {
  return (
    <>
      {/* Inject style manually */}
      {head_data && head_data.css && (
        <style
          dangerouslySetInnerHTML={{
            __html: removeNewLines(head_data.css) || '',
          }}
          suppressHydrationWarning={true}
        />
      )}

      {head_data && head_data.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: removeNewLines( head_data.schema) }}
          suppressHydrationWarning={true}
        />
      )}

      {/* Main content */}
      {body_html && (
        <main
          dangerouslySetInnerHTML={{ __html:removeNewLines( body_html) }}
          suppressHydrationWarning={true}
        />
      )}
    </>
  );
};

export default DibBlog;
