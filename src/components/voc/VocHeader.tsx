import React, { useState } from 'react';
import { GoHome, GoSettings, GoX } from 'react-icons/go';
import Pager from './Pager';
import Selects from './Selects';
import { Download, Upload } from './IO';

interface SettingProps {
  open: boolean,
  setOpen: Function
};

const Settings = (props: SettingProps) => {
  const { open, setOpen } = props;
  const styles = {
    root: {
      width: '100%',
      maxWidth: '600px',
      zIndex: 1,
      position: 'fixed' as const,
      background: '#111',
      height: open ? '100%' : '0',
      overflowY: 'hidden' as const,
      transition: '0.2s'
    },
    header: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '12px 16px',
      borderBottom: '1px solid #444'
    },
    headerTitle: {
      color: 'white',
      fontSize: 24,
      textAlign: 'center' as const,
      flex: 1
    },
    button: {
      fontSize: 28,
      color: 'white'
    },
    selectsWrapper: {
      margin: '0 auto'
    },
    ioWrapper: {
      margin: '48px auto',
      display: 'flex',
    }
  }
  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <p style={styles.headerTitle}> Settings </p>
        <button onClick={() => setOpen(false)} style={styles.button}>
          <GoX aria-label="Close Settings" />
        </button>
      </div>
      <div style={styles.selectsWrapper}>
        <Selects />
      </div>
      <div style={styles.ioWrapper}>
        <Download />
        <Upload />
      </div>
    </div>
  );
}

const VocHeader = () => {
  const [open, setOpen] = useState(false);
  const styles = {
    root: {
      height: '64px',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      background: '#111'
    },
    home: {
      padding: '16px'
    },
    pagerWrapper: {
      padding: '6px 0',
      flex: 1
    },
    open: {
      padding: '16px'
    },
    button: {
      fontSize: 28,
      color: 'white'
    },
  }

  return (
    <div style={styles.root}>
      <Settings open={open} setOpen={setOpen} />
      <div style={styles.home}>
        <button onClick={() => document.location.href = '/'} style={styles.button}><GoHome aria-label="Home" /></button>
      </div>
      <div style={styles.pagerWrapper}><Pager /></div>
      <div style={styles.open}>
        <button onClick={() => setOpen(true)} style={styles.button}>
          <GoSettings aria-label="Open Settings" />
        </button>
      </div>
    </div>
  )
}

export default VocHeader;