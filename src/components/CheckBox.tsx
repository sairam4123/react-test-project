import {
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
} from "react";
import { Icon } from "./Icon";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface ICheckBox
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {}

export function CheckBox({
    checked,
    onChange,
    className,
    ...checkProps
}: ICheckBox) {
    const [checkedState, setCheckedState] = useState(checked);
    const inputCheckboxRef = useRef<HTMLInputElement | null>(null);

    function handleClick(event: React.MouseEvent<HTMLSpanElement>) {
        event.preventDefault();
        inputCheckboxRef.current?.focus();
        setCheckedState(!checkedState);
    }

    function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
        event.preventDefault();
        if (event.key === "Enter") {
            setCheckedState(!checkedState);
        }
    }
    useEffect(() => {
        setCheckedState(checked);
    }, [checked]);

    return (
        <label className="flex cursor-pointer">
            <span
                className="flex my-auto items-center justify-center"
                onClick={handleClick}>
                <input
                    type="checkbox"
                    ref={inputCheckboxRef}
                    className="peer sr-only"
                    checked={checkedState}
                    onChange={onChange}
                    onKeyUp={handleKeyUp}
                    {...checkProps}
                />
                <Icon
                    className={twMerge(
                        "w-5 h-5 fill-red-500 bg-red-200 rounded-full border hover:fill-red-400 hover:bg-red-100 peer-focus:outline-none peer-focus:ring-1 peer-focus:border peer-focus:ring-red-100",
                        className
                    )}>
                    {checkedState ? <FaCheckCircle /> : <FaCircle />}
                </Icon>
            </span>
        </label>
    );
}
