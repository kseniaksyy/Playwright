import test, { expect } from '@playwright/test'
import SignInForm from '../../../pom/forms/SignInForm'
import HomePage from '../../../pom/pages/HomePage'
import AuthController from '../../../api/controllers/AuthControllers'

let signInForm: SignInForm
let homePage: HomePage
let authController: AuthController

test.beforeEach(async ({ page }) => {
  signInForm = new SignInForm(page)
  homePage = new HomePage(page)
})

test('Mock response', async ({ page }) => {
  await homePage.open()
  await homePage.clickSignInButton()
  await page.route('**/api/cars', async (route) => {
    await route.fulfill({
      status: 404,
      contentType: 'text/plain',
      body: 'Not found!',
    })
  })

  await signInForm.loginWithCredentials(
    process.env.VALID_USER1!,
    process.env.VALID_PASS1!
  )
  await expect(
    page.getByText('You don’t have any cars in your garage')
  ).toBeVisible()
})

test.describe('API Requests', () => {
  test.describe('Public', () => {
    test('Get brands', async ({ request }) => {
      const response = await request.get('api/cars/brands')
      const body = await response.json()

      expect(response.status()).toBe(200)
      expect(body.data[0].title).toBe('Audi')
      expect(body.data.lenght).toBe(5)
    })
  })

  test.describe('Private', () => {
    let sid: string
    let carIdForRemoving: string

    test.beforeAll(async ({ request }) => {
      const authRequest = await request.post('/api/auth/signin', {
        data: {
          email: process.env.VALID_USER1!,
          password: process.env.VALID_PASS1!,
          remember: false,
        },
      })
      sid = authRequest.headers()['set-cookie'].split(';')[0]

      const carToAdd = {
        carBrandId: 2,
        carModelId: 9,
        mileage: 9999,
      }

      const createCarForRemoving = await request.post('/api/cars/', {
        data: carToAdd,
        headers: {
          Cookie: sid,
        },
      })
      const body = await createCarForRemoving.json()
      carIdForRemoving = body.data.id
    })

    test('Get added cars', async ({ request }) => {
      const response = await request.get('/api/cars', {
        headers: {
          Cookie: sid,
        },
      })
      const body = await response.json()
      expect(response.status()).toBe(200)
    })

    test('Add new car BMW X6', async ({ request }) => {
      const response = await request.post('/api/cars', {
        data: {
          carBrandId: 2,
          carModelId: 9,
          mileage: 9999,
        },
        headers: {
          Cookie: sid,
        },
      })
      expect(response.status()).toBe(201)
    })

    test('Delete car by id', async ({ request }) => {
      const response = await request.delete(`/api/cars/${carIdForRemoving}`, {
        headers: {
          Cookie: sid,
        },
      })
      const body = await response.json()
      expect(body.data.carId).toBe(carIdForRemoving)
      expect(response.status()).toBe(200)
    })
  })

  test.describe('Private with Controllers', () => {
    let sid: string
    let carIdForRemoving: string

    test.beforeAll(async ({ request }) => {
      authController = new AuthController(request)

      sid = await authController.getAuthCookie(
        process.env.VALID_USER1!,
        process.env.VALID_PASS1!
      )

      const carToAdd = {
        carBrandId: 2,
        carModelId: 9,
        mileage: 9999,
      }

      const createCarForRemoving = await request.post('/api/cars/', {
        data: carToAdd,
        headers: {
          Cookie: sid,
        },
      })
      const body = await createCarForRemoving.json()
      carIdForRemoving = body.data.id
    })

    test('Get added cars', async ({ request }) => {
      const response = await request.get('/api/cars', {
        headers: {
          Cookie: sid,
        },
      })
      const body = await response.json()
      expect(response.status()).toBe(200)
    })

    test('Add new car BMW X6', async ({ request }) => {
      const response = await request.post('/api/cars', {
        data: {
          carBrandId: 2,
          carModelId: 9,
          mileage: 9999,
        },
        headers: {
          Cookie: sid,
        },
      })
      expect(response.status()).toBe(201)
    })

    test('Delete car by id', async ({ request }) => {
      const response = await request.delete(`/api/cars/${carIdForRemoving}`, {
        headers: {
          Cookie: sid,
        },
      })
      const body = await response.json()
      expect(body.data.carId).toBe(carIdForRemoving)
      expect(response.status()).toBe(200)
    })
  })
})
