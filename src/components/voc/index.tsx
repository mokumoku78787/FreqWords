import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPageIds } from '../../store/voc/selectors';
import { StatusType, OrderType, PosType, LangType } from '../../store/voc/types';
import { STATUS_FETCHING } from '../../store/voc/constants';
import { State } from '../../store/voc/reducers';
import { fetchVoc } from '../../store/voc/operations';

import Item from './Item';
import VocHeader from './VocHeader';

interface VocProps {
  name: string
};

const styles = {
  root: {
    margin: '0 auto',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100vh',
    background: '#111',
    color: 'white'
  },
  messageWrapper: {
    textAlign: 'center' as const,
    background: '#444',
    height: '100%'
  },
  message: {
    marginTop: '50%',
    fontSize: '28px'
  },
  itemsWrapper: {
    flex: 11,
    overflow: 'scroll'
  },
}
const Voc = (props: VocProps) => {
  const pageIds = useSelector<State, string[]>(getPageIds);
  const status = useSelector<State, StatusType>(state => state.status);
  const order = useSelector<State, OrderType>(state => state.order);
  const level = useSelector<State, number>(state => state.level);
  const pos = useSelector<State, PosType>(state => state.pos);
  const lang = useSelector<State, LangType>(state => state.lang);
  const ref = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    // fetch id2item operation
    fetchVoc(dispatch, props.name, lang);
    console.log("fetched");
  }, [dispatch, props.name, lang]);

  const pagaIdsSignature: string = pageIds.join();
  useEffect(() => {
    if (ref.current !== null) {
      (ref.current! as any).scrollTo(0, 1);
    }
  }, [pagaIdsSignature, level, order, pos]);

  const loadingDom = (
    <div style={styles.root}>
      <VocHeader />
      <div style={styles.messageWrapper}>
        <p style={styles.message}>Loading...</p>
      </div>
    </div>);

  if (status === STATUS_FETCHING) {
    return loadingDom;
  }
  const emptyDom = (
    <div style={styles.messageWrapper}>
      <p style={styles.message}>Wow, such empty</p>
    </div>);

  const itemsDom = pageIds.map((id) => <Item id={id} key={id} />);
  return (
    <div style={styles.root}>
      <VocHeader />
      {
        pageIds.length === 0 ? emptyDom
          : <div style={styles.itemsWrapper} ref={ref}>{itemsDom}</div>
      }
    </div>
  );
}

export default Voc;