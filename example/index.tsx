import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import {GTMProvider, useGTMDispatch} from '../dist'

const gtmParams = {
  id: 'GTM-WH5NGGZ',
  environment: {
    gtm_auth: '__XcYgksrXXbC4zLR-8REg',
    gtm_preview: 'env-8'
  }
}

const App = (): JSX.Element => {
  return (
    <Router>
      <GTMProvider state={gtmParams}>
        <div>
          <Routes>
            <Route path="/push_on_mount" element={<RoutePushOnMount/>}/>
            <Route path="/test" element={<TestRoute/>}/>
            <Route path="/" element={<Homepage/>}/>
          </Routes>
        </div>
      </GTMProvider>
    </Router>
  )
}

const TestRoute = () => <>
  <h2>Test route</h2>
  <MyAwesomeButton/>
  <br/>
  <Link to="/">Home</Link>
</>

const Homepage = () => <>
  <h2>Homepage</h2>
  <Link to="test">Test Route</Link>
  <br/>
  <br/>
  <Link to="push_on_mount">Push on mount route</Link>
</>

const MyAwesomeButton = () => {
  const sendDataToGTM = useGTMDispatch()

  return (
    <>
      <p>The awesome button</p>
      <button onClick={(): void => sendDataToGTM({event: 'my-custom-event'})}>Send Event</button>
    </>
  )
}

const RoutePushOnMount = () => {
  const sendDataToGTM = useGTMDispatch()

  React.useEffect(() => {
    sendDataToGTM({event: 'push_on_mount', customData: 'custom_data'})
  })

  return (
    <>
      <h2>Another route</h2>
      <br/>
      <Link to="/">Home</Link>
    </>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
