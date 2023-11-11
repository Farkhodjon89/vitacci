import PropTypes from 'prop-types'
import React from 'react'
import { changeLanguage } from 'redux-multilanguage'

const LanguageCurrencyChanger = ({ currentLanguageCode, dispatch }) => {
  const changeLanguageTrigger = (e) => {
    const languageCode = e.target.value
    // changeLocale(languageCode);
    dispatch(changeLanguage(languageCode))
  }

  const languageTitles = {
    uz: "O'zbekcha",
    ru: 'Русский',
  }

  return (
    <div className='language-currency-wrap py-3'>
      {/*<div className="same-language-currency language-style">*/}
      {/*  <IntlContextConsumer>*/}
      {/*    {({ languages, language: currentLocale }) => (*/}
      {/*      <div>*/}
      {/*        <span>*/}
      {/*          {languageTitles[currentLocale]}{' '}*/}
      {/*          <i className="fa fa-angle-down" />*/}
      {/*        </span>*/}

      {/*        <div className="lang-car-dropdown">*/}
      {/*          <ul>*/}
      {/*            {languages.map((_language, i) => (*/}
      {/*              <li key={i}>*/}
      {/*                <button*/}
      {/*                  value={_language}*/}
      {/*                  onClick={e => changeLanguageTrigger(e)}*/}
      {/*                >*/}
      {/*                  {languageTitles[_language]}*/}
      {/*                </button>*/}
      {/*              </li>*/}
      {/*            ))}*/}
      {/*          </ul>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </IntlContextConsumer>*/}
      {/*</div>*/}

      <div className='same-language-currency'>
        <p>
          <i className='fa fa-phone mr-2'></i>
          Позвоните нам:<div>+998 90 925 60 00</div>
          <div>+998 90 064 50 00</div>
          +998 90 068 50 00
        </p>
      </div>
    </div>
  )
}

LanguageCurrencyChanger.propTypes = {
  changeCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func,
}

export default LanguageCurrencyChanger
