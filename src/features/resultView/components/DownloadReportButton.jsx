export default function DownloadReportButton({ onPress }) {
  return (
    <button
      onClick={onPress}
      className="mt-5 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
    >
      Download Report
    </button>
  );
}