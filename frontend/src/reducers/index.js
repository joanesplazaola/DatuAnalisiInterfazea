import {combineReducers} from "redux";
import proiektuak from './proiektuak';
import errors from './errors';
import messages from './messages';
import auth from './auth'
import fitxategiak from './fitxategiak'
import grafikoak from './grafikoak';
import azterketa from './azterketa';

export default combineReducers({
    proiektuak,
    errors,
    messages,
    auth,
    fitxategiak,
    grafikoak,
    azterketa,

});
