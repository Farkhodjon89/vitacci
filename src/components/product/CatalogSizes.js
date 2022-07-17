import Accordion from 'react-bootstrap/Accordion';
import ShopSize from './ShopSize';
import React from 'react';
import PropTypes from 'prop-types';
import { getUniqueElemArray } from '../../helpers/product';

const CatalogSizes = ({ sizes, activeSizes, getFilterParams }) => {
  let uniqueSizes = getUniqueElemArray(sizes.map(x => x.name));
  const namedSizes = uniqueSizes.filter(x => isNaN(parseInt(x)));
  const numberedSizes = uniqueSizes
    .map(x => parseFloat(x.replace(',', '.')))
    .filter(x => !isNaN(x))
    .sort((a, b) => a - b);

  return (
    <Accordion className="mt-3" defaultActiveKey="-2">
      <div className="sidebar-accordion">
        <div className="root panel-heading">
          <Accordion.Toggle variant="link" eventKey="-2">
            <h3 className="panel-title py-1">Размер</h3>
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey="-2">
          <div className="root panel-body scroll px-3 pt-3 pb-2">
            <ShopSize
              sizes={[...numberedSizes, ...namedSizes]}
              activeSizes={activeSizes}
              getFilterParams={getFilterParams}
            />
          </div>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
};

CatalogSizes.propTypes = {
  sizes: PropTypes.array,
  activeSizes: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default CatalogSizes;
