import PropTypes from 'prop-types';
import React from 'react';
import { multilanguage, changeLanguage } from 'redux-multilanguage';
import { connect } from 'react-redux';
import { changeCurrency } from '../../../redux/actions/currencyActions';

const MobileLangCurrChange = ({ currentLanguageCode, dispatch }) => {
  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    // changeLocale(languageCode);
    dispatch(changeLanguage(languageCode));
  };

  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      '#offcanvas-mobile-menu'
    );
    offcanvasMobileMenu.classList.remove('active');
  };

  const languageTitles = {
    uz: "O'zbekcha",
    ru: 'Русский',
  };

  return (
    <div className="mobile-menu-middle">
      <div className="lang-curr-style">
        <span className="title mb-2">Выберите язык </span>
        {({ languages, language: currentLocale }) => (
          <select
            value={currentLocale}
            onChange={e => {
              changeLanguageTrigger(e);
              closeMobileMenu();
            }}
          >
            {languages.map((_language, i) => (
              <option value={_language} key={i}>
                {languageTitles[_language]}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

MobileLangCurrChange.propTypes = {
  changeCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrency: currencyName => {
      dispatch(changeCurrency(currencyName));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(MobileLangCurrChange));
