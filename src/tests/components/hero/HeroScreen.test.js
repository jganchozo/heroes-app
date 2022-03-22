import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/hero/HeroScreen";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Pruebas en <HeroScreen />', () => { 
    
    test('should not mostrar HeroScreen si no hay un heroe en el url', () => { 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page');
        
     });

    test('should mostrar un heroe si existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:id" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);

    });

    test('should de regresar a la pantalla anterior', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:id" element={<HeroScreen />} />
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(mockNavigate).toHaveBeenCalledWith(-1);

    });

    test('should mostrar No Hero Page si no tenemos un heroe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spideros']}>
                <Routes>
                    <Route path="/hero/:id" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('No Hero Page');

    });

 });