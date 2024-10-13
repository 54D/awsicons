import { createContext, useContext, useState } from "react";

export type SortingContextType = {
    sortField: "category" | "name",
    setSortField: (sortField: "category" | "name") => void,
    sortDirection: "ascending" | "descending",
    setSortDirection: (sortDirection: "ascending" | "descending") => void,
};

const SortingContext = createContext<SortingContextType>({
    sortField: "category",
    setSortField: () => { },
    sortDirection: "ascending",
    setSortDirection: () => { },
});

export const SortingContextProvider = (props: { children: React.ReactNode }) => {
    const [sortField, setSortField] = useState<"category" | "name">("category");
    const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("ascending");
    return (
        <SortingContext.Provider value={{ sortField, setSortField, sortDirection, setSortDirection }}>
            {props.children}
        </SortingContext.Provider >
    )
}

export const useSorting = () => {
    return useContext(SortingContext);
}