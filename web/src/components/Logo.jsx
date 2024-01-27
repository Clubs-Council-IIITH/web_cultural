import Link from "next/link";
import Image from "next/image";

const CCLogoColor = "/assets/cc-logo-full-color.svg";
const IIITHLogo = "/assets/iiith_logo.png"
const BodyLogo = "/assets/body_logo.png"

export default function Logo() {
  return (
    <Link href="/">
      {/* <Image
        priority
        src={IIITHLogo}
        alt="Clubs Council"
        width={128}
        height={64}
        /> */}
      <Image
        priority
        src={BodyLogo}
        alt="Clubs Council"
        width={100}
        height={30}
        style={{ marginLeft: 10, marginTop: 15}}
      />
    </Link>
  );
}
