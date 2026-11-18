# Guidance for maintainers of multi-language content

## Core concepts

### Source language

To [Localize.js](https://localizejs.com/), "source language" is not necessarily the same as the original language of authored content. Instead, source language is the foundational reference language configured per website. Localize.js ingests all the unblocked text it finds on your site and catalogs it under the source language configuration in the project dashboard. This determines what the platform uses as master translation keys, the baseline for all automated detection and target language translations.

### How Localize.js Handles Non-Source Words

Localize.js will not automatically ignore non-English words. By default, the library scans the DOM and captures all visible text as source phrases regardless of the language, so **you must explicitly block non-English content with the `notranslate` attribute** (or another [exclusion method](https://developers.localizejs.com/docs/how-to-prevent-specific-content-being-detected-by-localize)) if you do not want it detected or translated.

- **Automatic detection**: The Localize script assumes all text on your site is in your project's configured default source language. The vast majority of NYS sites will have English as source language.  Any non-English words, loanwords, or foreign phrases will be pulled into your dashboard's **Pending** bin as new phrases to be translated.

- **Background flagging**: Localize runs a background scan on incoming pending phrases and automatically applies an `lz-non-source-language-phrase` label to content it suspects is not in your source language. However, this only helps you filter and manually block them in the dashboard afterward; it does not stop the script from detecting or translating them initially.

### Reasons to prevent translation

There are two primary scenarios in which language should remain in an original authored language and never change.

First, when certain names, terms, or texts will lose their legal, technical, or formal validity if modified in any way.

Second, whenever the content must always be intelligible for specific language constituencies. For example, when 13 language-specific versions of the same content or document are linked to or provided on the same page.

### Ways to prevent translation

To keep non-English words untouched on your site and out of your dashboard, use one of the methods outlined in the Localize Developer Docs:

- **Use the `notranslate` attribute**: Add an empty `notranslate` attribute (or `translate="no"`) to the HTML element wrapping the non-English word or phrase (e.g., `<span notranslate>Bon appétit</span>`). Localize will completely skip that element and its children.
- **Use the `ignore` attribute**: If a non-English word appears in the middle of a sentence that should be translated, wrap the word in `<span ignore>word</span>`. This keeps the surrounding sentence intact as a single phrase while preventing the ignored word from being altered.
- **Block by CSS class or ID**: If your non-English content shares a specific class or ID, you can add it to the `blockedClasses` array in your `Localize.initialize()` call or configure it under **Exclude Phrases by CSS Classes and IDs** in your dashboard.
- **Dashboard glossary rules**: For recurring foreign terms or brand names that appear across your site without special HTML tags, add them to your Localize Glossary and select the **This term is the same in all languages** option.

### The `lang` attribute is essential for Accessibility

Screen readers do not magically recognize different languages.
For a screen reader to be sure that a webpage is in English, the root HTML element that wraps the entire page requires an explicit `lang` value. 

```html
<html lang="en">
```

If this code is missing, any decent Accessibility audit would identify a violation, because the `lang` value has an enormous effect on the screen reader user experience:

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
Thus, the simplest way to block translation of the French and Italian phrases here is to mark the `"fr"` section as `notranslate`, since it wraps both phrases.
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

### The `dir` attribute is critical for legibility and comprehension

Every language has a base text direction.
At a simple level it has to do with how a language is written and read.
For example, English is left-to-right (LTR), coded as `dir="ltr"`, and Arabic is right-to-left (RTL), coded as `dir="rtl"`.

#### How `dir` effects HTML content

| Aspect | What `dir` controls |
| :----- | :-------------------- |
| **Punctuation, numbers**	| Places periods, exclamation marks, and numbers at the correct visual end of a sentence. |
| **Bidirectional mixing** | Keeps embedded phrases (like a formal English term inside an Arabic sentence) from scrambling the reading order. |
| **UI, layout flow** | Flips the flow of tables, form inputs, lists, and CSS logical properties. |
| **Accessibility** | Tells screen readers the structural flow of the content. |

#### Which languages are relevant

New York State supports the RTL languages **Arabic**, **Urdu**, and **Yiddish**.

#### What authors must do

Authors have three related responsibilities.

##### 1. Page layout direction

At a minimum, ensure the `dir` attribute is applied to the `<html>` element for RTL languages.
Even better, always include it, even for LTR languages.

```html
<html lang="ar" dir="rtl"></html>
<html lang="en" dir="ltr"></html>
```


If your project uses [Localize.js](https://localizejs.com/) for translations, the platform handles this seamlessly for you; _no additional work required_.

However if your translations are provided by a different means, _the responsibility is yours_ to implement.

##### 2. Page layout flow

When a webpage is switched from LTR to RTL the entire layout should flip horizontally like a mirror image.
What was on the left should now be on the right, and vice versa.
Text content should begin at the right side and flow to the left.

However this flip may fail to fully apply to portions of your webpages.
Typically this is due to physical directional CSS styles.
These are the traditional directions such as `top`, `bottom`, `left`, and `right`.
When this is the case, authors should refactor layouts with styles that instead of being physical and absolute are _relative_ to the base text direction.
These are [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values).
Consistently applied, logical properties are very efficient; they avoid the need to maintain branched CSS that styles LTR one way and RTL another.

As a rule, physical directional styles are obsolete, and going forward all directional styles should be authored with logical properties.
The only exceptions would be for elements that must remain anchored to a physical screen edge regardless of language.
The recommended guide to direction-agnostic CSS is [RTL Styling 101](https://rtlstyling.com/posts/rtl-styling/) by Ahmad Shadeed.

In tandem with logical properties, use [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts) and [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts) for all structural layout, since they both natively adapt their visual flow to text direction. Since both layout engines are built on logical axes rather than physical sides, _they automatically mirror or rotate_ when `dir` changes.

##### 3. Code embedded text fragments

**A.** When a webpage has mixed language and direction content, authors must assess how to treat embedded strings that have different text direction than that of the page or the nearest ancestor.

If the text is an RTL word or short phrase tightly composited with corresponding LTR strings, **DO NOT ADD** `dir="rtl"`.

###### Example A

```html
<div style="display:flex; flex-gap: 1rem;">
    <a href="path/to/page" lang="en">English</a>
    <a href="path/to/page" lang="ar">عربى</a>
    <a href="path/to/page" lang="fr">Français</a>
    <a href="path/to/page" lang="ur">اردو</a>
</div>
```

**B.** If the text has the look-and-feel of a block level element (whitespace above and below), and particularly if it is one or several paragraphs, **DO ADD** `dir="rtl"`.

###### Example B

```html
<p lang="en" dir="ltr">
    If you need free interpretation services in your language, call us at 518-453-8137.
</p>
<p lang="ar" dir="rtl">
    يرجى الاتصال بنا على الرقم 518-453-8137 للحصول على مساعدة فيما يتعلق بالخدمات اللغوية المجانية.
</p>
<p lang="fr" dir="ltr">
    Si vous avez besoin d’un service d'interprétation gratuit dans votre langue, appelez-nous au.
</p>
<p lang="ur" dir="rtl">
    زبان سے متعلق معاونت کی مفت خدمات کے لیے براہ مہربانی ہمیں 518-453-8137 پر کال کریں۔
</p>
```

[See NYS examples of multi-language authoring](/notes/multi-language-authoring-examples.md)
