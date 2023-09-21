# carousel-js Changelog

  - v2.3.1 (2023-09-20)
    - Bugfix: Navigation elements are now properly centered when pagination is disabled

  - v2.3.0 (2023-09-20)
    - Feature: Adds new attribute `pagination` that, if present, will add interactive pagination buttons to the carousel
    - Feature: Exposes shadow DOM elements for CSS styling via custom `::part` names

  - v2.2.0 (2023-09-16)
    - Feature: Adds attributes `label-prev`, `label-next`, `aria-prev`, `aria-next` to allow customizing the text and aria-labels of the previous/next buttons

  - v2.1.1 (2023-08-20)
    - Maintenance: Updates README to include how to detect state changes, and documents the `.state` property

  - v2.1.0 (2023-08-16)
    - Feature: Adds `template-id` attribute on the main carousel element, which allows specifying a custom HTML template to use for the carousel

  - v2.0.0 (2023-08-15)
    - Breaking change: This is now a custom web component: `<carousel-ithreads>`

  - v1.0.0 (2023-08-14)
    - Initial release
