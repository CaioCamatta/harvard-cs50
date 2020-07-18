/* --------------- TESTING --------------- */
// TEST PYRAMID
// Methodology for determining test scale/granularity
// Bottom: Unit test (unit of code like a class or method)
// Middle: Integration/Service tests (the integration of multiple pieces of code working together, independent of the UI)
// UI/End-to-end tests (test a feature thoroughly includinh UI, network calls, etc)

const {
  LOG_IN_SENT,
  LOG_IN_FULFILLED,
} = require("./src12/before/redux/actions");

// UNIT TESTS
// Test an individual unit of code (function/class/method)
// Very granular, so easy to tell what's breaking
// The most basic test is a fucntion that notifies you when the behavior is unexpected
// Test frameworks give you additional benefits
//  run all tests instead of failing on first
//  pretty output
//  automatically watch for changes
//  mocked functions

// JEST
// Test framework by facebook
// can also run it passively. In package.json: {"test:watch": "jest --watch"}
// toBe compares by reference. toEqual checks the values instead of just the records
test("Sums 0 and 5", () => {
  expect(sum(0, 5)).toBe(5);
});

// JEST: TESTING REDUX ACTIONS
// we can replace our functions with Jest's expect(), toBe() or toEqual().
// we can user snapshots to compare the output of a function to the previous output of the function. And get notified if anything changes. If the changes were intended, we dont need to rewrite the tests
//   use toBe() for primitives
//   use toEqual() for objects that shouldn’t change
//   use snapshots for objects that may change
test("updateUser returns an action", () => {
  expect(actions.updateUser({ name: "test name" }).toMatchSnapshot);
});
// Will compare future actions.updateUser({ name: "test name" }) to the result of the actions.updateUser({ name: "test name" }) saved in the snapshot
// Can group tests together using describe() and it()

// JEST ASYNC REDUX ACTIONS
// Jest is smart enough to wait for promises to resolve. Also supports async/await
// Use mock function to test the links between code by capturing calls to the function, capturing instances of the constructor, and testing the return values
it("dispatches LOG_IN_SENT with correct creds", async () => {
  const mockDispatch = jest.fn();
  const mockLogin = (username, password) => {
    if (username === "u" && password === "p") {
      return "thisIsATestToken";
    }
    throw new Error("incorrect creds");
  };
  await actions.logInUser("u", "p", mockLogin)(mockDispatch);
  // mockDispatch.mock.calls // all the args that the mock fn was invoked on
  expect(mockDispatch.mock.calls[1][0]).toEqual({
    type: LOG_IN_FULFILLED,
    payload: { token: "thisIsATestToken" },
  });
  expect(mockDispatch.mock.calls[1]).toMatchSnapshot();
});
// with dependecy injections, we can pass functions to the tests as an argument

// TEST REDUCER
const DEFAULT_STATE = { user: {}, contacts: {} };
decribe("contact reducer", () => {
  it("successfully adds new user", () => {
    expect(
      reducer(DEFAULT_STATE, actions.addContact({ name: "user", phone: "123" }))
    ).toMatchSnapshot();
  });
});

// INTEGRATION TESTS
// We can use Jest’s snapshot testing to test components
// react-test-renderer allows us to render components outside the context of an app. jest-expo has all the config
MyButton = <Button title="test" onPress={() => {}} />; // example
describe("MyButton", () => {
  it("renders", () => {
    const button = renderer.create(<MyButton />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("correctly overrites default colour", () => {
    const color = "red";
    const button = renderer.create(<MyButton color={color} />).root;
    expect(button.props.color).toBe(color);
  });
});

// CODE COVERAGE
// Metric for tracking how well an application is covereds
// ○ Statements: How many statements in the program have been executed?
// ○ Branches: How many of the possible code paths have been executed?
// ○ Functions: How many of the defined function been executed?
// ○ Lines: How many of the lines have been executed?
// can pass flag "--coverage" from jest 

// END-TO-END
// Wix's Detox simulates an end user using the app.