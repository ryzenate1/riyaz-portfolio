export default function Loading() {
  return (
    <div className="min-h-screen bg-neutrals-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Animated loading spinner */}
          <div className="w-12 h-12 border-4 border-neutrals-700 border-t-primary rounded-full animate-spin" />
        </div>
        <p className="text-neutrals-400 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
