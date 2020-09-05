import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Select from './Select';

//import {getLength} from '../../store/voc/selectors';
import { OrderType, PosType, LangType } from '../../store/voc/types';
import { changeLevel, changeOrder, changePos, changeLang } from '../../store/voc/operations';
import { State } from '../../store/voc/reducers';
import { getLevelLabel, getOrderLabel, getSupportedLangs, getLangLabel } from '../../store/voc/utils';


const Selects = () => {
  const level = useSelector<State, number>(state => state.level);
  const pos = useSelector<State, PosType>(state => state.pos);
  const order = useSelector<State, OrderType>(state => state.order);
  const lang = useSelector<State, LangType>(state => state.lang);
  const name = useSelector<State, string>(state => state.name);

  //const length = useSelector<State,number>(getLength);
  const dispatch = useDispatch();

  const styles = {
    root: {
      margin: '0 auto',
      padding: '0 auto'
    },
  };

  const levelSelectCallback = (value: number) => {
    changeLevel(dispatch, name, value);
  };

  const orderSelectCallback = (value: OrderType) => {
    changeOrder(dispatch, name, value);
  };

  const posSelectCallback = (value: PosType) => {
    changePos(dispatch, name, value);
  };

  const langSelectCallback = (value: LangType) => {
    changeLang(dispatch, name, value);
  };


  const levelOptions = [
    { value: 0, label: getLevelLabel(0) },
    { value: 2, label: getLevelLabel(2) },
    { value: 1, label: getLevelLabel(1) },
  ];

  const levelSelectDom = (
    <Select
      key={'level'}
      title={'state'}
      options={levelOptions}
      value={level}
      onChange={levelSelectCallback}
      zIndex={3} />
  );

  const posOptions = [
    { value: 'ALL', label: 'All' },
    { value: 'ADV', label: 'Adverb' },
    { value: 'ADJ', label: 'Adjective' },
    { value: 'NOUN', label: 'Noun' },
    { value: 'VERB', label: 'Verb' },
  ];

  const posSelectDom = (
    <Select
      key={'pos'}
      title={'parts of speech'}
      options={posOptions}
      value={pos}
      onChange={posSelectCallback}
      zIndex={3} />
  );

  const orderOptions = [
    { value: 'ORDER_ID_ASC', label: getOrderLabel('ORDER_ID_ASC') },
    { value: 'ORDER_ID_DESC', label: getOrderLabel('ORDER_ID_DESC') },
    { value: 'ORDER_TEXT_ASC', label: getOrderLabel('ORDER_TEXT_ASC') },
    { value: 'ORDER_TEXT_DESC', label: getOrderLabel('ORDER_TEXT_DESC') },
    { value: 'ORDER_RANDOM', label: getOrderLabel('ORDER_RANDOM') },
  ];

  const orderSelectDom = (
    <Select
      key={'order'}
      title={'order'}
      options={orderOptions}
      value={order}
      onChange={orderSelectCallback}
      zIndex={2} />
  );

  const langs = getSupportedLangs(name);
  // const langs: LangType[] = ["LANG_EN", "LANG_NL"];
  const langOptions = langs.map((lang) => {
    return { value: lang, label: getLangLabel(lang) }
  });

  const langSelectDom = (
    <Select
      key={'lang'}
      title={'translation'}
      options={langOptions}
      value={lang}
      onChange={langSelectCallback}
      zIndex={1}
    />
  )
  return (
    <div style={styles.root}>
      {levelSelectDom}
      {posSelectDom}
      {orderSelectDom}
      {langs.length > 0 ? langSelectDom : null}
      {/*<div><p>{length}</p></div>*/}
    </div>
  );
}

export default Selects;