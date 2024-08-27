# NY State Universal Navigation (UNav)

> [!WARNING]  
> This repo is still in beta. There will be more technical implementation details and demos coming in the next few weeks.

The updated version of the New York State Universal Navigation (UNav) is **set to launch on October 1, 2024**, bringing significant improvements to the digital experience across all public-facing NYS websites. This update aligns with federal standards for accessibility and security, ensuring a more consistent and trustworthy user experience.

The update UNav features:

-	A new banner explaining how to identify an official NY.gov site and how to know that a site is secure, helping visitors understand the site is an official New York State government site;
-	The service links have been removed from the top to simplify the interface and help visitors stay on task;
-	The translation menu/language switcher was integrated into the banner to take up less vertical space on the page;
-	Search was incorporated more naturally into the design of the UNav;
-	Mobile-responsiveness has been improved: translation and search features expand to fill larger screens, but collapse on smaller screens to save space.

<img width="468" alt="Updated UNav" src="./notes/updated-unav.png"> 

## Getting Started

- [Frequently Asked Questions](https://bit.ly/unav-intake) — Answers to common questions about the updated UNav, from timing to policy clarifications.
- [UNav Detector](https://bit.ly/unav-check) — Not sure what version of the UNav your site is using? Use the UNav Detector to identify your UNav implementation type, whether it’s hosted on a .ny.gov domain, and if HTTPS is enabled.

## Technical Details

> [!CAUTION]  
> The UNav should only be used on official NYS websites or applications that are hosted a ny.gov domain and secured with HTTPS encryption. If you have questions about whether your site is eligible to use the UNav, please contact the NYS Design System Team via our [intake form](https://bit.ly/unav-intake).

- [Implementation Guide](/notes/implementation.md) — Details on how to implement the UNav on your site, including code snippets and instructions.
- [UNav Search](/notes/search.md) — Display options, domain-specific search, and implementation details.
- [UNav Translate](/notes/translate.md) — Display options, placement details, and Smartling integration.
- [Alerts and CTA](/notes/alerts.md) — How the UNav handles alerts in the header and statewide calls-to-action (CTAs) in the footer.


## UNav Demo
  
- [Staging Demo](https://unav24-stage.pages.dev/unav/tests/stage) — Live demo of the updated UNav, including search, translate, and alerts.

## Questions

Questions and exception requests can be submitted to the NYS Design System Team via our [intake form](https://bit.ly/unav-intake).
