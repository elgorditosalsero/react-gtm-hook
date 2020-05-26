import { getDataLayerSnippet, getGTMScript, getIframeSnippet } from '../src/utils/snippets'
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

      expect(dl).toEqual('dataLayer = []')
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
      const customDataLayerName = 'custonDL'
      params = { ...params, dataLayerName: customDataLayerName }

      const gtmSnippet = getGTMScript(params.dataLayerName, params.id)

      expect(gtmSnippet).toContain(`${customDataLayerName}`)
      expect(gtmSnippet).toContain(`${params.id}`)
    })
  })

  describe('Suite of getIframeSnippet', () => {
    let params: ISnippetsParams

    beforeEach(() => {
      params = { id: 'GTM-iframe' }
    })

    it('should return the iframe snippet with the passed it', () => {
      const iframeSnippet = getIframeSnippet(params.id)

      expect(iframeSnippet).toContain(`${params.id}`)
    })
  })
})
