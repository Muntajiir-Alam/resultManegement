import { useRef, useState } from 'react';
import CustomKeypad from '../../../shared/components/CustomKeypad';
import useIsTouchDevice from '../../../shared/hooks/useIsTouchDevice';

export default function EditableMarksTable({ students, onChange, totalCount }) {
  const isTouch = useIsTouchDevice();
  const [activeIndex, setActiveIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const inputRefs = useRef({});

  const cells = 2; // theory + paper per student
  const total = students.length * cells;

  const selected = activeIndex !== null ? students[Math.floor(activeIndex / cells)] : null;
  const isTheory = activeIndex !== null && activeIndex % cells === 0;

  const focusCell = (index) => {
    if (index < 0 || index >= total) return;
    setActiveIndex(index);
    setEditingValue('');
    const el = inputRefs.current[index];
    if (el) {
      el.focus();
      el.select();
    }
  };

  const handleSelect = (index) => {
    setActiveIndex(index);
    setEditingValue('');
  };

  const getMax = () => (selected ? selected[isTheory ? 'theory' : 'paper'].max : null);

  const handleInput = (key) => {
    if (activeIndex === null) return;
    const max = getMax();
    const next = key === '0' && editingValue === '' ? '0' : editingValue + key;
    if (max != null && Number(next) > max) return;
    setEditingValue(next);
    const field = isTheory ? 'theory' : 'paper';
    onChange(selected.admissionNo, field, Number(next || 0));
  };

  const handleBackspace = () => {
    if (activeIndex === null) return;
    const next = editingValue.slice(0, -1);
    setEditingValue(next);
    const field = isTheory ? 'theory' : 'paper';
    onChange(selected.admissionNo, field, Number(next || 0));
  };

  const handleMove = (dir) => {
    if (activeIndex === null) return;
    if (dir === 'up') focusCell(activeIndex - cells);
    else if (dir === 'down') focusCell(activeIndex + cells);
    else if (dir === 'left') focusCell(activeIndex - 1);
    else if (dir === 'right') focusCell(activeIndex + 1);
  };

  // On-screen arrow pad for desktop — mouse-based cell switching.
  const handlePadMove = (dir) => {
    if (activeIndex === null) {
      focusCell(0); // start from the first cell
      return;
    }
    handleMove(dir);
  };

  // Desktop keyboard navigation between cells (Excel-style).
  const handleKeyDown = (e, index) => {
    const { key, shiftKey } = e;
    let next = null;

    if (key === 'ArrowLeft') next = index - 1;
    else if (key === 'ArrowRight') next = index + 1;
    else if (key === 'ArrowUp') next = index - cells;
    else if (key === 'ArrowDown') next = index + cells;
    else if (key === 'Enter') next = shiftKey ? index - cells : index + cells;
    else return; // let Tab and normal typing behave natively

    e.preventDefault(); // stop number inputs from incrementing on ArrowUp/Down
    focusCell(next);
  };

  const thCls =
    'border-b border-slate-200 bg-slate-100/70 px-3 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-slate-600';
  const tdNumCls = 'whitespace-nowrap border-b border-slate-100 bg-white/40 px-3 py-2 text-center text-sm text-slate-700';
  const tdTextCls =
    'whitespace-nowrap border-b border-slate-100 bg-white/40 px-3 py-2 text-left text-sm text-slate-700';
  const inputCls =
    'w-full rounded-xl border border-emerald-200 bg-white px-2 py-1.5 text-center text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500';
  const activeInputCls = 'focus:ring-cyan-500 ring-2 ring-cyan-500 border-cyan-400';
  const maxBadge = 'inline-flex min-w-[44px] justify-center rounded-lg bg-slate-700 px-2 py-1 text-xs font-semibold text-white';

  const renderCell = (student, field, index) => {
    const isActive = activeIndex === index;
    const ref = (el) => {
      inputRefs.current[index] = el;
    };

    if (isTouch) {
      return (
        <input
          ref={ref}
          type="number"
          inputMode="none"
          readOnly
          min="0"
          max={student[field].max}
          value={isActive ? editingValue || '0' : Math.min(student[field].obtained, student[field].max)}
          onFocus={() => handleSelect(index)}
          onClick={() => handleSelect(index)}
          className={`${inputCls} ${isActive ? activeInputCls : ''}`}
          placeholder="0"
        />
      );
    }

    return (
      <input
        ref={ref}
        type="number"
        inputMode="numeric"
        min="0"
        max={student[field].max}
        value={Math.min(student[field].obtained, student[field].max)}
        onFocus={() => handleSelect(index)}
        onChange={(e) => {
          const value = Math.min(Number(e.target.value || 0), student[field].max);
          onChange(student.admissionNo, field, value);
        }}
        onKeyDown={(e) => handleKeyDown(e, index)}
        className={`${inputCls} ${isActive ? activeInputCls : ''}`}
        placeholder="0"
      />
    );
  };

  return (
    <div className="glass rounded-3xl p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="font-display text-base font-bold text-slate-800">Students List</h3>
        <span className="rounded-full header-gradient px-3 py-1 text-xs font-semibold text-white">
          {(totalCount ?? students.length)} student{(totalCount ?? students.length) !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {students.map((student, idx) => (
          <div
            key={student.admissionNo}
            className="rounded-2xl border border-emerald-100/80 bg-white/60 p-3 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-700">
                {idx + 1}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">{student.name}</p>
                <p className="truncate text-xs text-slate-500">
                  {student.admissionNo} · Sec {student.section} · Class {student.class}
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-900">Theory</span>
                  <span className={maxBadge}>Max {student.theory.max}</span>
                </div>
                {renderCell(student, 'theory', idx * cells)}
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-900">Paper</span>
                  <span className={maxBadge}>Max {student.paper.max}</span>
                </div>
                {renderCell(student, 'paper', idx * cells + 1)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="nice-scroll hidden overflow-x-auto rounded-2xl bg-white/40 md:block">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr>
              <th className={thCls} rowSpan="2">S.No</th>
              <th className={thCls} rowSpan="2">Admission</th>
              <th className={thCls} rowSpan="2">Name</th>
              <th className={thCls} rowSpan="2">Sec</th>
              <th className={thCls} rowSpan="2">Class</th>
              <th className={thCls} rowSpan="2">Subject</th>
              <th className={thCls} colSpan="2">Theory</th>
              <th className={thCls} colSpan="2">Paper</th>
            </tr>
            <tr>
              <th className={thCls}>Max</th>
              <th className={thCls}>Obtained</th>
              <th className={thCls}>Max</th>
              <th className={thCls}>Obtained</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student.admissionNo} className="hover:bg-emerald-50/50">
                <td className={tdNumCls}>{idx + 1}</td>
                <td className={tdNumCls}>{student.admissionNo}</td>
                <td className={tdTextCls}>
                  <span className="font-medium text-slate-800">{student.name}</span>
                </td>
                <td className={tdNumCls}>{student.section}</td>
                <td className={tdNumCls}>{student.class}</td>
                <td className={tdTextCls}>{student.subject}</td>
                <td className={tdNumCls}>
                  <span className={maxBadge}>{student.theory.max}</span>
                </td>
                <td className={tdNumCls}>{renderCell(student, 'theory', idx * cells)}</td>
                <td className={tdNumCls}>
                  <span className={maxBadge}>{student.paper.max}</span>
                </td>
                <td className={tdNumCls}>{renderCell(student, 'paper', idx * cells + 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isTouch && activeIndex !== null && (
        <CustomKeypad
          display={editingValue}
          max={selected ? selected[isTheory ? 'theory' : 'paper'].max : null}
          cellLabel={selected ? `${selected.name} · ${isTheory ? 'Theory' : 'Paper'}` : ''}
          onInput={handleInput}
          onBackspace={handleBackspace}
          onMove={handleMove}
          onHide={() => { setActiveIndex(null); setEditingValue(''); }}
        />
      )}

      {!isTouch && (
        <div className="mt-4"> 
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-xs text-slate-500">
            <span className='flex items-center gap-1'>
              <kbd className="rounded-md border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-600">←</kbd>{' '}
              <kbd className="rounded-md border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-600">→</kbd>{' '}
              <kbd className="rounded-md border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-600">↑</kbd>{' '}
              <kbd className="rounded-md border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-600">↓</kbd>{' '}
              Switch cell with arrow key
            </span>
            <span>
              <kbd className="rounded-md border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-600">Enter</kbd> next row
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
