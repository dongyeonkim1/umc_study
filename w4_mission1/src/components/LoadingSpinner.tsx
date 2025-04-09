export const LoadingSpinner = () => {
    return <div 
    className="size-12 animate-spin rounded-full border-6
    border-t-transparent border-[#ff0000]"
    role="status"
    >
        <span className="sr-only">로딩 중...</span>
    </div>
};