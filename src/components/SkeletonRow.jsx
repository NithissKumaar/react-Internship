function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {[Array(6)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-3.5 bg-slate-200 rounded-full w-full max-w-[120px]" />
        </td>
      ))}
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-slate-200 rounded-lg" />
          <div className="h-8 w-14 bg-slate-200 rounded-lg" />
        </div>
      </td>
    </tr>
  );
}

export default SkeletonRow