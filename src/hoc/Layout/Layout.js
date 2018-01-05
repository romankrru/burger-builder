import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
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
    this.setState(prevState => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));
  }

  render() {
    return (
      <Auxiliary>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          togggleSideDrawer={this.togggleSideDrawer}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
