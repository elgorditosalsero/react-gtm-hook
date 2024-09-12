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
  /** The data layer object to be used */
  dataLayer?: Pick<IDataLayer, 'dataLayer'>['dataLayer']
  /** The name of the data layer variable */
  dataLayerName?: Pick<IDataLayer, 'dataLayerName'>['dataLayerName']
  /** Custom environment parameters */
  environment?: ICustomEnvironmentParams
  /** Nonce attribute for the script tag */
  nonce?: string
  /** Google Tag Manager container ID */
  id: string
  /** Whether to inject the GTM script. Defaults to true */
  injectScript?: boolean
  /** Custom domain for the GTM script. Defaults to https://www.googletagmanager.com */
  customDomain?: string
  /** Custom script name. Defaults to gtm.js */
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
