import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { BsUpload, BsDownload } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { State } from '../../store/voc/reducers';
import { Id2Level, LangType } from '../../store/voc/types';
import { setVocFromUpload, getDownloadContent } from '../../store/voc/operations';

const styles = {
  root: {
    marginLeft: '24px',
    border: '1px solid white',
    padding: '8px',
    width: '103px',
    textAlign: 'center' as const
  },
  button: {
    fontSize: '20px',
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  icon: {
    verticalAlign: 'middle',
    marginRight: '8px'
  },
  text: {

  }
}

const Download = () => {
  const [encodedUri, setEncodedUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const linkRef = useRef(null);
  const name = useSelector<State, string>(state => state.name);
  const lang = useSelector<State, LangType>(state => state.lang);
  const linkDom = (
    <a
      ref={linkRef}
      style={{ display: 'hidden' }}
      href={encodedUri}
      download={fileName}>
    </a>);

  const onClick = () => {
    getDownloadContent(name, lang).then(
      (res) => {
        const { encodedUri, fileName } = res;
        setEncodedUrl(encodedUri);
        setFileName(fileName);
        const current = (linkRef.current! as any);
        current.click();
      }
    ).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div style={styles.root}>
      {linkDom}
      <span style={styles.button} onClick={onClick}>
        <span style={styles.icon}><BsDownload /></span>
        <span style={styles.text}>Export</span>
      </span>
    </div>
  );
}

const Upload = () => {
  const name = useSelector<State, string>(state => state.name);
  const lang = useSelector<State, LangType>(state => state.lang);
  const dispatch = useDispatch();
  const onChange = (event: any) => {
    const files = event?.target?.files;
    if (files !== null) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result);
        const rows = text.split("\n");
        const id2Level: Id2Level = {};
        const header = rows[0].split(",");
        if (header[0] !== 'id' || header[4] !== 'level') {
          return
        }
        rows.slice(1).forEach((row) => {
          const sp = row.split(",");
          if (sp.length !== 5) {
            return
          }
          const id = sp[0];
          const level = sp[4];
          id2Level[id] = Number(level);
        });
        setVocFromUpload(dispatch, name, lang, id2Level);
      }
      const file = files[0];
      reader.readAsText(file);
    }
  }
  return (
    <div style={styles.root}>
      <label htmlFor="csv-upload">
        <input id="csv-upload" type="file" name="file" accept=".csv" onChange={onChange} />
        <span style={styles.button} >
          <span style={styles.icon}><BsUpload /></span>
          <span style={styles.text}>Import</span>
        </span>
      </label>
    </div>
  )
}
export { Download, Upload };