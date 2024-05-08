import pyntegrate from "../index.mjs";
import assert from "node:assert";
const example = pyntegrate(import.meta.resolve("./test.py"));
const secret = example("secret", Number);
assert.strictEqual(await secret.value, 5);
const question = example("question");
assert.strictEqual(
  await question.call("who's there?"),
  "The question is the answer: who's there?."
);
