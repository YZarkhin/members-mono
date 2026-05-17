# members-mono

Monorepo containing a React web app, React Native mobile app, and a shared library.

## Prerequisites

- **Node.js** >= 22.11.0
- **pnpm** 11.x — `npm install -g pnpm`
- **For iOS:** Xcode + CocoaPods (`gem install cocoapods`)
- **For Android:** Android Studio with an emulator configured

## Install dependencies

```bash
pnpm install
```

For iOS, also install pods:

```bash
cd apps/mobile/ios && pod install && cd -
```

## Web

```bash
pnpm dev:web
```

Starts the Vite dev server. Open [http://localhost:5173](http://localhost:5173).

## Mobile

Start the Metro bundler:

```bash
pnpm dev:mobile
```

Then in a separate terminal, run on iOS or Android:

```bash
pnpm ios
# or
pnpm android
```

## Project structure

```
apps/
  web/      # React + Vite + Tailwind
  mobile/   # React Native
shared/     # Shared stores, hooks, validations, i18n
```
