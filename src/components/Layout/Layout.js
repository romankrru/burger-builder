import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import styles from './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  }

  hideSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  }

  togggleSideDrawer = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    });
  }

  render() {
    return (
      <Auxiliary>
        <Toolbar togggleSideDrawer={this.togggleSideDrawer} />
        <SideDrawer
          showSideDrawer={this.state.showSideDrawer}
          hideSideDrawerHandler={this.hideSideDrawerHandler}
        />
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Auxiliary>
    );
  }
}

export default Layout;