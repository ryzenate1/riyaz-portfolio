export default function CasualLoading() {
  return (
    <div className="min-h-screen bg-[#d4af37] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Animated loading spinner */}
          <div className="w-12 h-12 border-4 border-[#404040]/20 border-t-[#404040] rounded-full animate-spin" />
        </div>
        <p className="text-[#404040] text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
