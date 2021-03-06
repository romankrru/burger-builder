import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';


const withErrorHandler = (WrappedComponent, axios) => class extends React.Component {
    state = {
      error: null,
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({
          error: null,
        });

        return req;
      }, () => {
        this.setState({
          error: null,
        });
      });


      this.resInterceptor = axios.interceptors.response.use(res => res, (err) => {
        this.setState({
          error: err,
        });
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    backdropClick = () => {
      this.setState({
        error: null,
      });
    }

    render() {
      return (
        <Aux>
          <Modal
            show={!!this.state.error}
            backdropClick={this.backdropClick}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
};

export default withErrorHandler;
