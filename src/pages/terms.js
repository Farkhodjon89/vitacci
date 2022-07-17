import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { HeadData } from '../components/Head';
import {
  BreadcrumbsItem,
  BreadcrumbsProvider,
} from 'react-breadcrumbs-dynamic';
import Layout from '../components/Layout';
import Breadcrumb from '../wrappers/breadcrumb/Breadcrumb';
import client from '../components/ApolloClient';
import PAGE_BY_ID from '../../queries/pageById';
import { StaticDataSingleton } from '../utils/getStaticData';

const Terms = ({ page, categories }) => {
  return (
    <BreadcrumbsProvider>
      <Fragment>
        <HeadData pageUrl="/terms" />

        <BreadcrumbsItem to={'/'}>Главная</BreadcrumbsItem>
        <BreadcrumbsItem to={'/terms'}>{page.title}</BreadcrumbsItem>

        <Layout categories={categories} headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />
          <div className="blog-area pt-100 pb-100">
            <div className="container">
              <div className="row flex-row-reverse">
                <div className="col-lg-12">
                  <div className="blog-details-wrapper ml-20">
                    <div className="blog-details-top">
                      <div
                        className="blog-details-content"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                      />
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

Terms.propTypes = {
  location: PropTypes.object,
};

export const getStaticProps = async () => {
  const staticData = new StaticDataSingleton().getInstance();
  await new StaticDataSingleton().checkAndFetch();

  const result = await client.query({
    query: PAGE_BY_ID,
    variables: { id: '5691' },
    fetchPolicy: 'no-cache',
  });

  return {
    props: {
      page: result.data.page,
      categories: staticData.categories.main,
    },
    revalidate: 600,
  };
};

export default Terms;
