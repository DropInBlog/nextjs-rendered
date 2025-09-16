var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/components/DibBlog.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var DibBlog = ({ body_html, head_data }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    head_data && head_data.css && /* @__PURE__ */ jsx(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: head_data.css || ""
        },
        suppressHydrationWarning: true
      }
    ),
    head_data && head_data.schema && /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: head_data.schema },
        suppressHydrationWarning: true
      }
    ),
    body_html && /* @__PURE__ */ jsx(
      "main",
      {
        dangerouslySetInnerHTML: { __html: body_html },
        suppressHydrationWarning: true
      }
    )
  ] });
};
var DibBlog_default = DibBlog;

// src/lib/api.ts
var DibApi = class {
  token;
  blogId;
  constructor(token, blogId) {
    this.token = token;
    this.blogId = blogId;
  }
  getOptions() {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${this.token}`
      }
    };
  }
  getToken = () => this.token;
  getBlogId = () => this.blogId;
  fetchMainList = async ({
    pagination
  } = {}) => {
    try {
      if (!this.token || !this.blogId) {
        throw new Error("Token and Blog ID are required");
      }
      const url = `https://api.dropinblog.com/v2/blog/${this.blogId}/rendered/list?${pagination ? `page=${pagination}&` : ""}fields=head_data%2Cbody_html`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${this.token}`
        }
      });
      const {
        data: { body_html, head_data }
      } = await res.json();
      return { body_html, head_data };
    } catch (error) {
      console.error("Error fetching main list:", error.message);
      throw error;
    }
  };
  fetchPost = async ({ slug }) => {
    try {
      if (!this.token || !this.blogId) {
        throw new Error("Token and Blog ID are required");
      }
      const url = `https://api.dropinblog.com/v2/blog/${this.blogId}/rendered/post/${slug}?fields=head_data%2Cbody_html`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${this.token}`
        }
      });
      const {
        data: { body_html, head_data }
      } = await res.json();
      return { body_html, head_data };
    } catch (error) {
      console.error("Error fetching post:", error.message);
      throw error;
    }
  };
  fetchCategories = async ({
    slug,
    pagination
  }) => {
    try {
      if (!this.token || !this.blogId) {
        throw new Error("Token and Blog ID are required");
      }
      const url = `https://api.dropinblog.com/v2/blog/${this.blogId}/rendered/list/category/${slug}?${pagination ? `page=${pagination}&` : ""}fields=head_data%2Cbody_html`;
      const res = await fetch(url, this.getOptions());
      const {
        data: { body_html, head_data }
      } = await res.json();
      return { body_html, head_data };
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      throw error;
    }
  };
  fetchAuthor = async ({
    slug,
    pagination
  }) => {
    try {
      if (!this.token || !this.blogId) {
        throw new Error("Token and Blog ID are required");
      }
      const url = `https://api.dropinblog.com/v2/blog/${this.blogId}/rendered/list/author/${slug}?${pagination ? `page=${pagination}&` : ""}fields=head_data%2Cbody_html`;
      const res = await fetch(url, this.getOptions());
      const {
        data: { body_html, head_data }
      } = await res.json();
      return { body_html, head_data };
    } catch (error) {
      console.error("Error fetching author:", error.message);
      throw error;
    }
  };
  fetchSitemap = async () => {
    try {
      const url = `https://api.dropinblog.com/v2/blog/${this.blogId}/rendered/sitemap`;
      const res = await fetch(url, this.getOptions());
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching sitemap:", error.message);
      throw error;
    }
  };
  fetchBlogFeed = async () => {
    const url = `https://api.dropinblog.com/v2/blog/${this.blogId}/rendered/feed`;
    const res = await fetch(url, this.getOptions());
    const data = await res.json();
    return data;
  };
  fetchCategoryFeed = async ({ slug }) => {
    const url = `https://api.dropinblog.com/v2/blog/${this.blogId}/rendered/feed/category/${slug}`;
    const res = await fetch(url, this.getOptions());
    const data = await res.json();
    return data;
  };
  fetchAuthorFeed = async ({ slug }) => {
    const url = `https://api.dropinblog.com/v2/blog/${this.blogId}/rendered/feed/author/${slug}`;
    const res = await fetch(url, this.getOptions());
    const data = await res.json();
    return data;
  };
};

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
  DibApi,
  DibBlog_default as DibBlog,
  utils_exports as dibUtils
};
