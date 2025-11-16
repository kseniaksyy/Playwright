import { test } from '../fixtures/screenSizeFixtures'

test.describe('Using fixtures', () => {
  test('Open wiki via smallScreen', async ({ smallScreen }) => {
    await smallScreen.goto('https://www.wikipedia.org/')
    await smallScreen.waitForTimeout(2000)
  })

  test('Open wiki via mediumScreen', async ({ mediumScreen }) => {
    await mediumScreen.goto('https://www.wikipedia.org/')
    await mediumScreen.waitForTimeout(2000)
  })

  test('Open wiki via largeScreen', async ({ largeScreen }) => {
    await largeScreen.goto('https://www.wikipedia.org/')
    await largeScreen.waitForTimeout(2000)
  })
})
