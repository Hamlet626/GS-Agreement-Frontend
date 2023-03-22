export function textToParagraphArray(bigString: string) {
    const separator = "\n\n";
    const regex = new RegExp(`(${separator})+`);
    const nastyArray = bigString.split(regex);
    return nastyArray.filter((string) => !string.startsWith("\n\n"));
  }