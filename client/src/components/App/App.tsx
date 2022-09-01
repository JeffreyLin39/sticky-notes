// React
import React from "react";
// Router
import { Routes, Route } from "react-router-dom";
// Components
import Dashboard from "../Dashboard";
import Login from "../Login";
import Note from "../Note";
import Register from "../Register";
// Context
import AppProvider from "../../store/App.provider";

const App: React.FunctionComponent = () => {
	return (
		<AppProvider>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/note/:id" element={<Note />} />
			</Routes>
		</AppProvider>
	);
};

export default App;
