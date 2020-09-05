import '@testing-library/jest-dom/extend-expect';

import * as vocTypes from '../store/voc/types';
import * as vocConstants from '../store/voc/constants';

import DB from './browserDB';

const id2Level: vocTypes.Id2Level = {
  1: 1,
  2: 2,
  3: 2,
  4: 1,
  5: 2,
  6: 1,
  7: 1
}

const level = 1;
const page = 1;
const order = vocConstants.ORDER_RANDOM;
const pos = vocConstants.POS_ALL;
const lang = vocConstants.LANG_EN;

describe('DB', () => {
  require("fake-indexeddb/auto");
  it('creates voc db', async () => {
    const res = await DB.create('fruits', id2Level, order, level, page, pos, lang, false);
    expect(res).toEqual('ok');
  });
  it('sends id2level', async () => {
    const _id2Level = await DB.getId2Level('fruits');
    expect(_id2Level).toEqual(id2Level);
  });
  it('sends meta', async () => {
    const meta = await DB.getMeta('fruits');
    expect(meta).toEqual({ order, level, page, pos, lang });
  });
  it('sets item', async () => {
    const res = await DB.setItemLevel('fruits', '3', 1);
    expect(res).toEqual('ok');
    const _id2Level = await DB.getId2Level('fruits');
    expect(_id2Level['3']).toEqual(1);
  });
  it('sets order', async () => {
    const res = await DB.setOrder('fruits', 'ORDER_TEXT_ASC');
    expect(res).toEqual('ok');
    const meta = await DB.getMeta('fruits');
    expect(meta).toEqual({ order: 'ORDER_TEXT_ASC', level, page, pos, lang });
  });
  it('sets level', async () => {
    const res = await DB.setLevel('fruits', 0);
    expect(res).toEqual('ok');
    const meta = await DB.getMeta('fruits');
    expect(meta).toEqual({ order: 'ORDER_TEXT_ASC', level: 0, page, pos, lang });
  });
  it('sets page', async () => {
    const res = await DB.setPage('fruits', 2);
    expect(res).toEqual('ok');
    const meta = await DB.getMeta('fruits');
    expect(meta).toEqual({ order: 'ORDER_TEXT_ASC', level: 0, page: 2, pos, lang });
  });
  it('sets pos', async () => {
    const res = await DB.setPos('fruits', vocConstants.POS_VERB);
    expect(res).toEqual('ok');
    const meta = await DB.getMeta('fruits');
    expect(meta).toEqual(
      {
        order: 'ORDER_TEXT_ASC', level: 0, page: 2,
        pos: vocConstants.POS_VERB, lang
      });
  });
  it('sets lang', async () => {
    const res = await DB.setLang('fruits', vocConstants.LANG_NL);
    expect(res).toEqual('ok');
    const meta = await DB.getMeta('fruits');
    expect(meta).toEqual(
      {
        order: 'ORDER_TEXT_ASC', level: 0, page: 2,
        pos: vocConstants.POS_VERB, lang: vocConstants.LANG_NL
      });
  });

  it('sends existence', async () => {
    const t = await DB.exists('fruits');
    expect(t).toEqual(true);
    const f = await DB.exists('vegetables');
    expect(f).toEqual(false);
  })
})
