import Image from "next/image";
import Link from "next/link";

import ROUTES from "@/constants/routes";
import {cn} from "@/lib/utils";

type LogoProps = {
  width?: number;
  height?: number;
  classNames?: {
    base?: string;
    image?: string;
    text?: string;
  };
};

const Logo = ({
  width = 36,
  height = 36,
  classNames = {base: "", image: "size-7", text: "scale-280 pl-4"},
}: LogoProps) => {
  return (
    <Link href={ROUTES.HOME}>
      <div className={`flex items-center gap-2.5 ${classNames.base}`}>
        <Image
          src="/moments.svg"
          alt="Moments"
          width={width}
          height={height}
          className={cn(
            "object-contain invert dark:invert-0",
            classNames.image
          )}
        />

        <div
          className={`font-puppies-play pb-[4px] font-medium ${classNames.text}`}
        >
          moments
        </div>
      </div>
    </Link>
  );
};

export default Logo;
