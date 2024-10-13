import { useCallback, useEffect, useState } from "react";

export function useSuspense<T = any>(promise: Promise<T>, refetchDependencies: any[]) {
    const [status, setStatus] = useState<"pending" | "resolved" | "rejected">("pending");
    const [result, setResult] = useState<T | undefined>(undefined);

    useEffect(() => {
        setResult(undefined);
        setStatus("pending");
        promise
            .then((result) => {
                setResult(result);
                setStatus("resolved");
            })
            .catch((error) => {
                setResult(error);
                setStatus("rejected");
            });
    }, refetchDependencies);

    const read = useCallback(() => {
        if (status === "pending") {
            return;
        } else if (status === "rejected") {
            throw result;
        } else if (status === "resolved") {
            return result;
        }
    }, [status, result]);

    return { read };

}

//export function suspenseAwareFetch<T>(url: string) {
//    const promise = fetch(url)
//        .then((response) => response.json())
//        .then((response) => {
//            console.log("response", response);
//            return response as T;
//        });
//
//    return useSuspense<T>(promise);
//}