// React
import React from "react";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "./App.store";
// Router
import { useNavigate, useLocation } from "react-router-dom";

interface IAppProviderProps {}

const AppProvider: React.FunctionComponent<IAppProviderProps> = (
	props: React.PropsWithChildren<IAppProviderProps>
) => {
	const isLoggedIn = useSelector(
		(state: RootState) => state.AppReducer.isLoggedIn
	);
	const navigate = useNavigate();
	const location = useLocation();

	React.useEffect(() => {
		if (
			!isLoggedIn &&
			!(location.pathname === "/register" || location.pathname === "/login")
		) {
			navigate("/login");
		}
	}, [isLoggedIn, location.pathname, navigate]);

	return <>{props.children}</>;
};

export default AppProvider;
