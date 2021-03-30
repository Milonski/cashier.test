const fs = require("fs");
const jsonFile = process.argv[2];
const content = fs.readFileSync(jsonFile).toString();
const json = JSON.parse(content);

const assertionResults = json["testResults"][0]["assertionResults"];

for (let i = 0; i < assertionResults.length; i++) {
  const previousAssertionResult = assertionResults[i - 1];
  const currentAssertionResult = assertionResults[i];

  for (let j = 0; j < currentAssertionResult["ancestorTitles"].length; j++) {
    const previousAncestorTitle =
      previousAssertionResult?.["ancestorTitles"]?.[j];
    const currentAncestorTitle = currentAssertionResult["ancestorTitles"][j];

    if (previousAncestorTitle !== currentAncestorTitle) {
      console.log("".padStart(j + 1, "#"), currentAncestorTitle);
    }
  }

  console.log(
    `- [${currentAssertionResult.status === "passed" ? "x" : " "}] ${
      currentAssertionResult.title
    }`
  );
}
