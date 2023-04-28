# MAINTAINERS WANTED, PLEASE REACH OUT IF YOU'RE INTERESTED

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

```jsx
import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'

const App = () => {
  const gtmParams = { id: 'GTM-ID' }

  return (
    <GTMProvider state={gtmParams}>
      <p>My awesome app</p>
    </GTMProvider>
  )
}
```

### With custom DataLayer Name

```jsx
import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'

const App = () => {
  const gtmParams = {
    id: 'GTM-ID',
    dataLayerName: 'customDataLayerName'
  }

  return (
    <GTMProvider state={gtmParams}>
      <p>My awesome app</p>
    </GTMProvider>
  )
}
```

### With custom DataLayer name and initial values

```jsx
import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'

const App = () => {
  const gtmParams = {
    id: 'GTM-ID',
    dataLayer: {
      'my-custom-value': 'value',
      'my-awesome-value': 'awesome'
    },
    dataLayerName: 'customDataLayerName'
  }

  return (
    <GTMProvider state={gtmParams}>
      <p>My awesome app</p>
    </GTMProvider>
  )
}
```

### Use a GTM custom environment

```jsx
import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'

const App = () => {
  const gtmParams = {
    id: 'GTM-ID',
    environment: {
      gtm_auth: 'my-auth-token',
      gtm_preview: 'preview-id'
    }
  }

  return (
    <GTMProvider state={gtmParams}>
      <p>My awesome app</p>
    </GTMProvider>
  )
}
```

_To find the `gtm_auth` and `gtm_preview` values for your custom GTM environment, go to Admin > Your Container > Environments > Your Environment > Actions > Get Snippet in your Google Tag Manager console. You will find the values you need embedded in the snippet._

### Sending data to GTM

```jsx
import { GTMProvider, useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'

const App = () => {
  const gtmParams = {
    id: 'GTM-ID',
    dataLayerName: 'customDataLayerName'
  }

  return (
    <GTMProvider state={gtmParams}>
      <div>
        <p>My awesome app</p>
        <MyAwesomeComp />
      </div>
    </GTMProvider>
  )
}

const MyAwesomeComp = () => {
  const sendDataToGTM = useGTMDispatch()

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

| Name          | Type      | Required | Info                                                                                                                             |
| ------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| id            | `String`  | **YES**  | The container ID from the Tag Manager, it looks like: `GTM-0T0TTT`                                                               |
| dataLayer     | `Object`  | **NO**   | Custom values for the dataLayer, like `{'my-init-prop': 'value'}`                                                                |
| dataLayerName | `String`  | **NO**   | Custom name for the dataLayer, if not passed, it will be the default: `dataLayer`                                                |
| environment   | `Object`  | **NO**   | Provide the `gtm_auth` and `gtm_preview` parameters to use a custom GTM environment                                              |
| nonce         | `String`  | **NO**   | Server generated nonce. see https://developers.google.com/tag-manager/web/csp                                                    |
| injectScript  | `Boolean` | **NO**   | default(`true`): Decide if the GTM Script is injected, see #30. Also allows for delayed injection by toggling true later in flow |
| customDomain  | `String`  | **NO**   | default(`https://www.googletagmanager.com`): Provide customDomain to use a custom GTM domain                                              |
| customScriptName  | `String`  | **NO**   | default(`gtm.js`): Provide customScriptName to use custom file name                                              |

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
[![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/guidoporcaro/"><img src="https://avatars2.githubusercontent.com/u/65770455?v=4?s=100" width="100px;" alt="Guido Porcaro"/><br /><sub><b>Guido Porcaro</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=elgorditosalsero" title="Code">💻</a> <a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=elgorditosalsero" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://benyap.com"><img src="https://avatars3.githubusercontent.com/u/19235373?v=4?s=100" width="100px;" alt="Ben Yap"/><br /><sub><b>Ben Yap</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=benyap" title="Code">💻</a> <a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=benyap" title="Documentation">📖</a> <a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=benyap" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://cristianlivella.com/"><img src="https://avatars.githubusercontent.com/u/27968888?v=4?s=100" width="100px;" alt="Cristian Livella"/><br /><sub><b>Cristian Livella</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=cristianlivella" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jafin"><img src="https://avatars.githubusercontent.com/u/127927?v=4?s=100" width="100px;" alt="Jason Finch"/><br /><sub><b>Jason Finch</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=jafin" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://segredo.dev/"><img src="https://avatars.githubusercontent.com/u/11761170?v=4?s=100" width="100px;" alt="Italo"/><br /><sub><b>Italo</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=iaurg" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/thecoder93"><img src="https://avatars.githubusercontent.com/u/3246694?v=4?s=100" width="100px;" alt="Gianluca La Manna"/><br /><sub><b>Gianluca La Manna</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=thecoder93" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/daisy1754"><img src="https://avatars.githubusercontent.com/u/980077?v=4?s=100" width="100px;" alt="Kazuki"/><br /><sub><b>Kazuki</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=daisy1754" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/perfectial-stepan-mandryka"><img src="https://avatars.githubusercontent.com/u/95344107?v=4?s=100" width="100px;" alt="Stepan Mandryka"/><br /><sub><b>Stepan Mandryka</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=perfectial-stepan-mandryka" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://simonsmith.io/"><img src="https://avatars.githubusercontent.com/u/360703?v=4?s=100" width="100px;" alt="Simon Smith"/><br /><sub><b>Simon Smith</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=simonsmith" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/listiani13"><img src="https://avatars.githubusercontent.com/u/24470609?v=4?s=100" width="100px;" alt="Listiani"/><br /><sub><b>Listiani</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=listiani13" title="Code">💻</a> <a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=listiani13" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pkulcsarnr"><img src="https://avatars.githubusercontent.com/u/84968286?v=4?s=100" width="100px;" alt="pkulcsarnr"/><br /><sub><b>pkulcsarnr</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=pkulcsarnr" title="Code">💻</a> <a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=pkulcsarnr" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sin-to-jin"><img src="https://avatars.githubusercontent.com/u/5368888?v=4?s=100" width="100px;" alt="sin"/><br /><sub><b>sin</b></sub></a><br /><a href="https://github.com/elgorditosalsero/react-gtm-hook/commits?author=sin-to-jin" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
