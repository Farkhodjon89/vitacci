import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

const BlogFeaturedSingle = ({ singlePost }) => {
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="blog-wrap mb-30 scroll-zoom">
        <div className="blog-img">
          <Link href={`/blog/${singlePost.databaseId}`}>
            <img
              src={singlePost.featuredImage.node.sourceUrl}
              alt={singlePost.title}
            />
          </Link>
        </div>
        <div className="blog-content-wrap">
          <div className="blog-content text-center">
            <h3>
              <Link href={`/blog/${singlePost.databaseId}`}>
                {singlePost.title}
              </Link>
            </h3>

            <span>{singlePost.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogFeaturedSingle.propTypes = {
  singlePost: PropTypes.object,
};

export default BlogFeaturedSingle;
