import PropTypes from 'prop-types';
import React from 'react';
import NotFoundComponent from '../components/NotFound';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';

const NotFound = () => {
  return (
    <BreadcrumbsProvider>
      <NotFoundComponent />
    </BreadcrumbsProvider>
  );
};

NotFound.propTypes = {
  location: PropTypes.object,
};

export default NotFound;
