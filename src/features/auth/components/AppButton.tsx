import { ButtonThemeProps } from "@/src/types/themes";
import Link from "next/link";

type ButtonProps = {
  pathName: string;
  label: string;
  theme?: ButtonThemeProps;
  onClick?: () => void;
};

export const AppButton = ({ pathName, label, theme }: ButtonProps) => {
  // const className = {
  //   midGreenBtn: " bg-app-midgreen text-app-salmon",
  //   salmonBtn: " text-app-midgreen bg-app-salmon",
  // };
  // let themeColor =
  //   pathname === "/campaigns"
  //     ? " text-app-midgreen bg-app-salmon"
  //     : " bg-app-midgreen text-app-salmon";

  let defaultTheme = {
    bgColor: "app-midgreen",
    textColor: "app-salmon",
  };

  const themeVal = { ...defaultTheme, ...theme };
  return (
    <Link
      href={pathName}
      className={`inline-flex rounded-lg px-5 py-3 text-sm font-medium bg-${themeVal.bgColor} text-${themeVal.textColor}  hover:scale-110 hover:transition-transform hover:duration-500`}
    >
      {label}
    </Link>
  );
};
