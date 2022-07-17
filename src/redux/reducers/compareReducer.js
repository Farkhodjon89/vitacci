import { ADD_TO_COMPARE, REMOVE_FROM_COMPARE } from "../actions/compareActions";

const initState = [];

const compareReducer = (state = initState, action) => {
  const compareItems = state,
    product = action.payload;

  switch (action.type) {
    case ADD_TO_COMPARE:
      const compareItem = compareItems.filter(
        item => item.id === product.id
      )[0];
      if (compareItem === undefined) {
        return [...compareItems, product];
      } else {
        return compareItems;
      }

    case REMOVE_FROM_COMPARE:
      const remainingItems = (compareItems, product) =>
        compareItems.filter(compareItem => compareItem.id !== product.id);
      return remainingItems(compareItems, product);

    default:
      return compareItems;
  }
};

export default compareReducer;
