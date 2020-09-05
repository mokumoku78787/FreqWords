import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

const styles = {
  root: {
    background: '#111',
    margin: '0 auto',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    color: 'white'
  },
  titleWrapper: {
    paddingTop: '66px',
    background: '#334',
    textAlign: 'center' as const,
    borderBottom: '1px solid #555',
  },
  title: {
    fontSize: 60,
    marginTop: '10%',
    marginBottom: '0'
  },
  titleCaption: {
    marginTop: '10px',
    fontSize: 24,
  },
  infoWrapper: {
    margin: '20px',
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'space-around' as const,
  },
  info: {
    margin: '5px',
    textAlign: 'center' as const
  },
  infoLink: {
    color: 'white',
    fontSize: 24
  },
  vocsWrapper: {
    height: '500px',
    marginTop: "10px",
    overflow: 'scroll',
    //textAlign: 'center' as const
  },
  vocs: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-around' as const,
  },
  voc: {
    background: '#333',
    textDecoration: 'none',
    color: 'white',
    padding: '20px',
    margin: '10px 20px',
    fontSize: 32,
    //borderRadius: '20px',
    textAlign: 'center' as const,
  }
}

const Home = () => {
  const vocsDom = (
    <div style={styles.vocs}>
      <Link to='voc/german' style={styles.voc}><p>German 10000</p></Link>
      <Link to='voc/french' style={styles.voc}><p>French 10000</p></Link>
      <Link to='voc/spanish' style={styles.voc}><p>Spanish 10000</p></Link>
    </div>
  );
  return (
    <div style={styles.root}>
      <Header />
      <div style={styles.titleWrapper}>
        <h1 style={styles.title}>FreqWords</h1>
        <p style={styles.titleCaption}>A minimalist vocabulary app</p>
        <div style={styles.infoWrapper}>
          <div style={styles.info}><Link to='/about' style={styles.infoLink}>About</Link></div>
          <div style={styles.info}><a href='https://forms.gle/onk6gmgB3UNfbsxx5' target="_blank" rel="noopener noreferrer" style={styles.infoLink}>Contact</a></div>
        </div>
      </div>
      <div style={styles.vocsWrapper}>
        {vocsDom}
      </div>
    </div>
  )
}

export default Home;