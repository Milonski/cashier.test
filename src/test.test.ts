test("test", () => {
  expect({}).not.toHaveProperty("error.code", -32000);
});
