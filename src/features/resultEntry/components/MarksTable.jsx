import { useState } from 'react';
import CustomKeypad from '../../../shared/components/CustomKeypad';
import useIsTouchDevice from '../../../shared/hooks/useIsTouchDevice';

export default function EditableMarksTable({ students, onChange }) {
  const isTouch = useIsTouchDevice();
  const [activeIndex, setActiveIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const cells = 2; // theory + paper per student
  const total = students.length * cells;

  const selected = activeIndex !== null ? students[Math.floor(activeIndex / cells)] : null;
  const isTheory = activeIndex !== null && activeIndex % cells === 0;

  const inputRefs = Array.from({ length: total }, () => ({ current: null }));

  const handleTheory = (admissionNo, value) => onChange(admissionNo, 'theory', value);
  const handlePaper = (admissionNo, value) => onChange(admissionNo, 'paper', value);

  const focusCell = (index) => {
    if (index < 0 || index >= total) return;
    setActiveIndex(index);
    setEditingValue('');
    inputRefs[index]?.current?.focus();
  };

  const handleSelect = (index) => {
    const student = students[Math.floor(index / cells)];
    setActiveIndex(index);
    setEditingValue('');
    setTimeout(() => inputRefs[index]?.current?.focus(), 0);
    void student;
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

  const thCls =
    'border-b border-slate-200 bg-slate-100/70 px-3 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-slate-600';
  const tdNumCls = 'whitespace-nowrap border-b border-slate-100 bg-white/40 px-3 py-2 text-center text-sm text-slate-700';
  const tdTextCls =
    'whitespace-nowrap border-b border-slate-100 bg-white/40 px-3 py-2 text-left text-sm text-slate-700';
  const inputCls =
    'w-full rounded-xl border border-emerald-200 bg-white px-2 py-1.5 text-center text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500';
  const maxBadge = 'inline-flex min-w-[44px] justify-center rounded-lg bg-slate-700 px-2 py-1 text-xs font-semibold text-white';

  const renderCell = (student, field, index) => {
    const isActive = activeIndex === index;

    if (isTouch) {
      return (
        <input
          ref={(el) => { inputRefs[index] = el; }}
          type="number"
          inputMode="none"
          readOnly
          min="0"
          max={student[field].max}
          value={isActive ? editingValue || '0' : Math.min(student[field].obtained, student[field].max)}
          onFocus={() => handleSelect(index)}
          onClick={() => handleSelect(index)}
          className={`${inputCls} ${isActive ? 'ring-2 ring-cyan-500 border-cyan-400' : ''}`}
          placeholder="0"
        />
      );
    }

    return (
      <input
        type="number"
        inputMode="numeric"
        min="0"
        max={student[field].max}
        value={Math.min(student[field].obtained, student[field].max)}
        onChange={(e) => {
          const value = Math.min(Number(e.target.value || 0), student[field].max);
          onChange(student.admissionNo, field, value);
        }}
        className={inputCls}
        placeholder="0"
      />
    );
  };

  return (
    <div className="glass rounded-3xl p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="font-display text-base font-bold text-slate-800">Students List</h3>
        <span className="rounded-full header-gradient px-3 py-1 text-xs font-semibold text-white">
          {students.length} student{students.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="nice-scroll overflow-x-auto rounded-2xl bg-white/40">
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
    </div>
  );
}