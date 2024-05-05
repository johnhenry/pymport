import mod from "./index.mjs";
try {
  const example = mod("test.py");
  const secret = example("secret");
  console.log("Revealed:", await secret.value); // logs: 4
  const question = example("question");
  console.log("Answer:", await question.call("who's there?")); // logs:" The question is the answer: who's there?."
} catch (e) {
  console.error(e);
}
