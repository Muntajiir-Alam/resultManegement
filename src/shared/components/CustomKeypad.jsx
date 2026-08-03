import { createPortal } from 'react-dom';

export default function CustomKeypad({ display, max, cellLabel, onInput, onBackspace, onMove, onHide }) {
  const keyCls =
    'flex h-12 select-none items-center justify-center rounded-xl bg-slate-800 text-lg font-bold text-slate-100 shadow-[inset_0_-2px_0_rgba(0,0,0,0.3)] transition active:scale-[0.96] active:bg-slate-700 focus:outline-none';
  const arrowCls =
    'flex select-none items-center justify-center rounded-xl bg-violet-600 text-xl font-bold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.25)] transition active:scale-[0.96] active:bg-violet-500 focus:outline-none';

  const hasValue = display !== '';
  const overMax = max != null && Number(display || 0) > max;

  return createPortal(
    <>
      <div className="fixed inset-0 z-40 bg-black/45" onClick={onHide} />

      <div className="keypad-slide-up fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 overflow-hidden rounded-t-3xl border-t border-slate-700 bg-slate-900 shadow-2xl">
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-slate-700" />

        {cellLabel && (
          <div className="mx-2 mt-2 flex items-center gap-2 overflow-hidden rounded-xl border border-violet-500/40 bg-violet-600/20 px-3 py-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-xs font-black text-white">
              ⌖
            </span>
            <span className="truncate text-sm font-bold text-violet-100">{cellLabel}</span>
          </div>
        )}

        <div
          className={`mx-2 mt-2 flex items-center justify-between rounded-2xl border px-4 py-3 ${
            overMax
              ? 'border-rose-500 bg-rose-500/20 text-rose-300'
              : hasValue
                ? 'border-violet-500 bg-violet-600/20 text-violet-200'
                : 'border-slate-700 bg-slate-800 text-slate-500'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Typed</span>
          <span className={`font-mono text-3xl font-black tracking-wider ${hasValue ? 'text-white' : 'text-slate-400'}`}>
            {hasValue ? display : '0'}
          </span>
          {max != null && <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">/ {max}</span>}
        </div>

        <div className="p-3">
          <div className="grid grid-cols-4 gap-1.5">
            <button className={keyCls} onClick={() => onInput('1')}>1</button>
            <button className={keyCls} onClick={() => onInput('2')}>2</button>
            <button className={keyCls} onClick={() => onInput('3')}>3</button>

            <div className="row-span-2 grid grid-cols-2 gap-1.5">
              <button className={arrowCls} onClick={() => onMove('up')}>↑</button>
              <button className={arrowCls} onClick={() => onMove('left')}>←</button>
              <button className={arrowCls} onClick={() => onMove('right')}>→</button>
              <button className={arrowCls} onClick={() => onMove('down')}>↓</button>
            </div>

            <button className={keyCls} onClick={() => onInput('4')}>4</button>
            <button className={keyCls} onClick={() => onInput('5')}>5</button>
            <button className={keyCls} onClick={() => onInput('6')}>6</button>

            <button className={keyCls} onClick={() => onInput('7')}>7</button>
            <button className={keyCls} onClick={() => onInput('8')}>8</button>
            <button className={keyCls} onClick={() => onInput('9')}>9</button>

            <button onClick={onBackspace} className={`${keyCls} text-xl text-slate-400`}>⌫</button>

            <button
              onClick={() => onInput('0')}
              className="col-span-4 h-12 select-none rounded-xl bg-violet-600 text-lg font-bold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.25)] transition active:scale-[0.96] active:bg-violet-500 focus:outline-none"
            >
              0
            </button>
          </div>

          <button
            onClick={onHide}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-xs font-bold text-slate-400 transition hover:bg-slate-700 active:scale-[0.99]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="14" rx="2" />
              <path d="M8 22h8M12 18v4" strokeLinecap="round" />
            </svg>
            Hide Keyboard
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}