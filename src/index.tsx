import React, { Context, ReactNode, createContext, useEffect, useContext, useReducer } from 'react'

import { ISendToGTM, ISnippetsParams } from './models/GoogleTagManager'
import { initGTM, sendToGTM } from './utils/GoogleTagManager'

declare global {
  interface Window {
    dataLayer: Object | undefined
    [key: string]: any
  }
}

/**
 * The shape of the context provider
 */
type GTMHookProviderProps = { state?: ISnippetsParams; children: ReactNode }

/**
 * The shape of the hook
 */
export type IUseGTM = {
  UseGTMHookProvider: ({ children }: GTMHookProviderProps) => JSX.Element
  GTMContext: Context<ISnippetsParams | undefined>
}

/**
 * The initial state
 */
export const initialState: ISnippetsParams = {
  dataLayer: undefined,
  dataLayerName: 'dataLayer',
  environment: undefined,
  nonce: undefined,
  id: '',
  injectScript: true
}

/**
 * The context
 */
export const GTMContext = createContext<ISnippetsParams | undefined>(initialState)
export const GTMContextDispatch = createContext<((data: ISendToGTM['data']) => void) | undefined>(undefined)

function dataReducer(state: ISnippetsParams, data: any) {
  sendToGTM({ data, dataLayerName: state?.dataLayerName! })
  return state
}

/**
 * The Google Tag Manager Provider
 */
function GTMProvider({ state, children }: GTMHookProviderProps): JSX.Element {
  const [store, dispatch] = useReducer(dataReducer, { ...initialState, ...state })

  useEffect(() => {
    if (!state || state.injectScript == false) return
    const mergedState = { ...store, ...state }

    initGTM(mergedState)
  }, [JSON.stringify(state)])

  return (
    <GTMContext.Provider value={store}>
      <GTMContextDispatch.Provider value={dispatch}>{children}</GTMContextDispatch.Provider>
    </GTMContext.Provider>
  )
}

function useGTMDispatch() {
  const context = useContext(GTMContextDispatch)
  if (context === undefined) {
    throw new Error('dispatchGTMEvent must be used within a GTMProvider')
  }

  return context
}

export { GTMProvider, useGTMDispatch, sendToGTM }
