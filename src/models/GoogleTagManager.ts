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
 * The variables required to use a GTM custom environment
 */
export type ICustomEnvironmentParams = {
  /**
   * For the `gtm_auth` parameter.
   */
  gtm_auth: string

  /**
   * For the `gtm_preview` parameter.
   */
  gtm_preview: string
}

/**
 * The shape of the GTM Snippets params
 */
export type ISnippetsParams = {
  dataLayer?: Pick<IDataLayer, 'dataLayer'>['dataLayer']
  dataLayerName?: Pick<IDataLayer, 'dataLayerName'>['dataLayerName']
  environment?: ICustomEnvironmentParams
  nonce?: string
  id: string
  injectScript?: boolean
  /** Defaults to https://www.googletagmanager.com */
  customDomain?: string
  /** Defaults to gtm.js */
  customScriptName?: string
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
  data: object
}
