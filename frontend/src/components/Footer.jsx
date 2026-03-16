import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        @2026 Santiago Marquez Solis | <a href="https://www.santiagomarquezsolis.com" target="_blank" rel="noopener noreferrer" style={styles.link}>www.santiagomarquezsolis.com</a>
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    padding: '10px',
    backgroundColor: '#0f0f13',
    color: '#6272a4',
    textAlign: 'center',
    fontSize: '12px',
    borderTop: '1px solid #1c1c24',
    width: '100vw',
    boxSizing: 'border-box',
    fontFamily: "'Courier New', Courier, monospace",
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 5000,
  },
  text: {
    margin: 0,
  },
  link: {
    color: '#8be9fd',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default Footer;
