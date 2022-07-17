import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

const BlogFeaturedThreeSingle = ({ singlePost }) => {
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="blog-wrap mb-30 scroll-zoom">
        <div className="blog-img">
          <Link href={singlePost.url}>
            <img src={singlePost.image} alt="" />
          </Link>
          <div className="blog-category-names blog-category-names--style2">
            {singlePost.category.map((singleCategory, key) => {
              return (
                <span className="red" key={key}>
                  {singleCategory}
                </span>
              );
            })}
          </div>
        </div>
        <div className="blog-content-wrap">
          <div className="blog-content blog-content--style2 text-center">
            <h3>
              <Link href={singlePost.url}>{singlePost.title}</Link>
            </h3>
            <span>
              By <Link href={singlePost.authorUrl}>{singlePost.author}</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogFeaturedThreeSingle.propTypes = {
  singlePost: PropTypes.object,
};

export default BlogFeaturedThreeSingle;
