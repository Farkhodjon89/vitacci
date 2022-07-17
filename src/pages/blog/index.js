import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { HeadData } from '../../components/Head';
import {
  BreadcrumbsItem,
  BreadcrumbsProvider,
} from 'react-breadcrumbs-dynamic';
import Layout from '../../components/Layout';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import BlogPostsNoSidebar from '../../wrappers/blog/BlogPostsNoSidebar';
import client from '../../components/ApolloClient';
import { DATA_FOR_POSTS } from '../../../queries/posts';
import InfiniteScroll from 'react-infinite-scroller';
import { useLazyQuery } from '@apollo/react-hooks';
import { POSTS } from '../../../queries/posts';
import { formatPost } from '../../utils/functions';
import { StaticDataSingleton } from '../../utils/getStaticData';

const Index = ({ posts, categories, pageInfo }) => {
  const [loadPosts, { data }] = useLazyQuery(POSTS, {
    client,
  });

  const [currentPosts, setCurrentPosts] = useState(posts);
  const [currentPageInfo, setCurrentPageInfo] = useState(pageInfo);

  useEffect(() => {
    if (data) {
      setCurrentPageInfo(data.posts.pageInfo);
      setCurrentPosts([
        ...currentPosts,
        data.posts.nodes.map(post => formatPost(post, true)),
      ]);
    }
  }, [data]);

  const loadMore = () => {
    if (currentPageInfo.hasNextPage) {
      loadPosts({
        variables: {
          first: 10,
          after: currentPageInfo.endCursor,
        },
      });
    }
  };

  return (
    <BreadcrumbsProvider>
      <Fragment>
        <HeadData pageUrl="/blog" />

        <BreadcrumbsItem to={'/'}>Главная</BreadcrumbsItem>
        <BreadcrumbsItem to={'/blog'}>Блог</BreadcrumbsItem>
        <Layout categories={categories} headerTop="visible">
          <Breadcrumb />
          <div className="blog-area pt-50 pb-100 blog-no-sidebar">
            <div className="container">
              <h1 className="text-center mb-5">Блог</h1>
              <div className="row">
                <div className="col-lg-12">
                  <div className="mr-20">
                    <div className="row">
                      {/* blog posts */}

                      <InfiniteScroll
                        pageStart={0}
                        loadMore={loadMore}
                        hasMore={currentPageInfo.hasNextPage}
                        // hasMore={sortedProducts.length > currentData.length}
                        initialLoad={false}
                        className="row grid three-column"
                        loader={
                          <div className="col-12" key={0}>
                            <div className="flone-preloader d-flex position-relative">
                              <span />
                              <span />
                            </div>
                          </div>
                        }
                      >
                        <BlogPostsNoSidebar posts={currentPosts} />
                      </InfiniteScroll>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </Fragment>
    </BreadcrumbsProvider>
  );
};

Index.propTypes = {
  location: PropTypes.object,
};

export const getStaticProps = async () => {
  const staticData = new StaticDataSingleton().getInstance();
  await new StaticDataSingleton().checkAndFetch();

  const result = await client.query({
    query: DATA_FOR_POSTS,
    fetchPolicy: 'no-cache',
  });

  const posts = result.data.posts.nodes.map(post => formatPost(post, true));

  return {
    props: {
      posts,
      categories: staticData.categories.main,
      pageInfo: result.data.posts.pageInfo,
    },
    revalidate: 600,
  };
};

export default Index;
