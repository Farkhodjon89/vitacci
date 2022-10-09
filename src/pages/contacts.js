import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { HeadData } from '../components/Head'
import { BreadcrumbsItem, BreadcrumbsProvider } from 'react-breadcrumbs-dynamic'
import LayoutOne from '../components/Layout'
import Breadcrumb from '../wrappers/breadcrumb/Breadcrumb'
import { StaticDataSingleton } from '../utils/getStaticData'

const Contacts = ({ categories }) => {
  return (
    <BreadcrumbsProvider>
      <Fragment>
        <HeadData pageUrl='/contacts' />

        <BreadcrumbsItem to={'/'}>Главная</BreadcrumbsItem>
        <BreadcrumbsItem to={'/stores'}>Магазины</BreadcrumbsItem>

        <LayoutOne categories={categories} headerTop='visible'>
          <Breadcrumb />
          <div className='blog-area pt-35 pb-100'>
            <div className='container'>
              <div className='row flex-row-reverse'>
                <div className='col-lg-12'>
                  <div className='blog-details-wrapper ml-20'>
                    <div className='blog-details-top'>
                      <div className='blog-details-content'>
                        <h1 className='text-center'>Адреса магазинов</h1>
                        <br />
                        <h4>
                          <strong>Магазин Vitacci</strong>
                        </h4>
                        <p>
                          ТЦ Poytaxt (Зарафшан), 2 этаж
                          <br />
                          с 10:00 до 21:00
                          <br />
                          Без выходных
                          <br />
                          Информация:{' '}
                          <a href='tel:+998909256000'>+998 90 925 60 00</a>
                        </p>
                        <div className='w-100'>
                          <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.8797457619394!2d69.27339041517996!3d41.31147960866081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b25f9d2446b%3A0xe2b85418577cf1a6!2z0KLQpiDQn9C-0LnRgtCw0YXRgg!5e0!3m2!1sru!2s!4v1597563758108!5m2!1sru!2s'
                            width='100%'
                            height='450'
                            frameBorder='0'
                            allowFullScreen=''
                            aria-hidden='false'
                            tabIndex='0'
                          />
                        </div>
                        <br />
                        <h4>
                          <strong>Магазин Vitacci</strong>
                        </h4>
                        <p>
                          ТРЦ Atlas Chimgan (Экобозор)
                          <br />
                          с 10:00 до 22:00, сб-вс до 22:00
                          <br />
                          Без выходных
                          <br />
                          Информация:{' '}
                          <a href='tel:+998909256000'>+998 90 925 60 00</a>
                        </p>
                        <div className='w-100'>
                          <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5990.2043741548905!2d69.3507083258373!3d41.350132571077815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef47140cbcd4f%3A0x69c9e6e30a920e30!2sEcobozor!5e0!3m2!1sru!2s!4v1597563523962!5m2!1sru!2s'
                            width='100%'
                            height='450'
                            frameBorder='0'
                            allowFullScreen=''
                            aria-hidden='false'
                            tabIndex='0'
                            zoom='15'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutOne>
      </Fragment>
    </BreadcrumbsProvider>
  )
}

Contacts.propTypes = {
  location: PropTypes.object,
}

export const getStaticProps = async (temp) => {
  const staticData = new StaticDataSingleton().getInstance()
  await new StaticDataSingleton().checkAndFetch()

  return {
    props: { categories: staticData.categories.main },
    revalidate: 600,
  }
}

export default Contacts
