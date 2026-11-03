# UNav Implementation Guide

The New York State Universal Navigation (UNav) is a standardized header and footer that appears on all public-facing New York State websites. The UNav is designed to provide a consistent user experience across all state websites, making it easier for visitors to navigate and understand the information they find.

The UNav is two web components from the [NYS Design System (NYSDS)](https://designsystem.ny.gov):

- `<nys-unavheader>` — the trust bar ("An official website of New York State"), the NY.gov logo, search, the language selector, and statewide alerts.
- `<nys-unavfooter>` — the statewide footer and statewide calls-to-action (CTAs).

Both ship in one self-contained script, `@nysds/nys-unavbundle`. That one file is all you load: there's no stylesheet to link, no icons to host, and no other NYSDS package to install.

The two components are independent. The footer no longer depends on the header to render, and neither one is configured through a global `_NY` object.

> [!NOTE]
> Coming from the script embed (`<div id="nygov-universal-navigation">` and `var _NY = {...}`)? See [Migrating from the script embed](#migrating-from-the-script-embed).

## Load the bundle

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

> [!TIP]
> If your site already loads the full design system (`@nysds/components`), it already includes `<nys-unavheader>` and `<nys-unavfooter>`. Don't add the bundle too.

### Design tokens

The components read NYSDS design tokens (`--nys-*` CSS custom properties). The bundle adds them to the page for you, as the first `<style>` in `<head>`. Because they come first, any `--nys-*` values your own stylesheets set take priority.

To stop the bundle from adding tokens, set `window.NYS_UNAV_SKIP_TOKENS = true` before the bundle loads. Only do this if your page already defines the tokens, for example by loading `@nysds/styles`.

## Header

> [!IMPORTANT]
> Place the header as the first element inside `<body>`, outside of any container elements. The header should expand to 100% of the screen width, even if your current site has a fixed width.

```html
<body>
  <nys-unavheader></nys-unavheader>
  ...
</body>
```

Search and the language selector are shown by default. Hide either one with a boolean attribute:

```html
<nys-unavheader hideSearch hideTranslate></nys-unavheader>
```

Leave room for the header to grow. A statewide alert can appear at any time and adds height to the header, so content below it must be able to shift down. See [Alerts and CTA](/notes/alerts.md).

## Footer

> [!IMPORTANT]
> Place the footer as the last element inside `<body>`, outside of any container elements. The footer should expand to 100% of the screen width, even if your current site has a fixed width.

```html
<body>
  ...
  <nys-unavfooter></nys-unavfooter>
</body>
```

The footer has no display options. It renders the statewide footer and any published statewide CTA.

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
    <nys-unavheader></nys-unavheader>

    <!-- Your agency header (for example, nys-globalheader) and page content -->

    <nys-unavfooter></nys-unavfooter>
  </body>
</html>
```

## Header settings

Set these as attributes in HTML, or as properties from JavaScript.

Attribute | Description | Default
:--- | :--- | :---
`hideSearch` | Hides search in the header. [More details.](/notes/search.md) | Not set (search shown)
`hideTranslate` | Hides the language selector in the header. [More details.](/notes/translate.md) | Not set (selector shown)
`searchUrl` | Sends searches to your own search page. The query is URL-encoded and appended to the end of this value, so include the query parameter (for example `https://example.ny.gov/search?q=`). [More details.](/notes/search.md) | `""` (statewide search, scoped to your domain)
`translateKey` | A Localize project key. When set, the header loads LocalizeJS and translates the page in place. When empty, languages link to Smartling subdomains. [More details.](/notes/translate.md) | `""` (Smartling)
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

## Using the UNav with an agency header and footer

Most sites place their own agency header (`nys-globalheader`) directly below the UNav header, and their own agency footer (`nys-globalfooter`) directly above the UNav footer. That gives the page two `banner` landmarks and two `contentinfo` landmarks. The UNav names its landmarks "New York State", and the agency components are named after the agency, so screen reader users can tell them apart.

If you change `landmarkLabel`, keep it different from your agency header's and footer's names.

## Layout width

The UNav content is centered within the NYSDS content width. To match a different site width, set the `--nys-max-width--content` custom property, for example on `:root`. It applies to the header, the footer, and other NYSDS layout components.

```css
:root {
  --nys-max-width--content: 1440px;
}
```

## Content Security Policy

If your site sends a Content Security Policy, allow the following:

Directive | Source | Needed for
:--- | :--- | :---
`style-src` | `'unsafe-inline'` | The design tokens the bundle adds as a `<style>` element. Not needed if you set `NYS_UNAV_SKIP_TOKENS` and load the tokens yourself.
`connect-src` | `https://alerts-cta.static-assets.ny.gov` | Statewide alerts and CTAs. Also allow `alerts-cta-dev` and `alerts-cta-stage` on non-production environments.
`script-src`, `connect-src` | `https://global.localizecdn.com` and Localize's API hosts | Only when `translateKey` is set.

If the alert and CTA feeds are blocked, the header and footer still render. Visitors just won't see statewide alerts or CTAs.

## Testing on dev and stage

The header and footer read the production alert and CTA feeds by default. To preview the dev or stage feeds, set `data-environment` on `<body>`:

```html
<body data-environment="stage">
```

Only `dev` and `stage` change the feed. Any other value, or no attribute, reads production. Don't ship `data-environment` to production.

## Migrating from the script embed

The script embed used a `<div>` placeholder, a global `_NY` configuration object, and a bundle loaded from `static-assets.ny.gov`. Replace all of it with the new bundle and the two components.

**Before**

```html
<!-- NYS UNAV HEADER -->
<div id="nygov-universal-navigation" class="nygov-universal-container" data-iframe="true" data-updated="2024-08-26 12:00">
  <script type="text/javascript">
    var _NY = {
      HOST: "static-assets.ny.gov",
      BASE_HOST: "www.ny.gov",
      hideSettings: true,
      hideSearch: true,
      showLanguageHeader: false,
      showLanguageFooter: false,
    };
    (function (document, bundle, head) { /* loads global-nav-bundle.js */ }(document));
  </script>
</div>

<!-- NYS UNAV FOOTER -->
<div id="nygov-universal-footer" class="nygov-universal-container"></div>
```

**After**

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
— | `translateKey` | New. Translate with Localize instead of Smartling subdomains.
— | `languages` | New. Change the list of languages.
— | `landmarkLabel` | New. Rename the header's or footer's landmark.
— | `nys-search-submit`, `nys-language-select` | New. Replace search or translation with your own handling.

> [!WARNING]
> Because the defaults changed, a straight swap can turn on features your site had off. If your embed had `hideSearch: true` (the default), add `hideSearch`. If it had `showLanguageHeader: false` (the default), add `hideTranslate`.
