import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import View from './pages/View';
import Edit from './pages/Edit';
import Login from './pages/Login';
import Register from './pages/Register';
import { MyContext } from './pages/context';
import Create from './pages/Create';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<MyContext.Provider value={{
			baseEndPoint: 'http://localhost:5001'
		}}>
			<Router>
				<Routes>
					<Route index element={<Home />}></Route>
					<Route path="/view/:post_id" element={<View />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/edit/:post_id" element={<Edit />}></Route>
					<Route path="/create" element={<Create />}></Route>
					<Route path="/image.json" element={() => null}></Route>
					<Route path="*" element={<b>404</b>}></Route>
				</Routes>
			</Router>
		</MyContext.Provider>
	</React.StrictMode>
);
