import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import useGTM from '../dist'

const gtmParams = { id: 'GTM-WH5NGGZ', dataLayer: { customInitValue: 'imCustom' }, dataLayerName: 'customDL' }

const App = (): JSX.Element => {
  const { init, UseGTMHookProvider } = useGTM()

  React.useEffect(() => init(gtmParams), [init])

  React.useEffect(() => console.log('render'), [])

  return (
    <Router>
      <UseGTMHookProvider>
        <div>
          <Switch>  
            <Route path="/push_on_mount" component={RoutePushOnMount} />
            <Route path="/test">
              <h2>Test route</h2>
              <MyAwesomeButton />
              <br />
              <Link to="/">Home</Link>
            </Route>
            <Route path="/" exact>
              <h2>Homepage</h2>
              <Link to="test">Test Route</Link>
              <br />
              <br />
              <Link to="push_on_mount">Push on mount route</Link>
            </Route>
          </Switch>
        </div>
      </UseGTMHookProvider>
    </Router>
  )
}

const MyAwesomeButton = () => {
  const { sendDataToGTM } = useGTM()

  return (
    <>
      <p>The awesome button</p>
      <button onClick={(): void => sendDataToGTM({ event: 'my-custom-event' })}>Send Event</button>
    </>
  )
}

const RoutePushOnMount = () => {
  const { sendDataToGTM } = useGTM()

  React.useEffect(() => {
    sendDataToGTM({event: 'push_on_mount', customData: 'custom_data'})
  });

  return (
    <>
      <h2>Another route</h2>
      <br />
      <Link to="/">Home</Link>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
