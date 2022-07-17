import PropTypes from 'prop-types';
import React from 'react';
import BlogFeaturedSingle from '../../components/blog-featured/BlogFeaturedSingle';
import SectionTitle from '../../components/section-title/SectionTitle';

const BlogFeatured = ({ spaceTopClass, spaceBottomClass, posts }) => {
  return (
    <div
      className={`blog-area ${spaceTopClass ? spaceTopClass : ''} ${
        spaceBottomClass ? spaceBottomClass : ''
      }`}
    >
      <div className="container">
        <SectionTitle
          titleText="Блог"
          positionClass="text-left"
          borderClass="no-border"
          spaceClass="mb-20"
        />
        <div className="row">
          {posts.map(singlePost => {
            return (
              <BlogFeaturedSingle
                singlePost={singlePost}
                key={singlePost.databaseId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

BlogFeatured.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BlogFeatured;
