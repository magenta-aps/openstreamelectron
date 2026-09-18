# openstream-electron

ScreenConnector, the Electron app that registers a display with OpenStream.
Distributed as Linux AppImages for x64 and arm64.

## Downloads

Every release publishes AppImages for both architectures. These URLs always
point at the newest release, so install scripts never need a version:

```
https://github.com/magenta-aps/openstreamelectron/releases/latest/download/ScreenConnector-x86_64.AppImage
https://github.com/magenta-aps/openstreamelectron/releases/latest/download/ScreenConnector-arm64.AppImage
```

```bash
curl -fLO https://github.com/magenta-aps/openstreamelectron/releases/latest/download/ScreenConnector-x86_64.AppImage
```

No authentication is needed. Use `-L`, since GitHub redirects to its asset
storage.

Each release also carries versioned copies (`ScreenConnector-1.0.2-x86_64.AppImage`)
if you need to pin a specific build; browse them under
[releases](https://github.com/magenta-aps/openstreamelectron/releases).

To publish a new version, push a tag:

```
git tag 1.0.2 && git push origin 1.0.2
```

GitHub Actions builds both architectures and creates the release. The version in
the filenames comes from the tag, with any leading `v` stripped. Untagged pushes
still build, leaving the AppImages as workflow artifacts.

## Usage

Takes the full URL to open as `--url=`. The app exits immediately if it is
missing.

```
chmod +x ScreenConnector-<version>-<arch>.AppImage
./ScreenConnector-<version>-<arch>.AppImage --url=https://openstream.dk/register-screen/?apiKey=46b17c36-fcc1-412a-ad8f-88b3b0xxxxxx
```

Some distributions need `--no-sandbox` as well.

To register a screen, go to the branch you want to connect it to, press
*register screen*, copy the API key, and pass it in the URL as `apiKey`.

| Argument | Effect |
| --- | --- |
| `--url=` | Page to open. Required. Everything after the first `=` is kept, and surrounding quotes are stripped, so query strings are safe. |
| `--width=` | Window width in pixels. |
| `--height=` | Window height in pixels. |

The window opens fullscreen and maximized regardless; `--width`/`--height` set
the underlying window size.

## Building locally

```
cd ScreenConnector
npm ci
npm start             # run from source
npx electron-builder --linux AppImage --x64 --arm64
```

Output lands in `dist/`.
