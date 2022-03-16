import React from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/authContext';

describe('Pruebas en AppRouter', () => { 

    

    test('should mostrar el login si no esta autenticado', () => {

        const contextValue = {
            user: {
                logged: false,
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />);
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login');

    });

    test('should mostrar el componente de Marvel si esta autenticado', () => {

        const contextValue = {
            user: {
                logged: true,
                name: 'Pepe'
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />);
            </AuthContext.Provider>
        );


        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBe(true);
        //expect(wrapper.find('.navbar').exists()).toBeTruthy();
        //expect(wrapper.find('h1').text().trim()).toBe('MarvelScreen');

    });

 });