import {test} from '../fixtures/userGaragePageFixtures'

test.describe('Using fixtures', () => {
    test('Add BMW X5 to Garage', async ({garagePage}) => {
      await garagePage.open()
      await garagePage.addNewCar('BMW', 'X5', '333')
      await garagePage.verifyLastAddedCarName('BMW X5')
      })


})