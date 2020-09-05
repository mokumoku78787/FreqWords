import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { getTotalPages } from '../../store/voc/selectors';
import { increasePage, decreasePage } from '../../store/voc/operations';
import { State } from '../../store/voc/reducers';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '8px',
    paddingBottom: '8px'
  },
  pageText: {
    fontSize: 24,
    height: '32px',
    width: '90px',
    textAlign: 'center' as const
  },
  button: {
    color: 'white',
    fontSize: 32
  }
}
const Pager = () => {
  const page = useSelector<State, number>(state => state.page);
  const totalPages = useSelector<State, number>(getTotalPages);
  const name = useSelector<State, string>(state => state.name);
  const dispatch = useDispatch();
  const onClickNext = () => {
    increasePage(dispatch, name, page, totalPages);
  };
  const onClickPrev = () => {
    decreasePage(dispatch, name, page, totalPages);
  };
  if (totalPages === 0) {
    return <div style={styles.root}></div>;
  }
  /*
  if (order === 'ORDER_RANDOM') {
    return <div style={styles.root}>
      <button onClick={onClickNext} style={styles.button}>
        <GoSync/>
      </button>
    </div>
  }*/
  return (
    <div style={styles.root}>
      <button onClick={onClickPrev} style={styles.button}><GoChevronLeft aria-label="Previous Page" /></button>
      <p style={styles.pageText}>{page}/{totalPages}</p>
      <button onClick={onClickNext} style={styles.button}><GoChevronRight aria-label="Next Page" /></button>
    </div>
  );
}

export default Pager;