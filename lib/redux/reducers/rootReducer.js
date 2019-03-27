const INITIAL_STATE = {
  eur: 0,
  test: 'test string',
  isLoading: false,
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, ...action.state };

    default:
      return { ...state };
  }
};

export default rootReducer;
