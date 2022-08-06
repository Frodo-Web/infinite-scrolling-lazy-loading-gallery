import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Images from './Images';
import Gifs from './Gifs';

const App = () => {

	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Images />} />
					<Route path="gifs" element={<Gifs />} />
				</Route>
			</Routes>
		</>
	)
};

export default App;

const Layout = () => {

	return (
		<>
			<Navbar />
			<Outlet />
		</>
	)
}