import React from 'react';

import Logo from '../../Logo/Logo';
import NavItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';
import styles from './SideDrawer.css';

const SideDrawer = (props) => {
  let attachedClasses = [styles.SideDrawer, styles.Close];

  if (props.showSideDrawer) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }

  return (
    <Aux>
      <Backdrop
        show={props.showSideDrawer}
        onClick={props.hideSideDrawerHandler}
      />
      <div className={attachedClasses.join(' ')}>
        <Logo style={{ height: '11%', marginBottom: '40px' }} />
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;