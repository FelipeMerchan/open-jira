import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
}

interface Props {
  children: React.ReactNode;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
};

export const UIProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' });

  const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' });

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: 'UI - Set Is Adding Entry', payload: isAdding });
  };

  return (
    <UIContext.Provider value={{
      ...state,

      //Methods
      closeSideMenu,
      openSideMenu,

      setIsAddingEntry,
    }}>
      {children}
    </UIContext.Provider>
  )
};
