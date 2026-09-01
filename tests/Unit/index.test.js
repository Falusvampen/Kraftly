import { it, expect, vi } from 'vitest'; //import it, expect, and vi from vitest for testing

vi.mock('vue-router', async function (importOriginal) {
  //Vitest mocks vue-router module.
  const originalVueRouter = await importOriginal(); //Stores results from importOriginal

  function mockWebHistory() {
    const memoryHistoryObject = originalVueRouter.createMemoryHistory(); //creates a Vue Router MemoryHistory object

    return memoryHistoryObject;
  }

  const mockedVueRouter = {
    ...originalVueRouter, //... copies all properties from originalVueRouter into mockedVueRouter
    createWebHistory: mockWebHistory, // Replace createWebHistory with our mock
  };

  return mockedVueRouter;
});

/*^-------Mocks our vue-router */

/*Vi-test somehow magically makes sure that our import is replaced by the mocked version
I have no idea how that works but it does and I wish it was more explicit. :|*/

import router from '../../src/router/index.js'; //<--- SOMEHOW index.js receives mockedVueRouter instead of vue-router.

it('has a login route', function () {
  //add more URL-checks later?
  const routes = router.getRoutes();
  let urlFound = false;

  for (const route of routes) //for-loop to check if the login route exists!
  {
    if (route.path === '/login') {
      urlFound = true;
    }
  }

  expect(urlFound).toBe(true); //if found pass, else fail
});
/*^-------Tests if the login route exists */
