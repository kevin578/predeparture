export * from "./userActions";
export * from "./contentActions";

export const setPage = pageNumber => {
    return {
        type: "SET_PAGE",
        payload: pageNumber
    };
  };
  
  export const setPageKey = pageKey => {
    return {
        type: "SET_PAGE_KEY",
        payload: pageKey
      };
  };
  
  export const setSubjectURL = subject => {
    return {
        type: "SET_SUBJECT_URL",
        subject
      };
  };
  
  export const setSubject = subject => {
    return {
        type: "SET_SUBJECT",
        subject
    }
  };

  export const resetAnswers = () => {
    return dispatch => {
      dispatch({
        type: "RESET_ANSWER"
      });
    };
  };

  export const setPageLength = length => {
      return {
          type: "SET_PAGE_LENGTH",
          payload: length
      }
  }

  export const addCheckbox = ()=> {
      return {
          type: "ADD_CHECKBOX",
      }
  }

  export const removeCheckbox = ()=> {
      return {
          type: "REMOVE_CHECKBOX"
      }
  }

  export const resetCheckboxes = ()=> {
    return {
        type: "RESET_CHECKBOXES"
    }
}