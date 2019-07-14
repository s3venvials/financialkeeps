import React from 'react';
import Nav from './Nav';
import Header from './Head';
import Dashboard from './Dashboard';
import Footer from './Footer';

class App extends React.Component {

    render() {
        return (
            <div>
                <Nav />
                <div className="ui container" style={{ marginTop: '10px' }}>
                    <Header />
                    <br />
                    <br />
                    <Dashboard />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;