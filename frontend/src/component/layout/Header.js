import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {logout} from "../../actions/auth";

function Header(props) {

    const {isAuthenticated, user} = props.auth;

    const authLinks = (
        <>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to="/azterketak" className="nav-link">Azterketak</Link>
                </li>
                <li className="nav-item">
                    <Link to="/azterketaGehitu" className="nav-link">Azterketa gehitu</Link>
                </li>
                <li className="nav-item">
                    <Link to="/grafikoak" className="nav-link">Grafikoak</Link>
                </li>
            </ul>


            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <span className="navbar-text mr-3">
                    <strong>
                        {user ? `Ongi etorri, ${user.username}!` : ""}
                    </strong>
                </span>

                <li className="nav-item">
                    <button className="nav-link btn btn-info btn-sm text-light" onClick={props.logout}>
                        Itxi saioa
                    </button>
                </li>

            </ul>
        </>

    );
    const guestLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Link to="/register" className="nav-link">Sortu kontua</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">Hasi saioa</Link>
            </li>
        </ul>
    );
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">Modelo sortzailea</a>

                    {isAuthenticated ? authLinks : guestLinks}

                </div>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps, {logout})(Header);

