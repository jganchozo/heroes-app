import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => { 

    

    test('should de retornar el estado por default', () => {

        const action = {};

        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({ logged: false });
    });

    test('should autenticar y colocar el name del usuario', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Jose Ganchozo',
            }
        };

        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({ logged: true, name: 'Jose Ganchozo' });
    });

    test('should borrar el name del usuario y el logged en false', () => {

        const action = {
            type: types.logout,
        };

        const state = authReducer({ logged: true, name: 'Jose Ganchozo' }, action);
        expect(state).toEqual({ logged: false });

    });

 });