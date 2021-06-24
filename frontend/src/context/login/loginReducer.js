import { LOGIN } from "../types";

export const login = user => {
    return{
        type: LOGIN,
        payload: user // user probably needs to be created and it needs to have a username and password attached to it.
    };
};