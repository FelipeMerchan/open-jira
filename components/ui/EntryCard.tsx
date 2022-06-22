import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { DragEvent, FC } from "react";
import { Entry } from "../../interfaces"

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const onDragStart = (event: DragEvent) => {
    /* Permite establecer un dato, solo de tipo string, para transferir: */
    event.dataTransfer.setData('text', entry._id)
    // Todo: modificar el estado para indicar que estoy haciendo drag
  }

  /* Se lanza cuando el evento drag termine: */
  const onDragEnd = () => {
    // Todo: cancelar el drag
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      /* Especifica si un elemento es draggable o no */
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>
            Hace 30 minutos
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
