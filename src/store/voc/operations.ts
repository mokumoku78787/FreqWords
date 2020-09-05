import DB from '../../db/browserDB';
import {
  setId2Item, setStatus, setPage, setSeed, setPos, setLang,
  setLevel, updateItemLevels, setOrder, setNewItemLevel, setName
} from './actions';
import { Id2Item, OrderType, ItemType, PosType, Id2Level, LangType } from './types';
import {
  STATUS_FETCHING, STATUS_FETCH_SUCCESS,
  MAX_ITEM_LEVEL, MIN_ITEM_LEVEL, STATUS_FETCH_FAILED
} from './constants';
import { initState } from './reducers';
import { getSupportedLangs, getLangCode } from './utils';


const getId2Item = (name: string, lang: LangType): Id2Item => {
  let id2Item: Id2Item = {};
  const langs = getSupportedLangs(name);
  const code = langs.includes(lang) ? getLangCode(lang) : getLangCode(langs[0]);
  switch (name) {
    case 'German 10000':
      id2Item = require('./data/german10000-' + code + '.json').id2item;
      break;
    case 'French 10000':
      id2Item = require('./data/french10000-' + code + '.json').id2item;
      break;
    case 'Spanish 10000':
      id2Item = require('./data/spanish10000-' + code + '.json').id2item;
      break;
  }
  Object.keys(id2Item).forEach((id) => {
    id2Item[id].level = MIN_ITEM_LEVEL;
  });
  return id2Item;
}

export const fetchVoc = (dispatch: Function, name: string, lang: LangType): void => {
  dispatch(setStatus(STATUS_FETCHING));
  const langs = getSupportedLangs(name);
  const op = async () => {
    const id2Item = getId2Item(name, lang);
    const vocExists = await DB.exists(name);
    if (vocExists) {
      const id2Level = await DB.getId2Level(name);
      const meta = await DB.getMeta(name);
      const { order, level, page, pos, lang } = meta;
      Object.keys(id2Level).forEach((id) => {
        id2Item[id].level = id2Level[id];
      })
      dispatch(setId2Item(id2Item));
      dispatch(setOrder(order));
      dispatch(setLevel(level));
      dispatch(setPage(page));
      dispatch(setPos(pos));
      dispatch(setName(name));

      if (lang !== undefined && langs.includes(lang)) {
        dispatch(setLang(lang));
      } else {
        dispatch(setLang(langs[0]));
      }

    } else {
      const id2Level: Id2Level = {};
      Object.keys(id2Item).forEach((id) => {
        id2Level[id] = id2Item[id].level;
      });
      const { order, level, page, pos } = initState;
      const lang = langs[0];
      await DB.create(name, id2Level, order, level, page, pos, lang, false);
      dispatch(setName(name));
      dispatch(setLang(lang));
      dispatch(setId2Item(id2Item));
    }
  }
  op().then(() => {
    dispatch(setStatus(STATUS_FETCH_SUCCESS));
  }).catch((error) => {
    console.log(error);
    dispatch(setStatus(STATUS_FETCH_FAILED));
  })
}

export const setVocFromUpload = (
  dispatch: Function, name: string, lang: LangType,
  id2Level: Id2Level): void => {
  dispatch(setStatus(STATUS_FETCHING));
  const op = async () => {
    const id2Item = getId2Item(name, lang);
    const _id2Level: Id2Level = {};
    Object.keys(id2Level).forEach((id) => {
      const level = id2Level[id];
      if (level <= MAX_ITEM_LEVEL && level >= MIN_ITEM_LEVEL) {
        _id2Level[id] = level;
        id2Item[id].level = level;
      }
    });
    await DB.setLevels(name, _id2Level);
    dispatch(setId2Item(id2Item));
  }
  op().then(() => {
    dispatch(setStatus(STATUS_FETCH_SUCCESS));
  }).catch((error) => {
    console.log(error);
    dispatch(setStatus(STATUS_FETCH_FAILED));
  })
}

export const increasePage = (
  dispatch: Function, name: string, page: number, totalPages: number): void => {
  const newPage = page < totalPages ? page + 1 : 1;
  DB.setPage(name, newPage).then(() => {
    dispatch(setPage(newPage));
  }).catch((error) => { console.log(error); })
};

export const decreasePage = (
  dispatch: Function, name: string, page: number, totalPages: number): void => {
  const newPage = page > 1 ? page - 1 : totalPages;
  DB.setPage(name, newPage).then(() => {
    dispatch(setPage(newPage));
  }).catch((error) => { console.log(error); })
}

export const changeLevel = (dispatch: Function, name: string, level: number): void => {
  DB.setLevel(name, level).then(() => {
    DB.setPage(name, 1).then(() => {
      dispatch(setLevel(level));
      dispatch(setPage(1));
      dispatch(updateItemLevels());
    }).catch((error) => { console.log(error); });
  }).catch((error) => { console.log(error); })
}

export const changeOrder = (dispatch: Function, name: string, order: OrderType): void => {
  DB.setOrder(name, order).then(() => {
    DB.setPage(name, 1).then(() => {
      dispatch(setOrder(order));
      dispatch(setSeed(String(Math.random())));
      dispatch(setPage(1));
      dispatch(updateItemLevels());
    }).catch((error) => { console.log(error); });
  }).catch((error) => { console.log(error); })
}

export const changePos = (dispatch: Function, name: string, pos: PosType): void => {
  DB.setPos(name, pos).then(() => {
    DB.setPage(name, 1).then(() => {
      dispatch(setPos(pos));
      dispatch(setPage(1));
      dispatch(updateItemLevels());
    }).catch((error) => { console.log(error); });
  }).catch((error) => { console.log(error); })
}

export const changeLang = (dispatch: Function, name: string, lang: LangType): void => {
  DB.setLang(name, lang).then(() => {
    dispatch(setLang(lang));
  })
}

export const toggleNewItemLevel = (dispatch: Function, name: string, id: string, item: ItemType): void => {
  const _level = item.newLevel ? item.newLevel : item.level;
  const __level = _level === MAX_ITEM_LEVEL ? MIN_ITEM_LEVEL : MAX_ITEM_LEVEL;
  DB.setItemLevel(name, id, __level).then(() => {
    dispatch(setNewItemLevel(id, __level));
  }).catch((error) => { console.log(error); })
}

export const getDownloadContent = async (name: string, lang: LangType) => {
  const id2Item = getId2Item(name, lang);
  const id2Level = await DB.getId2Level(name);
  Object.keys(id2Level).forEach((id) => {
    const level = id2Level[id];
    id2Item[id].level = level;
  });
  const rows = Object.keys(id2Item).map(
    (id) => [String(id), id2Item[id].source, id2Item[id].target, id2Item[id].pos, String(id2Item[id].level)]
  );
  const csvContent = "data:text/csv;charset=utf-8,"
    + "id,source,target,pos,level\n"
    + rows.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const currentdate = new Date();
  const datetime = "_"
    + currentdate.getFullYear()
    + (currentdate.getMonth() + 1)
    + currentdate.getDate();
  const fileName = name.replace(" ", "_") + datetime + ".csv"
  return { encodedUri, fileName };
}
