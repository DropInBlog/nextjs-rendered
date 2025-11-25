var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/components/DibBlog.tsx
import { Fragment, jsx } from "react/jsx-runtime";
function removeNewLines(str) {
  return str.replace(/\n/g, "");
}
var HeadTag = ({ head_html }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: head_html && /* @__PURE__ */ jsx(
    "head",
    {
      dangerouslySetInnerHTML: { __html: head_html },
      suppressHydrationWarning: true
    }
  ) });
};
var BodyTag = ({ body_html }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: body_html && /* @__PURE__ */ jsx(
    "main",
    {
      dangerouslySetInnerHTML: { __html: removeNewLines(body_html) },
      suppressHydrationWarning: true
    }
  ) });
};
var DibBlog = {
  BodyTag,
  HeadTag
};
var DibBlog_default = DibBlog;

// src/lib/utils.ts
var utils_exports = {};
__export(utils_exports, {
  generateHeadMetadata: () => generateHeadMetadata,
  generateMetadataFromFetcher: () => generateMetadataFromFetcher
});
function generateHeadMetadata(head) {
  const meta = {
    title: head.title,
    description: head.description,
    alternates: {
      canonical: head.canonical_url,
      types: {
        "application/rss+xml": head.rss_url ?? null
      }
    },
    openGraph: {
      type: "article",
      title: head.title,
      description: head.description,
      url: head.canonical_url,
      images: head.image ? [head.image] : void 0
    },
    twitter: {
      card: "summary_large_image",
      title: head.title,
      description: head.description,
      images: head.image ? [head.image] : void 0
    },
    robots: {
      follow: true,
      index: true
    },
    other: {
      ...head.seo_url_next && { "link:next": head.seo_url_next },
      ...head.seo_url_prev && { "link:prev": head.seo_url_prev }
    }
  };
  return meta;
}
async function generateMetadataFromFetcher(fetcher, params) {
  if (typeof fetcher !== "function") {
    throw new Error("Fetcher must be a function");
  }
  let resolvedParams;
  if (params) {
    resolvedParams = await Promise.resolve(params);
  }
  const { head_data } = resolvedParams ? await fetcher(resolvedParams) : await fetcher();
  return generateHeadMetadata(head_data);
}
export {
  DibBlog_default as DibBlog,
  utils_exports as dibUtils
};
