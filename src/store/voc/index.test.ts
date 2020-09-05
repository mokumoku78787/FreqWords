import '@testing-library/jest-dom/extend-expect';
import * as types from './types';
import * as actions from './actions';
import * as constants from './constants';
import { reducer, State } from './reducers';

const id2Item: types.Id2Item = {
  1: { source: "Banana", target: "Banana", pos: "NOUN", level: 1 },
  2: { source: "Orange", target: "Banana", pos: "ADV", level: 2 },
  3: { source: "Apple", target: "Banana", pos: "ADV", level: 2 },
  4: { source: "Lemon", target: "Banana", pos: "NOUN", level: 1 },
  5: { source: "Lime", target: "Banana", pos: "NOUN", level: 2 },
  6: { source: "Melon", target: "Banana", pos: "NOUN", level: 1 },
  7: { source: "Grape", target: "Banana", pos: "NOUN", level: 1 }
}

const state: State = {
  status: constants.STATUS_FETCH_SUCCESS,
  page: 1,
  level: 0,
  id2Item: id2Item,
  order: constants.ORDER_ID_ASC,
  seed: 'init',
  name: '',
  pos: constants.POS_ALL,
  lang: constants.LANG_EN
}

describe('reducer', () => {
  it('sets page', () => {
    const action = actions.setPage(3);
    expect(reducer(state, action).page).toEqual(3);
  });
  it('sets level', () => {
    const action = actions.setLevel(2);
    expect(reducer(state, action).level).toEqual(2);
  });
  it('sets status', () => {
    const action = actions.setStatus(constants.STATUS_FETCH_FAILED);
    expect(reducer(state, action).status).toEqual(constants.STATUS_FETCH_FAILED);
  });
  it('sets id2item', () => {
    const initState: State = { ...state, id2Item: {} };
    const action = actions.setId2Item(id2Item);
    expect(reducer(initState, action).id2Item).toEqual(id2Item);
  });
  it('sets newItemLevel', () => {
    const action = actions.setNewItemLevel('4', 2);
    expect(reducer(state, action).id2Item[4].newLevel).toEqual(2);
  });
  it('updates item levels', () => {
    const a1 = actions.setNewItemLevel('4', 2);
    const a2 = actions.updateItemLevels();
    const s = reducer(reducer(state, a1), a2);
    expect(s.id2Item[4].level).toEqual(s.id2Item[4].newLevel);
  });
  it('sets order', () => {
    const action = actions.setOrder(constants.ORDER_TEXT_DESC);
    expect(reducer(state, action).order).toEqual(constants.ORDER_TEXT_DESC);
  });
  it('sets name', () => {
    const action = actions.setName('Japanese 10000');
    expect(reducer(state, action).name).toEqual('Japanese 10000');
  });
  it('sets pos', () => {
    const action = actions.setPos(constants.POS_ADV);
    expect(reducer(state, action).pos).toEqual(constants.POS_ADV);
  });
  it('sets lang', () => {
    const action = actions.setLang(constants.LANG_NL);
    expect(reducer(state, action).lang).toEqual(constants.LANG_NL);
  });

});

describe('selectors.getPageIds', () => {
  it('does not filter ids when level = 0', () => {
    jest.resetModules();
    jest.mock('./constants', () => ({ PAGE_SIZE: 3 }));
    const selectors = require('./selectors');
    const s1: State = { ...state, level: 0, page: 1 };
    const s2: State = { ...state, level: 0, page: 2 };
    const s3: State = { ...state, level: 0, page: 3 };
    expect(selectors.getPageIds(s1)).toEqual(['1', '2', '3']);
    expect(selectors.getPageIds(s2)).toEqual(['4', '5', '6']);
    expect(selectors.getPageIds(s3)).toEqual(['7']);
  });
  it('filteres ids by level', () => {
    jest.resetModules();
    jest.mock('./constants', () => ({ PAGE_SIZE: 3 }));
    const selectors = require('./selectors');
    const s1: State = { ...state, level: 1, page: 1 };
    const s2: State = { ...state, level: 1, page: 2 };
    expect(selectors.getPageIds(s1)).toEqual(['1', '4', '6']);
    expect(selectors.getPageIds(s2)).toEqual(['7']);
  });
  it('filteres ids by pos', () => {
    jest.resetModules();
    jest.mock('./constants', () => ({ PAGE_SIZE: 3 }));
    const selectors = require('./selectors');
    const s1: State = { ...state, pos: constants.POS_ADV, page: 1 };
    const s2: State = { ...state, pos: constants.POS_NOUN, page: 2 };
    expect(selectors.getPageIds(s1)).toEqual(['2', '3']);
    expect(selectors.getPageIds(s2)).toEqual(['6', '7']);
  });
  it('sort ids by order', () => {
    jest.resetModules();
    jest.mock('./constants', () => ({ PAGE_SIZE: 3 }));
    const selectors = require('./selectors');
    const s1: State = { ...state, order: constants.ORDER_ID_ASC };
    const s2: State = { ...state, order: constants.ORDER_ID_DESC };
    const s3: State = { ...state, order: constants.ORDER_TEXT_ASC };
    const s4: State = { ...state, order: constants.ORDER_TEXT_DESC };
    expect(selectors.getPageIds(s1)).toEqual(['1', '2', '3']);
    expect(selectors.getPageIds(s2)).toEqual(['7', '6', '5']);
    expect(selectors.getPageIds(s3)).toEqual(['3', '1', '7']);
    expect(selectors.getPageIds(s4)).toEqual(['2', '6', '5']);
  })
})