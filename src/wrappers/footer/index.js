import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { animateScroll } from 'react-scroll'
import FooterCopyright from '../../components/footer/FooterCopyright'

const Footer = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  containerClass,
  extraFooterClass,
  sideMenu,
}) => {
  const [scroll, setScroll] = useState(0)
  const [top, setTop] = useState(0)

  useEffect(() => {
    setTop(100)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    animateScroll.scrollToTop()
  }

  const handleScroll = () => {
    setScroll(window.scrollY)
  }

  return (
    <footer
      className={`footer-area ${
        backgroundColorClass ? backgroundColorClass : ''
      } ${spaceTopClass ? spaceTopClass : ''} ${
        spaceBottomClass ? spaceBottomClass : ''
      } ${extraFooterClass ? extraFooterClass : ''}`}
    >
      <div className={`${containerClass ? containerClass : 'container'}`}>
        <div className='row'>
          <div
            className={`${
              sideMenu ? 'col-xl-2 col-sm-4' : 'col-lg-2 col-sm-4'
            }`}
          >
            {/* footer copyright */}
            <FooterCopyright
              footerLogo={`${process.env.PUBLIC_URL}/new-logo.png`}
              spaceBottomClass='mb-30'
            />
          </div>
          <div
            className={`${
              sideMenu ? 'col-xl-3 col-sm-4' : 'col-lg-3 col-sm-4'
            }`}
          >
            <div className='footer-widget mb-30'>
              <div className='footer-title'>
                <h3>О НАС</h3>
              </div>
              <div className='footer-list'>
                <ul>
                  <li>
                    <Link href={'/about'}>О нас</Link>
                  </li>
                  <li>
                    <Link href={'/blog'}>Блог</Link>
                  </li>
                  <li>
                    <Link href={'/contacts'}>Контакты</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? 'col-xl-3 col-sm-4' : 'col-lg-3 col-sm-4'
            }`}
          >
            <div
              className={`${
                sideMenu ? 'footer-widget mb-30' : 'footer-widget mb-30'
              }`}
            >
              <div className='footer-title'>
                <h3>Полезные ссылки</h3>
              </div>
              <div className='footer-list'>
                <ul>
                  <li>
                    <Link href={'/policy'}>Политика конфиденциальности</Link>
                  </li>
                  <li>
                    <Link href={'/delivery'}>Условия доставки</Link>
                  </li>
                  <li>
                    <Link href={'/terms'}>Публичная оферта</Link>
                  </li>
                  <li>
                    <Link href={'/faq'}>Часто задаваемые вопросы</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? 'col-xl-3 col-sm-4' : 'col-lg-3 col-sm-6'
            }`}
          >
            <div
              className={`${
                sideMenu ? 'footer-widget mb-30' : 'footer-widget mb-30'
              }`}
            >
              <div className='footer-title'>
                <h3>Мы в социальных сетях</h3>
              </div>
              <div className='footer-list'>
                <ul>
                  <li>
                    <a
                      href='https://www.facebook.com/vitacciuz'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <i className='fab fa-facebook-square mr-1' />
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://www.instagram.com/vitacci.uz/?igshid=1a7ahw8dpp7bv'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <i className='fab fa-instagram mr-1' />
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://t.me/vitacciuz'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <i className='fab fa-telegram mr-1' />
                      Telegram
                    </a>
                  </li>
                  <li className='payment-method'>
                    <p className='mb-1'>Мы принимаем:</p>
                    <img
                      src={`${process.env.PUBLIC_URL}/payme.svg`}
                      alt='PayMe'
                    />
                    <img
                      className='ml-2'
                      src={`${process.env.PUBLIC_URL}/click.png`}
                      alt='Click'
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? 'show' : ''}`}
        onClick={() => scrollToTop()}
      >
        <i className='fa fa-angle-double-up' />
      </button>

      <div className='text-center'>
        Сайт разработан компанией
        <strong>
          <a
            className='ml-1'
            href='https://billz.io/online-store'
            target='_blank'
            rel='nofollow, noreferrer'
          >
            <img src={`${process.env.PUBLIC_URL}/by_billz.svg`} alt='' />
          </a>
        </strong>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
}

export default Footer
