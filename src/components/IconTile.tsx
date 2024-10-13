import { Service } from "../models/Service";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useInterval } from "../utils/useInterval";
import { useCallback, useEffect, useState } from "react";

export const IconTile = (props: {
    service: Service
}) => {

    const defaultDisplayName = props.service.displayName ?? props.service.id.replace(/-/g, " ").replace(/_/g, " ");

    const [counter, setCounter] = useState<number>(0);
    const [src, setSrc] = useState<string>(`/data/aws/2022/services/icons/${props.service.categories[0]}/${props.service.id}.2022.16.svg`);

    const changeToNextIcon = useCallback(() => {
        setCounter(counter + 1);
        setSrc(`/data/aws/2022/services/icons/${props.service.categories[counter % props.service.categories.length]}/${props.service.id}.2022.16.svg`);
    }, [counter, props.service.categories, props.service.id]);

    useEffect(() => {
        if (props.service.categories.length === 1) {
            return;
        }
        const id = setInterval(() => {
            changeToNextIcon();
        }, 1000);
        return () => clearInterval(id);
    }, [changeToNextIcon]);

    return (
        <div className="h-60 w-52 p-8 bg-gray-800 flex flex-col items-center hover:bg-gray-900 hover:cursor-pointer">
            <div className="flex items-center justify-center h-20 w-20">
                <LazyLoadImage
                    delayTime={100}
                    delayMethod="debounce"
                    threshold={100}
                    src={src}
                    alt={props.service.displayName ?? defaultDisplayName}
                    className="h-16 w-16"
                />
            </div>
            <p className="text-orange-400 font-semibold text-center">{props.service.displayName ?? defaultDisplayName}</p>
        </div>
    )

}
