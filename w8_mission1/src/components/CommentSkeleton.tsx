const CommentSkeleton = () => {
  return (
    <div className="flex items-center gap-2 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-zinc-700" />
      <div className="flex flex-col space-y-2 w-full">
        <div className="h-4 bg-zinc-700 rounded w-24" />
        <div className="h-3 bg-zinc-700 rounded w-3/4" />
        <div className="h-3 bg-zinc-700 rounded w-1/2" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
