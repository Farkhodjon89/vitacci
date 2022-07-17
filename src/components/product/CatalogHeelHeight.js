import Accordion from 'react-bootstrap/Accordion';
import React from 'react';
import PropTypes from 'prop-types';
import { getUniqueElemArray } from '../../helpers/product';
import ShopHeelHeight from './ShopHeelHeight';

const HeelHeight = ({ sizes, activeHeelHeight, getFilterParams }) => {
  let uniqueHeights = getUniqueElemArray(sizes.map(x => x.name));

  const namedHeights = {
    low: [],
    medium: [],
    high: [],
    skyHigh: [],
  };

  const heights = uniqueHeights
    .map(x => parseFloat(x.replace(',', '.')))
    .filter(x => !isNaN(x))
    .sort((a, b) => a - b);

  for (const height of heights) {
    if (height >= 0 && height <= 5.5) {
      namedHeights.low.push(height);
    }
    if (height >= 5.6 && height <= 7.5) {
      namedHeights.medium.push(height);
    }
    if (height >= 7.6 && height <= 9.5) {
      namedHeights.high.push(height);
    }
    if (height >= 9.6) {
      namedHeights.skyHigh.push(height);
    }
  }

  return (
    <Accordion className="mt-3" defaultActiveKey="-3">
      <div className="sidebar-accordion">
        <div className="root panel-heading">
          <Accordion.Toggle variant="link" eventKey="-3">
            <h3 className="panel-title py-1">Высота каблука</h3>
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey="-3">
          <div className="root panel-body px-3 pt-3 pb-2">
            <ShopHeelHeight
              heights={namedHeights}
              activeHeelHeight={activeHeelHeight}
              getFilterParams={getFilterParams}
            />
          </div>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
};

HeelHeight.propTypes = {
  sizes: PropTypes.array,
  activeHeelHeight: PropTypes.string,
  getFilterParams: PropTypes.func,
};

export default HeelHeight;
