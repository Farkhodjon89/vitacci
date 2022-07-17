import { CHANGE_CURRENCY } from '../actions/currencyActions';

const initState = {
  currencySymbol: ' UZS',
  currencyName: 'UZS',
  currencyRate: 1,
};

const currencyReducer = (state = initState, action) => {
  if (action.type === CHANGE_CURRENCY) {
    const currencyName = action.payload.currencyName;

    if (currencyName === 'USD') {
      return {
        ...state,
        currencySymbol: '$',
        currencyRate: action.payload.currencyRate,
        currencyName,
      };
    }
    if (currencyName === 'UZS') {
      return {
        ...state,
        currencySymbol: 'UZS ',
        currencyRate: action.payload.currencyRate,
        currencyName,
      };
    }
  }

  return state;
};

export default currencyReducer;
