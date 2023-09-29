// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Extend expect with custom matchers.
 * https://github.com/microsoft/playwright/issues/16270
 */
expect.extend({
  async hasAttribute(received, attribute) {
    const pass = await received.evaluate(
      (node, attribute) => node.hasAttribute(attribute),
      attribute
    );

    return {
      message: () => `expected ${received} to have attribute \`${attribute}\``,
      pass,
    };
  },
});

// -----------------------------------

test.describe("Example 1a: Basic Carousel", () => {

  test('On init, first image visible, other 2 are hidden', async ({ page }) => {
    await page.goto('/index.html');

    const el1 = page.locator("#example1a img").nth(0);
    const el2 = page.locator("#example1a img").nth(1);
    const el3 = page.locator("#example1a img").nth(2);

    // First should be visible. Others should be hidden.
    await expect(el1).not.hasAttribute("hidden");
    await expect(el2).hasAttribute("hidden");
    await expect(el3).hasAttribute("hidden");
  });

  test('When clicking the "next" button, we will cycle through the images and wrap around', async ({ page }) => {
    await page.goto('/index.html');

    const el1 = page.locator("#example1a img").nth(0);
    const el2 = page.locator("#example1a img").nth(1);
    const el3 = page.locator("#example1a img").nth(2);

    // Click the 'next' button.
    // Second should be visible. Others should be hidden.
    await page.locator('#example1a #btnNext').first().click();
    await expect(el1).hasAttribute("hidden");
    await expect(el2).not.hasAttribute("hidden");
    await expect(el3).hasAttribute("hidden");

    // Click the 'next' button again.
    // Third should be visible. Others should be hidden.
    await page.locator('#example1a #btnNext').first().click();
    await expect(el1).hasAttribute("hidden");
    await expect(el2).hasAttribute("hidden");
    await expect(el3).not.hasAttribute("hidden");

    // Click the 'next' button again.
    // We should have wrapped around. First should be visible. Others hidden.
    await page.locator('#example1a #btnNext').first().click();
    await expect(el1).not.hasAttribute("hidden");
    await expect(el2).hasAttribute("hidden");
    await expect(el3).hasAttribute("hidden");
  });

  test('When clicking the "previous" button, we will cycle through the images and wrap around', async ({ page }) => {
    await page.goto('/index.html');

    const el1 = page.locator("#example1a img").nth(0);
    const el2 = page.locator("#example1a img").nth(1);
    const el3 = page.locator("#example1a img").nth(2);

    // Click the 'previous' button.
    // We should have wrapped around. Third should be visible. Others should be hidden.
    await page.locator('#example1a #btnPrev').first().click();
    await expect(el1).hasAttribute("hidden");
    await expect(el2).hasAttribute("hidden");
    await expect(el3).not.hasAttribute("hidden");

    // Click the 'previous' button.
    // Second should be visible. Others should be hidden.
    await page.locator('#example1a #btnPrev').first().click();
    await expect(el1).hasAttribute("hidden");
    await expect(el2).not.hasAttribute("hidden");
    await expect(el3).hasAttribute("hidden");

    // Click the 'previous' button.
    // First should be visible. Others hidden.
    await page.locator('#example1a #btnPrev').first().click();
    await expect(el1).not.hasAttribute("hidden");
    await expect(el2).hasAttribute("hidden");
    await expect(el3).hasAttribute("hidden");
  });

  test('Button labels contain the defaults', async ({ page }) => {
    await page.goto('/index.html');

    const elPrev = page.locator("#example1b #btnPrev").first();
    const elNext = page.locator("#example1b #btnNext").first();

    await expect(elPrev).toHaveText(/Previous/);
    await expect(elNext).toHaveText(/Next/);
  });

  test('Buttons do not have ARIA attributes by default', async ({ page }) => {
    await page.goto('/index.html');

    const elPrev = page.locator("#example1b #btnPrev").first();
    const elNext = page.locator("#example1b #btnNext").first();

    await expect(elPrev).not.hasAttribute("aria-label");
    await expect(elNext).not.hasAttribute("aria-label");
  });

  test('Carousel does not have a pagination section by default', async ({ page }) => {
    await page.goto('/index.html');

    const el = page.locator("#example1a #pagination").first();

    await expect(el).toHaveCount(0);
  });

  // @todo ensure all part attributes exist

});

// -----------------------------------

