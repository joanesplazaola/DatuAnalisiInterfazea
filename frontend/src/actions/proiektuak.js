import axios from 'axios';
import {createMessage, returnErrors} from "./messages";
import {JASO_PROIEKTUAK, EZABATU_PROIEKTUA, ADD_LEAD, PROIEKTUA_ALDATU, EZABATU_PROIEKTUKO_AZTERKETAK} from "./types";
import {tokenConfig} from "./auth";

export const jasoProiektuak = () => (dispatch, getState) => {
    axios.get('/api/proiektuak/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: JASO_PROIEKTUAK,
                payload: res.data
            });

        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const ezabatuProiektua = (id) => (dispatch, getState) => {
    axios.delete(`/api/proiektuak/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({deleteLead: "Ezabatu egin da proiektua."}));
            dispatch({
                type: EZABATU_PROIEKTUA,
                payload: id
            });
            dispatch({
                type: EZABATU_PROIEKTUKO_AZTERKETAK,
                payload: id
            });

        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const gehituProiektua = (lead) => (dispatch, getState) => {
    axios.post('/api/proiektuak/', lead, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addLead: "Proiektu bat gehitu da."}));

            dispatch({
                type: ADD_LEAD,
                payload: res.data
            });

        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}


export const gehituTargeta = (targets, selectedTarget) => (dispatch, getState) => {

    const proiektuID = getState().fitxategiak.proiektua;
    const proiektua = getState().proiektuak.proiektuak.filter(p => p.id === proiektuID)[0]
    proiektua.target = selectedTarget;
    // proiektua.targets = JSON.stringify(targets);

    axios.put(`/api/proiektuak/${proiektua.id}/`, proiektua, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({proiektuaAldatu: "Proiektu bat aldatu da."}));

            dispatch({
                type: PROIEKTUA_ALDATU,
                payload: res.data
            });

        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}

