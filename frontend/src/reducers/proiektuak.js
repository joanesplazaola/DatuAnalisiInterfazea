import {JASO_PROIEKTUAK, EZABATU_PROIEKTUA} from '../actions/types.js';
import {ADD_LEAD, FITXATEGIA_GEHITU, LOGOUT_SUCCESS, PROIEKTUA_ALDATU, EZABATU_FITXATEGIA} from "../actions/types";

const initialState = {
    proiektuak: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case JASO_PROIEKTUAK:
            return {
                ...state,
                proiektuak: action.payload
            };
        case  FITXATEGIA_GEHITU:

            return {
                ...state,
                proiektuak: state.proiektuak.map(
                    (proiektua) => proiektua.id === action.payload.id ? {
                            ...proiektua,
                            fitxategiak: [...proiektua.fitxategiak, action.payload.fitxategiak],
                        }
                        : proiektua
                )
            };


        case EZABATU_FITXATEGIA:

            return {
                ...state,
                proiektuak: state.proiektuak.map((proiektua) => {
                    return {...proiektua, fitxategiak: proiektua.fitxategiak.filter(f => f.id !== action.payload)}

                })

            };

        case EZABATU_PROIEKTUA:

            return {
                ...state,
                proiektuak: state.proiektuak.filter(proiektua => proiektua.id !== action.payload)
            };


        case PROIEKTUA_ALDATU:
            return {
                ...state,
                proiektuak: state.proiektuak.map((proiektua) =>
                    proiektua.id === action.payload.id

                        ? {...action.payload,}
                        : proiektua
                )
            };
        case ADD_LEAD:
            return {
                ...state,
                proiektuak: [...state.proiektuak, action.payload]
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                proiektuak: [],
            };
        default:
            return state;

    }

}
