import { useState } from "react";

export const Dropdown = (props: {
    choices: string[],
    selected: string,
    setSelected: (selected: string) => void,
}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                className="w-40 h-12 bg-gray-800 text-gray-50 font-semibold text-left pl-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                {props.selected}
            </button>
            {isOpen && (
                <div className="absolute w-40 mt-1 bg-gray-800 shadow-lg">
                    {props.choices.map(choice => (
                        <button
                            key={choice}
                            onClick={() => {
                                props.setSelected(choice);
                                setIsOpen(false);
                            }}
                            className="w-full h-12 bg-gray-800 text-white text-left hover:bg-gray-900 pl-4"
                        >
                            {choice}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )

}

