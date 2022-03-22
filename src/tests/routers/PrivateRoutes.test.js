import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { PrivateRoutes } from "../../routers/PrivateRoutes";



jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de aqui</span>,
}));


describe('Pruebas en <PrivateRoutes />', () => { 

    Storage.prototype.setItem = jest.fn();

    test('should de mostarr el componente si esta autenticado y guardar en el localStorage', () => {

        const fakeContext = {
            user: {
                logged: true,
                name: 'Jose',
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={fakeContext}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoutes>
                        <h1>Private Component</h1>
                    </PrivateRoutes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.text()).toBe('Private Component');
        //expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
        expect(Storage.prototype.setItem).toHaveBeenCalledWith('lastPath', '/');

    });

    test('should bloquear el componente si no esta autenticado', () => { 

        const fakeContext = {
            user: {
                logged: false,
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={fakeContext}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoutes>
                        <h1>Private Component</h1>
                    </PrivateRoutes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.text()).toBe('Saliendo de aqui');

     })
 });