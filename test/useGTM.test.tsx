import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'

import useGTM, { TestingProvider } from '../src'

import { ISnippetsParams } from '../src/models/GoogleTagManager'

describe('Suite of useGTM Hook', () => {
  it('data layer appears before GTM snippet', async () => {
    const params: ISnippetsParams = { id: 'GTM-test' }
    const { result } = renderHook(() => useGTM())

    act(() => result.current.init({ ...params }))

    const dataLayerNode = document.head.childNodes[0] as HTMLScriptElement
    const gtmSnippetNode = document.head.childNodes[1] as HTMLScriptElement

    expect(dataLayerNode?.textContent).toContain('dataLayer')
    expect(gtmSnippetNode?.src).toContain('gtm')
    expect(gtmSnippetNode?.src).toContain(params.id)
  })

  it('should init the GTM with the ID passed', async () => {
    const params: ISnippetsParams = { id: 'GTM-test' }
    const { result } = renderHook(() => useGTM())

    act(() => result.current.init({ ...params }))

    expect(window['dataLayer']).not.toBeUndefined()
  })

  it('should init the GTM with a custom data layer name', async () => {
    const params: ISnippetsParams = { id: 'GTM-test', dataLayerName: 'customDataLayerName' }
    const { result } = renderHook(() => useGTM())

    act(() => result.current.init({ ...params }))

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

    act(() => result.current.init({ ...params }))

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

    act(() => result.current.init({ ...params }))

    expect(window['awesomeDataLayer']).not.toBeUndefined()
    expect(window['awesomeDataLayer']).toContainEqual({ homepage: false })
  })

  it('should send the data to the GTM', async () => {
    const { result } = renderHook(() => useGTM())

    act(() => result.current.init({ id: 'GTM-test' }))
    act(() => result.current.sendDataToGTM({ event: 'works' }))

    expect(window['dataLayer']).toContainEqual({ event: 'works' })
  })

  it('should send the data to the GTM with a custom dataLayer name', async () => {
    const params: ISnippetsParams = { id: 'GTM-test', dataLayerName: 'customDL' }
    const wrapper = ({ children }: any) => <TestingProvider state={params}>{children}</TestingProvider>
    const { result } = renderHook(() => useGTM(), { wrapper })

    act(() => result.current.init(params))
    act(() => result.current.sendDataToGTM({ event: 'works' }))

    expect(window['customDL']).toContainEqual({ event: 'works' })
  })
})
