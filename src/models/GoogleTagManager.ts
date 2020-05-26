/**
 * The shape of the dataLayer
 */
export type IDataLayer = {
  dataLayer: Object | undefined
  dataLayerName: string
}

/**
 * The shape of the GTM Snippets
 */
export type ISnippets = {
  gtmDataLayer: string
  gtmIframe: string
  gtmScript: string
}

/**
 * The shape of the GTM Snippets params
 */
export type ISnippetsParams = {
  dataLayer?: Pick<IDataLayer, 'dataLayer'>['dataLayer']
  dataLayerName?: Pick<IDataLayer, 'dataLayerName'>['dataLayerName']
  id: string
}

/**
 * The shape of the setupGTM function
 */
export type ISetupGTM = {
  getDataLayerScript(): HTMLElement
  getNoScript(): HTMLElement
  getScript(): HTMLElement
}

/**
 * The shape of the sendToGtm function
 */
export type ISendToGTM = {
  dataLayerName: string
  data: Object
}
