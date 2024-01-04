"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import Info from "@/app/pdf/components/info";
import { PDFDocument } from "pdf-lib";
import { useRef } from "react";

const PdfPage = () => {
  const url1 = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
  const firstDonorPdfBytes = fetch(url1).then((res) => res.arrayBuffer());
  const inputRef = useRef(null);
  const printDocument = async () => {
    const input = inputRef.current;

    html2canvas(input!)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        return pdf.output("blob");
      })
      .then((blob) => appendToPdf(blob));
  };

  const appendToPdf = async (originalPdfBlob: Blob) => {
    console.log("called", originalPdfBlob);
    // Load the existing PDF document
    const existingPdfBytes = await originalPdfBlob.arrayBuffer();
    const firstPdfDoc = await PDFDocument.load(existingPdfBytes);

    const secondDonorPdfBytes = await fetch(url1).then((res) =>
      res.arrayBuffer(),
    );

    console.log("second pdf", secondDonorPdfBytes);
    //Resolves with a document loaded
    //@ts-ignore
    if (secondDonorPdfBytes) {
      const secondPdfDoc = await PDFDocument.load(
        secondDonorPdfBytes as ArrayBuffer,
      );

      const pdfDoc = await PDFDocument.create();
      const [copiedpage1] = await pdfDoc.copyPages(firstPdfDoc, [0]);

      pdfDoc.addPage(copiedpage1);
      // iterate over all pages and append to doc
      //@ts-ignore
      for (const [index, page] of secondPdfDoc.getPages().entries()) {
        const copiedPage = await pdfDoc.copyPages(secondPdfDoc, [index]);
        pdfDoc.addPage(copiedPage[0]);
      }

      const pdfBytes = await pdfDoc.save();

      // Download the modified PDF
      download(pdfBytes, "modified_document.pdf", "application/pdf");
    }
  };

  // Function to download data to a file
  function download(data, filename, type) {
    const file = new Blob([data], { type: type });
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  return (
    <div className={"w-full space-y-4"}>
      hello pdf
      <div
        ref={inputRef}
        id="divToPrint"
        className=""
        style={{
          // backgroundColor: "#f5f5f5",
          backgroundColor: "pink",
          width: "210mm",
          minHeight: "297mm",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className={"p-10"}>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"flex items-center justify-between"}>
              <h2>Hello there</h2>
              <div className={"relative h-10 w-20"}>
                <Image
                  src={"/assets/logo.svg"}
                  alt={"logo"}
                  fill
                  className={"object-contain"}
                />
              </div>
            </div>
            <p>Lorem ipsum dolor sit amet.</p>
            <p className={"w-3/4"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi
              consectetur culpa ea error exercitationem expedita magnam possimus
              soluta, vitae.
            </p>
          </div>
        </div>
        {/* Your page content */}
        <div
          className={"bg-img px-8 py-1 space-y-4"}
          // style={{
          //   borderImage: "url('/assets/border-img.svg')",
          //   borderImageRepeat: "round",
          //   borderImageSlice: "30",
          //   border: "10px",
          // }}
        >
          <Info />
          <div className={"rounded-lg bg-[#E8E8E8] "}>
            <div className={"grid grid-cols-2 gap-4 px-6 py-4"}>
              <div className={"space-y-2"}>
                <div className={"flex items-center gap-x-4"}>
                  <p
                    data-name={"contract-role"}
                    className={"text-base font-semibold"}
                  >
                    Zleceniodawca
                  </p>
                  <p
                    className={
                      "px-3 py-1 bg-[#64BE79] rounded-md font-semibold text-xs"
                    }
                  >
                    Podpisane
                  </p>
                </div>
                <div className={"text-sm font-normal space-y-1"}>
                  <p>Martyna Wielkanocna</p>
                  <p>martyna.wielkanocna@gmail.com</p>
                  <p>+48 530 200 003</p>
                </div>
              </div>
              <div className={"flex items-center gap-x-4"}>
                <div className={"relative h-12 w-16 p-5 shrink-0"}>
                  <Image
                    src={
                      "https://res.cloudinary.com/de7vnmsw5/image/upload/v1704361553/SignedContractImages/signedImg_pzabfq.svg"
                    }
                    alt={"logo"}
                    fill
                    className={"object-contain"}
                  />
                </div>
                <div>
                  <p className={"text-xs font-bold mb-2"}>
                    Podpis elektroniczny zabezpieczony pieczęcią InBillo
                  </p>
                  <p className={"text-xs font-normal mb-1"}>
                    Uwierzytelnienie: e-mail
                  </p>
                  <p className={"text-xs font-normal"}>
                    Powód: Podpisanie dokumentu
                  </p>
                </div>
              </div>
            </div>
            <div
              data-name={"signed-date"}
              className={
                "bg-black rounded-b-lg p-2 px-5 text-white text-right text-xs"
              }
            >
              06.05.2023, 11:41
            </div>
          </div>
          <div className={"rounded-lg bg-[#E8E8E8] "}>
            <div className={"grid grid-cols-2 gap-4 px-6 py-4"}>
              <div className={"space-y-2"}>
                <div className={"flex items-center gap-x-4"}>
                  <p
                    data-name={"contract-role"}
                    className={"text-base font-semibold"}
                  >
                    Zleceniodawca
                  </p>
                  <p
                    className={
                      "px-3 py-1 bg-[#64BE79] rounded-md font-semibold text-xs"
                    }
                  >
                    Podpisane
                  </p>
                </div>
                <div className={"text-sm font-normal space-y-1"}>
                  <p>Martyna Wielkanocna</p>
                  <p>martyna.wielkanocna@gmail.com</p>
                  <p>+48 530 200 003</p>
                </div>
              </div>
              <div className={"flex items-center gap-x-4"}>
                <div className={"relative h-12 w-16 p-5 shrink-0"}>
                  <Image
                    src={
                      "https://res.cloudinary.com/de7vnmsw5/image/upload/v1704361553/SignedContractImages/signedImg_pzabfq.svg"
                    }
                    alt={"logo"}
                    fill
                    className={"object-contain"}
                  />
                </div>
                <div>
                  <p className={"text-xs font-bold mb-2"}>
                    Podpis elektroniczny zabezpieczony pieczęcią InBillo
                  </p>
                  <p className={"text-xs font-normal mb-1"}>
                    Uwierzytelnienie: e-mail
                  </p>
                  <p className={"text-xs font-normal"}>
                    Powód: Podpisanie dokumentu
                  </p>
                </div>
              </div>
            </div>
            <div
              data-name={"signed-date"}
              className={
                "bg-black rounded-b-lg p-2 px-5 text-white text-right text-xs"
              }
            >
              06.05.2023, 11:41
            </div>
          </div>
          <div className={"rounded-lg bg-[#E8E8E8] "}>
            <div className={"grid grid-cols-2 gap-4 px-6 py-4"}>
              <div className={"space-y-2"}>
                <div className={"flex items-center gap-x-4"}>
                  <p
                    data-name={"contract-role"}
                    className={"text-base font-semibold"}
                  >
                    Zleceniodawca
                  </p>
                  <p
                    className={
                      "px-3 py-1 bg-[#64BE79] rounded-md font-semibold text-xs"
                    }
                  >
                    Podpisane
                  </p>
                </div>
                <div className={"text-sm font-normal space-y-1"}>
                  <p>Martyna Wielkanocna</p>
                  <p>martyna.wielkanocna@gmail.com</p>
                  <p>+48 530 200 003</p>
                </div>
              </div>
              <div className={"flex items-center gap-x-4"}>
                <div className={"relative h-12 w-16 p-5 shrink-0"}>
                  <Image
                    src={
                      "https://res.cloudinary.com/de7vnmsw5/image/upload/v1704361553/SignedContractImages/signedImg_pzabfq.svg"
                    }
                    alt={"logo"}
                    fill
                    className={"object-contain"}
                  />
                </div>
                <div>
                  <p className={"text-xs font-bold mb-2"}>
                    Podpis elektroniczny zabezpieczony pieczęcią InBillo
                  </p>
                  <p className={"text-xs font-normal mb-1"}>
                    Uwierzytelnienie: e-mail
                  </p>
                  <p className={"text-xs font-normal"}>
                    Powód: Podpisanie dokumentu
                  </p>
                </div>
              </div>
            </div>
            <div
              data-name={"signed-date"}
              className={
                "bg-black rounded-b-lg p-2 px-5 text-white text-right text-xs"
              }
            >
              06.05.2023, 11:41
            </div>
          </div>
          <Info />
        </div>
      </div>
      <button onClick={printDocument}>Print to PDF</button>
    </div>
  );
};

export default PdfPage;
