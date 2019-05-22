import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {login} from "../../actions/auth";


function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        props.login(username, password);
    };

    if (props.isAuthenticated) {
        return <Redirect to='/'/>
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">Hasi saioa</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Erabiltzailea</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                        />
                    </div>


                    <div className="form-group">
                        <label>Pasahitza</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>


                    <div className="form-group">
                        <button className="btn btn-primary btn-md" onSubmit={onSubmit}>Hasi saioa</button>

                    </div>
                    <p>Ez duzu konturik? <Link to="/register">Sortu kontu berria</Link></p>

                </form>
            </div>

        </div>
    );

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
