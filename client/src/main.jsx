import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import View from './pages/View';
import Edit from './pages/Edit';
import { MyContext } from './pages/context';
import Create from './pages/Create';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<MyContext.Provider value={{
			baseUrl: 'https://node-backend-ejif.onrender.com', baseEndPoint:
				'https://y65inptf23.execute-api.us-east-1.amazonaws.com/prod/'
		}}>
			<Router>
				<Routes>
					<Route index element={<Home />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/view/:post_id" element={<View />}></Route>
					<Route path="/edit/:post_id" element={<Edit />}></Route>
					<Route path="/create" element={<Create />}></Route>
					<Route path="*" element={<div>404</div>}></Route>
				</Routes>
			</Router>
		</MyContext.Provider>
	</React.StrictMode>
);
