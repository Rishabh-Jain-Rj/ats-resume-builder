"use client";

export const generatePDFFromHTML = async (htmlContent, fileName) => {
  try {
    // Dynamic import to avoid SSR issues
    const html2pdf = (await import("html2pdf.js")).default;

    const element = document.createElement("div");
    element.innerHTML = htmlContent;

    const options = {
      margin: [12, 12, 12, 12], // Updated margins to 0.5 inches (12mm) for ATS compliance
      filename: `${fileName}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    await html2pdf().set(options).from(element).save();
  } catch (error) {
    console.error("PDF generation error:", error);
    // Fallback to print dialog if html2pdf fails
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  }
};
