export default function Floating() {
    return (
        <>
            {/* Floating Circles */}
            <ul className="absolute inset-0 overflow-hidden z-0">
                <li className="absolute list-none bg-white/20 bottom-[-150px] left-[25%] w-[80px] h-[80px] animate-[float_20s_linear_infinite]" style={{ animationDelay: "0s" }}></li>
                <li className="absolute list-none bg-white/20 bottom-[-150px] left-[10%] w-[20px] h-[20px] animate-[float_12s_linear_infinite]" style={{ animationDelay: "2s" }}></li>
                <li className="absolute list-none bg-white/20 bottom-[-150px] left-[70%] w-[20px] h-[20px] animate-[float_15s_linear_infinite]" style={{ animationDelay: "4s" }}></li>
                <li className="absolute list-none bg-white/20 bottom-[-150px] left-[40%] w-[60px] h-[60px] animate-[float_18s_linear_infinite]" style={{ animationDelay: "0s" }}></li>
                <li className="absolute list-none bg-white/20 bottom-[-150px] left-[65%] w-[20px] h-[20px] animate-[float_14s_linear_infinite]" style={{ animationDelay: "0s" }}></li>
                <li className="absolute list-none bg-white/20 bottom-[-150px] left-[75%] w-[110px] h-[110px] animate-[float_25s_linear_infinite]" style={{ animationDelay: "3s" }}></li>
                <li className="absolute list-none bg-white/20 bottom-[-150px] left-[35%] w-[150px] h-[150px] animate-[float_30s_linear_infinite]" style={{ animationDelay: "7s" }}></li>
                <li className="absolute list-none bg-white/20 bottom-[-150px] left-[50%] w-[25px] h-[25px] animate-[float_45s_linear_infinite]" style={{ animationDelay: "15s" }}></li>
                <li className="absolute list-none bg-white/20 bottom-[-150px] left-[20%] w-[15px] h-[15px] animate-[float_35s_linear_infinite]" style={{ animationDelay: "2s" }}></li>
                <li className="absolute list-none bg-white/20 bottom-[-150px] left-[85%] w-[150px] h-[150px] animate-[float_40s_linear_infinite]" style={{ animationDelay: "0s" }}></li>
            </ul>

            {/* Inline keyframes */}
            <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }
      `}</style>
        </>
    );
}
