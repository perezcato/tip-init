import Link from "next/link";

export default function Home() {
  return (
    <main className=" h-full">
      <h1>welcome home</h1>
      <div className={"flex gap-5 text-purple-600"}>
        <Link href="/pdf">pdftest</Link>
      </div>
    </main>
  );
}
