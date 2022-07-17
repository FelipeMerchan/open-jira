import { ChangeEvent, useMemo, useState } from "react";
import {
	Button,
	capitalize,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	Radio,
	RadioGroup,
	TextField
} from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { Layout } from "../../components/layouts";
import { EntryStatus } from "../../interfaces";

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage = () => {
	const [inputValue, setInputValue] = useState('');
	const [status, setStatus] = useState<EntryStatus>('pending');
	const [touched, setTouched] = useState(false);

	const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

	const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

	const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setStatus(event.target.value as EntryStatus);
	}

	const onSave = () => {
		console.log({ inputValue, status });
	}

  return (
    <Layout title='... ... ...'>
			<Grid
				container
				justifyContent='center'
				sx={{ marginTop: 2 }}
			>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title={`Entrada: ${inputValue}`}
							subheader={`Creada hace: ... minutos`}
						/>
						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder='Nueva entrada'
								autoFocus
								multiline
								label='Nueva entrada'
								value={inputValue}
								onBlur={() => setTouched(true)}
								onChange={onInputValueChange}
								helperText={isNotValid && 'Ingrese un valor'}
								error={isNotValid}
							/>
							<FormControl>
								<FormLabel>Estado: </FormLabel>
								<RadioGroup
									row
									value={status}
									onChange={onStatusChanged}
								>
									{
										validStatus.map(status => (
											<FormControlLabel
												key={status}
												value={status}
												control={<Radio />}
												label={capitalize(status)}
											/>
										))
									}
								</RadioGroup>
							</FormControl>
						</CardContent>
						<CardActions>
							<Button
								startIcon={<SaveOutlinedIcon />}
								variant='contained'
								fullWidth
								onClick={onSave}
								/* no usamos isNotValid aqui: inputValue.length
								porque no es necesario memorizar inputValue porque
								ya esta como el state de React y en teoria esta
								memorizado: */
								disabled={inputValue.length <= 0}
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
			<IconButton sx={{
				position: 'fixed',
				bottom: 30,
				right: 30,
				/* Para acceder a los valores del tema lo podemos hacer
				de la siguiente forma (solo posible cuando usamos la prop sx): */
				backgroundColor: 'error.dark'
			}}>
				<DeleteOutlinedIcon />
			</IconButton>
    </Layout>
  )
}

export default EntryPage;
