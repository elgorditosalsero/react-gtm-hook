<p align="center">
  <img src="https://user-images.githubusercontent.com/65770455/82931604-76c14380-9f87-11ea-8d36-4ab2bc94b1d3.png" alt="React Google Tag Manager Hook" />
</p>

# React Google Tag Manager Hook

#### Use easily the Google Tag Manager

With this custom hook, you can easily use the Google Tag Manager with 0 config, you just have to pass the **container ID**!

## Features

- [Installation](#installation)
- [How to use](#how-to-use)
- [API](#api)
- [Example](#example)
- [License](#license)

## Installation

```bash
$ yarn add @elgorditosalsero/react-gtm-hook
# or
$ npm install @elgorditosalsero/react-gtm-hook
```

## How to use

## Pay attention

Since v2.0 I'm using the context to share globally the config of the GTM for the Hook.
If you're looking for the 1.x doc, check [this](https://github.com/elgorditosalsero/react-gtm-hook/tree/v1.0.6)

### Basic

```typescript jsx
import { useEffect } from 'react'
import useGTM from '@elgorditosalsero/react-gtm-hook'

const App = () => {
  const { init, UseGTMHookProvider } = useGTM()

  useEffect(() => init({ id: 'GTM-ID' }), [])

  return (
    <UseGTMHookProvider>
      <p>My awesome app</p>
    </UseGTMHookProvider>
  )
}
```

### With custom DataLayer Name

```typescript jsx
import { useEffect } from 'react'
import useGTM from '@elgorditosalsero/react-gtm-hook'

const App = () => {
  const { init, UseGTMHookProvider } = useGTM()
  const gtmParams = {
    id: 'GTM-ID',
    dataLayerName: 'customDataLayerName'
  }

  useEffect(() => init(gtmParams), [])

  return (
    <UseGTMHookProvider>
      <p>My awesome app</p>
    </UseGTMHookProvider>
  )
}
```

### With custom DataLayer name and initial values

```typescript jsx
import { useEffect } from 'react'
import useGTM from '@elgorditosalsero/react-gtm-hook'

const App = () => {
  const { init, UseGTMHookProvider } = useGTM()
  const gtmParams = {
    id: 'GTM-ID',
    dataLayer: {
      'my-custom-value': 'value',
      'my-awesome-value': 'awesome'
    },
    dataLayerName: 'customDataLayerName'
  }

  useEffect(() => init(gtmParams), [])

  return (
    <UseGTMHookProvider>
      <p>My awesome app</p>
    </UseGTMHookProvider>
  )
}
```

### Use a GTM custom environment

```typescript jsx
import { useEffect } from 'react'
import useGTM from '@elgorditosalsero/react-gtm-hook'

const App = () => {
  const { init, UseGTMHookProvider } = useGTM()
  const gtmParams = {
    id: 'GTM-ID',
    environment: {
      gtm_auth: 'my-auth-token',
      gtm_preview: 'preview-id'
    }
  }

  useEffect(() => init(gtmParams), [])

  return (
    <UseGTMHookProvider>
      <p>My awesome app</p>
    </UseGTMHookProvider>
  )
}
```

_To find the `gtm_auth` and `gtm_preview` values for your custom GTM environment, go to Admin > Your Container > Environments > Your Environment > Actions > Get Snippet in your Google Tag Manager console. You will find the values you need embedded in the snippet._

### Sending data to GTM

```typescript jsx
import { useEffect } from 'react'
import useGTM from '@elgorditosalsero/react-gtm-hook'

const App = () => {
  const { init, UseGTMHookProvider } = useGTM()
  const gtmParams = {
    id: 'GTM-ID',
    dataLayerName: 'customDataLayerName'
  }

  useEffect(() => init(gtmParams), [])

  return (
    <UseGTMHookProvider>
      <div>
        <p>My awesome app</p>
        <MyAwesomeComp />
      </div>
    </UseGTMHookProvider>
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

| Name          | Type     | Required | Info                                                                                |
| ------------- | -------- | -------- | ----------------------------------------------------------------------------------- |
| id            | `String` | **YES**  | The container ID from the Tag Manager, it looks like: `GMT-0T0TTT`                  |
| dataLayer     | `Object` | **NO**   | Custom values for the dataLayer, like `{'my-init-prop': 'value'}`                   |
| dataLayerName | `String` | **NO**   | Custom name for the dataLayer, if not passed, it will be the default: `dataLayer`   |
| environment   | `Object` | **NO**   | Provide the `gtm_auth` and `gtm_preview` parameters to use a custom GTM environment |

### SentDataToGTM

| Name | Type     | Required | Info                                                                                             |
| ---- | -------- | -------- | ------------------------------------------------------------------------------------------------ |
| data | `Object` | **YES**  | The object data to send to the GTM, like `{event: 'my-awesome-event', 'my-custom-var': 'value'}` |

## Example

You can see this lib live on the dedicated [site](https://elgorditosalsero-react-gtm-hook.netlify.app/)

## License

`react-gtm-hook` is under MIT License

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/guidoporcaro/"><img src="https://avatars2.githubusercontent.com/u/65770455?v=4" width="100px;" alt=""/><br /><sub><b>Guido Porcaro</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=elgorditosalsero" title="Code">💻</a> <a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=elgorditosalsero" title="Documentation">📖</a></td>
    <td align="center"><a href="https://benyap.com"><img src="https://avatars3.githubusercontent.com/u/19235373?v=4" width="100px;" alt=""/><br /><sub><b>Ben Yap</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=benyap" title="Code">💻</a> <a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=benyap" title="Documentation">📖</a> <a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=benyap" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
