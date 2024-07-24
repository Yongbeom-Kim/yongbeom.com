import { useReducer } from 'react'

export enum AppState {
  CONTROL_MENU,
  THREE,
}

export enum AppStateActions {
  CHOSE_CONTROL_MENU,
}

const appStateReducer: (
  state: AppState,
  action: AppStateActions
) => AppState = (state, action) => {
  if (state !== AppState.CONTROL_MENU) {
    throw new Error(`Invalid state for action ${action}`)
  }
  switch (action) {
    case AppStateActions.CHOSE_CONTROL_MENU:
      return AppState.THREE
    default:
      throw new Error(`Invalid action ${action}`)
  }
}

export const useAppState = () => {
  const [state, dispatch] = useReducer(appStateReducer, AppState.CONTROL_MENU)
  const controlsChosenDispatch = () =>
    dispatch(AppStateActions.CHOSE_CONTROL_MENU)
  return { state, controlsChosenDispatch }
}
