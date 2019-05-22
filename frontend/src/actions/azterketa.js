import axios from "axios";
import {
    GEHITU_AZTERKETA,
    JASO_ATAZA_MOTAK,
    JASO_AZTERKETAK,
    JASO_DATU_MOTAK,
    AZTERKETA_ALDATU,
    AZTERKETA_EZABATU
} from "./types";
import {createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


export const jasoAtazaMotak = () => (dispatch) => {
    axios.get('/api/atazamotak/',)
        .then(res => {
            dispatch({
                type: JASO_ATAZA_MOTAK,
                payload: res.data
            });

        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


export const jasoDatuMotak = () => (dispatch) => {
    axios.get('/api/datumotak/',)
        .then(res => {
            dispatch({
                type: JASO_DATU_MOTAK,
                payload: res.data
            });

        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const gehituAzterketa = (azterketa) => (dispatch, getState) => {
    axios.post('/api/azterketak/', azterketa, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({azterketaGehitu: "Azterketa baten konfigurazioa gorde da."}));

            dispatch({
                type: GEHITU_AZTERKETA,
                payload: res.data
            });

        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


export const jasoAzterketak = () => (dispatch, getState) => {
    axios.get('/api/azterketak/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: JASO_AZTERKETAK,
                payload: res.data
            });

        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const hasiAzterketa = (id, ws) => (dispatch, getState) => {

    ws.send(JSON.stringify({'token': getState().auth.token, 'id': id}));
    dispatch({
        type: AZTERKETA_ALDATU,
        payload: {'id': id, 'egoera': 'ZAIN'}
    })

};


export const ezabatuAzterketa = (id) => (dispatch, getState) => {

    axios.delete(`/api/azterketak/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({azterketaEzabatu: "Ezabatu egin da azterketa."}));

            dispatch({
                type: AZTERKETA_EZABATU,
                payload: id
            });

        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};


export const aldatuAzterketa = (data) => (dispatch) => {
    console.log(data)

    const newData = (({type, ...others}) => ({...others}))(JSON.parse(data));

    dispatch({
        type: AZTERKETA_ALDATU,
        payload: newData
    })

};
