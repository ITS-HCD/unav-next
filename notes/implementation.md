# UNav Implementation Guide

The UNav is made up of two web components from the [NYS Design System (NYSDS)](https://designsystem.ny.gov):

- `<nys-unavheader>` — the trust bar ("An official website of New York State"), the NY.gov logo, search, the language selector, and statewide alerts.
- `<nys-unavfooter>` — the statewide footer and statewide calls-to-action (CTAs).

## Choose how to add the UNav

How you add the UNav depends on your platform:

Your site | What to do
:--- | :---
Drupal sites, managed by WebNY | **Nothing.** WebNY manages the UNav setup for these sites.
**New application** | Use `nys-unavheader` and `nys-unavfooter` from the NYSDS component library. See [Building a new application](#building-a-new-application).
**Existing site** that uses the 2024 script embed and **CAN upgrade** to the new unav-bundle | [Download the UNAV bundle](#load-the-bundle) and [Migrate from the 2024 script](#migrating-from-the-2024-script-embed)
**Existing site** that uses the 2024 script embed and **cannot upgrade** to the unav bundle | [Update your existing script](#update-2024-script)
**Existing site** that uses a custom unav header, footer, or translate footer, and **cannot upgrade** to the unav bundle | [Update your custom implementation](#update-custom-implementation)

## Building a new application

New applications should use `nys-unavheader` and `nys-unavfooter` directly from the [NYS Design System component library](https://designsystem.ny.gov). The library supports:

Framework | Package
:--- | :---
Native HTML (web components) | `@nysds/components`
React | `@nysds/react`
Angular | `@nysds/angular`
Vue | `@nysds/vue`

Follow the [design system's setup for your framework](https://designsystem.ny.gov/get-started/developers/). The header and footer take the same settings and fire the same events described in this guide.

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

[Read the header documentation for usage](https://designsystem.ny.gov/components/unavheader).

[Read the header documentation for options](https://designsystem.ny.gov/components/unavheader/#options).

[Read the header documentation for JS events](https://designsystem.ny.gov/components/unavheader/#events).

**IMPORTANT!!** Search and the language selector are now shown by default. Hide either one with a property:

```html
<nys-unavheader hideSearch hideTranslate></nys-unavheader>
```

If you keep the language selector, set your Localize key with `translateKey`. See [UNav Translate](/notes/translate.md).

## Footer

[Read the nys-unavfooter documentation for usage](https://designsystem.ny.gov/components/unavfooter)

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

## Layout width

[Read the NYS Design System content width options](https://designsystem.ny.gov/components/unavheader/#style-overrides)

## Migrating from the 2024 script embed

Replace all of the previous script with the new bundle and the two components.

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

> [!WARNING]
> Because the defaults changed, a straight swap can turn on features your site had off. If your embed had `hideSearch: true` (the default), add `hideSearch`. If it had `showLanguageHeader: false` (the default), add `hideTranslate`.
>
> If your embed showed the language selector, set a `translateKey`. Without one, the selector links to Smartling subdomains, which stop working on December 31, 2026.

## Update 2024 Script

### The old script:
```html
<!-- NYS UNAV HEADER -->	
<div id="nygov-universal-navigation" class="nygov-universal-container" data-iframe="true" data-updated="2024-08-26 12:00">
  <script type="text/javascript">
    var _NY = {
      HOST: "static-assets.ny.gov",
      BASE_HOST: "www.ny.gov", // Deprecated
      hideSettings: true, // Deprecated
      hideSearch: true,
      showLanguageHeader: false,
      showLanguageFooter: false,
    };
    (function (document, bundle, head) {
        head = document.getElementsByTagName('head')[0];
        bundle = document.createElement('script');
        bundle.type = 'text/javascript';
        bundle.async = true;
        bundle.src = "//static-assets.ny.gov/sites/all/widgets/universal-navigation/js/dist/global-nav-bundle.js";
        head.appendChild(bundle);
    }(document));
  </script>
</div>
```

### The new script:

Removed settings, and updated bundle URL

```html
<!-- NYS UNAV HEADER -->	
<div id="nygov-universal-navigation" class="nygov-universal-container">
  <script type="text/javascript">
    var _NY = {
      HOST: "static-assets.ny.gov",
      hideSearch: true, // or false if you dont want search in unavheader
      translateKey: "{{STRING}}" // Provide to load Localize translation platform
    };
    (function (document, bundle, head) {
        head = document.getElementsByTagName('head')[0];
        bundle = document.createElement('script');
        bundle.type = 'text/javascript';
        bundle.async = true;
        bundle.src = "//static-assets.ny.gov/unavDS/js/unav-bundle.js";
        head.appendChild(bundle);
    }(document));
  </script>
</div>
```
## Update custom implementation

If you built your own Unav, you'll need to [upgrade to the unavbundle](#load-the-bundle) or update your custom install. The changes to unav you need to be aware of the [search configuration](/notes/search.md) and [translation configuration](/notes/translate.md#custom-unav-translation-requirements). 

## Testing on dev and stage

See [Alerts](/notes/alerts.md)

## Content Security Policy

If your site sends a Content Security Policy, allow the following:

Directive | Source | Needed for
:--- | :--- | :---
`style-src` | `'unsafe-inline'` | The design tokens the bundle adds as a `<style>` element.
`connect-src` | `https://alerts-cta.static-assets.ny.gov` | Statewide alerts and CTAs. Also allow `alerts-cta-dev` and `alerts-cta-stage` on non-production environments.
`script-src`, `connect-src` | `https://global.localizecdn.com` and Localize's API hosts | Only when `translateKey` is set.

If the alert and CTA feeds are blocked, the header and footer still render. Visitors just won't see statewide alerts or CTAs.