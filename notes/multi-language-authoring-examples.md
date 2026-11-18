
So far, the examples have been contrived to demonstrate concepts simply.
To more directly relate this to your own content authoring and maintenance, browse through the following cases, all taken from actual New York State websites.

- [Higher Education Services Corporation](#higher-education-services-corporation)
- [Battery Park City Authority](#battery-park-city-authority)
- [Language Access content common to many sites](#language-access-content-common-to-many-sites)
- [Department of Taxation and Finance](#department-of-taxation-and-finance)

<!-- PUT A PAGE BREAK HERE -->
# Examples

### Higher Education Services Corporation

See: <https://www.tap.hesc.ny.gov/totw/>

In the first example English is the language of the page, but there is **a line in Spanish**.

#### Text presentation 

# NYS Student Aid Payment Application

**Si desea llenar la versión en español de la solicitud, [pulse aquí](<>).**

Welcome to the New York State Student Aid Payment Application!
This online application process allows you to apply for New York State's Tuition Assistance Program (TAP).
TAP is available to students attending a SUNY, CUNY, independent not-for-profit,
and proprietary degree-granting colleges and universities on a full- or part-time basis.

#### How to structure the HTML

The page is set to English (**A**). However the Spanish line embedded within it needs to be recognized by screen readers and other assistive technologies (AT) as Spanish (**B**). Also the line will always be in Spanish and should never be translated.

**Solution**: Set the **B** text block to `lang="es"` and `notranslate`.

```html
<!-- Note A -->
<html lang="en">
  <h1>NYS Student Aid Payment Application</h1>
  
<!-- Note B -->
  <p lang="es" notranslate>
    <strong>
        Si desea llenar la versión en español de la solicitud,
        <a href>pulse aquí</a>.
    </strong>
  </p>
  <p>
    Welcome to the New York State Student Aid Payment Application!
    [...]
  </p>
</html>
```

In the second example Spanish is the language of the page, but there is **a line in English**.

#### Text presentation

# Solicitud de Pago de Ayuda Estudiantil de NYS

**If you wish to complete the English version of the application, [click here](<>).**

Bienvenido a la Solicitud de Pago de Ayuda Estudiantil del Estado de Nueva York.
Este proceso de solicitud en línea le permite solicitar el Programa de Asistencia para la Matrícula (TAP) del Estado de Nueva York.
El TAP está disponible para estudiantes que asisten a instituciones SUNY, CUNY,
así como a universidades y colegios independientes sin fines de lucro y universidades y colegios con fines de lucro autorizados para otorgar títulos,
ya sea a tiempo completo o parcial.

#### How to structure the HTML

The page is set to Spanish (**C**). However the English line embedded within it needs to be recognized by screen readers and other assitive technologies (AT) as English (**D**). Also the line will always be in English and should never be translated.

**Solution**: Set the **D** text block to `lang="en"` and `notranslate`.

```html
<!-- Note C -->
<html lang="es">
  <h1>Solicitud de Pago de Ayuda Estudiantil de NY</h1>
  
  <!-- Note D -->
  <p lang="en" notranslate>
    <strong>
        If you wish to complete the English version of the application,
        <a href>click here</a>.
    </strong>
  </p>
  <p>
    Bienvenido a la Solicitud de Pago de Ayuda Estudiantil del
    Estado de Nueva York.
    [...]
  </p>
</html>
```

---

### Battery Park City Authority

See: <https://bpca.ny.gov/>

Every page in the site has a footer with mixed language content.
For brevity, only the language-specific links are shown and HTML is reduced.

#### Text presentation

### Resources:

- [Language Services](<>)
- [中文 (Chinese)](<>)
- [Kreyòl ayisyen (Haitian-Creole)](<>)
- [Italiano (Italian)](<>)
- [Русский (Russian)](<>)
- [한국어 (Korean)](<>)
- [Español (Spanish)](<>)

#### How to structure the HTML

For each link with mixed languages, divide the label text by language and whether or not it should translate.

The unmarked English text will be translated if and when the user switches the page language. When that happens the `lang="en"` of the root HTML element will change to the new language value. All unmarked text on the page will then be identified by screen readers and other AT as being in the new language (**F**).

**Solution**: code the non-English link text with an appropriate `lang` value and `notranslate` (**E**).

```html
<html lang="en">
  <h3 id="bpca-site-resources">Resources:</h3>
  <ul aria-labelledby="bpca-site-resources">
    <li>
      <a href="https://bpca.ny.gov/language-services/">
          Language Services
      </a>
    </li>
    <li>
      <a href="https://bpca.ny.gov/language-services/">
          
        <!-- Note E -->
          <span lang="zh-CN" notranslate>中文</span>
          
        <!-- Note F -->
          (Chinese)
      </a>
    </li>
    [...]
 </ul>
</html>
```

The Battery Park City Authority site's [Language Services](https://bpca.ny.gov/language-services/) page additionally has blocks of content in several languages. 
For brevity, only the Spanish example is shown and HTML has been reduced.

#### Text presentation

## Language Services

Each link opens a PDF in a new window.

### Español

Cada enlace abre un PDF en una ventana nueva.

**[Información general del BPCA](https://media.bpca.ny.gov/wp-content/uploads/2021/12/13123217/BPCA-one-pager_Dec2021_ES.pdf)**

**[Mapa de BPCA](https://media.bpca.ny.gov/wp-content/uploads/2015/12/13124539/ES_BPCA_Map_Fonts_REV43_1.23.15.pdf)**

**[Reglas del permiso](https://media.bpca.ny.gov/wp-content/uploads/2015/12/13124538/PermitRulesRegs-FNL5-2015_ES.pdf)**

#### How to structure the HTML

Unless non-English text blocks are explicitly identified, screen readers and other AT will interpret their text as being in the language of the page, initially English. For any text content, the nearest ancestor with an explicit `lang` value takes precedence.

**Solution**: Set the entire **G** content section to `lang="es"` and `notranslate`. This will be inherited by the Spanish language links within.

```html
<html lang="en">
    <h2>Language Services</h2>
    
    <!-- G -->
    <section lang="es" notranslate>
        <h3>Español</h3>
        <p>Cada enlace abre un PDF en una ventana nueva.</p>
        <p><strong>
            <a href="https://media.bpca.ny.gov/path/to/the.pdf"
               target="_blank">
                Información general del BPCA
            </a>
        </strong></p>
        <p><strong>
            <a href="https://media.bpca.ny.gov/path/to/the.pdf"
               target="_blank">
                Mapa de BPCA
            </a>
        </strong></p>
        <p><strong>
            <a href="https://media.bpca.ny.gov/path/to/the.pdf"
               target="_blank">
                Reglas del permiso
            </a>
        </strong></p>
    </section>
</html>
```

---

### Language Access content common to many sites

See: <https://apa.ny.gov/website-usage-and-policies/language-access.html>, <https://its.ny.gov/language-access>, and others.

The Adirondack Park Agency's language access page has a set of accordions, one for each of the 13 NYS supported languages.
Note that since the site also has a language switcher, these dedicated sections may not be necessary.
However, let's assume they are necessary and that each must remain in the specific language,
even when the language of the page changes.

For brevity, only the Bengali example is shown.
On the Agency site there are links to Bengali-translated PDFs, however the link names are in English.
This is incorrect; the display text of the links must also be in Bengali.
These links are corrected below, with the help of Google Translate.

#### Text presentation (corrected):

**Bengali - বাঙাল**

নিউ ইয়র্ক স্টেটের ভাষার অ্যাক্সেস নীতি অনুযায়ী, সরাসরি সরকারি পরিষেবা প্রদান করে, স্টেটের এরকম নির্বাহী এজেন্সিগুলিকে অনুরোধকৃত ভাষাতে অনুবাদ পরিষেবাগুলি প্রদান করতে হয় এবং গুরুত্বপূর্ণ ফর্ম ও কাগজপত্রগুলিকে নিউ ইয়র্ক স্টেটের ইংরেজি ছাড়াও 12টি সবচেয়ে বেশি বলা ভাষাতে প্রদান করতে হয়।এটি স্টেটকে সীমিত ইংরেজির দক্ষতা থাকা ব্যক্তিদের কাছে সরকারি পরিষেবা ও কর্মসূচিগুলির ক্ষেত্রে হওয়া বাধাগুলি কাটিয়ে উঠতে সহায়তা করে। এই মুহূর্তে, শীর্ষ বারোটি ভাষা হল: স্প্যানিশ, চীনা, রাশিয়ান, ইদ্দিস, বাংলা, কোরিয়ান, হাইতিয়ান ক্রেওলি, ইটালিয়ান, আরবি, পোলিশ, ফ্রেঞ্চ এবং উর্দু।

[অ্যাডিরনড্যাক পার্ক এজেন্সির নাগরিক নির্দেশিকা]() (original: _Adirondack Park Agency's Citizens Guide_)

[OLA অধিকার বিষয়ক ব্রোশিওর]() (original: _OLA Rights Brochure_)

[ব্যাখ্যা প্রদান সংক্রান্ত পরিষেবার পরিহার]()
(original: _Waiver of Interpretation Services_)

## একটি ভাষার অ্যাক্সেস সংক্রান্ত অভিযোগ জমা দেওয়ার অধিকার

আপনি যদি মনে করেন যে, আপনাকে পর্যাপ্ত অনুবাদ পরিষেবা প্রদান করা হয়নি বা আপনাকে একটি উপলব্ধ অনুবাদকৃত নথি দিতে প্রত্যাখ্যান করা হয়েছে, অনুগ্রহ করে, আমাদেরকে আপনার মতামত প্রদানের জন্য আমাদের [অভিযোগ ফর্মটি]() পূরণ করুন।

আপনি এই অভিযোগ ফর্মে যে তথ্য প্রদান করবেন, তা স্টেটের ভাষার অ্যাক্সেস পরিষেবাগুলির উন্নতি করতে সহায়তা করবে। এই ফর্মে আপনার সাথে যোগাযোগের তথ্য চাওয়া হবে, যাতে আমরা আপনার অভিযোগে সাড়া দিতে কি করেছি তা আপনাকে জানাতে পারি। আপনার অভিযোগে অন্তর্ভুক্ত সমস্ত ব্যক্তিগত তথ্য গোপন রাখা হবে।

[ভাষার অ্যাক্সেস সংক্রান্ত অভিযোগ ফর্ম]()

আপনি যদি আমাদের ভাষার অ্যাক্সেস সংক্রান্ত অভিযোগ ফর্মটি ডাউনলোড, প্রিন্ট, পূরণ করতে চান ও আমাদের কাছে পাঠাতে চান, অনুগ্রহ করে, নিচে ক্লিক করুন।

[PDF – বাংলায় অ্যাক্সেস সংক্রান্ত অভিযোগ ফর্ম]()

#### How to structure the existing HTML

The word "Bengali" is the English form of the language name and will translate when the language of the page changes upon language switcher selection. However the remainder of the text must be recognized as Bangla.

**Solution**: As in the Battery Park City examples, code the non-English link text with an appropriate `lang` value and `notranslate` (**H**), and do the same for sections that wrap complete language content blocks (**I**). Ensure that all documents have localized link text (**J**).

```html
<html lang="en">
    <button class="accordion active" aria-expanded="true">
        Bengali - 
        
        <!-- H -->
        <span lang="bn" notranslate>বাঙাল</span>
    </button>

    <!-- I -->
    <div class="panel open" lang="bn" notranslate>
        <p>
            নিউ ইয়র্ক স্টেটের ভাষার অ্যাক্সেস নীতি অনুযায়ী, সরাসরি সরকারি পরিষেবা
            প্রদান করে, স্টেটের এরকম নির্বাহী এজেন্সিগুলিকে অনুরোধকৃত ভাষাতে
            অনুবাদ পরিষেবাগুলি প্রদান করতে হয় এবং গুরুত্বপূর্ণ ফর্ম ও
            কাগজপত্রগুলিকে নিউ ইয়র্ক স্টেটের ইংরেজি ছাড়াও 12টি সবচেয়ে বেশি
            বলা ভাষাতে প্রদান করতে হয়।এটি স্টেটকে সীমিত ইংরেজির দক্ষতা থাকা
            ব্যক্তিদের কাছে সরকারি পরিষেবা ও কর্মসূচিগুলির ক্ষেত্রে হওয়া বাধাগুলি
            কাটিয়ে উঠতে সহায়তা করে। এই মুহূর্তে, শীর্ষ বারোটি ভাষা হল: স্প্যানিশ,
            চীনা, রাশিয়ান, ইদ্দিস, বাংলা, কোরিয়ান, হাইতিয়ান ক্রেওলি, ইটালিয়ান,
            আরবি, পোলিশ, ফ্রেঞ্চ এবং উর্দু।
        </p>
        <p>
            
            <!-- J -->
            <a href="../path/to/CitizensGuide_Bn.pdf">
                অ্যাডিরনড্যাক পার্ক এজেন্সির নাগরিক নির্দেশিকা]
            </a>
        </p>
        <p>
            
            <!-- J -->
            <a href="../path/to/2023OLARightsBrochure_Bn.pdf">
                OLA অধিকার বিষয়ক ব্রোশিওর
            </a>
        </p>
        <p>
            
            <!-- J -->
            <a href="../path/to/2023WaiverofInterpretationServices_Bn.pdf">
                ব্যাখ্যা প্রদান সংক্রান্ত পরিষেবার পরিহার
            </a>
        </p>
        <h2>একটি ভাষার অ্যাক্সেস সংক্রান্ত অভিযোগ জমা দেওয়ার অধিকার</h2>
        [...]
    </div>
</html>
```
---

### Department of Taxation and Finance

See: <https://www.tax.ny.gov/language/>

#### Text presentation

## Language access

To increase taxpayer access to information, we've translated documents into the languages below.

|  |  |
| :-- | :-- | :-- |
| [Español]() |  [繁體中文]() |  [Русский]() |
| [বাংলা]()   |  [יידיש ]()    |  [Kreyòl ayisyen]() |
| [한국어]()  |  [Italiano]() |  [العربية]() |
| [Polski]()|  [Français]() | [اردو]() |

#### How to structure the HTML

These are hyperlinks to translated pages. The existing HTML uses the `hreflang` attribute, an excellent addition, since its purpose is to help communicate to AT that "the destination page is in language X." However `hreflang` is not a substitute for `lang`, which is still needed to identify the language of the link text on the current page.

**Solution**: preserve the useful `hreflang` attribute (**K**) and add to it the appropriate `lang` value (**L**) to identify the language of the link text. Also add `notranslate`, since this link will always remain in its orginally authored language.

```html
<html lang="en">
    <h2>Language access</h2>
    <p>
        To increase taxpayer access to information,
        we've translated documents into the languages below.
    </p>
    <ul>
        <li class="link-item">
            <a href="/language/espanol/"
                
               <!-- K -->
               hreflang="es"
               
               <!-- L -->
               lang="es"
               notranslate>Español</a>
        </li>
        <li class="link-item">
            <a href="/language/chinese/"
                
               <!-- K -->
               hreflang="zh-HK"
               
               <!-- L -->
               lang="zh-HK"
               notranslate>繁體中文</a>
        </li>
        [...]
    </ul>
</html>
```

Next on the same page, a telephone number is provided to request interpretation services.

#### Text presentation

## Free interpretation

If you need free interpretation services in your language, call us at [518-453-8137]().

Llámenos al [518-453-8137]() si necesita ayuda gratis en su idioma.

請給我們打電話號碼 : [518-453-8137](), 要求免費的語言協助服務。

Чтобы получить бесплатные переводческие услуги, позвоните, пожалуйста, по следующему номеру: [518-453-8137]().

বিনামূল্যে ভাষা সেবায় সহায়তা পেতে অনুগ্রহ করে আমাদেরকে [518-453-8137]() নম্বরে কল করুন।.

ביטע אָנקלינגט אוּנדז אין [518-453-8137]() כּדי צוּ באַקוּמען פֿרײַ שפּראַך באַדינען.

Tanpri rele nou nao [518-453-8137]() pou jwenn sèvis èd gratis nan lang.

전화 [518-453-8137]() 로 무료 언어 지원 서비스를 요청하십시오.

Chiamare il [518-453-8137]() per assistenza linguistica gratuita.

يرجى الاتصال بنا على الرقم [518-453-8137]() للحصول على مساعدة فيما يتعلق بالخدمات اللغوية المجانية.

Aby uzyskać pomoc w zakresie bezpłatnej obsługi językowej, prosimy o kontakt z nami dzwoniąc pod numer [518-453-8137]().

Si vous avez besoin d’un service d'interprétation gratuit dans votre langue, appelez-nous au [518-453-8137]().

زبان سے متعلق معاونت کی مفت خدمات کے لیے براہ مہربانی ہمیں [518-453-8137]() پر کال کریں۔

#### How to structure the HTML

A screen reader will attempt to pronounce each of these 13 sentences in the current language of the page. The resulting screen reader user experience will thus be unintelligible 12 out of 13 times.

**Solution**: add the appropriate `lang` attribute to each sentence. In this case, we also want to protect the English sentence from translation; apply `notranslate`.

```html
<html lang="en">
    <h2>Free interpretation</h2>
    <p lang="en" notranslate>
        If you need free interpretation services in your language,
        call us at <a href="tel:+1-518-453-8137">518-453-8137</a>.
    </p>
    <p lang="ru" notranslate>
        Чтобы получить бесплатные переводческие услуги, позвоните,
        пожалуйста, по следующему номеру:
        <a href="tel:+1-518-453-8137">518-453-8137</a>.
    </p>
    <p lang="ko" notranslate>
        전화 <a href="tel:+1-518-453-8137">518-453-8137</a>
        로 무료 언어 지원 서비스를 요청하십시오.
    </p>
</html>
```

Next on the same page, there are anchor links to dedicated language content below. These provide an interesting example of how well-intentioned code can create usability problems.

#### Text presentation

Language:
<a href="" title="skips to other content on the page" aria-label="English / skips to other content on the page">English</a>
|
<a href="" title="skips to other content on the page" aria-label="Español / skips to other content on the page">Español</a>
|
<a href="" title="skips to other content on the page" aria-label="中文 / skips to other content on the page">中文</a>
|
<a href="" title="skips to other content on the page" aria-label="Русский / skips to other content on the page">Русский</a>
|
<a href="" title="skips to other content on the page" aria-label="বাংলা / skips to other content on the page">বাংলা</a>
|
<a href="" title="skips to other content on the page" aria-label="יידיש / skips to other content on the page">יידיש</a>
|
<a href="" title="skips to other content on the page" aria-label="Kreyòl ayisyen / skips to other content on the page">Kreyòl ayisyen</a>
|
<a href="" title="skips to other content on the page" aria-label="한국어 / skips to other content on the page">한국어</a>
|
<a href="" title="skips to other content on the page" aria-label="Italiano / skips to other content on the page">Italiano</a>
|
عرب<a href="" title="skips to other content on the page" aria-label="عربى / skips to other content on the page">عربى</a>
|
<a href="" title="skips to other content on the page" aria-label="Polski / skips to other content on the page">Polski</a>
|
<a href="" title="skips to other content on the page" aria-label="Français / skips to other content on the page">Français</a>
|
<a href="" title="skips to other content on the page" aria-label="اردو / skips to other content on the page">اردو</a>

#### Problems with the current HTML structure

- Each link has a `title` with English text
- Each link has an `aria-label` with mixed English and non-English text

##### Background knowledge

- When encountered by a screen reader, `aria-label` overrides all other text associated with an element, including the visible, inline text of an HTML anchor link; the user hears the `aria-label` text 
- Localize detects and translates the text values of both `title` and `aria-label`

##### Resulting UX issues

- Visible tooltip text from the `title` attribute will always be in the language of the page, thus will **fail 12 out of 13 times** to match the visible language link name
- Audible screen reader announcements will likewise be **correct only 1 out of 13 times**, when the link language coincidentally is the same as the page language

```html
<html lang="en">
    
    <!-- Problems here! -->
    <ul>
        <li>Language:</li>
        <li>
            <a  href="#eng"
                title="skips to other content on the page"
                aria-label="English / skips to other content on the page">
                English</a>
        </li>
        <li><a  href="#spa"
                title="skips to other content on the page"
                aria-label="Español / skips to other content on the page">
                Español</a>
        </li>
        <li>
            <a  href="#chi"
                title="skips to other content on the page"
                aria-label="中文 / skips to other content on the page">
                中文</a>
        </li>
        <li>
            <a  href="#rus"
                title="skips to other content on the page"
                aria-label="Русский / skips to other content on the page">
                Русский</a>
        </li>
        [...]
    </ul>
</html>
```

#### How to structure the HTML

1. Remove `aria-label` in favor of a visually hidden "screen reader only" CSS class set on a `<span>` next to the visible language name; this will be announced as a complete sentence by screen readers
2. Provide translated text in the target languages up front in the `title` and the `sr-only` hint
3. Specify the appropriate `lang` for either each list item or each anchor link, and block translation with `notranslate`

```html
<html lang="en">
    <ul>
        <li>Language:</li>
        <li notranslate>
            <a href="#eng" title="skips to other content on the page">
                English
                <span class="sr-only">
                    skips to other content on the page
                </span>
            </a>
        </li>
        <li lang="es" notranslate>
            <a href="#spa" title="salta a otros contenidos de la página">
                Español
                <span class="sr-only">
                    salta a otros contenidos de la página
                </span>
            </a>
        </li>
        <li lang="zh-CH" notranslate>
            <a href="#chi" title="跳转至页面上的其他内容">
                中文
                <span class="sr-only">跳转至页面上的其他内容</span>
            </a>
        </li>
        <li lang="ru" notranslate>
            <a href="#rus" title="переход к другому содержимому на странице">
                Русский
                <span class="sr-only">
                    переход к другому содержимому на странице
                </span>
            </a>
        </li>
        [...]
    </ul>
</html>
```
##### sr-only

This "screen reader only" CSS class visually hides text, but it remains accessible in the DOM to screen readers, which will announce it like any other text content.

```css
.sr-only {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  margin: -1px;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
}
```
