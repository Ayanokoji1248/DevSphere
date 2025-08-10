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
import "prismjs/themes/prism-tomorrow.css"; // ✅ Prism theme
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import { BACKEND_URL } from "../utils";
import { ArrowLeft } from "lucide-react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useLoadingStore } from "../store/loadingStore";
import Loader from "../components/Loader";

type LanguageOptions = "javascript" | "python" | "java" | "c" | "cpp";

const CodeReviewPage = () => {

    const navigate = useNavigate();

    const [code, setCode] = useState(`function greet(name) {
  return \`Hello \${name}\`;
}`);
    const [language, setLanguage] = useState<LanguageOptions>("javascript");
    const [review, setReview] = useState("");
    // const [loading, setLoading] = useState(false);
    const { setLoading, loading } = useLoadingStore()

    const languageMap: Record<LanguageOptions, Prism.Grammar> = {
        javascript: languages.javascript,
        python: languages.python,
        java: languages.java,
        c: languages.c,
        cpp: languages.cpp,
    };

    const getReviewCode = async () => {
        try {
            setReview("");
            setLoading(true);
            const response = await axios.post(
                `${BACKEND_URL}/ai/code-review`,
                { code },
                { withCredentials: true }
            );
            setReview(response.data.review);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-black overflow-auto">
            <NavBar />
            <div className="text-white pt-20 max-w-7xl mx-auto px-4">
                <Button
                    text="Back"
                    variant="black"
                    size="sm"
                    leftIcon={<ArrowLeft size={18} />}
                    onClick={() => navigate('/home')}
                />

                <div className="flex gap-5 items-center my-4">
                    <h1 className="text-xl font-semibold font-[Albert_Sans]">Select Language</h1>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as LanguageOptions)}
                        className="bg-zinc-800 border-[1px] border-zinc-700 text-white px-4 py-2 rounded"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>

                <div className="flex flex-col md:flex-row w-full gap-4 pb-5">
                    {/* Code Editor */}
                    <div
                        className={`w-full md:w-1/2 border border-gray-700 h-[550px] overflow-hidden rounded-md p-2 relative`}
                    >
                        {loading &&
                            <div className="w-full h-full bg-transparent absolute z-[99] flex justify-center items-center">
                                <Loader />
                            </div>
                        }
                        <Editor
                            className={`bg-zinc-900 ${loading && "blur-xs"}`}
                            value={code}
                            onValueChange={setCode}
                            highlight={(code) => highlight(code, languageMap[language], language)}
                            padding={10}
                            style={{
                                fontFamily: "Fira Code, monospace",
                                fontSize: 16,
                                whiteSpace: "pre",
                                overflow: "auto",
                                maxHeight: "100%",
                                height: "100%",
                                color: "#f8f8f2",
                            }}
                        />
                        <button
                            onClick={getReviewCode}
                            className={`absolute z-10 bottom-5 right-5 cursor-pointer font-[Albert_Sans] text-sm font-semibold tracking-tight p-2 text-zinc-950 bg-white rounded-md ${loading && "cursor-default"}`}
                            disabled={loading}
                        >
                            Code Review
                        </button>
                    </div>

                    {/* Markdown Output */}
                    <div
                        className="w-full md:w-1/2 border border-gray-700 rounded-md p-4 bg-black h-[550px] overflow-auto text-sm leading-relaxed"
                        style={{
                            overflowWrap: "break-word",
                            wordBreak: "break-word",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        <h2 className="text-lg font-semibold mb-2">Code Review Output:</h2>
                        {loading &&
                            <div className="w-full h-fit flex justify-center items-center">
                                <Loader />
                            </div>
                        }
                        <div className="max-w-none overflow-auto relative">
                            <ReactMarkdown
                                children={review}
                                components={{
                                    code({ node, inline, className, children }) {
                                        const match = /language-(\w+)/.exec(className || "");
                                        return !inline && match ? (
                                            <pre className="bg-[#1e1e1e] text-white p-4 rounded-md overflow-auto">
                                                <code
                                                    dangerouslySetInnerHTML={{
                                                        __html: Prism.highlight(
                                                            String(children).replace(/\n$/, ""),
                                                            Prism.languages[match[1]] || Prism.languages.javascript,
                                                            match[1]
                                                        ),
                                                    }}
                                                />
                                            </pre>
                                        ) : (
                                            <code className="bg-gray-800 px-1 py-0.5 rounded text-red-400">{children}</code>
                                        );
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeReviewPage;
