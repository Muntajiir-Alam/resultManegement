export default function CustomKeypad({ display, onInput, onBackspace, onMove, onHide }) {
  const keyCls =
    'flex h-14 items-center justify-center rounded-2xl bg-slate-800 text-xl font-bold text-slate-100 shadow-md transition active:scale-95 active:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500';
  const arrowCls =
    'flex h-14 items-center justify-center rounded-2xl bg-cyan-600 text-2xl font-bold text-white shadow-md transition active:scale-95';

  return (
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 rounded-t-3xl border-t border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Custom Keypad</span>
        <div className="flex items-center gap-2">
          <button
            onClick={onBackspace}
            className="rounded-lg bg-slate-700 px-3 py-1 text-sm font-bold text-slate-200 hover:bg-slate-600"
          >
            ⌫
          </button>
          <button
            onClick={onHide}
            className="rounded-lg bg-slate-700 px-2.5 py-1 text-xs font-bold text-slate-200 hover:bg-slate-600"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between rounded-2xl border border-cyan-500/40 bg-slate-800 px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Input</span>
        <span className="text-2xl font-extrabold text-cyan-300">{display || '0'}</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button className={keyCls} onClick={() => onInput('1')}>1</button>
        <button className={keyCls} onClick={() => onInput('2')}>2</button>
        <button className={keyCls} onClick={() => onInput('3')}>3</button>
        <button className={arrowCls} onClick={() => onMove('up')}>↑</button>

        <button className={keyCls} onClick={() => onInput('4')}>4</button>
        <button className={keyCls} onClick={() => onInput('5')}>5</button>
        <button className={keyCls} onClick={() => onInput('6')}>6</button>
        <button className={arrowCls} onClick={() => onMove('left')}>←</button>

        <button className={keyCls} onClick={() => onInput('7')}>7</button>
        <button className={keyCls} onClick={() => onInput('8')}>8</button>
        <button className={keyCls} onClick={() => onInput('9')}>9</button>
        <button className={arrowCls} onClick={() => onMove('down')}>↓</button>

        <button
          onClick={() => onInput('0')}
          className="col-span-3 h-14 rounded-2xl bg-cyan-600 text-xl font-bold text-white shadow-md transition active:scale-95 active:bg-cyan-500"
        >
          0
        </button>
        <button className={arrowCls} onClick={() => onMove('right')}>→</button>
      </div>
    </div>
  );
}