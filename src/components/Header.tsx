import React from 'react';
import { GoHome } from 'react-icons/go';


const Header = () => {
  const styles = {
    root: {
      height: '66px',
      display: 'flex',
      justifyContent: 'space-between',
      maxWidth: '600px',
      width: '100%',
      background: '#111',
      position: 'fixed' as const,
      top: 0
    },
    home: {
      padding: '16px'
    },
    button: {
      fontSize: 28,
      color: 'white'
    },
  }

  return (
    <div style={styles.root}>
      <div style={styles.home}>
        <button onClick={() => document.location.href = '/'} style={styles.button}><GoHome aria-label="Home" /></button>
      </div>
    </div>
  )
}

export default Header;