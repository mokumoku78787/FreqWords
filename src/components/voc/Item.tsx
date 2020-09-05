import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoDash, GoCheck } from "react-icons/go";
import { ItemType } from '../../store/voc/types';
import { toggleNewItemLevel } from '../../store/voc/operations';
import { State } from '../../store/voc/reducers';
import { MIN_ITEM_LEVEL } from '../../store/voc/constants';

interface ItemProps {
  id: string
}

const styles = {
  root: {
    display: 'flex',
    background: '#444',
    margin: '4px'
  },
  textWrapper: {
    flexGrow: 1,
    padding: '16px'
  },
  text: {
    fontSize: '16pt',
  },
  levelWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center' as const,
    alignItems: 'center',
    padding: '4px 8px'
  },
  levelText: {
    width: '60px',
    height: '24px',
    textAlign: 'center' as const,
    fontSize: '12pt',
  }
};

const Item = (props: ItemProps) => {
  const item = useSelector<State, ItemType>(state => state.id2Item[props.id]);
  const name = useSelector<State, string>(state => state.name);
  const dispatch = useDispatch();
  const onClick = () => {
    toggleNewItemLevel(dispatch, name, props.id, item);
  };
  const { source, target, level, newLevel } = item;
  //const levelLabel: string = newLevel ? getLevelLabel(newLevel) : getLevelLabel(level);
  const _level = newLevel ? newLevel : level;
  const icon = _level === MIN_ITEM_LEVEL ? <GoDash aria-label="Unchecked" /> : <GoCheck aria-label="Checked" />;
  return (
    <div style={styles.root}>
      <div style={styles.textWrapper}><p style={styles.text}>{source} - {target}</p></div>
      <div style={styles.levelWrapper}>
        <button onClick={onClick} style={{ color: 'white', fontSize: 28 }}>
          {icon}
        </button>
      </div>
    </div>
  )
}

export default Item;