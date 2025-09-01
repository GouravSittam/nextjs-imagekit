const GridLoader = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({length: 8}).map((_, i) => (
      <div key={i} className="space-y-4">
        <div className="h-48 animate-pulse rounded-lg bg-pink-50 dark:bg-black/40" />
      </div>
    ))}
  </div>
);

export default GridLoader;