test.describe("Example 1b: Initial slide attribute", () => {

  test('On init, the third slide should be visible due to the initial-slide attribute', async ({ page }) => {
    await page.goto('/index.html');

    const el1 = page.locator("#example1b img").nth(0);
    const el2 = page.locator("#example1b img").nth(1);
    const el3 = page.locator("#example1b img").nth(2);

    // First should be visible. Others should be hidden.
    await expect(el1).hasAttribute("hidden");
    await expect(el2).hasAttribute("hidden");
    await expect(el3).not.hasAttribute("hidden");
  });

});

// -----------------------------------

test.describe("Example 2: Button labels", () => {

  test('We can change navigation button labels', async ({ page }) => {
    await page.goto('/index.html');

    const elPrev = page.locator("#example2 #btnPrev").first();
    const elNext = page.locator("#example2 #btnNext").first();

    await expect(elPrev).toHaveText(/Go back/);
    await expect(elNext).toHaveText(/Go forward/);
  });

});

// -----------------------------------

test.describe("Example 3: Custom button ARIA labels", () => {

  test('Buttons do not have ARIA attributes by default', async ({ page }) => {
    await page.goto('/index.html');

    const elPrev = page.locator("#example3 #btnPrev").first();
    const elPrevLabel = await page.locator("#example3 #btnPrev").first().getAttribute("aria-label");
    const elNext = page.locator("#example3 #btnNext").first();
    const elNextLabel = await page.locator("#example3 #btnPrev").first().getAttribute("aria-label");

    await expect(elPrev).hasAttribute("aria-label");
    await expect(elPrevLabel).toContain("Back message for screenreader");

    await expect(elNext).hasAttribute("aria-label");
    await expect(elNextLabel).toContain("Back message for screenreader");
  });

});

// -----------------------------------

test.describe("Example 4a: Pagination", () => {

  test('Carousel has a pagination section', async ({ page }) => {
    await page.goto('/index.html');

    const el = page.locator("#example4a #pagination").first();
    await expect(el).toHaveCount(1);

    const el1 = page.locator("#example4a #pagination button").nth(0);
    const el2 = page.locator("#example4a #pagination button").nth(1);
    const el3 = page.locator("#example4a #pagination button").nth(2);

    // Each button should have a part attribute.
    await expect(el1).hasAttribute("part");
    await expect(await el1.getAttribute("part")).toEqual("pagination-button active");
    await expect(el2).hasAttribute("part");
    await expect(await el2.getAttribute("part")).toEqual("pagination-button");
    await expect(el3).hasAttribute("part");
    await expect(await el3.getAttribute("part")).toEqual("pagination-button");

    // First button should be disabled. Others should be active.
    await expect(el1).hasAttribute("aria-disabled");
    await expect(el2).not.hasAttribute("aria-disabled");
    await expect(el3).not.hasAttribute("aria-disabled");

    // Each button's label should be the slide number.
    await expect(await el1.innerText()).toEqual("1");
    await expect(await el2.innerText()).toEqual("2");
    await expect(await el3.innerText()).toEqual("3");
  });

  test('Clicking a pagination button should show the correct slide', async ({ page }) => {
    await page.goto('/index.html');

    const img1 = page.locator("#example4a img").nth(0);
    const img2 = page.locator("#example4a img").nth(1);
    const img3 = page.locator("#example4a img").nth(2);

    const el1 = page.locator("#example4a #pagination button").nth(0);
    const el2 = page.locator("#example4a #pagination button").nth(1);
    const el3 = page.locator("#example4a #pagination button").nth(2);

    // Click slide 3.
    await el3.click();
    await expect(img1).hasAttribute("hidden");
    await expect(img2).hasAttribute("hidden");
    await expect(img3).not.hasAttribute("hidden");

    // Click slide 1.
    await el1.click();
    await expect(img1).not.hasAttribute("hidden");
    await expect(img2).hasAttribute("hidden");
    await expect(img3).hasAttribute("hidden");

    // Click slide 2.
    await el2.click();
    await expect(img1).hasAttribute("hidden");
    await expect(img2).not.hasAttribute("hidden");
    await expect(img3).hasAttribute("hidden");
  });

  test('When the prev/next buttons are clicked, the active pagination button updates', async ({ page }) => {
    await page.goto('/index.html');

    const img1 = page.locator("#example4a img").nth(0);
    const img2 = page.locator("#example4a img").nth(1);
    const img3 = page.locator("#example4a img").nth(2);

    const el1 = page.locator("#example4a #pagination button").nth(0);
    const el2 = page.locator("#example4a #pagination button").nth(1);
    const el3 = page.locator("#example4a #pagination button").nth(2);

    const elNext = page.locator("#example4a #btnNext").first();

    // Click "Next". The second pagination item should show active now.
    await elNext.click();

    await expect(await el1.getAttribute("part")).toEqual("pagination-button");
    await expect(await el2.getAttribute("part")).toEqual("pagination-button active");
    await expect(await el3.getAttribute("part")).toEqual("pagination-button");

    await expect(el1).not.hasAttribute("aria-disabled");
    await expect(el2).hasAttribute("aria-disabled");
    await expect(el3).not.hasAttribute("aria-disabled");
  });

});

