import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import useGTM from '../dist'

const App = () => {
  const { init, sendDataToGTM } = useGTM()

  React.useEffect(
    () => init({ id: 'GTM-WH5NGGZ', dataLayer: { customInitValue: 'imCustom' }, dataLayerName: 'customDL' }),
    []
  )

  return (
    <div>
      <p>Works</p>
      <button onClick={() => sendDataToGTM({ event: 'my-custom-event' })}>Send Event</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
