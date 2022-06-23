import {
    ALL_PROPERTIES,
  LOADING,
  PROPERTY
} from './actionTypes';

const initialState = {
  loading: true,
  notFound: false,
  error: {},
  properties: [],
  property: {}
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
        return {
        ...state,
        loading: true
        };
    case ALL_PROPERTIES:
        return {
            ...state,
            properties: payload,
            loading: false
        };
    case PROPERTY:
        return {
            ...state,
            property: payload,
            loading: false
        }
    default:
        return {
            ...state
        };
  }
}

export default reducer