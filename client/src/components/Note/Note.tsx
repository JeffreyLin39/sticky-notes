// React
import React from "react";
// Material UI
import {
	Box,
	TextField,
	Dialog,
	DialogTitle,
	DialogActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
// Router
import { useNavigate, useParams } from "react-router-dom";
import { INote } from "../../store/App.reducer";
// Styles
import {
	arrowStyles,
	noteStyles,
	outerBoxStyles,
	headerStyles,
	titleStyles,
	textStyles,
	dialogStyles,
} from "./Notes.styles";
// Redux
import { useDispatch } from "react-redux";
import { updateNote } from "../../store/App.reducer";
const Note: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [note, setNote] = React.useState<INote | undefined>(undefined);
	const [title, setTitle] = React.useState<string>("");
	const [value, setValue] = React.useState<string>("");
	const [message, setMessage] = React.useState<string>("");
	const params = useParams();

	const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(event.target.value);
	};

	const handleSave = () => {
		fetch(
			`http://localhost:8080/api/v1/note/updateNote/${params.uid}/${params.id}`,
			{
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, value }),
			}
		).then((response) => {
			if (response.status === 200) {
				dispatch(updateNote({ id: params.id!, title, value }));
				setMessage("Saved");
			} else {
				setMessage("Error");
			}
		});
	};

	React.useEffect(() => {
		if (params) {
			fetch(`http://localhost:8080/api/v1/note/getNote/${params.id}`)
				.then((response) => response.json())
				.then((response) => {
					setTitle(response.data.title);
					setValue(response.data.value);
					setNote(response.data);
				})
				.catch((error: any | unknown) => {
					console.error(error);
				});
		}
	}, [params]);

	return note ? (
		<Box sx={outerBoxStyles}>
			<Dialog open={message.length > 0}>
				<DialogTitle sx={dialogStyles}>
					<span>{message}</span>{" "}
					<CloseIcon
						onClick={() => setMessage("")}
						sx={{ marginLeft: "2rem", cursor: "pointer" }}
					/>
				</DialogTitle>
			</Dialog>
			<Box sx={noteStyles}>
				<ArrowBackIcon
					onClick={() => {
						navigate("/");
					}}
					sx={arrowStyles}
				/>
				<Box sx={headerStyles}>
					<Box sx={titleStyles}>
						<TextField
							sx={textStyles}
							variant="standard"
							InputProps={{
								disableUnderline: true,
							}}
							value={title}
							onChange={handleChangeTitle}
						></TextField>
					</Box>
					<SaveIcon
						sx={{ marginRight: "20px", cursor: "pointer" }}
						onClick={handleSave}
					/>
				</Box>
				<Box sx={{ height: "90%", width: "100%" }}>
					<textarea
						value={value}
						onChange={handleChangeValue}
						style={{
							border: "none",
							resize: "none",
							background: "inherit",
							outline: "none",
							height: "100%",
							width: "100%",
							padding: "10px",
							fontSize: "1rem",
						}}
					></textarea>
				</Box>
			</Box>
		</Box>
	) : (
		<></>
	);
};

export default Note;
