import test, { expect } from '@playwright/test'
import AuthController from '../../api/controllers/AuthControllers'
import CarsController from '../../api/controllers/CarsController'
import { CarsFactory } from '../../api/factory/CarsFactory'

let authController: AuthController
let carsController: CarsController

test.describe('API Requests', () => {
  test.beforeEach(async ({ request }) => {
    authController = new AuthController(request)
    carsController = new CarsController(request)
  })
  test.describe('Public', () => {
    test('Get brands', async () => {
      const response = await carsController.getBrands()
      const body = await response.json()
      expect(response.status()).toBe(200)
      expect(body.data).toHaveLength(5)
    })
  })

  test.describe('Private with Controllers Positive and Negative', () => {
    let sid: string
    let carIdForRemoving: number

    test.beforeAll(async ({ request }) => {
      authController = new AuthController(request)
      carsController = new CarsController(request)
      sid = await authController.getAuthCookie(
        process.env.VALID_USER1!,
        process.env.VALID_PASS1!
      )

      const carToAdd = CarsFactory.createCar(2, 9, 999)

      const createCarForRemoving = await carsController.addCar(carToAdd, sid)
      const body = await createCarForRemoving.json()
      carIdForRemoving = body.data.id
    })

    test('Get added cars', async () => {
      const response = await carsController.getUserCars(sid)
      expect(response.status()).toBe(200)
    })

    test('Add new car BMW X6', async () => {
      const carToAdd = CarsFactory.createCar(2, 9, 100500)
      const response = await carsController.addCar(carToAdd, sid)
      const body = await response.json()

      expect(response.status()).toBe(201)
      expect(body.data.carBrandId).toBe(carToAdd.carBrandId)
      expect(body.data.carModelId).toBe(carToAdd.carModelId)
      expect(body.data.mileage).toBe(carToAdd.mileage)
      expect(body.data.initialMileage).toBe(carToAdd.mileage)
      expect(body.data.brand).toBe('BMW')
    })

    test('Delete car by id', async () => {
      const response = await carsController.deleteCar(carIdForRemoving, sid)
      const body = await response.json()
      expect(body.data.carId).toBe(carIdForRemoving)
      expect(response.status()).toBe(200)
    })

    test('Add invalid car data', async () => {
      const carToAdd = CarsFactory.createCar(6, 1, 900)
      const response = await carsController.addCar(carToAdd, sid)
      const body = await response.json()

      expect(response.status()).toBe(404)
      expect(body.status).toBe('error')
      expect(body.message).toBe('Brand not found')
    })

    test('Edit invalid car data', async () => {
      const carToAdd = CarsFactory.EditCar(6, 1, 900)
      const response = await carsController.addCar(carToAdd, sid)
      const body = await response.json()

      expect(response.status()).toBe(404)
      expect(body.status).toBe('error')
      expect(body.message).toBe('Brand not found')
    })
  })
})
