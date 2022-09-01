// React
import React from "react";
// Material UI
import { Box, Typography, TextField, Button } from "@mui/material";
// Styles
import {
	outerBoxStyles,
	innerboxStyles,
	inputStyles,
	labelStyles,
	buttonStyles,
	registerStyles,
} from "./Login.styles";
// Redux
import { useDispatch } from "react-redux";
import { loadLogin, loadUser } from "../../store/App.reducer";
// Router
import { useNavigate } from "react-router-dom";
const Login: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [username, setUsername] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");
	const [error, setError] = React.useState<boolean>(false);

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
		setError(false);
	};
	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		setError(false);
	};

	const handleLogin = () => {
		fetch("http://localhost:8080/api/v1/auth/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: username, password }),
		})
			.then((response: any) => {
				if (response.status === 200) {
					dispatch(loadLogin(true));
					return response.json();
				} else {
					setError(true);
				}
			})
			.then((response) => {
				dispatch(loadUser(response.data.user));
				navigate("/");
			})
			.catch((error: any | unknown) => {
				setError(true);
				console.error(error);
			});
	};

	return (
		<Box sx={outerBoxStyles}>
			<Box sx={innerboxStyles}>
				<Typography variant={"h3"} sx={labelStyles}>
					Login
				</Typography>
				<TextField
					label={"username"}
					sx={inputStyles}
					value={username}
					error={error}
					onChange={handleUsernameChange}
				/>
				<TextField
					label={"password"}
					type="password"
					sx={inputStyles}
					value={password}
					error={error}
					onChange={handlePasswordChange}
				/>
				<Button
					sx={buttonStyles}
					onClick={handleLogin}
					disabled={username.length === 0 || password.length === 0 || error}
				>
					Login
				</Button>
				<Typography
					variant={"h5"}
					sx={registerStyles}
					onClick={() => {
						navigate("/register");
					}}
				>
					Register
				</Typography>
			</Box>
		</Box>
	);
};

export default Login;
