import { FC, useContext, useMemo, DragEvent } from 'react';
import { List, Paper } from '@mui/material';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './'

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList:FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);
  const { isDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
  }

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  return (
    <div
      /* Para habilitar que voy a poder soltar algo que se encuentra
      onDrag en este div: */
      onDrop={onDropEntry}
      /* En combinación del onDrop debemos especificarle a este div
      si puede estar esperando que aquí dejen caer algo: */
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper sx={{
        height: 'calc(100vh - 180px)',
        overflow: 'scroll',
        backgroundColor: 'transparent',
        padding: '1px 5px',
      }}>
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'opacity .3s' }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={entry._id} entry={entry} />
            ))
          }
        </List>
      </Paper>
    </div>
  )
}
