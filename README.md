<p align="center">
  <img src="react-gtm-hook.png" alt="React Google Tag Manager Hook" />
</p>

# React Goole Tag Manager Hook

#### Use easily the Google Tag Manager

With this custom hook, you can easily use the Google Tag Manager with 0 config, you just have to pass the **container ID**!

## Features

- [Installation](#installation)
- [How to use](#how-to-use)
- [API](#api)
- [License](#license)

## Installation

```bash
$ yarn add react-gtm-hook

$ npm install react-gtm-hook
```

## How to use

### Basic

```typescript jsx
import { useEffect } from 'react'
import useGTM from 'react-gtm-hook'

const App = () => {
  const { init } = useGTM()

  useEffect(() => init({ id: 'GTM-ID' }), [])

  return <p>My awesome app</p>
}
```

### With custom DataLayer Name

```typescript jsx
import { useEffect } from 'react'
import useGTM from 'react-gtm-hook'

const App = () => {
  const { init } = useGTM()
  const gtmParams = {
    id: 'GTM-ID',
    dataLayerName: 'customDataLayerName'
  }

  useEffect(() => init(gtmParams), [])

  return <p>My awesome app</p>
}
```

### With custom DataLayer name and initial values

```typescript jsx
import { useEffect } from 'react'
import useGTM from 'react-gtm-hook'

const App = () => {
  const { init } = useGTM()
  const gtmParams = {
    id: 'GTM-ID',
    dataLayer: {
      'my-custom-value': 'value',
      'my-awesome-value': 'awesome'
    },
    dataLayerName: 'customDataLayerName'
  }

  useEffect(() => init(gtmParams), [])

  return <p>My awesome app</p>
}
```

### Sending data to GTM

```typescript jsx
import { useEffect } from 'react'
import useGTM from 'react-gtm-hook'

const App = () => {
  const { init } = useGTM()
  const gtmParams = {
    id: 'GTM-ID',
    dataLayerName: 'customDataLayerName'
  }

  useEffect(() => init(gtmParams), [])

  return (
    <div>
      <p>My awesome app</p>
      <MyAwesomeComp />
    </div>
  )
}

const MyAwesomeComp = () => {
  const { sendDataToGTM } = useGTM()

  const handleClick = () => sendDataToGTM({ event: 'awesomeButtonClicked', value: 'imAwesome' })

  return (
    <div>
      <p>My Awesome Comp</p>
      <button onClick={handleClick}>My Awesome Button</button>
    </div>
  )
}
```

## API

`useGTM` provide you a clean and easy to use API to config the GTM

### Init

| Name          | Type     | Required | Info                                                                              |
| ------------- | -------- | -------- | --------------------------------------------------------------------------------- |
| id            | `String` | **YES**  | The container ID from the Tag Manager, it looks like: `GMT-0T0TTT`                |
| dataLayer     | `Object` | **NO**   | Custom values for the dataLayer, like `{'my-init-prop': 'value'}`                 |
| dataLayerName | `String` | **NO**   | Custom name for the dataLayer, if not passed, it will be the default: `dataLayer` |

### SentDataToGTM

| Name | Type     | Required | Info                                                                                             |
| ---- | -------- | -------- | ------------------------------------------------------------------------------------------------ |
| data | `Object` | **YES**  | The object data to send to the GTM, like `{event: 'my-awesome-event', 'my-custom-var': 'value'}` |

## License

`react-gtm-hook` is under MIT License
