import { DEFAULT_DOMAIN, getDataLayerSnippet, getGTMScript, getIframeSnippet } from '../src/utils/snippets'
import { ISnippetsParams } from '../src/models/GoogleTagManager'

describe('Suite of snippets functions', () => {
  describe('Suite of getDataLayerSnippet', () => {
    let dataLayer: Object
    let dataLayerName: string

    beforeEach(() => {
      dataLayer = { user: 'testUser' }
      dataLayerName = 'customDataLayer'
    })

    it('should return an empty string', () => {
      const dl = getDataLayerSnippet(undefined)

      expect(dl).toEqual(`window.dataLayer = window.dataLayer || [];`)
    })

    it('should return the dataLayer', () => {
      const dl = getDataLayerSnippet(dataLayer)

      expect(dl).toContain('{"user":"testUser"}')
    })

    it('should return the dataLayer with a custom name', () => {
      const dl = getDataLayerSnippet(dataLayer, dataLayerName)

      expect(dl).toContain('{"user":"testUser"}')
      expect(dl).toContain('customDataLayer')
    })
  })

  describe('Suite of getGTMScript', () => {
    let params: ISnippetsParams

    beforeEach(() => {
      params = { id: 'GTM-custom-name' }
    })

    it('should return the script with the default dataLayerName', () => {
      const customDataLayerName = 'customDL'
      params = { ...params, dataLayerName: customDataLayerName }

      const gtmSnippet = getGTMScript(params.dataLayerName, params.id)

      expect(gtmSnippet).toContain(`${customDataLayerName}`)
      expect(gtmSnippet).toContain(`${params.id}`)
      expect(gtmSnippet).not.toContain('gtm_auth')
      expect(gtmSnippet).not.toContain('gtm_preview')
      expect(gtmSnippet).toContain(DEFAULT_DOMAIN)
    })

    it('should return the script with the custom domain', () => {
      const customDomain = 'https://www.example.com'
      const customDataLayerName = 'customDL'
      params = { ...params, dataLayerName: customDataLayerName, customDomain: customDomain }

      const gtmSnippet = getGTMScript(params.dataLayerName, params.id, undefined, params.customDomain)

      expect(gtmSnippet).toContain(`${customDataLayerName}`)
      expect(gtmSnippet).toContain(`${customDomain}`)
      expect(gtmSnippet).toContain(`${params.id}`)
      expect(gtmSnippet).not.toContain('gtm_auth')
      expect(gtmSnippet).not.toContain('gtm_preview')
    })

    it('should return the script with the default dataLayerName and custom environment auth', () => {
      const customDataLayerName = 'customDL'
      params = {
        ...params,
        dataLayerName: customDataLayerName,
        environment: {
          gtm_auth: 'custom_environment_auth',
          gtm_preview: 'custom_environment_preview'
        }
      }

      const gtmSnippet = getGTMScript(params.dataLayerName, params.id, params.environment)

      expect(gtmSnippet).toContain(`${customDataLayerName}`)
      expect(gtmSnippet).toContain(`${params.id}`)
      expect(gtmSnippet).toContain('gtm_auth')
      expect(gtmSnippet).toContain(DEFAULT_DOMAIN)
      expect(gtmSnippet).toContain('gtm_preview')
      expect(gtmSnippet).toContain(params.environment!.gtm_auth)
      expect(gtmSnippet).toContain(params.environment!.gtm_preview)
    })
  })

  describe('Suite of getIframeSnippet', () => {
    let params: ISnippetsParams

    beforeEach(() => {
      params = { id: 'GTM-iframe' }
    })

    it('should return the iframe snippet with the passed id', () => {
      const iframeSnippet = getIframeSnippet(params.id)
      expect(iframeSnippet).toContain(DEFAULT_DOMAIN)
      expect(iframeSnippet).toContain(`${params.id}`)
      expect(iframeSnippet).not.toContain('gtm_auth')
      expect(iframeSnippet).not.toContain('gtm_preview')
    })

    it('should return the iframe snippet with the passed id and custom environment auth', () => {
      params = {
        ...params,
        environment: {
          gtm_auth: 'custom_environment_auth',
          gtm_preview: 'custom_environment_preview'
        }
      }

      const iframeSnippet = getIframeSnippet(params.id, params.environment)

      expect(iframeSnippet).toContain(DEFAULT_DOMAIN)
      expect(iframeSnippet).toContain(`${params.id}`)
      expect(iframeSnippet).toContain('gtm_auth')
      expect(iframeSnippet).toContain('gtm_preview')
      expect(iframeSnippet).toContain(params.environment!.gtm_auth)
      expect(iframeSnippet).toContain(params.environment!.gtm_preview)
    })

    it('should return the iframe snippet with the custom domain', () => {
      params = {
        ...params,
        customDomain: 'https://example.com'
      }

      const iframeSnippet = getIframeSnippet(params.id, undefined, params.customDomain)

      expect(iframeSnippet).toContain(params.customDomain)
      expect(iframeSnippet).toContain(`${params.id}`)
    })
  })
})
