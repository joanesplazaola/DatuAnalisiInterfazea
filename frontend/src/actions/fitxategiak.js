import axios from "axios";
import {tokenConfig, tokenConfigFile} from "./auth";
import {
    FITXATEGIA_GEHITU,
    HAUTATU_PROIEKTUA,
    EZABATU_FITXATEGIA,
} from "./types";
import {createMessage, returnErrors} from "./messages";

export const jasoFitxategiak = (id) => (dispatch) => {
    dispatch({
        type: HAUTATU_PROIEKTUA,
        payload: id
    })

};

export const gehituFitxategiak = (fitxategiak) => (dispatch, getState) => {
    const proiektuID = getState().fitxategiak.proiektua;
    const proiektua = getState().proiektuak.proiektuak.filter(p => p.id === proiektuID)[0]

    for (let fitxategia of fitxategiak) {

        let formData = new FormData();
        formData.append('fitxategia', fitxategia);
        formData.append('proiektua', proiektua.id);


        axios.post('/api/fitxategiak/', formData, tokenConfigFile(getState))
            .then(res => {
                dispatch({
                    type: FITXATEGIA_GEHITU,
                    payload: {'fitxategiak': res.data, 'id': proiektua.id}
                });

            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

    }
    dispatch(createMessage({fitxategiakGehitu: "Gehitu d(ir)a fitxategia(k)."}));

}


export const ezabatuFitxategiak = (id) => (dispatch, getState) => {
    axios.delete(`/api/fitxategiak/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({fitxategiaEzabatu: "Ezabatu egin da fitxategia."}));
            dispatch({type: EZABATU_FITXATEGIA, payload: id});

        })
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))
        });
}
