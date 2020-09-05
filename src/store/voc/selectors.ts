import {
  PAGE_SIZE
} from './constants';
import { Id2Item, OrderType, PosType } from './types';
import { State } from './reducers';

const seedrandom = require('seedrandom');

const getSortedIds = (id2Item: Id2Item, order: OrderType, seed: string): string[] => {
  const ids: string[] = Object.keys(id2Item);
  switch (order) {
    case 'ORDER_ID_ASC':
      ids.sort((id1, id2) => {
        return Number(id1) - Number(id2)
      });
      break;
    case 'ORDER_ID_DESC':
      ids.sort((id1, id2) => {
        return Number(id2) - Number(id1)
      });
      break;
    case 'ORDER_TEXT_ASC':
      ids.sort((id1, id2) => {
        return id2Item[id1].source.toLowerCase() > id2Item[id2].source.toLowerCase() ? 1 : -1
      });
      break;
    case 'ORDER_TEXT_DESC':
      ids.sort((id1, id2) => {
        return id2Item[id1].source.toLowerCase() <= id2Item[id2].source.toLowerCase() ? 1 : -1
      });
      break;
    case 'ORDER_RANDOM':
      const rng = seedrandom(seed);
      ids.sort(() => rng() - 0.5);
      break;
  }
  return ids;
};

const getItemIds = (
  id2Item: Id2Item, level: number, pos: PosType, order: OrderType, seed: string): string[] => {
  const ids: string[] = getSortedIds(id2Item, order, seed)
    .filter((id) => level === 0 || level === id2Item[id].level)
    .filter((id) => pos === 'ALL' || pos === id2Item[id].pos);
  return ids;
}

export const getPageIds = (state: State): string[] => {
  const { id2Item, level, pos, page, order, seed } = state;
  const ids: string[] = getItemIds(id2Item, level, pos, order, seed);
  const start = (page - 1) * PAGE_SIZE;
  const end = page * PAGE_SIZE;
  return ids.slice(start, end);
}

export const getLength = (state: State): number => {
  const { id2Item, level, pos, order, seed } = state;
  const ids: string[] = getItemIds(id2Item, level, pos, order, seed);
  return ids.length;
}

export const getTotalPages = (state: State): number => {
  const length = getLength(state);
  const totalPages = Math.ceil(length / PAGE_SIZE);
  return totalPages;
}




