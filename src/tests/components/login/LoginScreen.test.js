import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Pruebas en LoginScreen', () => {

    const context = {
        dispatch: jest.fn(),
        user: {
            logged: false,
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={context}>
            <MemoryRouter initialEntries={['/']}>
                <LoginScreen />
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('should hacer match con el snapshop', () => {

        expect(wrapper).toMatchSnapshot();

    });

    test('should  realizar el dispatch y la navegacion', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Jose Ganchozo',
            },
        }

        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect(context.dispatch).toHaveBeenCalledWith(action);
        expect(mockNavigate).toHaveBeenCalledWith('/marvel', { replace: true });

        localStorage.setItem('lastPath', '/dc');
        //wrapper.find('button').simulate('click');
        handleClick();
        
        expect(mockNavigate).toHaveBeenCalledWith('/dc', { replace: true });

    });
});