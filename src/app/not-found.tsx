import Link from "next/link";

import {Button} from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <p className="text-muted-foreground line-clamp-3 text-xl">
          Oops, the moment you are looking for does not exist.
        </p>
      </div>
      <Link href={ROUTES.HOME}>
        <Button
          variant="secondary"
          className="cursor-pointer rounded-full bg-gradient-to-bl from-pink-400 to-pink-800 px-5 text-white"
          size="lg"
        >
          Add your Moments
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
