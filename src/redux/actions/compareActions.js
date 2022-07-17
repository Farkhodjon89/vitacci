export const ADD_TO_COMPARE = "ADD_TO_COMPARE";
export const REMOVE_FROM_COMPARE = "REMOVE_FROM_COMPARE";

// add to compare
export const addToCompare = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Added To Compare", {
        appearance: "success",
        autoDismiss: true
      });
    }
    dispatch({ type: ADD_TO_COMPARE, payload: item });
  };
};

// remove from compare
export const removeFromCompare = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Removed From Compare", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: REMOVE_FROM_COMPARE, payload: item });
  };
};
