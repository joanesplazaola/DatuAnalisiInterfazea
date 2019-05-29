import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import Header from './layout/Header'
import Dashboard from './proiektuak/Dashboard'
import Alerts from './layout/Alerts'
import {Provider} from 'react-redux';
import store from '../store';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Register from './accounts/Register';
import Login from './accounts/Login';
import PrivateRoute from './common/PrivateRoute'
import Fitxategiak from './proiektuak/Fitxategiak'
import {loadUser} from "../actions/auth";
import Grafikoak from "./proiektuak/Grafikoak";
import AzterketaForm from "./azterketa_form/AzterketaForm";
import Azterketak from "./azterketak/Azterketak";
import AzterketaEmaitza from "./emaitzak/AzterketaEmaitza";


const alertOptions = {
    timeout: 3000,
    position: 'top center'
};

function App(props) {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Router>
                    <>
                        <Header/>
                        <Alerts/>
                        <div className="container">
                            <Switch>
                                <PrivateRoute exact path="/" component={Dashboard}/>
                                <PrivateRoute exact path="/:id(\d+)" component={Fitxategiak}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                <PrivateRoute exact path="/grafikoak" component={Grafikoak}/>
                                <PrivateRoute exact path="/azterketaGehitu" component={AzterketaForm}/>
                                <PrivateRoute exact path="/azterketak" component={Azterketak}/>
                                <PrivateRoute exact path="/emaitza/:id(\d+)" component={AzterketaEmaitza}/>
                            </Switch>
                        </div>
                    </>
                </Router>
            </AlertProvider>
        </Provider>
    );

}

ReactDOM.render(<App/>, document.getElementById('app'));
