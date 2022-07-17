import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import { useIntl } from 'gatsby-plugin-intl';
import InfiniteScroll from 'react-infinite-scroller';
import CatalogProducts from '../../components/product/CatalogProducts';
import { catalog } from '../../utils/catalog';

const ShopGridStandard = ({ products }) => {
  const [layout, setLayout] = useState('grid three-column');
  const [sortType, setSortType] = useState('filterSort');
  const [sortValue, setSortValue] = useState('priceHighToLow');
  const [filters, setFilters] = useState({});
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const pageLimit = 15;

  const getLayout = layout => setLayout(layout);

  const getFilterParams = (filterType, filterValue) => {
    const multipleSorts = ['category', 'color', 'size'];

    if (multipleSorts.includes(filterType)) {
      let options = filters[filterType] || [];

      if (options.includes(filterValue)) {
        options = options.filter(x => x !== filterValue);
      } else {
        options = [...options, filterValue];
      }

      setFilters({
        ...filters,
        [filterType]: options,
      });
    } else {
      setFilters({
        ...filters,
        [filterType]: filterValue,
      });
    }

    setOffset(0);
    setCurrentPage(1);

    setCurrentData([]);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  if (typeof window !== 'undefined') {
    useEffect(() => {
      const { options, filters: _filters } = catalog.init();

      if (
        JSON.stringify(_filters.category) !== JSON.stringify(filters.category)
      ) {
        setOffset(0);
        setCurrentPage(1);
        setCurrentData([]);
        setFilters({ ...filters, ..._filters });
        return;
      }

      if (options.page) {
        setCurrentPage(options.page);

        setCurrentData([
          ...currentData,
          ...sortedProducts.slice(offset, offset + pageLimit),
        ]);
      }
    }, [window.location.search]);
  }

  useEffect(() => {
    const query = catalog.buildQuery({ page: currentPage }, filters);
    const location = `${
      typeof window !== 'undefined' ? window.location.pathname : ''
    }${query ? '?' : ''}${query}`;

    typeof window !== 'undefined' &&
      window.history.replaceState(null, '', location);
  }, [filters, currentPage]);

  useEffect(() => {
    let _products = products;

    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        if (Array.isArray(filters[key]) && !filters[key].length) {
          continue;
        }

        _products = getSortedProducts(_products, key, filters[key]);
      }
    }

    _products = getSortedProducts(_products, sortType, sortValue);

    setSortedProducts(_products);
    setCurrentData(_products.slice(offset, offset + pageLimit));
  }, [filters]);

  // useEffect(() => {
  //   const _currentData = [
  //     ...currentData,
  //     ...sortedProducts.slice(offset, offset + pageLimit),
  //   ];
  //
  //   console.log('L117 currentData:', currentData);
  //   console.log('L118 sortedProducts:', sortedProducts);
  //
  //   setCurrentData(_currentData);
  // }, [offset]);

  useEffect(() => {
    if (!currentData.length) {
      return;
    }

    const sortedProducts = getSortedProducts(currentData, sortType, sortValue);

    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts);
  }, [sortType, sortValue]);

  const intl = useIntl();

  const loadMore = () => {
    if (sortedProducts.length > currentData.length) {
      const _offset = offset + currentPage * pageLimit;
      const _currentPage = currentPage + 1;

      setCurrentPage(_currentPage);
      setOffset(_offset);
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>{`Vitacci | ${intl.formatMessage({ id: 'catalog' })}`}</title>
        <meta
          name="description"
          content="Shop page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={'/'}>
        {intl.formatMessage({ id: 'homePage' })}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={'/catalog'}>
        {intl.formatMessage({ id: 'catalog' })}
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        <Breadcrumb />

        <div className="shop-area pt-3 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 mt-70 mb-4 mb-sm-0">
                {/* shop sidebar */}
                <ShopSidebar
                  products={products}
                  sortedProducts={sortedProducts}
                  getSortParams={getFilterParams}
                  filters={filters}
                  sideSpaceClass="mr-30"
                />
              </div>
              <div className="col-lg-9">
                {/* shop topbar default */}
                <ShopTopbar
                  filters={filters}
                  clearFilters={() => setFilters({})}
                  getLayout={getLayout}
                  getFilterSortParams={getSortParams}
                  productCount={sortedProducts.length}
                  sortedProductCount={currentData.length}
                />

                {/* shop page content default */}
                <div className="shop-bottom-area mt-35">
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={sortedProducts.length > currentData.length}
                    initialLoad={false}
                    className="row grid three-column"
                    loader={
                      <div className="row" key={0}>
                        <div className="flone-preloader d-flex position-relative">
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    }
                  >
                    <CatalogProducts products={currentData} />
                  </InfiniteScroll>
                </div>

                {/* shop product pagination */}
                {/*<div className="pro-pagination-style text-center mt-30">*/}
                {/*  <Paginator*/}
                {/*    totalRecords={sortedProducts.length}*/}
                {/*    pageLimit={pageLimit}*/}
                {/*    pageNeighbours={2}*/}
                {/*    setOffset={setOffset}*/}
                {/*    currentPage={currentPage}*/}
                {/*    setCurrentPage={setCurrentPage}*/}
                {/*    pageContainerClass="mb-0 mt-0"*/}
                {/*    pagePrevText="«"*/}
                {/*    pageNextText="»"*/}
                {/*  />*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

export default ShopGridStandard;
// export default connect(mapStateToProps, mapDispatchToProps)(ShopGridStandard);
