import { useEffect } from "react";
import Home from "./pages/Home";
import { SortingContextProvider } from "./contexts/SortingContext";

function App() {

    return (
        <SortingContextProvider>
            <Home />
        </SortingContextProvider>
    )
}

export default App;