// -----------------------------------

test.describe("Example 4b: Pagination button labels are removed", () => {

  test('We can remove pagination button labels', async ({ page }) => {
    await page.goto('/index.html');

    const el1 = page.locator("#example4b #pagination button").nth(0);
    const el2 = page.locator("#example4b #pagination button").nth(1);
    const el3 = page.locator("#example4b #pagination button").nth(2);

    await expect(await el1.innerText()).toEqual("");
    await expect(await el2.innerText()).toEqual("");
    await expect(await el3.innerText()).toEqual("");
  });

});

// -----------------------------------

test.describe("Example 4c: Pagination custom button labels", () => {

  test('We can supply a label template string', async ({ page }) => {
    await page.goto('/index.html');

    const el1 = page.locator("#example4c #pagination button").nth(0);
    const el2 = page.locator("#example4c #pagination button").nth(1);
    const el3 = page.locator("#example4c #pagination button").nth(2);

    await expect(await el1.innerText()).toEqual("Item 1");
    await expect(await el2.innerText()).toEqual("Item 2");
    await expect(await el3.innerText()).toEqual("Item 3");
  });

});

// -----------------------------------

test.describe("Example 4d: Unique pagination labels per button", () => {

  test('We can define custom labels per button', async ({ page }) => {
    await page.goto('/index.html');

    const el1 = page.locator("#example4d #pagination button").nth(0);
    const el2 = page.locator("#example4d #pagination button").nth(1);
    const el3 = page.locator("#example4d #pagination button").nth(2);

    await expect(await el1.innerText()).toEqual("Island");
    await expect(await el2.innerText()).toEqual("Pipes");
    await expect(await el3.innerText()).toEqual("Tractor");
  });

});

// -----------------------------------

test.describe("Example 5a: Custom CSS styling", () => {

  test('We can apply custom styles', async ({ page }) => {
    await page.goto('/index.html');

    await expect(await page.locator("#example5a #btnPrev")).toHaveCSS("background-color", "rgb(255, 255, 0)"); // yellow
    await expect(await page.locator("#example5a #btnNext")).toHaveCSS("background-color", "rgb(173, 216, 230)"); // lightblue
    await expect(await page.locator("#example5a #pagination")).toHaveCSS("background-color", "rgb(204, 204, 204)");

  });

});

// -----------------------------------

test.describe("Example 6: Custom HTML template", () => {

  test('We can use a custom HTML template', async ({ page }) => {
    await page.goto('/index.html');

    const el = page.locator("#example6 [part='container']").first();
    await expect(el).toHaveCount(1);
  });

});

// -----------------------------------

test.describe("Example 7a: Javascript control", () => {

  test('We can control the carousel via javascript', async ({ page }) => {
    await page.goto('/index.html');

    // Tell the carousel to advance to the 'next' item.
    await page.evaluate(() => document.querySelector("#example7a").next());

    const el1 = page.locator("#example7a img").nth(0);
    const el2 = page.locator("#example7a img").nth(1);
    const el3 = page.locator("#example7a img").nth(2);

    // Second should be visible. Others should be hidden.
    await expect(el1).hasAttribute("hidden");
    await expect(el2).not.hasAttribute("hidden");
    await expect(el3).hasAttribute("hidden");

    // Again, tell the carousel to advance to the 'next' item.
    await page.evaluate(() => document.querySelector("#example7a").next());

    // Third should be visible. Others should be hidden.
    await expect(el1).hasAttribute("hidden");
    await expect(el2).hasAttribute("hidden");
    await expect(el3).not.hasAttribute("hidden");

    // Navigate back to the previous slide.
    await page.evaluate(() => document.querySelector("#example7a").previous());

    // Third should be visible. Others should be hidden.
    await expect(el1).hasAttribute("hidden");
    await expect(el2).not.hasAttribute("hidden");
    await expect(el3).hasAttribute("hidden");
  });

});

// -----------------------------------

// @todo mutation observer?

