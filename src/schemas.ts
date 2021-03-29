// TODO: https://ajv.js.org

export function successSchema(resultSchema) {
  return {
    type: "object",
    required: ["jsonrpc", "result", "id"],
    properties: {
      id: { type: "integer" },
      jsonrpc: { type: "string" },
      result: resultSchema,
    },
    additionalProperties: false,
  };
}

export function failureSchema(
  errorSchema = {
    type: "object",
    additionalProperties: true,
  }
) {
  return {
    type: "object",
    required: ["jsonrpc", "error", "id"],
    properties: {
      id: { type: "integer" },
      jsonrpc: { type: "string" },
      error: errorSchema,
    },
    additionalProperties: false,
  };
}

const userSchema = {
  type: "object",
  required: ["id", "login", "name", "role"],
  properties: {
    id: {
      type: "integer",
    },
    login: {
      type: "string",
    },
    name: {
      type: "string",
    },
    role: {
      type: "string",
    },
  },
  additionalProperties: false,
};

const response = {
  type: "object",
  required: ["jsonrpc", "result", "id"],
  properties: {
    jsonrpc: {
      type: "string",
    },
    result: userSchema,
    id: {
      type: "integer",
    },
  },
  additionalProperties: false,
};

successSchema(userSchema);
function arraySchema(itemSchema) {
  return {
    type: "array",
    additionalItems: true,
    items: {
      anyOf: [itemSchema],
    },
  };
}
successSchema(arraySchema(userSchema));
