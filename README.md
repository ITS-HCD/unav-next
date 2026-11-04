# NY State Universal Navigation (UNav)

The New York State Universal Navigation (UNav) is meant to improve the digital experience across all public-facing NYS websites. It unifies common user needs like translation and search. This update aligns with federal standards for accessibility and security, ensuring a more consistent and trustworthy user experience.

<img width="468" alt="Updated UNav" src="./notes/updated-unav.png"> 

The UNav features:

- A NYS-branded banner
- A trust bar - explaining how to identify an official NY.gov site and how to know that a site is secure
- A translation language switcher configured for multiple Translation as a Service providers
- A search field and button

## Getting Started

- [Frequently Asked Questions](https://bit.ly/unav-intake) — Answers to common questions about the updated UNav, from timing to policy clarifications.

## Technical Details

The UNav is built from two [NYS Design System](https://designsystem.ny.gov) web components: `<nys-unavheader>` and `<nys-unavfooter>`.

- [Implementation Guide](/notes/implementation.md) — Loading the components, header and footer settings, events, and migrating from the script embed.
- [UNav Search](/notes/search.md) — Domain-scoped search, using your own search page, and hiding search.
- [UNav Translate](/notes/translate.md) — TaaS vendor switching, changing the list of languages, and hiding the language selector.
- [Alerts and CTA](/notes/alerts.md) — How the UNav handles alerts in the header and statewide calls-to-action (CTAs) in the footer.

> [!CAUTION]  
> The UNav should only be used on official NYS websites or applications that are hosted a ny.gov domain and secured with HTTPS encryption. If you have questions about whether your site is eligible to use the UNav, please contact the NYS Design System Team via our [intake form](https://bit.ly/unav-intake).


## UNav Demo
  
- [Staging Demo](https://stage.static-assets.ny.gov/unav/tests/cf/stage) — Live demo of the updated UNav, including search, translate, and alerts.

## Questions

Questions and exception requests can be submitted to the NYS Design System Team via our [intake form](https://bit.ly/unav-intake).
