import { DragEvent, FC, useContext } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'

import { useRouter } from 'next/router';

import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces'

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const router = useRouter();

  const { startDragging, endDragging } = useContext(UIContext)
  const onDragStart = (event: DragEvent) => {
    /* Permite establecer un dato, solo de tipo string, para transferir: */
    event.dataTransfer.setData('text', entry._id)
    startDragging();
  }

  /* Se lanza cuando el evento drag termine: */
  const onDragEnd = () => {
    endDragging();
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  }

  return (
    <Card
      onClick={onClick}
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
