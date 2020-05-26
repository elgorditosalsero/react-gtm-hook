import { act, renderHook } from '@testing-library/react-hooks'

import useGTM from '../src'

import { ISnippetsParams } from '../src/models/GoogleTagManager'

describe('Suite of useGTM Hook', () => {
  it('should init the GTM with the ID passed', async () => {
    const { result } = renderHook(() => useGTM())

    await act(async () => await result.current.init({ id: 'GTM-test' }))

    expect(window.dataLayer).not.toBeUndefined()
  })

  it('should init the GTM with a custom data layer name', async () => {
    const params: ISnippetsParams = { id: 'GTM-test', dataLayerName: 'customDataLayerName' }
    const { result } = renderHook(() => useGTM())

    await act(async () => await result.current.init({ ...params }))

    expect(window['customDataLayerName']).not.toBeUndefined()
  })

  it('should init the GTM with a custom dataLayer name and values', async () => {
    const params: ISnippetsParams = {
      id: 'GTM-test',
      dataLayerName: 'myDataLayer',
      dataLayer: {
        homepage: false,
        ecommerce: true
      }
    }
    const { result } = renderHook(() => useGTM())

    await act(async () => await result.current.init({ ...params }))

    expect(window['myDataLayer']).not.toBeUndefined()
    expect(window['myDataLayer']).toContainEqual({ homepage: false, ecommerce: true })
  })

  it('should init the GTM with a custom dataLayer name, values and events', async () => {
    const params: ISnippetsParams = {
      id: 'GTM-test',
      dataLayerName: 'awesomeDataLayer',
      dataLayer: {
        homepage: false
      }
    }
    const { result } = renderHook(() => useGTM())

    await act(async () => await result.current.init({ ...params }))

    expect(window['awesomeDataLayer']).not.toBeUndefined()
    expect(window['awesomeDataLayer']).toContainEqual({ homepage: false })
  })

  it('should send the data to the GTM', async () => {
    const { result } = renderHook(() => useGTM())

    await act(async () => await result.current.init({ id: 'GTM-test' }))
    await act(async () => await result.current.sendDataToGTM({ event: 'works' }))

    expect(window.dataLayer).toContainEqual({ event: 'works' })
  })

  it('should send the data to the GTM with a custom dataLayer name', async () => {
    const { result } = renderHook(() => useGTM())

    await act(async () => await result.current.init({ id: 'GTM-test', dataLayerName: 'customDL' }))
    await act(async () => await result.current.sendDataToGTM({ event: 'works' }))

    expect(window['customDL']).toContainEqual({ event: 'works' })
  })
})
