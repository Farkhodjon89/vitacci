import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useReducer } from 'react'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { getSortedProducts, getUniqueElemArray } from '../helpers/product'
import LayoutOne from './Layout'
import Breadcrumb from '../wrappers/breadcrumb/Breadcrumb'
import ShopSidebar from '../wrappers/product/ShopSidebar'
import ShopTopbar from '../wrappers/product/ShopTopbar'
import InfiniteScroll from 'react-infinite-scroller'
import CatalogProducts from '../components/product/CatalogProducts'
import { useLazyQuery } from '@apollo/react-hooks'
import { PRODUCTS_FOR_CATALOG } from '../../queries/dataForCatalog'
import client from '../components/ApolloClient'
import { formatProduct } from '../utils/functions'
import FilterModal from '../components/FilterModal'
import Skeleton from 'react-loading-skeleton'
import { HeadData } from './Head'

const generateFilterVariables = (filters, heelHeights) => {
  const result = {
    first: 12,
    filters: [],
  }

  if (filters.onSale != null) {
    result.onSale = true
  }

  if (filters.search != null) {
    result.search = filters.search
  }

  if (filters.category) {
    result.categories = [filters.category]
  }

  if (filters.colors && filters.colors.length) {
    result.filters.push({
      taxonomy: 'PACOLOR',
      terms: Array.isArray(filters.colors) ? filters.colors : [filters.colors],
    })
  }

  if (filters.sizes && filters.sizes.length) {
    result.filters.push({
      taxonomy: 'PASIZE',
      terms: Array.isArray(filters.sizes) ? filters.sizes : [filters.sizes],
    })
  }
  if (filters.season && filters.season.length) {
    result.filters.push({
      taxonomy: 'PASEASON',
      terms: Array.isArray(filters.season) ? filters.season : [filters.season],
    })
  }

  if (filters.heelHeight) {
    let uniqueHeights = getUniqueElemArray(heelHeights.map((x) => x.name))

    const heights = uniqueHeights
      .map((x) => parseFloat(x.replace(',', '.')))
      .filter((x) => !isNaN(x))
      .sort((a, b) => a - b)
      .filter((height) => {
        const heightsMap = {
          low: height >= 0 && height <= 5.5,
          medium: height >= 0 && height <= 5.5,
          high: height >= 0 && height <= 5.5,
          skyHigh: height >= 0 && height <= 5.5,
        }

        return heightsMap[filters.heelHeight]
      })

    result.filters.push({
      taxonomy: 'PAHEELHEIGHT',
      terms: heights,
    })
  }

  if (filters.price) {
    const [minPrice, maxPrice] = filters.price

    result.minPrice = minPrice
    result.maxPrice = maxPrice
  }

  return result
}

const initialState = {
  init: false,

  mobileFilter: false,
  sortType: 'filterSort',
  sortValue: 'priceHighToLow',
  filters: {},
  products: null,
  pageInfo: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_MOBILE_FILTER_SHOW':
      return {
        ...state,
        mobileFilter: action.mobileFilter,
      }
    case 'SET_SORTING':
      return {
        ...state,
        sortType: action.sortType,
        sortValue: action.sortValue,
      }
    case 'SET_FILTERS':
      if (state.filters.category) {
        return {
          ...state,
          filters: { ...action.filters, category: state.filters.category },
          products: [],
        }
      }

      return {
        ...state,
        filters: action.filters,
        products: [],
      }
    case 'SET_FILTER_VALUE':
      return {
        ...state,
        filters: { ...state.filters, [action.filter]: action.value },
        products: [],
      }
    case 'RESET_FILTERS':
      if (process.browser) {
        window.history.replaceState(null, '', window.location.pathname)
      }

      return {
        ...state,
        products: [],
        filters: { empty: true },
        mobileFilter:
          action.mobileFilter != null
            ? action.mobileFilter
            : state.mobileFilter,
      }
    case 'RESET':
      return state.init ? initialState : state
    case 'SET_PRODUCTS':
      return { ...state, products: action.products }
    case 'SET_PRODUCTS_AND_PAGE_INFO':
      return { ...state, products: action.products, pageInfo: action.pageInfo }
    default:
      throw new Error()
  }
}

function init(state) {
  return { ...state }
}

