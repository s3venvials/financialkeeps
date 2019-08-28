import React from 'react';

const Landing = () => {
    return (
        <div>
            <h1>Keeping Track of Finances Made Easy</h1>

            <h3>Get started today!</h3>

            <a href="/auth/google" className="ui google plus button">
                <i className="google icon"></i> Login with Google
            </a>
        </div>
    )
}

export default Landing;