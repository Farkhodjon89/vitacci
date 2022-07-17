import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Link from 'next/link';
import MetaTags from 'react-meta-tags';
import { HeadData } from './Head';

const NotFound = () => {
  return (
    <Fragment>
      <HeadData title={'Страница не найдена'} />

      <div className="error-area" style={{ height: '100vh' }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-xl-7 col-lg-8 text-center">
              <div className="error">
                <h1>404</h1>
                <h2>Упс! Страница не найдена</h2>
                <p>
                  Извините, но страница которую вы ищете, не существует, была
                  удалена или временно недоступен.
                </p>
                <Link href={'/'}>
                  <a className="error-btn">На главную</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