const ShopGridStandard = ({
  urlFilters,
  products,
  pageInfo,
  attributes,
  currentCategory,
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    { ...initialState, pageInfo, products, filters: urlFilters },
    init
  )

  const [loadProducts, { data, loading }] = useLazyQuery(PRODUCTS_FOR_CATALOG, {
    client,
  })

  const getFilterParams = (filterType, filterValue) => {
    const arrayValuesFor = ['colors', 'sizes', 'season']

    if (filterValue === '' || filterValue == null) {
      const filters = { ...state.filters }
      delete filters[filterType]

      dispatch({
        type: 'SET_FILTERS',
        filters,
      })

      return
    }

    if (arrayValuesFor.includes(filterType)) {
      let options = state.filters[filterType] || []

      if (options.includes(filterValue)) {
        options = options.filter((x) => x !== filterValue)
      } else {
        options = [...options, filterValue]
      }

      dispatch({
        type: 'SET_FILTER_VALUE',
        filter: filterType,
        value: options,
      })
    } else {
      dispatch({
        type: 'SET_FILTER_VALUE',
        filter: filterType,
        value: filterValue,
      })
    }
  }

  const getSortParams = (sortType, sortValue) => {
    dispatch({
      type: 'SET_SORTING',
      sortType,
      sortValue,
    })
  }

  useEffect(() => {
    dispatch({
      type: 'SET_FILTERS',
      filters: urlFilters,
    })
  }, [urlFilters])

  useEffect(() => {
    const { empty, ...filters } = state.filters

    loadProducts({
      variables: generateFilterVariables(filters, attributes.heelHeights),
    })
  }, [state.filters])

  useEffect(() => {
    if (!state.products.length) {
      return
    }

    const sortedProducts = getSortedProducts(
      state.products,
      state.sortType,
      state.sortValue
    )

    dispatch({
      type: 'SET_PRODUCTS',
      products: sortedProducts,
    })
  }, [state.sortType, state.sortValue])

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'SET_PRODUCTS_AND_PAGE_INFO',
        products: [
          ...state.products,
          ...data.products.nodes.map(formatProduct),
        ],
        pageInfo: data.products.pageInfo,
      })
    }
  }, [data])

  const loadMore = () => {
    if (state.pageInfo.hasNextPage) {
      loadProducts({
        variables: {
          after: state.pageInfo.endCursor,
          ...generateFilterVariables(state.filters, attributes.heelHeights),
        },
      })
    }
  }

  console.log(state.filters)

  return (
    <Fragment>
      {currentCategory ? (
        <HeadData
          pageUrl={`/catalog/${currentCategory}${
            process.browser ? window.location.search : ''
          }`}
          pageData={{
            categoryTitle: currentCategory.name,
          }}
        />
      ) : (
        <HeadData
          pageUrl={`/catalog${process.browser ? window.location.search : ''}`}
        />
      )}

      <BreadcrumbsItem to={'/'}>Главная</BreadcrumbsItem>
      <BreadcrumbsItem to={'/catalog'}>Каталог</BreadcrumbsItem>

      <LayoutOne categories={attributes.categories.main} headerTop='visible'>
        <Breadcrumb />

        <div className='shop-area pt-3 pb-100'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-3 mt-70 mb-4'>
                {/* shop sidebar */}
                <ShopSidebar
                  categories={attributes.categories.list}
                  colors={attributes.colors}
                  sizes={attributes.sizes}
                  heelHeights={attributes.heelHeights}
                  getFilterParams={getFilterParams}
                  filters={state.filters}
                  sideSpaceClass='d-none d-lg-block mr-30'
                />

                <div className='d-flex'>
                  <div className='w-100'>
                    <a
                      className='default-btn px-3 py-2 w-100 text-center d-lg-none'
                      onClick={() =>
                        dispatch({
                          type: 'SET_MOBILE_FILTER_SHOW',
                          mobileFilter: true,
                        })
                      }
                    >
                      Фильтр
                    </a>
                  </div>

                  <div className='m-sort-select w-100'>
                    <select
                      onChange={(e) =>
                        getSortParams('filterSort', e.target.value)
                      }
                    >
                      <option value='priceHighToLow'>Цена - по убыванию</option>
                      <option value='priceLowToHigh'>
                        Цена - по возрастанию
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-lg-9'>
                <ShopTopbar
                  filters={state.filters}
                  clearFilters={() =>
                    dispatch({
                      type: 'RESET_FILTERS',
                    })
                  }
                  getFilterSortParams={getSortParams}
                  productCount={state.products.length}
                  sortedProductCount={state.products.length}
                />

                {/* shop page content default */}
                <div className='shop-bottom-area mt-35 h-100'>
                  {loading && !state.products.length ? (
                    <div id='catalog-skeleton-wrapper'>
                      <Skeleton
                        height={250}
                        width={250}
                        count={6}
                        wrapper={({ children }) => (
                          <div className='col-6 col-md-4 mb-3'>{children}</div>
                        )}
                      />
                    </div>
                  ) : !state.products.length ? (
                    <div className='row h-100 align-items-center'>
                      <p className='w-100 text-center'>Товары не найдены</p>
                    </div>
                  ) : (
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={loadMore}
                      hasMore={state.pageInfo.hasNextPage}
                      // hasMore={sortedProducts.length > currentData.length}
                      initialLoad={false}
                      className='row grid three-column'
                      loader={
                        <div className='col-12' key={0}>
                          <div className='flone-preloader d-flex position-relative'>
                            <span />
                            <span />
                          </div>
                        </div>
                      }
                    >
                      <CatalogProducts products={state.products} />
                    </InfiniteScroll>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>

      <FilterModal
        show={state.mobileFilter}
        onHide={() =>
          dispatch({
            type: 'SET_MOBILE_FILTER_SHOW',
            mobileFilter: false,
          })
        }
        children={
          <div className='row flex-column justify-content-between h-100'>
            <ShopSidebar
              categories={attributes.categories.list}
              colors={attributes.colors}
              sizes={attributes.sizes}
              heelHeights={attributes.heelHeights}
              getFilterParams={getFilterParams}
              filters={state.filters}
              sideSpaceClass='mx-4 mt-0 px-3'
            />
            <div className='mx-4'>
              <div className='row'>
                <div className='col-6'>
                  <a
                    className='default-btn px-3 py-2 w-100 text-center'
                    onClick={() => {
                      dispatch({
                        type: 'RESET_FILTERS',
                        mobileFilter: false,
                      })
                    }}
                  >
                    Сбросить
                  </a>
                </div>
                <div className='col-6'>
                  <a
                    className='default-btn px-3 py-2 w-100 text-center'
                    onClick={() =>
                      dispatch({
                        type: 'SET_MOBILE_FILTER_SHOW',
                        mobileFilter: false,
                      })
                    }
                  >
                    Применить
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </Fragment>
  )
}

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
  colors: PropTypes.array,
  sizes: PropTypes.array,
  heelHeights: PropTypes.array,
  categoriesRaw: PropTypes.array,
}

export default ShopGridStandard
// export default connect(mapStateToProps, mapDispatchToProps)(ShopGridStandard);
