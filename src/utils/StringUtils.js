function capitalize(text) {
  const splittedTextInArr = text.split("-");
  const capitalizedWordsArr = splittedTextInArr.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const capitalizedText = capitalizedWordsArr.join(" ");

  return capitalizedText;
}

function splitAndJoin(text) {
  const splittedAndJoined = text.split("-").join(" ");
  return splittedAndJoined;
}

module.exports = { capitalize, splitAndJoin };
