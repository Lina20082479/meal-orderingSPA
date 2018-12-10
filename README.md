# Assignment 2 - Vue app - Automated development process.

Name: Linan Chen

Student No.:  20082479

## Overview.

After resgister and login, customers can view the dish menu and make an order by clicking the button. They also can submit their order and view their order.
After login, the administrator can modify the dish menu by adding, deleting and editing the dish menu. They also can view customer orders.

## E2E Testing.

     $ npx cypress run --spec cypress/integration/home.spec.js

     ================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:  3.1.3                                                            │
  │ Browser:  Electron 59 (headless)                                           │
  │ Specs:    1 found (home.spec.js)                                           │
  │ Searche…  cypress/integration/home.spec.js                                 │
  └────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────

  Running: home.spec.js...                                             (1 of 1)


  Home Page
    The user views the dishes
      ✓ allows a dish to be searched (18942ms)
      ✓ allows a search information to be cleared (4428ms)
      ✓ allows dishes to be sorted by dish name from A to Z (2165ms)
      ✓ allows dishes to be sorted by price from low to high (2334ms)
    The user make an order
      ✓ allows a dish to be added to the order (2134ms)
      ✓ allows a dish to be deleted from the order (2844ms)
      ✓ allows the order to be submited (6877ms)
    The user view their order
      ✓ allows the user to view their order (7408ms)


  8 passing (48s)


  (Results)

  ┌────────────────────────────┐
  │ Tests:        8            │
  │ Passing:      8            │
  │ Failing:      0            │
  │ Pending:      0            │
  │ Skipped:      0            │
  │ Screenshots:  0            │
  │ Video:        true         │
  │ Duration:     47 seconds   │
  │ Spec Ran:     home.spec.js │
  └────────────────────────────┘


  (Video)

  - Started processing:   Compressing to 32 CRF
  - Finished processing:  /Users/apple/Desktop/assignment2/MealOrdering-vueClient/cypress/videos/home.spec.js.mp4 (6 seconds)


================================================================================

  (Run Finished)


      Spec                                    Tests  Pass…  Fail…  Pend…  Skip…
  ┌────────────────────────────────────────────────────────────────────────────┐
  │ ✔ home.spec.js                    00:47      8      8      -      -      - │
  └────────────────────────────────────────────────────────────────────────────┘
    All specs passed!                 00:47      8      8      -      -      -


## Continuous Integration.

https://travis-ci.org/Lina20082479/meal-orderingSPA

## Automated Deployment.

http://standing-class.surge.sh/

## Extra features.

Administrator login in :
email: root@meal.ie
password: 123456

## Appendix.

     $ npx cypress run

================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:  3.1.3                                                            │
  │ Browser:  Electron 59 (headless)                                           │
  │ Specs:    3 found (home.spec.js, login.spec.js, Manage.spec.js)            │
  └────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────

  Running: home.spec.js...                                             (1 of 3)


  Home Page
    The user views the dishes
      ✓ allows a dish to be searched (7283ms)
      ✓ allows a search information to be cleared (4108ms)
      ✓ allows dishes to be sorted by dish name from A to Z (2100ms)
      ✓ allows dishes to be sorted by price from low to high (1929ms)
    The user make an order
      ✓ allows a dish to be added to the order (2281ms)
      ✓ allows a dish to be deleted from the order (2173ms)
      ✓ allows the order to be submited (6943ms)
    The user view their order
      ✓ allows the user to view their order (7179ms)


  8 passing (34s)


  (Results)

  ┌────────────────────────────┐
  │ Tests:        8            │
  │ Passing:      8            │
  │ Failing:      0            │
  │ Pending:      0            │
  │ Skipped:      0            │
  │ Screenshots:  0            │
  │ Video:        true         │
  │ Duration:     34 seconds   │
  │ Spec Ran:     home.spec.js │
  └────────────────────────────┘


  (Video)

  - Started processing:   Compressing to 32 CRF
  - Finished processing:  /Users/apple/Desktop/assignment2/MealOrdering-vueClient/cypress/videos/home.spec.js.mp4 (4 seconds)


────────────────────────────────────────────────────────────────────────────────

  Running: login.spec.js...                                            (2 of 3)


  Login
    ✓ login in fail (3819ms)
    ✓ allows a valid user to sign in (2614ms)
    ✓ allows a valid user to log out (272ms)


  3 passing (7s)


  (Results)

  ┌─────────────────────────────┐
  │ Tests:        3             │
  │ Passing:      3             │
  │ Failing:      0             │
  │ Pending:      0             │
  │ Skipped:      0             │
  │ Screenshots:  0             │
  │ Video:        true          │
  │ Duration:     6 seconds     │
  │ Spec Ran:     login.spec.js │
  └─────────────────────────────┘


  (Video)

  - Started processing:   Compressing to 32 CRF
  - Finished processing:  /Users/apple/Desktop/assignment2/MealOrdering-vueClient/cypress/videos/login.spec.js.mp4 (0 seconds)


────────────────────────────────────────────────────────────────────────────────

  Running: Manage.spec.js...                                           (3 of 3)


  Manage
    The administrator changes the menu
      ✓ allows dished to be added (13524ms)
      ✓ allows a dish to be deleted (8718ms)
      ✓ allows a dish to be edited (5920ms)
    The administrator view the customer orders
      ✓ allows the administrator to view the customer orders (3169ms)


  4 passing (32s)


  (Results)

  ┌──────────────────────────────┐
  │ Tests:        4              │
  │ Passing:      4              │
  │ Failing:      0              │
  │ Pending:      0              │
  │ Skipped:      0              │
  │ Screenshots:  0              │
  │ Video:        true           │
  │ Duration:     31 seconds     │
  │ Spec Ran:     Manage.spec.js │
  └──────────────────────────────┘


  (Video)

  - Started processing:   Compressing to 32 CRF
  - Finished processing:  /Users/apple/Desktop/assignment2/MealOrdering-vueClient/cypress/videos/Manage.spec.js.mp4 (3 seconds)


================================================================================

  (Run Finished)


      Spec                                    Tests  Pass…  Fail…  Pend…  Skip…
  ┌────────────────────────────────────────────────────────────────────────────┐
  │ ✔ home.spec.js                    00:34      8      8      -      -      - │
  ├────────────────────────────────────────────────────────────────────────────┤
  │ ✔ login.spec.js                   00:06      3      3      -      -      - │
  ├────────────────────────────────────────────────────────────────────────────┤
  │ ✔ Manage.spec.js                  00:31      4      4      -      -      - │
  └────────────────────────────────────────────────────────────────────────────┘
    All specs passed!                 01:12     15     15      -      -      -