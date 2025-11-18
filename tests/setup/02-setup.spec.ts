import test, { expect } from "@playwright/test";
import UsersController from "../../api/controllers/UsersController";
import { UsersFactory } from "../../api/factory/UsersFactory";

test. describe('Create users', () => {
    let usersController: UsersController;

    test.beforeEach(({request}) => {
        usersController = new UsersController(request)
    })
test ('Create Main User', async () => {
    const user = UsersFactory.createUser(process.env.TEST_USER_NAME!,process.env.TEST_USER_LASTNAME!, process.env.VALID_USER!, process.env.VALID_PASS1!, process.env.VALID_PASS1!)
    const {name, lastName, email, password, repeatPassword} = user
    const response = await usersController.registerUser(name, lastName, email, password, repeatPassword)
    expect(response.status()).toBe(201)

})

})