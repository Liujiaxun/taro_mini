import {CATE_MENU, CATE_SUB, CATE_SUB_LIST} from '@constants/cate'

const INITIAL_STATE = {
  menu: [],
  category: [],
  subMenu: [],
  subCategory: {},
  yxcCategory: [],
  yxcCategoryData:[]
}

export default function cate(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CATE_MENU: {
      const {categoryList} = action.payload
      const menu = categoryList.map(({id, name}) => ({id, name}))
      return {...state, menu, category: categoryList}
    }
    case CATE_SUB: {
      return {
        ...state,
        subMenu: action.payload.category.subCategoryList
      }
    }
    case CATE_SUB_LIST: {
      const {id, itemList} = action.payload
      return {
        ...state,
        subCategory: {...state.subCategory, [id]: itemList}
      }
    }
    case 'CATE_YXC_CATEGORY': {
      return {
        ...state,
        yxcCategory: action.payload
      }
    }
    case 'CATE_YXC_CATEGORY_DATA': {
      return {
        ...state,
        yxcCategoryData: action.payload
      }
    }
    default:
      return state
  }
}
