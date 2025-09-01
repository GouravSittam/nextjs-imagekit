import Link from "next/link";

const Footer = () => {
  return (
    <div className="font-montserrat mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
      <p className="flex items-center gap-2 text-center text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-puppies-play ml-2.5 scale-160">Moments.</span>
      </p>

      <Link href="#" target="_blank" rel="noreferrer">
        project by <span className="font-medium">gobu</span>
      </Link>
    </div>
  );
};

export default Footer;
