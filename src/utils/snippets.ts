import { IDataLayer, ISnippets, ISnippetsParams } from 'models/GoogleTagManager'

/**
 * Function to get and set dataLayer
 * @param dataLayer - The dataLayer
 * @param dataLayerName - The dataLayer name
 */
export const getDataLayerSnippet = (
  dataLayer: Pick<IDataLayer, 'dataLayer'>['dataLayer'],
  dataLayerName?: Pick<IDataLayer, 'dataLayerName'>['dataLayerName']
): Pick<ISnippets, 'gtmDataLayer'>['gtmDataLayer'] =>
  typeof dataLayer === 'undefined' ? 'dataLayer = []' : `${dataLayerName} = [${JSON.stringify(dataLayer)}]`

/**
 * Function to get the Iframe snippet
 * @param id - The id of the container
 */
export const getIframeSnippet = (id: Pick<ISnippetsParams, 'id'>['id']) =>
  `
    <iframe src="https://www.googletagmanager.com/ns.html?id=${id}$&gtm_cookies_win=x" 
        height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>
  `

/**
 * Function to get the GTM script
 * @param dataLayerName - The name of the dataLayer
 * @param id - The id of the container
 */
export const getGTMScript = (
  dataLayerName: Pick<ISnippetsParams, 'dataLayerName'>['dataLayerName'],
  id: Pick<ISnippetsParams, 'id'>['id']
) =>
  `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','${dataLayerName}','${id}');
  `
