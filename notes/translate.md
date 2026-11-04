# UNav Language Selector

The language selector in the UNav header is designed to enhance the user experience for multilingual visitors by providing easy access to a range of languages in compliance with [New York State's Language Access Law](https://ogs.ny.gov/new-york-state-language-access-law).

Languages available by default in the language selector: English, Español, 中文, 繁體中文, יידיש, Русский, বাংলা, 한국어, Kreyòl Ayisyen, Italiano, العربية, Polski, Français, and اردو.

The language selector is in the header only. It's shown by default.

<img src="language-selector-header.png" alt="Language Selector in Header" width="640">

> [!CAUTION]
> **Smartling translation is ending.** Smartling translation services and the Smartling language subdomains (for example, `es.its.ny.gov`) stop working on **December 31, 2026**. No redirects are set up. To link to a translation, use your main domain with `?ljs=` and the language code, for example `https://its.ny.gov/?ljs=es`. Request a Localize key from [translation@its.ny.gov](mailto:translation@its.ny.gov). See [Moving off Smartling](#moving-off-smartling).

## How the language selector works

What the selector does depends on how you set up the header:

Your setup | What visitors get
:--- | :---
`translateKey` set | **Localize (required for translation).** The header loads Localize and translates the page in place. See [Localize](#localize).
No `translateKey` | **Smartling subdomain links.** Each language links to the same page on a language subdomain, for example `es.agency.ny.gov`. These links stop working on December 31, 2026. See [Moving off Smartling](#moving-off-smartling).
`hideTranslate` | **No language selector.** Use this if your site doesn't offer translation. See [Hiding the language selector](#hiding-the-language-selector).
`nys-language-select` handled in JavaScript | **Your own translation.** For apps with their own i18n. See [Using your app's own translation](#using-your-apps-own-translation).

> [!WARNING]
> Without a `translateKey`, the header still shows the language selector, and its links point at Smartling subdomains. After December 31, 2026, those links lead nowhere. Before then, either set a `translateKey` or add `hideTranslate`.

## Localize

Localize is the state's translation service for the UNav. To use it, set `translateKey` to your Localize project key. The header loads Localize and translates the page in place, without a redirect.

- The visitor's language is remembered on later visits.
- Arabic, Urdu, and Yiddish switch the page to right-to-left.
- When a visitor picks a language other than English, the header shows a dismissible machine-translation disclaimer in that language, directly below the header.

```html
<nys-unavheader translateKey="{{YOUR_LOCALIZE_KEY}}"></nys-unavheader>
```
---

### Getting a Localize key

To request a Localize project key for your site, email [translation@its.ny.gov](mailto:translation@its.ny.gov).

### Linking to a translated page

With Localize, every language lives at the same URL as the English page. To link straight to a translation, add `?ljs=` and the language code to the URL:

```
https://its.ny.gov/?ljs=es
```

If the URL already has a query string, add it with `&` instead: `https://its.ny.gov/search?q=snow&ljs=es`.

Language | Code
:--- | :---
Español (Spanish) | `es`
中文 (Chinese) | `zh-cn`
繁體中文 (Traditional Chinese) | `zh-hk`
יידיש (Yiddish) | `yi`
Русский (Russian) | `ru`
বাংলা (Bengali) | `bn`
한국어 (Korean) | `ko`
Kreyòl Ayisyen (Haitian Creole) | `ht`
Italiano (Italian) | `it`
العربية (Arabic) | `ar`
Polski (Polish) | `pl`
Français (French) | `fr`
اردو (Urdu) | `ur`

## Moving off Smartling

Smartling translation services, and the Smartling language subdomains, stop working on **December 31, 2026**.

Today, Smartling serves each translation from its own subdomain. For example, `es.its.ny.gov` serves the Spanish translation of `its.ny.gov`. After December 31, 2026:

- The language subdomains go away. `es.its.ny.gov` will no longer serve the Spanish translation of the ITS site.
- **No redirects are set up.** Links and bookmarks pointing at a language subdomain will break.
- A header with no `translateKey` still links to Smartling subdomains, so its language selector breaks too. (use `hideTranslate` in this case).

To prepare:

1. [Request a Localize key](#getting-a-localize-key) and set it as your header's `translateKey`. If your site won't offer translation, add `hideTranslate` instead.
2. Find links to your language subdomains, in your own site, in other sites you control, and in printed or emailed materials. Change them to your main domain with `?ljs=` and the language code. For example, change `https://es.its.ny.gov/` to `https://its.ny.gov/?ljs=es`. See [Linking to a translated page](#linking-to-a-translated-page).

## Using your app's own translation

If your app has its own internationalization (i18n), you can keep the UNav language selector and point it at your translations.

**Handle the selection in JavaScript.** Listen for `nys-language-select` and call `preventDefault()`. The header then does nothing else. The selected language is in `event.detail.language`.

```html
<nys-unavheader id="unav"></nys-unavheader>
<script>
  document.querySelector("#unav").addEventListener("nys-language-select", (event) => {
    event.preventDefault();
    myApp.setLocale(event.detail.language.code);
  });
</script>
```

**Change the list of languages.** Set the `languages` property to only the languages your app supports. Each language takes:

Field | Description
:--- | :---
`code` | The language code, for example `es`. Also passed to Localize, and used as the Smartling subdomain.
`label` | The name shown in the menu, written in that language, for example `Español`.
`nativeText` | The name in English, for example `Spanish`. Screen readers announce it after the label.
`url` | Optional. A link for this language. Overrides Localize and Smartling for this language.
`disclaimer` | Optional. HTML shown as the machine-translation disclaimer when this language is picked with Localize.

```html
<nys-unavheader id="unav"></nys-unavheader>
<script>
  document.querySelector("#unav").languages = [
    { code: "en", label: "English", nativeText: "English" },
    { code: "es", label: "Español", nativeText: "Spanish", url: "https://example.ny.gov/es/" },
    { code: "fr", label: "Français", nativeText: "French", url: "https://example.ny.gov/fr/" },
  ];
</script>
```

Setting `languages` replaces the whole default list. Include English so visitors can switch back.

## Hiding the language selector

If your site doesn't offer translation, hide the selector with the `hideTranslate` attribute. [More details in the implementation guide.](/notes/implementation.md)

```html
<nys-unavheader hideTranslate></nys-unavheader>
```
