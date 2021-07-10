import { shallow } from "enzyme";
import App from "../App";

describe('Pruebas en el <App />', () => {
	
	test('Debe de mostrar correctamente el componente', () => {
		
		const wrapper = shallow(<App />)

		expect(wrapper).toMatchSnapshot();

	})
	

})
