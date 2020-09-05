import { openDB, DBSchema, } from 'idb';
import { OrderType, Id2Level, PosType, LangType } from '../store/voc/types';


interface VocDB extends DBSchema {
  meta: {
    key: string,
    value: string | number | OrderType | PosType | LangType
  },
  levels: {
    value: {
      id: string,
      level: number
    };
    key: string,
    indexes: { 'by-id': string };
  }
}

interface ListDB extends DBSchema {
  vocList: {
    key: string,
    value: string
  }
}

const getListDB = async () => openDB<ListDB>('listDB', 1, {
  upgrade(db) {
    db.createObjectStore('vocList');
  }
});

const getDB = async (vocName: string) => openDB<VocDB>(vocName, 1, {
  upgrade(db) {
    db.createObjectStore('meta');
    const itemsStore = db.createObjectStore('levels', { keyPath: 'id' });
    itemsStore.createIndex('by-id', 'id');
  }
});

const exists = async (vocName: string): Promise<boolean> => {
  const listDB = await getListDB();
  const _vocName = await listDB.get('vocList', vocName);
  const tof = _vocName !== undefined;
  return Promise.resolve(tof);
}

const create = async (
  vocName: string, id2Level: Id2Level,
  order: OrderType, level: number, page: number,
  pos: PosType, lang: LangType, update: boolean
): Promise<string> => {
  const listDB = await getListDB();
  const _vocName = await listDB.get('vocList', vocName);
  if (_vocName !== undefined && update === false) {
    return Promise.resolve('specified voc already exists');
  }
  listDB.add('vocList', vocName, vocName);
  const db = await getDB(vocName);
  {
    // meta
    await db.add('meta', order, 'order');
    await db.add('meta', level, 'level');
    await db.add('meta', page, 'page');
    await db.add('meta', pos, 'pos');
    await db.add('meta', lang, 'lang');
    // items
    const tx = db.transaction('levels', 'readwrite');
    const promises: Promise<any>[] = Object.keys(id2Level).map((id) => {
      const level = id2Level[id];
      return tx.store.add({ id, level });
    });
    promises.push(tx.done);
    await Promise.all(promises);
  }
  return Promise.resolve('ok');
};

const getId2Level = async (vocName: string): Promise<Id2Level> => {
  const db = await getDB(vocName);
  const records = await db.getAllFromIndex('levels', 'by-id');
  const id2Level: Id2Level = {};
  records.forEach((record) => {
    const { id, level } = record;
    id2Level[id] = level;
  });
  return Promise.resolve(id2Level);
}

const setLevels = async (vocName: string, id2Level: Id2Level): Promise<string> => {
  const db = await getDB(vocName);
  const tx = db.transaction('levels', 'readwrite');
  const promises: Promise<any>[] = Object.keys(id2Level).map((id) => {
    const level = id2Level[id];
    return tx.store.put({ id, level });
  });
  promises.push(tx.done);
  await Promise.all(promises);
  return Promise.resolve('ok');
}

const getMeta = async (vocName: string): Promise<any> => {
  const db = await getDB(vocName);
  const order = await db.get('meta', 'order');
  const level = await db.get('meta', 'level');
  const page = await db.get('meta', 'page');
  const pos = await db.get('meta', 'pos');
  const lang = await db.get('meta', 'lang');
  const meta = { order, level, page, pos, lang };
  return Promise.resolve(meta);
}

const setItemLevel = async (
  vocName: string, id: string, level: number): Promise<string> => {
  if (!await exists(vocName)) {
    return Promise.resolve('specified voc does not exist');
  }
  const db = await getDB(vocName);
  await db.put('levels', { id, level });
  return Promise.resolve('ok');
};

const setOrder = async (
  vocName: string, order: OrderType): Promise<string> => {
  if (!await exists(vocName)) {
    return Promise.resolve('specified voc does not exist');
  }
  const db = await getDB(vocName);
  await db.put('meta', order, 'order');
  return Promise.resolve('ok');
}

const setLevel = async (
  vocName: string, level: number): Promise<string> => {
  if (!await exists(vocName)) {
    return Promise.resolve('specified voc does not exist');
  }
  const db = await getDB(vocName);
  await db.put('meta', level, 'level');
  return Promise.resolve('ok');
}

const setPage = async (
  vocName: string, page: number): Promise<string> => {
  if (!await exists(vocName)) {
    return Promise.resolve('specified voc does not exist');
  }
  const db = await getDB(vocName);
  await db.put('meta', page, 'page');
  return Promise.resolve('ok');
}

const setPos = async (
  vocName: string, pos: PosType): Promise<string> => {
  if (!await exists(vocName)) {
    return Promise.resolve('specified voc does not exist');
  }
  const db = await getDB(vocName);
  await db.put('meta', pos, 'pos');
  return Promise.resolve('ok');
}

const setLang = async (
  vocName: string, lang: LangType): Promise<string> => {
  if (!await exists(vocName)) {
    return Promise.resolve('specified voc does not exist');
  }
  const db = await getDB(vocName);
  await db.put('meta', lang, 'lang');
  return Promise.resolve('ok');
}

const DB = {
  create, getId2Level, getMeta, setItemLevel, setLevels,
  setOrder, setLevel, setPage, setPos, setLang,
  exists
}
export default DB;
