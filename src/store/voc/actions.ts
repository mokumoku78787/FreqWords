import {
  SET_ID2ITEM, SET_NEW_ITEM_LEVEL, UPDATE_ITEM_LEVELS,
  SET_LEVEL, SET_PAGE, SET_STATUS, SET_ORDER, SET_SEED,
  SET_NAME, SET_POS, SET_LANG
} from './constants';

import {
  Id2Item, SetId2Item, SetNewItemLevel,
  SetLevel, SetPage, UpdateItemLevels,
  StatusType, OrderType, SetStatus, SetOrder,
  SetSeed, SetName, SetPos, PosType, SetLang, LangType
} from './types';

export const setId2Item = (id2Item: Id2Item): SetId2Item => {
  return {
    type: SET_ID2ITEM,
    id2Item: id2Item
  }
}

export const setNewItemLevel = (id: string, newLevel: number): SetNewItemLevel => {
  return {
    type: SET_NEW_ITEM_LEVEL,
    id: id,
    newLevel: newLevel
  }
}

export const updateItemLevels = (): UpdateItemLevels => {
  return {
    type: UPDATE_ITEM_LEVELS
  }
}

export const setLevel = (level: number): SetLevel => {
  return {
    type: SET_LEVEL,
    level: level
  }
}

export const setPage = (page: number): SetPage => {
  return {
    type: SET_PAGE,
    page: page
  }
}

export const setStatus = (status: StatusType): SetStatus => {
  return {
    type: SET_STATUS,
    status: status
  }
};

export const setOrder = (order: OrderType): SetOrder => {
  return {
    type: SET_ORDER,
    order: order
  }
};

export const setSeed = (seed: string): SetSeed => {
  return {
    type: SET_SEED,
    seed: seed
  }
};

export const setName = (name: string): SetName => {
  return {
    type: SET_NAME,
    name: name
  }
};

export const setPos = (pos: PosType): SetPos => {
  return {
    type: SET_POS,
    pos: pos
  }
};

export const setLang = (lang: LangType): SetLang => {
  return {
    type: SET_LANG,
    lang: lang
  }
};