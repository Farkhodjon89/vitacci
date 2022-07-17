import Accordion from 'react-bootstrap/Accordion';
import ShopColor from './ShopColor';
import React from 'react';
import { getUniqueElemArray } from '../../helpers/product';

import PropTypes from 'prop-types';

const CatalogColors = ({ colors, getFilterParams, activeColors }) => {
  const uniqueColors = getUniqueElemArray(colors.map(x => x.name));

  return (
    <Accordion className="mt-3" defaultActiveKey="-1">
      <div className="sidebar-accordion">
        <div className="root panel-heading">
          <Accordion.Toggle variant="link" eventKey="-1">
            <h3 className="panel-title py-1">Цвет</h3>
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey="-1">
          <div className="root panel-body scroll px-3 pt-3 pb-2">
            <ShopColor
              colors={uniqueColors}
              activeColors={activeColors}
              getFilterParams={getFilterParams}
            />
          </div>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
};

CatalogColors.propTypes = {
  colors: PropTypes.array,
  activeColors: PropTypes.array,
  getFilterParams: PropTypes.func,
};

export default CatalogColors;
