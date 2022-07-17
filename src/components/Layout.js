import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import Header from '../wrappers/header'
import Footer from '../wrappers/footer'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      preloader: true,
    }
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     const preloader = document.querySelector('.flone-preloader-wrapper')

  //     if (preloader) {
  //       preloader.addEventListener('transitionend', (event) => {
  //         if (event.propertyName === 'opacity') {
  //           this.setState({ preloader: false })
  //         }
  //       })

  //       preloader.classList.add('site-preloader__fade')
  //     }
  //   }, 500)
  // }

  render() {
    const {
      children,
      headerContainerClass,
      headerTop,
      headerPaddingClass,
      categories,
    } = this.props

    return (
      <Fragment>
        {/* {this.state.preloader ? (
          <div className='flone-preloader-wrapper'>
            <div className='flone-preloader'>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : null} */}

        <Header
          layout={headerContainerClass}
          top={headerTop}
          headerPaddingClass={headerPaddingClass}
          categories={categories}
        />
        {children}
        <Footer
          backgroundColorClass='bg-gray'
          spaceTopClass='pt-70'
          spaceBottomClass='pb-30'
        />
        <a
          className='contact-tg'
          href='https://t.me/vitacci_uz'
          target='_blank'
        >
          <img
            src={process.env.PUBLIC_URL + '/telegram-logo.svg'}
            alt='Telegram logo'
            className='mr-2'
          />
          <div>Написать нам</div>
        </a>
      </Fragment>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.any,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerTop: PropTypes.string,
  categories: PropTypes.array,
}

export default Layout
