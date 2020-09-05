import React from 'react';
import Header from './Header';

const styles = {
  root: {
    height: '100vh',
    color: 'white',
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  title: {
    margin: '20px',
    fontSize: 32,
    display: 'block'
    //fontWeight: 'normal' as const
  },
  paragraph: {
    margin: '20px',
    fontSize: 24
  },
  list: {
    margin: '20px 0'
  },
  blank: {
    height: '50px'
  },
  content: {
    flex: 1,
    background: '#334',
    paddingTop: '66px',
    overflow: 'scroll',
  }
}
const About = () => {
  return (
    <div style={styles.root}>
      <Header />
      <div style={styles.content}>
        <h1 style={styles.title}>About</h1>
        <p style={styles.paragraph}>
          freqwords is a simple vocabulary learning app.
        </p>
        <p style={styles.paragraph}>
          10,000 most frequent words and their English translations are listed for each language.
          Each list is designed to be a minimal collection of words required for effortlessly reading foreign newspaper articles.
        </p>
        {
          /*
          <p style={styles.paragraph}>
          Instead of dividing 10,000 words into smaller groups, I decided to put them all toghether in one list.
          One reason for this is managing several lists requires more mental efforts for a user.
          Another is that in terms of memory retention, it seems better to have long and shallow exposure to the vocabulary than short and concentrated one.
          </p>
          */
        }
        <p style={styles.paragraph}>
          Below are the main features:
        </p>
        <ul style={styles.paragraph}>
          <li style={styles.list}>Filtering: You can change which words are visible on the display based on parts of speech or the learning status of each word.</li>
          <li style={styles.list}>Sorting: You can sort words by various order options, or even shuffle them randomly.</li>
          <li style={styles.list}>Browser-based Saving: Your data is stored on the browser, and you don't need to create an account to save your learning progress.</li>
          <li style={styles.list}>Import and Export: By importing a file that was exported beforehand, you can recover the state of the vocabulary at the time of exporting.</li>
        </ul>
        <p style={styles.paragraph}>
          Users who use smartphones are recommended to add this app to the homescreen to use it like a native app.
        </p>
        <p style={styles.paragraph}>
          Currently German, French, and Spanish languages are supported, but I may consider adding other languages in the future.
          If you have questions, requests, or any opinions about freqwords, please contact me from <a href='https://forms.gle/onk6gmgB3UNfbsxx5' target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>here</a>.
        </p>
        <p style={styles.paragraph}>
          You can also follow me on <a href='https://twitter.com/b11tz' target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>Twitter</a> or join the discussion on <a href='https://www.reddit.com/r/German/comments/hv6mmf/i_made_a_web_app_for_learning_10000_most_frequent/' target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>reddit</a>.
        </p>
        <div style={styles.blank}></div>
      </div>
    </div>
  )
};

export default About;