import { Reducer, combineReducers } from 'redux';

import {
  SET_ID2ITEM, SET_NEW_ITEM_LEVEL, UPDATE_ITEM_LEVELS, SET_POS,
  SET_PAGE, SET_LEVEL, SET_STATUS, SET_ORDER, SET_SEED, SET_NAME,
  SET_LANG,
} from './constants';

import { Id2Item, StatusType, OrderType, PosType, LangType } from './types';

export const initState = {
  status: 'STATUS_FETCHING' as const,
  id2Item: {},
  page: 1,
  level: 0,
  order: 'ORDER_ID_ASC' as const,
  seed: 'init',
  name: '',
  pos: 'ALL' as const,
  delimiter: 'DELIMITER_NEW_LINE' as const,
  lang: 'LANG_EN' as const
}
const id2ItemReducer: Reducer<Id2Item> = (id2Item = initState.id2Item, action) => {
  switch (action.type) {
    case SET_ID2ITEM:
      return action.id2Item;
    case SET_NEW_ITEM_LEVEL:
      return {
        ...id2Item,
        [action.id]: {
          ...id2Item[action.id],
          newLevel: action.newLevel
        }
      }
    case UPDATE_ITEM_LEVELS:
      const newId2Item: Id2Item = {};
      Object.keys(id2Item).forEach((id) => {
        const item = id2Item[id];
        const { level, newLevel } = item;
        newId2Item[id] = { ...item, level: newLevel ? newLevel : level };
      });
      return newId2Item;
    default:
      return id2Item;
  }
};

const pageReducer: Reducer<number> = (page = initState.page, action) => {
  switch (action.type) {
    case SET_PAGE:
      return action.page;
    default:
      return page
  }
};

const levelReducer: Reducer<number> = (level = initState.level, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return action.level;
    default:
      return level;
  }
};

const statusReducer: Reducer<StatusType> = (status = initState.status, action) => {
  switch (action.type) {
    case SET_STATUS:
      return action.status;
    default:
      return status;
  }
};

const orderReducer: Reducer<OrderType> = (order = initState.order, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    default:
      return order;
  }
};

const seedReducer: Reducer<string> = (seed = initState.seed, action) => {
  switch (action.type) {
    case SET_SEED:
      return action.seed;
    default:
      return seed;
  }
};

const nameReducer: Reducer<string> = (name = initState.name, action) => {
  switch (action.type) {
    case SET_NAME:
      return action.name;
    default:
      return name;
  }
};

const posReducer: Reducer<PosType> = (pos = initState.pos, action) => {
  switch (action.type) {
    case SET_POS:
      return action.pos;
    default:
      return pos;
  }
}

const langReducer: Reducer<LangType> = (lang = initState.lang, action) => {
  switch (action.type) {
    case SET_LANG:
      return action.lang;
    default:
      return lang;
  }
}

export const reducer = combineReducers({
  id2Item: id2ItemReducer,
  page: pageReducer,
  level: levelReducer,
  status: statusReducer,
  order: orderReducer,
  seed: seedReducer,
  name: nameReducer,
  pos: posReducer,
  lang: langReducer
});

export type State = ReturnType<typeof reducer>;

