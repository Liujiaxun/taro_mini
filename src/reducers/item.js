import { ITEM_INFO, ITEM_RECOMMEND } from '@constants/item'

const INITIAL_STATE = {
  itemInfo: {},
  addressIndex: -1
}

export default function item(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ITEM_INFO: {
      return {
        ...state,
        itemInfo: action.payload
      }
    }
    case ITEM_RECOMMEND: {
      return { ...state }
    }
    case 'SELECT_ADDRESS': {
      return {
        ...state,
        addressIndex: action.payload.index
      }
    }
    default:
      return state
  }
}
