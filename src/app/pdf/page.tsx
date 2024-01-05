"use client";

import html2canvas from "html2canvas";

import jsPDF from "jspdf";
import Image from "next/image";
import Info from "@/app/pdf/components/info";
import { PDFDocument, rgb } from "pdf-lib";
import {useEffect, useRef, useState} from "react";

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import dynamic from "next/dynamic";
import {Viewer} from "@react-pdf-viewer/core";
import {renderToString} from "react-dom/server";
import SignDesign from "@/app/pdf/pageDesign";



function divideArrayIntoSubsets(array: string[], numberOfSubsets: number) {
  const subsets = [];
  const subsetSize = Math.ceil(array.length / numberOfSubsets);

  for (let i = 0; i < numberOfSubsets; i++) {
    subsets.push(array.slice(i * subsetSize, (i + 1) * subsetSize));
  }

  return subsets;
}


const signees = [
  'example@example.com',
  'example2@emaple.com',
  'example3@example.com',
  'example4@example.com',
  'example5@exmaple.com',
  'example6@exmaple.com',
  'example7@exmaple.com'
];




const PdfPage = () => {

  const inputRef = useRef(null);
  const [pdfBlob, setPDFBlob] = useState<Blob>()
  const [subsets, setSubsets] = useState(divideArrayIntoSubsets(signees, Math.ceil(signees.length/2)))



  useEffect(() => {
    (async () => {

      const sign1 = document.getElementById('divToPrint-0')

      if(sign1){

        const subsets = divideArrayIntoSubsets(signees, 3)

        console.log(subsets)


        const url1 = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
        const pdfRes = await fetch(url1);
        const pdf = await pdfRes.arrayBuffer()

        const pdfDoc = await PDFDocument.load(pdf)



        let pdfDocument

        for(let i = 0; i < subsets.length; i++){
          //@ts-ignore
          const htmlElement = await html2canvas(document.getElementById(`divToPrint-${i}`), {scale: 1})
          const imgData = htmlElement.toDataURL('image/png')

          const image = await pdfDoc.embedPng(imgData);

          const page = pdfDoc.addPage()
          // const pageHeight = page.getHeight();

          //convert your htmlDesign to image


          page.drawImage(image, {
            x: 0,
            y: 0,
            width: page.getWidth(),
            height: page.getHeight(),
          });

          pdfDocument = await pdfDoc.save()
        }



        if(pdfDocument){
          const blob = new Blob([pdfDocument], {type: 'application/pdf'})
          setPDFBlob(blob)
        }


      }


    })()

  }, []);





  // const printDocument = async () => {
  //   const input = inputRef.current;
  //
  //   html2canvas(input!)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       // const pdf = new jsPDF();
  //       // pdf.addImage(imgData, "PNG", 0, 0);
  //       return imgData
  //     })
  //     .then((blob) => appendToPdf(blob));
  // };




  // const appendToPdf = async (originalPdfBlob: Blob) => {
  //   // Load the existing PDF document
  //   const existingPdfBytes = await originalPdfBlob.arrayBuffer();
  //   const firstPdfDoc = await PDFDocument.load(existingPdfBytes);
  //
  //   const image = firstPdfDoc.embe
  //
  //   const secondDonorPdfBytes = await fetch(url1).then((res) =>
  //     res.arrayBuffer(),
  //   );
  //
  //   console.log("second pdf", secondDonorPdfBytes);
  //   //Resolves with a document loaded
  //   //@ts-ignore
  //   if (secondDonorPdfBytes) {
  //     const secondPdfDoc = await PDFDocument.load(
  //       secondDonorPdfBytes as ArrayBuffer,
  //     );
  //
  //     const pdfDoc = await PDFDocument.create();
  //     const [copiedpage1] = await pdfDoc.copyPages(firstPdfDoc, [0]);
  //
  //     pdfDoc.addPage(copiedpage1);
  //     // iterate over all pages and append to doc
  //     //@ts-ignore
  //     for (const [index, page] of secondPdfDoc.getPages().entries()) {
  //       const copiedPage = await pdfDoc.copyPages(secondPdfDoc, [index]);
  //       pdfDoc.addPage(copiedPage[0]);
  //     }
  //
  //     const pdfBytes = await pdfDoc.save();
  //
  //     // Download the modified PDF
  //     download(pdfBytes, "modified_document.pdf", "application/pdf");
  //   }
  // };

  // Function to download data to a file
  // function download(data, filename, type) {
  //   const file = new Blob([data], { type: type });
  //   const a = document.createElement("a");
  //   const url = URL.createObjectURL(file);
  //   a.href = url;
  //   a.download = filename;
  //   document.body.appendChild(a);
  //   a.click();
  //   setTimeout(() => {
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   }, 0);
  // }

  return (
    <>
      <div className={"w-full space-y-4"}>

        {
          pdfBlob && (
            <iframe
              src={URL.createObjectURL(pdfBlob)}
              className={'w-full h-screen'}
            />
          )
        }

        {
          subsets.map((emails, key) => (
            <SignDesign
              key={key}
              id={key}
              emails={emails}
            />
          ))
        }

        {/*<button onClick={printDocument}>Print to PDF</button>*/}
      </div>
    </>
  );
};

export default PdfPage;
