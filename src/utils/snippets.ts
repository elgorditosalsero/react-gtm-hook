import { IDataLayer, ISnippets, ISnippetsParams } from 'models/GoogleTagManager'

/**
 * Function to get and set dataLayer
 * @param dataLayer - The dataLayer
 * @param dataLayerName - The dataLayer name
 */
export const getDataLayerSnippet = (
  dataLayer: Pick<IDataLayer, 'dataLayer'>['dataLayer'],
  dataLayerName: Pick<IDataLayer, 'dataLayerName'>['dataLayerName'] = 'dataLayer'
): Pick<ISnippets, 'gtmDataLayer'>['gtmDataLayer'] =>
  `window.${dataLayerName} = window.${dataLayerName} || []; window.${dataLayerName}.push(${JSON.stringify(dataLayer)})`

/**
 * Function to get the Iframe snippet
 * @param environment - The parameters to use a custom environment
 * @param id - The id of the container
 */
export const getIframeSnippet = (
  id: Pick<ISnippetsParams, 'id'>['id'],
  environment?: Pick<ISnippetsParams, 'environment'>['environment']
) => {
  let params = ``
  if (environment) {
    const { gtm_auth, gtm_preview } = environment
    params = `&gtm_auth=${gtm_auth}&gtm_preview=${gtm_preview}&gtm_cookies_win=x`
  }
  return `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}${params}" height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`
}

/**
 * Function to get the GTM script
 * @param dataLayerName - The name of the dataLayer
 * @param environment - The parameters to use a custom environment
 * @param id - The id of the container
 */
export const getGTMScript = (
  dataLayerName: Pick<ISnippetsParams, 'dataLayerName'>['dataLayerName'],
  id: Pick<ISnippetsParams, 'id'>['id'],
  environment?: Pick<ISnippetsParams, 'environment'>['environment']
) => {
  let params = ``
  if (environment) {
    const { gtm_auth, gtm_preview } = environment
    params = `+"&gtm_auth=${gtm_auth}&gtm_preview=${gtm_preview}&gtm_cookies_win=x"`
  }
  return `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl${params};f.parentNode.insertBefore(j,f);
    })(window,document,'script','${dataLayerName}','${id}');
  `
}
