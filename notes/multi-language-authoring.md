# Guidance for maintainers of multi-language content

## Core concepts

### Source language

In Localize.js, "source language" is not necessarily the same as the original language of authored content. Instead, source language is the foundational reference language configured per website. Localize.js ingests all the unblocked text it finds on your site and catalogs it under the source language configuration in the project dashboard. This determines what the platform uses as master translation keys, the baseline for all automated detection and target language translations.

### How Localize.js Handles Non-Source Words

Localize.js will not automatically ignore non-English words. By default, the library scans the DOM and captures all visible text as source phrases regardless of the language, so **you must explicitly block non-English content using the `notranslate` attribute** (or another [exclusion method](https://developers.localizejs.com/docs/how-to-prevent-specific-content-being-detected-by-localize)) if you do not want it detected or translated.

- **Automatic Detection**: The Localize script assumes all text on your site is in your project's configured default "source language." The vast majority of NYS sites will have English as source language.  Any non-English words, loanwords, or foreign phrases will be pulled into your dashboard's **Pending** bin as new phrases to be translated.

- **Background Flagging (Not Blocking)**: Localize runs a background scan on incoming pending phrases and automatically applies an `lz-non-source-language-phrase` label to content it suspects is not in your source language. However, this only helps you filter and manually block them in the dashboard afterward; it does not stop the script from detecting or translating them initially.

### Reasons to prevent translation

There are two primary scenarios in which language should remain in an original authored language and never change.

First, when certain names, terms, or texts will lose their legal, technical, or formal validity if modified in any way.

Second, whenever the content must alway be intelligible for specific language constituencies. For example when 13 language-specific versions of the same content or document are linked-to or provided on the same page.

### Ways to prevent translation

To keep non-English words untouched on your site and out of your dashboard, use one of the methods outlined in the Localize Developer Docs:

- **Use the `notranslate` Attribute**: Add an empty `notranslate` attribute (or `translate="no"`) to the HTML element wrapping the non-English word or phrase (e.g., `<span notranslate>Bon appétit</span>`). Localize will completely skip that element and its children.
- **Use the `ignore` Attribute**: If a non-English word appears in the middle of a sentence that should be translated, wrap the word in `<span ignore>word</span>`. This keeps the surrounding sentence intact as a single phrase while preventing the ignored word from being altered.
- **Block by CSS Class or ID**: If your non-English content shares a specific class or ID, you can add it to the `blockedClasses` array in your `Localize.initialize()` call or configure it under **Exclude Phrases by CSS Classes and IDs** in your dashboard.
- **Dashboard Glossary Rules**: For recurring foreign terms or brand names that appear across your site without special HTML tags, add them to your Localize Glossary and select the **This term is the same in all languages** option.

### The `lang` attribute is essential for Accessibility

Screen readers do not magically recognize different languages.
For a screen reader to be sure that a webpage is in English, the root HTML element that wraps the entire page requires an explicit `lang` value. 

```html
<html lang="en">
```

If this code is missing, any decent Accessibility audit would identify a violation, because the `lang` value has an enormous affect on the screen reader user experience:

- Given `lang="en"`, and given English language support on a device, a screen reader will announce all text content on the page according to the pronunciation rules of English. 
- Given `lang="es"`, and given Spanish language support on a device, it would announce according to the pronunciation rules of Spanish.

There are two main results of a mismatch between `lang` and actual text language.
The first is a failure to correctly identify an unsupported language.
The second, even if language support is otherwise present, is an announcement the user may not be able to understand at all, equivalent to visual text that is badly misspelled or missing letters.

Any container element within page content can create its own self-contained `lang` scope, and these can be arbitrarily nested.
For any text content, the closest ancestor container's `lang` value "wins."
In the example below, screen readers can correctly pronounce the words _Hello_ and _Goodbye_ with an English accent since that is the current language of the page.
The phrase _Le monde est bleu_ can be correctly pronounced with a French accent, 
and _Roma è eterna_ can be correctly pronounced with an Italian accent.

```html
<html lang="en">
    <section>Hello</section>
    <section lang="fr">
        <p>Le monde est bleu.</p>
        <p lang="it">Roma è eterna.</p>
    </section>
    <section>Goodbye</section>
</html>
```

However, this is not enough if we need the French and Italian phrases to remain in those languages and never be translated when the language of the page is dynamically changed by Localize.js.
One of the blocking techniques described above must be used, for example the `notranslate` attribute.
Like `lang`, it operates on the content that its HTML element encloses. 
Thus the simplest way to block translation of the French and Italian phrases here is to mark the `"fr"` section as `notranslate`, since it wraps both phrases.
In this example, the page has been dynamically translated to Korean, but the French and Italian content has been protected.

```html
<html lang="ko">
    <section>안녕하세요</section>
    <section lang="fr" notranslate>
        <p>Le monde est bleu.</p>
        <p lang="it">Roma è eterna.</p>
    </section>
    <section>안녕히 가세요</section>
</html>
```

[See more examples of multi-language authoring](/notes/multi-language-authoring-examples.md)