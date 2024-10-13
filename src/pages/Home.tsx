import { Suspense, useEffect, useState } from "react";
import { Sort } from "@mui/icons-material";
import { IconTile } from "../components/IconTile";
import { Service } from "../models/Service";
import { useSorting } from "../contexts/SortingContext";
import { Dropdown } from "../components/Dropdown";
import { useSuspense } from "../utils/useSuspense";


export function ServiceTiles() {

    const { sortField } = useSorting();

    const data = useSuspense<Service[]>(
        fetch("/data/aws/2022/services/services.json")
            .then((response) => response.json())
            .then((response: { [serviceName: string]: { categories: string[] } }) => {
                const services = Object.keys(response).map((serviceName) => {
                    return {
                        id: serviceName,
                        categories: response[serviceName].categories
                    };
                });
                return services;
            })
        , []);

    return (<div className={"flex flex-wrap justify-center basis-8 bg-gray-800 p-8"}>
        {[...(data.read() || [])
            .sort((a, b) => {
                if (sortField === "category") {
                    return -1;
                } else {
                    return (a.id ?? "").localeCompare(b.id ?? "");
                }
            })]
            .map((tile) => {
                return (
                    <IconTile key={tile.id} service={tile} />
                );
            })
        }
    </div>);

}

function Home() {

    const { sortField, setSortField, sortDirection, setSortDirection } = useSorting();

    return (
        <div className={"h-100 w-100"}>
            <div className={"flex flex-wrap justify-center bg-gray-900 p-8 pb-4"}>
                <h1 className={"text-4xl text-white"}>AWS Icons</h1>
            </div>
            <div className={"flex flex-wrap items-center justify-end bg-gray-900 p-8 pt-4"}>
                <Sort />
                <Dropdown choices={["category", "name"]}
                    selected={sortField}
                    setSelected={(selected) => setSortField(selected as "category" | "name")}
                />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <ServiceTiles />
            </Suspense>
        </div>
    )
}

export default Home;