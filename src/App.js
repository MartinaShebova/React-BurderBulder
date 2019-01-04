import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
	render() {
		return (
			<Auxiliary>
				<Layout>
					<BurgerBuilder />
				</Layout>
			</Auxiliary>
		);
	}
}

export default App;
