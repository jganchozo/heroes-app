import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";


describe('Pruebas en DashboardRoutes', () => { 
    
    test('should mostrarse correctamente - Marvel', () => { 

        const context = {
            user: { 
                logged: true,
                name: 'Jose Manuel' 
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={context}>
                <MemoryRouter initialEntries={['/']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Jose Manuel');
        expect(wrapper.find('h1').text().trim()).toBe('MarvelScreen');
     });

     test('should mostrarse correctamente - DC', () => { 

        const context = {
            user: { 
                logged: true,
                name: 'Jose Manuel' 
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={context}>
                <MemoryRouter initialEntries={['/dc']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //console.log(wrapper.find('h1').text().trim());
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('DCScreen');
        
     });
 });