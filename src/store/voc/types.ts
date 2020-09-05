import {
  SET_ID2ITEM, SET_NEW_ITEM_LEVEL, UPDATE_ITEM_LEVELS,
  SET_PAGE, SET_LEVEL, SET_STATUS, SET_POS, LANG_EN, LANG_NL,
  STATUS_FETCHING, STATUS_FETCH_FAILED, STATUS_FETCH_SUCCESS,
  ORDER_ID_ASC, ORDER_ID_DESC, ORDER_RANDOM, ORDER_TEXT_ASC,
  ORDER_TEXT_DESC, SET_ORDER, SET_SEED, SET_NAME, POS_NOUN, POS_VERB, POS_ADJ, POS_ADV, POS_ALL, SET_LANG
} from './constants';

// data types
export interface ItemType {
  source: string,
  target: string,
  pos: PosType,
  level: number,
  newLevel?: number
}

export interface Id2Item {
  [id: string]: ItemType
}

export interface Id2Level {
  [id: string]: number
}

export type StatusType = (
  typeof STATUS_FETCHING |
  typeof STATUS_FETCH_FAILED |
  typeof STATUS_FETCH_SUCCESS
);

export type OrderType = (
  typeof ORDER_ID_ASC |
  typeof ORDER_ID_DESC |
  typeof ORDER_RANDOM |
  typeof ORDER_TEXT_ASC |
  typeof ORDER_TEXT_DESC
)

export type PosType = (
  typeof POS_ALL |
  typeof POS_NOUN |
  typeof POS_VERB |
  typeof POS_ADJ |
  typeof POS_ADV
)

export type LangType = (
  typeof LANG_EN |
  typeof LANG_NL
)

// action types
export interface SetId2Item {
  type: typeof SET_ID2ITEM,
  id2Item: Id2Item
}

export interface SetNewItemLevel {
  type: typeof SET_NEW_ITEM_LEVEL,
  id: string,
  newLevel: number
}

export interface UpdateItemLevels {
  type: typeof UPDATE_ITEM_LEVELS
}

export interface SetLevel {
  type: typeof SET_LEVEL,
  level: number
}

export interface SetPage {
  type: typeof SET_PAGE,
  page: number
}

export interface SetStatus {
  type: typeof SET_STATUS,
  status: StatusType
}

export interface SetOrder {
  type: typeof SET_ORDER,
  order: OrderType
}

export interface SetSeed {
  type: typeof SET_SEED,
  seed: string
}

export interface SetName {
  type: typeof SET_NAME,
  name: string
}

export interface SetPos {
  type: typeof SET_POS,
  pos: PosType
}

export interface SetLang {
  type: typeof SET_LANG,
  lang: LangType
}

