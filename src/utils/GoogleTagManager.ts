import { getDataLayerSnippet, getGTMScript, getIframeSnippet } from './snippets'
import { ISendToGTM, ISetupGTM, ISnippetsParams } from '../models/GoogleTagManager'

/**
 * Function to setup the Google Tag Manager
 * @param params - The snippets params
 */
const setupGTM = (params: ISnippetsParams): ISetupGTM => {
  const getDataLayerScript = (): HTMLElement => {
    const dataLayerScript = document.createElement('script')
    if (params.nonce) {
      dataLayerScript.setAttribute('nonce', params.nonce)
    }
    dataLayerScript.innerHTML = getDataLayerSnippet(params.dataLayer, params.dataLayerName)
    return dataLayerScript
  }

  const getNoScript = (): HTMLElement => {
    const noScript = document.createElement('noscript')
    noScript.innerHTML = getIframeSnippet(params.id, params.environment, params.customDomain)
    return noScript
  }

  const getScript = (): HTMLElement => {
    const script = document.createElement('script')
    if (params.nonce) {
      script.setAttribute('nonce', params.nonce)
    }
    script.innerHTML = getGTMScript(
      params.dataLayerName,
      params.id,
      params.environment,
      params.customDomain,
      params.customScriptName
    )
    return script
  }

  return {
    getDataLayerScript,
    getNoScript,
    getScript
  }
}

/**
 * Function to init the GTM
 * @param config - The shape of the GTM Snippets params
 */
export const initGTM = (config: ISnippetsParams): void => {
  const gtm = setupGTM(config)

  const insertScripts = (doc: Document) => {
    try {
      // Remove existing GTM scripts if they exist
      ['script[data-gtm-data-layer]', 'script[data-gtm-script]', 'noscript[data-gtm-noscript]'].forEach(selector => {
        const existingElement = doc.querySelector(selector);
        if (existingElement) existingElement.remove();
      });

      const dataLayerScript = gtm.getDataLayerScript();
      const script = gtm.getScript();
      const noScript = gtm.getNoScript();

      doc.head.insertBefore(dataLayerScript, doc.head.childNodes[0]);
      doc.head.insertBefore(script, doc.head.childNodes[1]);
      doc.body.insertBefore(noScript, doc.body.childNodes[0]);

      // Add data attributes to identify the scripts
      dataLayerScript.setAttribute('data-gtm-data-layer', '');
      script.setAttribute('data-gtm-script', '');
      noScript.setAttribute('data-gtm-noscript', '');

    } catch (error) {
      console.error('Error initializing GTM:', error);
    }
  };

  insertScripts(document);
}

/**
 * Function to send the events to the GTM
 * @param dataLayerName - The dataLayer name
 * @param data - The data to push
 */
export const sendToGTM = ({ dataLayerName, data }: ISendToGTM): void => {
  if (window[dataLayerName]) {
    window[dataLayerName].push(data)
  } else {
    console.warn(`dataLayer ${dataLayerName} does not exist, has script be initialized`)
  }
}
