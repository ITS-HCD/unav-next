# UNav Implementation Guide

The New York State Universal Navigation (UNav) is a standardized header and footer that appears on all public-facing New York State websites. The UNav is designed to provide a consistent user experience across all state websites, making it easier for visitors to navigate and understand the information they find.

## Header Embed Code

> [!IMPORTANT]  
> Place this code at the very top of your site, outside of any container divs, and as close to the opening `<body>` tag as possible. The header should expand to 100% of the screen width, even if your current site has a fixed width.

```html
<!-- NYS UNAV HEADER -->	
<div id="nygov-universal-navigation" class="nygov-universal-container" data-iframe="true" data-updated="2024-08-26 12:00">
  <script type="text/javascript">
    var _NY = {
      HOST: "unav24-stage.pages.dev",
      BASE_HOST: "unav24-stage.pages.dev",
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
        bundle.src = "//unav24-stage.pages.dev/unav/js/unav-bundle.js";
        head.appendChild(bundle);
    }(document));
  </script>
</div>
```

## Footer Embed Code

> [!IMPORTANT]
> Place this code at the very bottom of your site, outside of any container divs, and as close to the closing `</body>` tag as possible. The footer should expand to 100% of the screen width, even if your current site has a fixed width.

```html
  <!-- NYS UNAV FOOTER -->
  <div id="nygov-universal-footer" class="nygov-universal-container"></div>
```

## Available Settings

The UNav can be customized to fit the needs of your site. The following settings can be adjusted in the header embed code:

Setting | Description | Default
:--- | :--- | :---
:warning: `hideSettings` | _Deprecated option for hiding legacy settings link._ | `true`
`hideSearch` | Hides the search icon in the header. [More details.](/notes/search.md) | `true`
`showLanguageHeader` | Displays the language switcher in the header. [More details.](/notes/translate.md) | `false`
`showLanguageFooter` | Displays the language switcher in the footer. [More details.](/notes/translate.md) | `false`
