import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FinalReport, InterviewSessionItem } from '../types';

export interface PDFExportOptions {
  roleTitle: string;
  experienceLevel: string;
  report: FinalReport;
  sessionItems: InterviewSessionItem[];
}

export async function generateThemedPDF(
  elementId: string,
  fileName: string = 'Interview_Evaluation_Report.pdf'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id ${elementId} not found`);
  }

  // Generate canvas from DOM element with high resolution
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#f9f9ff',
    windowWidth: 1200,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = imgHeight;
  let pageNumber = 1;

  // First page
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
  heightLeft -= pdfHeight;

  // Subsequent pages if content overflows A4 height
  while (heightLeft > 0) {
    const position = -(pageNumber * pdfHeight);
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;
    pageNumber++;
  }

  pdf.save(fileName);
}
