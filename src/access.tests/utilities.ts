export function expectHasAccess(response) {
  //expect(response).not.toHaveProperty("error");
  // expect(response).not.toHaveProperty("error.code");
  expect(response).not.toHaveProperty("error.code", -32001);
}

export function expectHasNotAccess(response) {
  // expect(response).toHaveProperty("error");
  // expect(response).toHaveProperty("error.code");
  expect(response).toHaveProperty("error.code", -32001);
}
