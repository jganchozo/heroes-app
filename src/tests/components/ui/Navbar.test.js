import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { Navbar } from "../../../components/ui/Navbar";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Pruebas en <Navbar />', () => {

    test('should mostrarse correctamente', () => {

        const context = {
            user: {
                name: 'Pedro'
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={context}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Pedro');

    });

    test('should de llamar el logout, llamar el navigate y el dispatch con los argumentos', () => {

        const localDispatch = jest.fn();

        const context = {
            user: {
                name: 'Pedro',
                logged: true,
            },
            dispatch: localDispatch,
        };

        const wrapper = mount(
            <AuthContext.Provider value={context}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        wrapper.find('button').prop('onClick')();
        expect(localDispatch).toHaveBeenCalledWith({ "type": "[auth] Logout" });

    });

});