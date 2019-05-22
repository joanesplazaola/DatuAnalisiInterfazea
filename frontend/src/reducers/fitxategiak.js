import {HAUTATU_PROIEKTUA} from "../actions/types";

const initialState = {
    proiektua: null,
};

export default function (state = initialState, action) {

    switch (action.type) {
        case HAUTATU_PROIEKTUA:
            return {
                ...state,
                proiektua: action.payload

            };


        default:
            return state;

    }

}
