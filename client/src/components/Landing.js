import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class Landing extends Component {
    state = {
        redirect: false
      }
      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/dashboard' />
        }
      }

    render(){
        if (this.props.auth['username'] !== undefined) {
            return (
                <div style={{ textAlign: 'center', marginTop: '2em' }}>
                    <h1>Keeping Track of Finances Made Easy</h1>
                    <h4>So you can focus on the important things!</h4>
                    {this.renderRedirect()}
                    <button onClick={this.setRedirect} className="ui basic blue button">Manage Finances</button>
                </div>
            );
        } else {
            return (
                <div style={{ textAlign: 'center', marginTop: '2em' }}>
                    <h1>Keeping Track of Finances Made Easy</h1>
                    <h4>So you can focus on the important things!</h4>
    
                    <h3>Get started today!</h3>
    
                    <a href="/auth/google" className="ui google plus button">
                        <i className="google icon"></i> Login with Google
                    </a>
                </div>
            );
        }
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Landing);