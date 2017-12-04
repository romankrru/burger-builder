import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.css';

const Layout = (props) => {
  return (
    <Auxiliary>
      <Toolbar />
      <main className={styles.Content}>
        {props.children}
      </main>
    </Auxiliary>
  );
};

export default Layout;