import Logo from "./logo";
import {ThemeSwitch} from "./theme-switch";
import UploadButton from "./upload/upload-button";

const Navbar = () => {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-6 py-4 backdrop-blur-md lg:px-8">
      <Logo />

      <div className="flex items-center gap-2.5">
        <ThemeSwitch />

        <div className="flex min-w-8">
          <UploadButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
