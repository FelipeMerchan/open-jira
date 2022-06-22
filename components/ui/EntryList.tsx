import { FC, useContext, useMemo, DragEvent } from "react";
import { List, Paper } from "@mui/material";

import { EntriesContext } from "../../context/entries";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./"

interface Props {
  status: EntryStatus;
}

export const EntryList:FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

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
    >
      <Paper sx={{
        height: 'calc(100vh - 180px)',
        overflow: 'scroll',
        backgroundColor: 'transparent',
        padding: '1px 5px',
      }}>
        <List sx={{ opacity: 1 }}>
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
