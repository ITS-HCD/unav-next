# UNav Implementation Guide

The UNav is two web components from the [NYS Design System (NYSDS)](https://designsystem.ny.gov):

- `<nys-unavheader>` — the trust bar ("An official website of New York State"), the NY.gov logo, search, the language selector, and statewide alerts.
- `<nys-unavfooter>` — the statewide footer and statewide calls-to-action (CTAs).

## Choose how to add the UNav

How you add the UNav depends on your platform:

Your site | What to do
:--- | :---
Drupal on **Acquia Site Factory**, managed by WebNY | **Nothing.** WebNY manages the UNav setup for these sites.
**New application** | Use `nys-unavheader` and `nys-unavfooter` from the NYSDS component library. See [Building a new application](#building-a-new-application).
**Existing site** that uses the 2024 script embed (`<div id="nygov-universal-navigation">`) | Load the UNav bundle. See [Load the bundle](#load-the-bundle) and [Migrating from the 2024 script embed](#migrating-from-the-2024-script-embed).

> [!IMPORTANT]
> Does your site use Smartling for translation? Smartling translation and the language subdomains (for example, `es.its.ny.gov`) stop working on December 31, 2026, with no redirects. See [Moving off Smartling](/notes/translate.md#moving-off-smartling).

## Building a new application

New applications should use `nys-unavheader` and `nys-unavfooter` directly from the [NYS Design System component library](https://designsystem.ny.gov). The library supports:

Framework | Package
:--- | :---
Native HTML (web components) | `@nysds/components`
React | `@nysds/react`
Angular | `@nysds/angular`
Vue | `@nysds/vue`

Follow the design system's setup for your framework. The header and footer take the same settings and fire the same events described in this guide.

Use the bundle below only on existing sites that don't use the NYSDS component library. A site that loads the component library already includes both elements, so don't add the bundle too.

## Load the bundle

For existing sites, `@nysds/nys-unavbundle` ships both elements in one self-contained script. That one file is all you load: there's no stylesheet to link, no icons to host, and no other NYSDS package to install.

Install the bundle from npm:

```bash
npm install @nysds/nys-unavbundle
```

Then load it in one of two ways.

**Import it in your JavaScript build**

```js
import "@nysds/nys-unavbundle";
```

The import registers both elements. There's no setup call to make.

**Host the file with your site**

Copy `node_modules/@nysds/nys-unavbundle/dist/nys-unavbundle.js` into your site's assets, and add a script tag for it to `<head>`:

```html
<script src="/assets/js/nys-unavbundle.js"></script>
```

The bundle is a classic script, so don't add `type="module"`.

Pin an exact version and update it deliberately. Check the [NYSDS releases](https://github.com/ITS-HCD/nysds/releases) for the latest version.

## Header

> [!IMPORTANT]
> Place the header as the first element inside `<body>`, outside of any container elements. The header should expand to 100% of the screen width, even if your current site has a fixed width.

```html
<body>
  <nys-unavheader></nys-unavheader>
  ...
</body>
```

Search and the language selector are shown by default. Hide either one with a property:

```html
<nys-unavheader hideSearch hideTranslate></nys-unavheader>
```

If you keep the language selector, set your Localize key with `translateKey`. See [UNav Translate](/notes/translate.md).

## Footer

> [!IMPORTANT]
> Place the footer as the last element inside `<body>`, outside of any container elements. The footer should expand to 100% of the screen width, even if your current site has a fixed width.

```html
<body>
  ...
  <nys-unavfooter></nys-unavfooter>
</body>
```

## Full page example

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="/assets/js/nys-unavbundle.js"></script>
  </head>
  <body>
    <nys-unavheader translateKey="{{MY_KEY}}"></nys-unavheader>

    <!-- Site layout and content -->

    <nys-unavfooter></nys-unavfooter>
  </body>
</html>
```

## Header settings

Set these as attributes in HTML, or as properties from JavaScript.

Attribute | Description | Default
:--- | :--- | :---
`hideSearch` | Hides search in the header. [More details.](/notes/search.md) | `false` (search shown)
`hideTranslate` | Hides the language selector in the header. [More details.](/notes/translate.md) | `false` (translate shown)
`searchUrl` | Sends searches to your own search page. The query is URL-encoded and appended to the end of this value, so include the query parameter (for example `https://example.ny.gov/search?q=`). [More details.](/notes/search.md) | `""` (statewide search, scoped to your domain)
`translateKey` | A Localize project key. When set, the header loads Localize and translates the page in place. When empty, languages link to Smartling subdomains, which stop working on December 31, 2026. Request a key from [translation@its.ny.gov](mailto:translation@its.ny.gov). [More details.](/notes/translate.md) | `""` (Smartling links)
`landmarkLabel` | Accessible name of the header's `banner` landmark. | `"New York State"`

Property (JavaScript only) | Description | Default
:--- | :--- | :---
`languages` | The languages listed in the language selector, as an array of `{ code, label, nativeText, url?, disclaimer? }`. [More details.](/notes/translate.md) | 14 languages

## Footer settings

Attribute | Description | Default
:--- | :--- | :---
`landmarkLabel` | Accessible name of the footer's `contentinfo` landmark. | `"New York State"`

## Events

The header fires two events. Both bubble, cross shadow boundaries, and are cancelable: call `event.preventDefault()` to replace the header's default behavior with your own.

Event | Fired when | `event.detail` | Default behavior
:--- | :--- | :--- | :---
`nys-search-submit` | A visitor submits a search. | `{ query }` | Redirects to the search results page.
`nys-language-select` | A visitor picks a language. | `{ language }` | Translates with Localize, or follows the language's link.

```html
<nys-unavheader id="unav"></nys-unavheader>
<script>
  document.querySelector("#unav").addEventListener("nys-search-submit", (event) => {
    event.preventDefault();
    mySiteSearch(event.detail.query);
  });
</script>
```

## Layout width

The UNav content is centered within a NYSDS container width. To match a different site width, set the `--nys-max-width--content` custom property, for example on `:root`. It applies to the header, the footer, and other NYSDS layout components.

```css
:root {
  --nys-max-width--content: 1440px;
}
```

## Content Security Policy

If your site sends a Content Security Policy, allow the following:

Directive | Source | Needed for
:--- | :--- | :---
`style-src` | `'unsafe-inline'` | The design tokens the bundle adds as a `<style>` element.
`connect-src` | `https://alerts-cta.static-assets.ny.gov` | Statewide alerts and CTAs. Also allow `alerts-cta-dev` and `alerts-cta-stage` on non-production environments.
`script-src`, `connect-src` | `https://global.localizecdn.com` and Localize's API hosts | Only when `translateKey` is set.

If the alert and CTA feeds are blocked, the header and footer still render. Visitors just won't see statewide alerts or CTAs.

## Testing on dev and stage

The header and footer read the production alert and CTA feeds by default. To preview the dev or stage feeds, set `data-environment` on `<body>`:

```html
<body data-environment="stage">
```

Only `dev` and `stage` change the feed. Any other value, or no attribute, reads production. **Don't ship `data-environment` to production!**

## Migrating from the 2024 script embed

The script embed used a `<div>` placeholder, a global `_NY` configuration object, and a bundle loaded from `static-assets.ny.gov`. Replace all of it with the new bundle and the two components.

### Before

```html
<!-- NYS UNAV HEADER -->
<div id="nygov-universal-navigation" class="nygov-universal-container" data-iframe="true" data-updated="2024-08-26 12:00">
  <script type="text/javascript">
    var _NY = {
      ...
    };
  </script>
</div>

<!-- NYS UNAV FOOTER -->
<div id="nygov-universal-footer" class="nygov-universal-container"></div>
```

### After

```html
<!-- In <head> -->
<script src="/assets/js/nys-unavbundle.js"></script>

<!-- First in <body> -->
<nys-unavheader hideSearch hideTranslate></nys-unavheader>

<!-- Last in <body> -->

<nys-unavfooter></nys-unavfooter>
```

### Setting changes

Script embed | Component | Notes
:--- | :--- | :---
`HOST` | Removed | Install `@nysds/nys-unavbundle` from npm instead.
`BASE_HOST` | Removed | Already deprecated.
`hideSettings` | Removed | Already deprecated.
`hideSearch: true` | `hideSearch` | **The default changed.** The script embed hid search unless you set `hideSearch: false`. The component shows search unless you add `hideSearch`.
`showLanguageHeader: true` | Default | **The setting is inverted.** The component shows the language selector unless you add `hideTranslate`.
`showLanguageHeader: false` | `hideTranslate` |
`showLanguageFooter` | Removed | The language selector is only in the header. The footer no longer has one.
`data-iframe`, `data-updated` | Removed |
— | `searchUrl` | New. Use your own search results page.
— | `translateKey` | New. Translate with Localize. Smartling subdomains stop working on December 31, 2026, so set this or add `hideTranslate`.
— | `languages` | New. Change the list of languages.
— | `landmarkLabel` | New. Rename the header's or footer's landmark.
— | `nys-search-submit`, `nys-language-select` | New. Replace search or translation with your own handling.

> [!WARNING]
> Because the defaults changed, a straight swap can turn on features your site had off. If your embed had `hideSearch: true` (the default), add `hideSearch`. If it had `showLanguageHeader: false` (the default), add `hideTranslate`.
>
> If your embed showed the language selector, set a `translateKey`. Without one, the selector links to Smartling subdomains, which stop working on December 31, 2026.
