import { useState } from "react";
import NavBar from "../components/NavBar";

const SearchPage = () => {
    const [query, setQuery] = useState("");

    return (<>
        <NavBar />
        <div className="max-w-2xl mx-auto p-6 pt-24">
            <h1>Temp Page</h1>
            <h1 className="text-2xl font-bold mb-4">Search Dev Sphere</h1>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search posts, users, or tags..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border rounded px-3 py-2"
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>


        </div>
    </>
    );
};

export default SearchPage;
