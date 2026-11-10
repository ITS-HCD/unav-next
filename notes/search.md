# UNav Search

<img src="search.png" alt="UNav Search Functionality" width="640">

Search is shown by default. On wide screens it's an inline search field. On narrow screens it collapses to a search button that opens the field below the header.

## How It Works

When a visitor submits a search, the header sends them to the statewide search service at `search.its.ny.gov`, scoped to the domain they searched from. In other words, if a visitor searches while on a page on the `its.ny.gov` domain, the results come from `its.ny.gov`.

## Using your own search page

See [Custom search endpoint](https://designsystem.ny.gov/components/unavheader/#custom-search-endpoint)

## Handling search in JavaScript

See [Javascript events](https://designsystem.ny.gov/components/unavheader/#event-details)

## Hiding search

See [Hiding search](https://designsystem.ny.gov/components/unavheader/#search-off)

> [!NOTE]
> The script embed hid search by default. The component shows it by default, so add `hideSearch` if your site had search off.
