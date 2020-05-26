import { getDataLayerSnippet, getGTMScript, getIframeSnippet } from './snippets'
import { ISendToGTM, ISetupGTM, ISnippetsParams } from 'models/GoogleTagManager'

/**
 * Function to setup the Google Tag Manager
 * @param params - The snippets params
 */
const setupGTM = (params: ISnippetsParams): ISetupGTM => {
  const getNoScript = (): HTMLElement => {
    const noScript = document.createElement('noscript')
    noScript.innerHTML = getIframeSnippet(params.id)
    return noScript
  }

  const getScript = (): HTMLElement => {
    const script = document.createElement('script')
    script.innerHTML = getGTMScript(params.dataLayerName, params.id)
    return script
  }

  const getDataLayerScript = (): HTMLElement => {
    const dataLayerScript = document.createElement('script')
    dataLayerScript.innerHTML = getDataLayerSnippet(params.dataLayer, params.dataLayerName)
    return dataLayerScript
  }

  return {
    getDataLayerScript,
    getNoScript,
    getScript
  }
}

/**
 * Function to init the GTM
 * @param dataLayer - The dataLayer
 * @param dataLayerName - The dataLayer name
 * @param events - The events to send on init
 * @param id - The ID of the GTM
 */
export const initGTM = ({ dataLayer, dataLayerName, id }: ISnippetsParams): void => {
  const gtm = setupGTM({
    dataLayer,
    dataLayerName,
    id
  })

  const dataLayerScript = gtm.getDataLayerScript()
  const script = gtm.getScript()
  const noScript = gtm.getNoScript()

  if (dataLayer) document.head.insertBefore(dataLayerScript, document.head.childNodes[0])
  document.head.insertBefore(script, dataLayer ? document.head.childNodes[0].nextSibling : document.head.childNodes[0])
  document.body.insertBefore(noScript, document.body.childNodes[0])
}

/**
 * Function to send the events to the GTM
 * @param dataLayerName - The dataLayer name
 * @param data - The data to push
 */
export const sendToGTM = ({ dataLayerName, data }: ISendToGTM): void => window[dataLayerName].push(data)
