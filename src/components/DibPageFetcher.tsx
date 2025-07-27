import React from 'react';

interface DibPageFetcherProps {
  body_html: string;
  head_data: {
    css?: string;
    schema?: string;
  };
}

const DibPageFetcher: React.FC<DibPageFetcherProps> = ({
  body_html,
  head_data,
}) => {
  return (
    <>
      {/* Inject style manually */}
      {head_data && head_data.css && (
        <style
          dangerouslySetInnerHTML={{
            __html: head_data.css || '',
          }}
          suppressHydrationWarning
        />
      )}

      {head_data && head_data.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: head_data.schema }}
          suppressHydrationWarning
        />
      )}

      {/* Main content */}
      {body_html && (
        <main
          dangerouslySetInnerHTML={{ __html: body_html }}
          suppressHydrationWarning
        />
      )}
    </>
  );
};

export default DibPageFetcher;
