import PDFParser from "pdf2json";
import mammoth from 'mammoth';
import * as cheerio from 'cheerio';
import fs from "fs";

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
        16 && stringLine === stringLine.toUpperCase() && /[a-z]/i.test(stringLine)
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


export const processDocx=async(fileName: string)=>{
  let titles=await mammoth.convertToHtml({path: fileName})
      .then((result) => {
        const html = result.value;
        const $ = cheerio.load(html);
        const paragraphs: string[] = [];
        const sectionTitles: string[] = [];

        $('p').each((i, element) => {
          paragraphs.push($(element).text());
        });

        $('strong, em').each((i, element) => {
          sectionTitles.push($(element).text());
        });

        $('h1, h2, h3, h4, h5, h6').each((i, element) => {
          sectionTitles.push($(element).text());
        });

        $('li').each((i, element) => {
          paragraphs.push($(element).text());
        });

        // console.log('Paragraphs:', paragraphs);
        // console.log('Section Titles:', sectionTitles);
        return sectionTitles.filter(
              (stringLine) =>
                  stringLine.split(" ").filter((stringLine) => stringLine !== "").length <
                  16 && stringLine === stringLine.toUpperCase() && /[a-z]/i.test(stringLine));
      })

  return {titles,text:(await mammoth.extractRawText({path: fileName})).value};
}