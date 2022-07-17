import { ChangeEvent, FC, useMemo, useState } from "react";
import { GetServerSideProps } from 'next';
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

import { dbEntries } from "../../database";
import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
	entry: Entry;
}

const EntryPage:FC<Props> = ({ entry }) => {
	console.log(entry);
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };
	const entry = await dbEntries.getEntryById(id);

	if (!entry) {
		return {
			redirect: {
				destination: '/',
				/* permanent le indica a los bots de los navegadores
				si una pagina va a funcionar o no nuevamente.
				Si lo dejamos como true se le indicaria a los bots de los navegadores
				que esta pagina, a la que se le hizo un redirect, jamas va
				a funcionar (que la borren de su indice); por otro lado, si
				dejamos el valor en false se le indica que la pagina va a seguir existiendo: */
				permanent: false,
			}
		}
	}

	return {
		props: {
			entry: entry.description
		}
	}
}

export default EntryPage;
