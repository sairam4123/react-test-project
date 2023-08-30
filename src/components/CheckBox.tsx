import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Icon } from "./Icon";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

interface ICheckBox
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {}

export function CheckBox({ checked, onChange, ...checkProps }: ICheckBox) {
    return (
        <label className="flex cursor-pointer">
            <input
                type="checkbox"
                className="peer appearance-none"
                checked={checked}
                onChange={onChange}
                {...checkProps}
            />
            <span className="flex my-auto items-center justify-center">
                <Icon className="w-5 h-5 stroke-white">
                    {checked ? <FaCheckCircle /> : <FaCircle />}
                </Icon>
            </span>
        </label>
    );
}
