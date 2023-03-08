# get-media-duration

## Install

```bash
pnpm add get-media-duration
```

## Usage

```js
import { getDuration, getDurationInMinutes } from 'get-media-duration'

getDuration('./audio.mp3')
  .then(duration => console.log(duration))
  .catch(console.log)


getDuration('https://samplelib.com/lib/preview/mp3/sample-3s.mp3')
  .then(duration => console.log(duration))
  .catch(console.log)

getDurationInMinutes('./audio.mp3')
  .then(duration => console.log(duration))
  .catch(console.log)


getDurationInMinutes('https://samplelib.com/lib/preview/mp3/sample-3s.mp3')
  .then(duration => console.log(duration))
  .catch(console.log)
```
