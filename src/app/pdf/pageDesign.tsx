import Image from "next/image";
import Info from "@/app/pdf/components/info";

interface Props {
  emails: string[],
  id: number
}

const SignDesign = (props: Props) => {
  // Your JSX goes here
  return (
    <div
      id={`divToPrint-${props.id}`}
      style={{
        // backgroundColor: "#f5f5f5",
        backgroundColor: "pink",
        width: "210mm",
        minHeight: "297mm",
        position: 'absolute',
        left: '-9999px',
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
        {
          props.emails.map((email, key) => (
            <div key={key} className={"rounded-lg bg-[#E8E8E8] "}>
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
                    <p>{email}</p>
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
          ))
        }

        <Info />
      </div>
    </div>
  );
};

export default SignDesign