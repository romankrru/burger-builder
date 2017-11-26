import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import styles from './Layout.css';

const Layout = (props) => {
  return (
    <Auxiliary>
      <div>Toolbar, SideDrawe, Backdrop</div>
      <main className={styles.Content}>
        {props.children}
      </main>
    </Auxiliary>
  );
};

export default Layout;