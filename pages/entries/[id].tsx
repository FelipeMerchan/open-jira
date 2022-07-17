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
							title='Entrada:'
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
							/>
							<FormControl>
								<FormLabel>Estado: </FormLabel>
								<RadioGroup row>
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
				de la siguiente forma: */
				backgroundColor: 'error.dark'
			}}>
				<DeleteOutlinedIcon />
			</IconButton>
    </Layout>
  )
}

export default EntryPage;
