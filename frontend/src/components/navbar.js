/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Nav, NavDropdown  } from 'react-bootstrap';

import { connect } from 'react-redux';
import { getUser } from '../../Reducer/rootReducer';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }


    


    render() {
        const userLink = (
            <Nav className="mr-auto" id="mainNavbar" >
                <NavDropdown title="Menu" className="nav-dropdown"> 
                    <NavDropdown.Item href="/profile">Profil Utilisateur <ion-icon name="person"></ion-icon></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/events">Liste des évènements <ion-icon name="list"></ion-icon></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/addevent">Créer un évènement <ion-icon name="add-circle-outline"></ion-icon></NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" onClick={this.logOut}>
                    <img alt="Logo"
                        src={require('../img/logout.jpg')}
                        width="80"/>
                </Nav.Link>
            </Nav>
        );
        const loginRegLink = (
            <ul id="flex-container" className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/login" className="nav-link typologinregister">Login</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/register" className="nav-link typologinregister">Register</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/register" className="nav-link typologinregister">Register</Link>
                </li>
            </ul>
        );
        return (
            <nav id="navContainer" className="navbar navbar-expand-lg navbar-light bg-light flexnav">
                <Link to="/" className="navbar-brand">
                    <img alt="Sportevent"
                        src={require('../img/sportevent.jpg')}
                        width="230"

                        // height="30"
                        className="d-inline-block align-top"
                        id="homeLogo"
                    />
                </Link>

                <Link to="/" className="navbar-brand" style={{margin : "0 auto"}}>
                    <img alt="Logo"

                        src={require('../img/logo.jpg')}
                        width="60"
                    />
                </Link>


                <ul className="nav navbar-nav">
                    {localStorage.usertoken ? userLink : loginRegLink}
                </ul>
               
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        user: state.user
    }
}

// const mapDispatchToProps = function(dispatch) {
//     return {
//         user_login: (user) => { dispatch(user_login_action(user)) }
//     }
// }

export default connect(mapStateToProps, 
    //mapDispatchToProps
    )(Navbar)

