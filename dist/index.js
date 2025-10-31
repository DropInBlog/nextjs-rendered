"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  DibBlog: () => DibBlog_default,
  dibUtils: () => utils_exports
});
module.exports = __toCommonJS(src_exports);

// src/components/DibBlog.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var DibBlog = ({ body_html, head_data }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    head_data && head_data.css && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: head_data.css || ""
        },
        suppressHydrationWarning: true
      }
    ),
    head_data && head_data.schema && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: head_data.schema },
        suppressHydrationWarning: true
      }
    ),
    body_html && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "main",
      {
        dangerouslySetInnerHTML: { __html: body_html },
        suppressHydrationWarning: true
      }
    )
  ] });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DibBlog,
  dibUtils
});
