// React
import React from "react";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../store/App.store";
import { useDispatch } from "react-redux";
import { loadNote, removeNote } from "../../store/App.reducer";
// React Router
import { useNavigate } from "react-router-dom";
// Material UI
import {
	Box,
	Grid,
	Typography,
	Dialog,
	TextField,
	Button,
	DialogContent,
	DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
// Styles
import {
	outerBoxStyles,
	gridStyles,
	gridItemStyles,
	deleteIconStyles,
	addIconStyles,
	titleStyles,
	dialogStyles,
} from "./Dashboard.styles";

const Dashboard: React.FunctionComponent = () => {
	const user = useSelector((state: RootState) => state.AppReducer.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [newNote, setNewNote] = React.useState<boolean>(false);
	const [title, setTitle] = React.useState<string>("");

	const createNote = () => {
		fetch(`http://localhost:8080/api/v1/note/createNote/${user!._id}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title }),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status === 200) {
					dispatch(loadNote({ id: response.data.id, title, value: "" }));
				}
			});
	};

	const deleteNote = (id: string) => {
		console.log(user);
		fetch(`http://localhost:8080/api/v1/note/deleteNote/${user!._id}/${id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title }),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status === 200) {
					dispatch(removeNote(id));
				}
			});
	};

	const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	return user ? (
		<Box sx={outerBoxStyles}>
			<AddIcon
				sx={addIconStyles}
				onClick={() => {
					setNewNote(true);
				}}
			/>
			<Grid container spacing={2} sx={gridStyles}>
				{user.notes.map((note) => (
					<Grid
						item
						sx={gridItemStyles}
						xs={2}
						key={note.id}
						onClick={() => {
							navigate(`/note/${user._id}/${note.id}`);
						}}
					>
						<DeleteIcon
							sx={deleteIconStyles}
							onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
								event.stopPropagation();
								deleteNote(note.id);
							}}
						/>
						<Typography variant={"h5"} sx={titleStyles}>
							{note.title}
						</Typography>
						<div>...</div>
					</Grid>
				))}
			</Grid>
			<Dialog open={newNote} sx={dialogStyles}>
				<DialogContent>
					<TextField label="Title" onChange={handleChangeTitle} />
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setNewNote(false);
						}}
					>
						Cancel
					</Button>
					<Button
						onClick={() => {
							createNote();
							setNewNote(false);
						}}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	) : (
		<></>
	);
};

export default Dashboard;
