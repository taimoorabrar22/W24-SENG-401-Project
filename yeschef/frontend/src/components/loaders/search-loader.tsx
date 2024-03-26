import "./search-style.css";

export const SearchLoader = () => {
    return (
        <div className="flex items-center justify-center mt-6 bg-transparent touch-none">
            <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            </div>
        </div>
    );
};