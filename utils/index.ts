import PDFParser from "pdf2json";

export const getTitlesFromPdf = (c: any) => {
  let titles: string[] = [];
  let text = "";
  c["Pages"].forEach((page: any) => {
    let cache = "";
    page["Texts"].forEach((vt: any) => {
      if (vt["R"][0]["TS"][2] && vt["R"][0]["TS"][1] > 13)
        cache = cache + decodeURIComponent(vt["R"][0]["T"]);
      else if (cache) {
        titles.push(cache);
        cache = "";
      }
      text = text + decodeURIComponent(vt["R"][0]["T"]);
    });
    if (cache) titles.push(cache);
  });
  titles = titles.filter(
    (stringLine) =>
      stringLine.split(" ").filter((stringLine) => stringLine !== "").length <
        16 && stringLine === stringLine.toUpperCase()
  );

  titles = titles.map((title) => title.replaceAll("  ", ""));

  return { titles };
};

export const processPDF2 = async (filePath: string) => {
  return await new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", (errData: any) =>
      reject(errData.parserError)
    );
    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      let titlesAndText = getTitlesFromPdf(pdfData);

      resolve(titlesAndText);
    });
    pdfParser.loadPDF(filePath);
  });
};
