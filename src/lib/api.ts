type APIData = {
  body_html: string;
  head_data: Record<string, string>;
};

export default class DibApi {
  private token: string;
  private blogId: string;

  constructor(token: string, blogId: string) {
    this.token = token;
    this.blogId = blogId;
  }

  private getOptions() {
    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${this.token}`,
      },
    };
  }

  getToken = () => this.token;
  getBlogId = () => this.blogId;

  fetchMainList = async ({
    pagination,
  }: { pagination?: string } = {}): Promise<APIData> => {
    try {
      if (!this.token || !this.blogId) {
        throw new Error('Token and Blog ID are required');
      }

      const url = `https://api.dropinblog.com/v2/blog/${
        this.blogId
      }/rendered/list?${
        pagination ? `page=${pagination}&` : ''
      }fields=head_data%2Cbody_html`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${this.token}`,
        },
      });

      const {
        data: { body_html, head_data },
      } = await res.json();

      return { body_html, head_data };
    } catch (error) {
      console.error('Error fetching main list:', (error as Error).message);
      throw error;
    }
  };

  fetchPost = async ({ slug }: { slug: string }): Promise<APIData> => {
    try {
      if (!this.token || !this.blogId) {
        throw new Error('Token and Blog ID are required');
      }
      const url = `https://api.dropinblog.com/v2/blog/${this.blogId}/rendered/post/${slug}?fields=head_data%2Cbody_html`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${this.token}`,
        },
      });
      const {
        data: { body_html, head_data },
      } = await res.json();
      return { body_html, head_data };
    } catch (error) {
      console.error('Error fetching post:', (error as Error).message);
      throw error;
    }
  };

  fetchCategories = async ({
    slug,
    pagination,
  }: {
    slug: string;
    pagination?: string;
  }): Promise<APIData> => {
    try {
      if (!this.token || !this.blogId) {
        throw new Error('Token and Blog ID are required');
      }
      const url = `https://api.dropinblog.com/v2/blog/${
        this.blogId
      }/rendered/list/category/${slug}?${
        pagination ? `page=${pagination}&` : ''
      }fields=head_data%2Cbody_html`;

      const res = await fetch(url, this.getOptions());

      const {
        data: { body_html, head_data },
      } = await res.json();

      return { body_html, head_data };
    } catch (error) {
      console.error('Error fetching categories:', (error as Error).message);
      throw error;
    }
  };

  fetchAuthor = async ({
    slug,
    pagination,
  }: {
    slug: string;
    pagination?: string;
  }): Promise<APIData> => {
    try {
      if (!this.token || !this.blogId) {
        throw new Error('Token and Blog ID are required');
      }
      const url = `https://api.dropinblog.com/v2/blog/${
        this.blogId
      }/rendered/list/author/${slug}?${
        pagination ? `page=${pagination}&` : ''
      }fields=head_data%2Cbody_html`;

      const res = await fetch(url, this.getOptions());

      const {
        data: { body_html, head_data },
      } = await res.json();

      return { body_html, head_data };
    } catch (error) {
      console.error('Error fetching author:', (error as Error).message);
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
      console.error('Error fetching sitemap:', (error as Error).message);
      throw error;
    }
  };

  fetchBlogFeed = async () => {
    const url = `https://api.dropinblog.com/v2/blog/${this.blogId}/rendered/feed`;
    const res = await fetch(url, this.getOptions());

    const data = await res.json();
    return data;
  };

  fetchCategoryFeed = async ({ slug }: { slug: string }) => {
    const url = `https://api.dropinblog.com/v2/blog/${this.blogId}/rendered/feed/category/${slug}`;
    const res = await fetch(url, this.getOptions());

    const data = await res.json();
    return data;
  };

  fetchAuthorFeed = async ({ slug }: { slug: string }) => {
    const url = `https://api.dropinblog.com/v2/blog/${this.blogId}/rendered/feed/author/${slug}`;
    const res = await fetch(url, this.getOptions());

    const data = await res.json();
    return data;
  };
}
