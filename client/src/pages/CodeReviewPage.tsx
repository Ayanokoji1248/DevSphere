import { useState } from "react";
import NavBar from "../components/NavBar";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/themes/prism.css";


type LanguageOptions = "javascript" | "python" | "java" | "c" | "cpp";

const CodeReviewPage = () => {
    const [code, setCode] = useState(`function greet(name) {
  return "Hello " + name;
}`);
    const [language, setLanguage] = useState<LanguageOptions>("javascript");

    const languageMap: Record<LanguageOptions, Prism.Grammar> = {
        javascript: languages.javascript,
        python: languages.python,
        java: languages.java,
        c: languages.c,
        cpp: languages.cpp,
    };

    return (
        <div className="w-full min-h-screen bg-black overflow-auto">
            <NavBar />
            <div className="text-white pt-20 max-w-7xl mx-auto px-4">
                <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition">← Back</button>
                <div className="flex gap-5 items-center my-4">
                    <h1 className="text-xl font-semibold font-[Albert_Sans]">Select Language</h1>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as LanguageOptions)}
                        className="bg-gray-800 text-white px-4 py-2 rounded"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>

                <div className="flex flex-col md:flex-row w-full gap-4 pb-5">
                    <div className="w-full md:w-1/2 border border-gray-700 h-[550px] overflow-hidden rounded-md p-2 relative">
                        <button className="absolute z-10 bottom-5 right-5 cursor-pointer font-[Albert_Sans] text-sm font-semibold tracking-tight p-2 text-zinc-950 bg-white rounded-md">Code Review</button>
                        <Editor
                            className="bg-zinc-900 font-mediumsdfsdf"
                            value={code}
                            onValueChange={setCode}
                            highlight={(code) =>
                                highlight(code, languageMap[language], language)
                            }
                            padding={10}
                            style={{
                                fontFamily: "Albert Sans",
                                fontSize: 16,
                                // color: "#f8f8f2",
                                whiteSpace: "pre",
                                overflow: "auto",
                                maxHeight: "100%",
                                height: "100%",
                            }}
                        />

                    </div>


                    <div className="w-full md:w-1/2 border border-gray-700 rounded-md p-4 bg-gray-900">
                        <h2 className="text-lg font-semibold mb-2">Code Preview:</h2>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeReviewPage;
