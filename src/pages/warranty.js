import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { HeadData } from '../components/Head';
import {
  BreadcrumbsItem,
  BreadcrumbsProvider,
} from 'react-breadcrumbs-dynamic';
import LayoutOne from '../components/Layout';
import Breadcrumb from '../wrappers/breadcrumb/Breadcrumb';
import client from '../components/ApolloClient';
import PAGE_BY_ID from '../../queries/pageById';
import { StaticDataSingleton } from '../utils/getStaticData';

const Warranty = ({ page, categories }) => {
  return (
    <BreadcrumbsProvider>
      <Fragment>
        <HeadData pageUrl="/warranty" />

        <BreadcrumbsItem to={'/'}>Главная</BreadcrumbsItem>
        <BreadcrumbsItem to={'/warranty'}>{page.title}</BreadcrumbsItem>

        <LayoutOne categories={categories} headerTop="visible">
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
        </LayoutOne>
      </Fragment>
    </BreadcrumbsProvider>
  );
};

Warranty.propTypes = {
  location: PropTypes.object,
};

export const getStaticProps = async () => {
  const staticData = new StaticDataSingleton().getInstance();
  await new StaticDataSingleton().checkAndFetch();

  const result = await client.query({
    query: PAGE_BY_ID,
    variables: { id: '5696' },
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

export default Warranty;
