import {
    JASO_ATAZA_MOTAK,
    JASO_DATU_MOTAK,
    JASO_AZTERKETAK,
    GEHITU_AZTERKETA,
    AZTERKETA_ALDATU,
    AZTERKETA_EZABATU,
    EZABATU_PROIEKTUKO_AZTERKETAK, LOGOUT_SUCCESS
} from './../actions/types';

const initialState = {
    atazaMotak: [],
    datuMotak: [],
    azterketak: []
}


export default function azterketa(state = initialState, action) {
    switch (action.type) {
        case JASO_ATAZA_MOTAK:
            return {...state, atazaMotak: action.payload};

        case JASO_DATU_MOTAK:
            return {...state, datuMotak: action.payload};


        case GEHITU_AZTERKETA:
            return {
                ...state,
                azterketak: [...state.azterketak, action.payload]
            }


        case JASO_AZTERKETAK:
            return {...state, azterketak: action.payload};


        case AZTERKETA_ALDATU:
            console.log(action.payload)
            return {
                ...state,
                azterketak: state.azterketak.map((azterketa) =>
                    azterketa.id === action.payload.id

                        ? Object.assign({}, azterketa, action.payload)
                        : azterketa
                )
            };
        case AZTERKETA_EZABATU:
            return {
                ...state,
                azterketak: state.azterketak.filter(azterketa => azterketa.id !== action.payload)
            };
        case EZABATU_PROIEKTUKO_AZTERKETAK:
            return {
                ...state,
                azterketak: state.azterketak.filter(azterketa => azterketa.proiektua !== action.payload)
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                azterketak: [],
            };
        default:
            return state;

    }

}
