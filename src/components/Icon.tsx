import { ReactNode } from "react";
import { IconContext } from "react-icons";

type IconProps = {
    className: string;
    children?: ReactNode;
};

export function Icon({ className, children }: IconProps) {
    return (
        <IconContext.Provider
            value={{
                className: className,
            }}>
            {children}
        </IconContext.Provider>
    );
}
