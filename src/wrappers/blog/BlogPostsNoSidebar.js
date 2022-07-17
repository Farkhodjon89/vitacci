import React, { Fragment } from 'react';
import Link from 'next/link';

const BlogPostsNoSidebar = ({ posts }) => {
  const postsComponents = posts.map(post => (
    <div key={post.databaseId} className="col-lg-4 col-md-6 col-sm-12">
      <div className="blog-wrap-2 mb-30">
        <div className="blog-img-2">
          <Link href={`/blog/${post.databaseId}`}>
            <a>
              <img
                src={`${post.featuredImage.node.sourceUrl}`}
                alt={post.title}
              />
            </a>
          </Link>
        </div>
        <div className="blog-content-2">
          <div className="blog-meta-2">
            <ul>
              <li>{post.date}</li>
            </ul>
          </div>
          <h4>
            <Link href={`/blog/${post.databaseId}`}>
              <a>{post.title}</a>
            </Link>
          </h4>
          <div dangerouslySetInnerHTML={{ __html: post.short }} />
          <div className="blog-share-comment">
            <div className="blog-btn-2">
              <Link href={`/blog/${post.databaseId}`}>
                <a>Читать дальше</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return <Fragment>{postsComponents}</Fragment>;
};

export default BlogPostsNoSidebar;
