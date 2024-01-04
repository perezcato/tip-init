import Image from "next/image";

const Info = () => {
  return (
    <div className={"rounded-lg bg-[#CCEAFB]"}>
      <div className={"flex gap-x-4 items-center p-2 px-5 justify-between"}>
        <div className={"text-sm space-y-1"}>
          <p className={"font-bold"}>Dokument przekazany do podpisu przez</p>
          <p className={"font-normal"}>
            Wiktor Kowlaki (wiktor.kowalski@gmail.com) został <br />{" "}
            zabezieczony pieczęcią elekroniczną przed wprowadzeniem zmian
          </p>
        </div>
        <div className={"relative h-24 w-36 p-5 shrink-0"}>
          <Image
            src={
              "https://res.cloudinary.com/de7vnmsw5/image/upload/v1704361537/SignedContractImages/certifiedImg_yvzbi9.svg"
            }
            alt={"logo"}
            fill
            className={"object-contain"}
          />
        </div>
      </div>
      <div
        className={
          "bg-[#0098E9] rounded-b-lg p-2 px-5 text-white text-right text-xs"
        }
      >
        06.05.2023, 11:41
      </div>
    </div>
  );
};

export default Info;
