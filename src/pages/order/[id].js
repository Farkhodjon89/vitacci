import React, { Fragment, useEffect, useState } from 'react'
import { HeadData } from '../../components/Head'
import { connect } from 'react-redux'

import Layout from '../../components/Layout'
import NotFound from '../../components/NotFound'
import { formatPrice } from '../../utils/functions'
import PropTypes from 'prop-types'
import client from '../../components/ApolloClient'
import { ORDER_DATA } from '../../../queries/order'
import { StaticDataSingleton } from '../../utils/getStaticData'

const Order = ({ categories, currency }) => {
  const [order, setOrder] = useState()
  const [loading, setLoading] = useState(true)

  if (typeof window !== 'undefined') {
    useEffect(() => {
      let _order = localStorage.getItem('order')

      if (_order == null) {
        setLoading(false)
        return
      }

      _order = JSON.parse(_order)

      setOrder(_order)
      setLoading(false)
    }, [])
  }

  return (
    <Fragment>
      <HeadData
        title={`Заказ ${(order && order.id) || ''}`}
        pageUrl='/order/'
      />

      {loading && order == null ? (
        'Loading...'
      ) : !loading && order == null ? (
        <NotFound />
      ) : (
        <Layout
          categories={categories}
          headerPaddingClass='header-padding-1'
          headerTop='visible'
        >
          <div className='container order pt-5'>
            <div className='row px-3 px-sm-0 mb-4'>
              <div className='text-block success-text'>
                <h4>Ваш заказ принят. Спасибо.</h4>
                <p className='mt-2 text-left'>
                  С вами в ближайшее время свяжется сотрудник VITACCI для
                  уточнения деталей доставки.
                  <br />
                  Если этого не произошло, просьба позвонить по телефону: +998
                  90 064 50 00, +998 90 068 50 00
                  <br />
                  Доставка по Ташкенту – бесплатная при заказе от 1 000 000 сум,
                  осуществляется в течение 48 часов с момента заказа.
                  <br />
                  Доставка по Узбекистану – бесплатная, осуществляется в течение
                  2-3 рабочих дней, в соответствии с графиком работы курьерских
                  служб.
                </p>
              </div>
            </div>

            <div className='row px-3 px-sm-0 order-info mb-4'>
              <div className='col-6 col-md-3 mb-3 mb-md-0 b-r'>
                <h4>Номер заказа:</h4>
                <span>{order.id}</span>
              </div>
              <div className='col-6 col-md-3 mb-3 mb-md-0 b-r b-r-none'>
                <h4>Дата:</h4>
                <span>{new Date(order.date_created).toLocaleDateString()}</span>
              </div>
              <div className='col-6 col-md-3 b-r'>
                <h4>Всего:</h4>
                <span>
                  {formatPrice(parseFloat(order.total))}{' '}
                  {currency.currencySymbol}
                </span>
              </div>
              <div className='col-6 col-md-3'>
                <h4>Метод оплаты:</h4>
                <span>{order.payment_method_title}</span>
              </div>
            </div>

            <div className='row px-3 px-sm-0 detailed-info mb-4'>
              <div className='title'>
                <h2>Информация о заказе</h2>
              </div>

              <div className='row justify-content-between w-100 b-b mb-2'>
                <div className='col uppercase'>
                  <h3>Товар</h3>
                </div>
                <div className='col uppercase text-right'>
                  <h3>Итого</h3>
                </div>
              </div>

              {order.line_items.map((item, i) => (
                <div
                  key={i}
                  className={`row order-item ${
                    order.line_items.length - 1 === i ? 'b-b pb-1' : ''
                  }`}
                >
                  <div className='col'>
                    <h5>
                      {item.name} x{item.quantity}
                    </h5>
                  </div>

                  <div className='col text-right'>
                    <h5>
                      {formatPrice(item.price)} {currency.currencySymbol}
                    </h5>
                  </div>
                </div>
              ))}

              <div className='row meta-info justify-content-between align-items-center w-100 b-b my-2'>
                <div className='col uppercase'>
                  <h3>Метод оплаты</h3>
                </div>
                <div className='col uppercase text-right'>
                  <h4>{order.payment_method_title}</h4>
                </div>
              </div>

              <div className='row justify-content-between w-100 b-b mb-2'>
                <div className='col uppercase'>
                  <h3>Всего</h3>
                </div>
                <div className='col uppercase text-right'>
                  <h3>
                    {formatPrice(order.total)} {currency.currencySymbol}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </Fragment>
  )
}

Order.propTypes = {
  currency: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
  }
}

export const getServerSideProps = async (ctx) => {
  const staticData = new StaticDataSingleton().getInstance()
  await new StaticDataSingleton().checkAndFetch()

  const { id } = ctx.query

  const result = await client.query({
    query: ORDER_DATA,
    variables: { id },
  })

  return {
    props: { categories: staticData.categories.main, order: result.data.order },
  }
}

export default connect(mapStateToProps)(Order)
