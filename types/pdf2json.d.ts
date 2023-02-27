declare module "pdf2json" {
  class PDFParser {
    on(event: string, handler: (data: any) => void): void;
    loadPDF(pdfFilePath: string): void;
    loadPDFBuffer(pdfBuffer: Buffer): void;
    process(): void;
    PDFJS: typeof PDFJS;
  }

  export = PDFParser;
}
