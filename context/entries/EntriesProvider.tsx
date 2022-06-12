import { FC, useReducer } from 'react';
import { v4 as uuidv4, v4 } from 'uuid'
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Pendiente: Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'En progeso: Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description: 'Terminadas: Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};

export const EntriesProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id:  uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending'
    };

    dispatch({ type: '[Entry] Add-Entry', payload: newEntry });
  }

  return (
    <EntriesContext.Provider value={{
      ...state,

      // Methods
      addNewEntry,
    }}>
      {children}
    </EntriesContext.Provider>
  )
};
