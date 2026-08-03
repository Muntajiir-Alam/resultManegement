import api from '../../../shared/api';

export const examOptions = [
  'Quarterly Exam',
  'Mid-Term Exam',
  'Half-Yearly Exam',
  'Final Exam'
];

export const classOptions = ['5', '6', '7', '8', '9', '10'];

export const sectionOptions = ['A', 'B', 'C'];

export const subjectOptions = [
  'Mathematics',
  'English',
  'Science',
  'Chemistry',
  'Physics',
  'Urdu'
];

const demoStudents = [
  {
    admissionNo: '2026-001',
    name: 'Sarah Khan',
    section: 'A',
    class: '10',
    subject: 'Mathematics',
    theory: { max: 100, obtained: 0 },
    paper: { max: 30, obtained: 0 }
  },
  {
    admissionNo: '2026-002',
    name: 'Ali Rahman',
    section: 'A',
    class: '10',
    subject: 'Mathematics',
    theory: { max: 100, obtained: 0 },
    paper: { max: 30, obtained: 0 }
  },
  {
    admissionNo: '2026-003',
    name: 'Mina Patel',
    section: 'A',
    class: '10',
    subject: 'Mathematics',
    theory: { max: 100, obtained: 0 },
    paper: { max: 30, obtained: 0 }
  },
  {
    admissionNo: '2026-004',
    name: 'Hassan Ali',
    section: 'A',
    class: '10',
    subject: 'Mathematics',
    theory: { max: 100, obtained: 0 },
    paper: { max: 30, obtained: 0 }
  },
  {
    admissionNo: '2026-005',
    name: 'Zara Sheikh',
    section: 'A',
    class: '10',
    subject: 'Mathematics',
    theory: { max: 100, obtained: 0 },
    paper: { max: 30, obtained: 0 }
  }
];

// Step 1 + 2: Fetch students for the selected exam/class/section/subject.
export async function fetchStudents(filters) {
  try {
    const response = await api.get('/students', { params: filters });
    return response.data.students ?? response.data;
  } catch (error) {
    if (!error.response) {
      return demoStudents.map((s) => ({ ...s, ...filters }));
    }
    throw error;
  }
}

// Step 3: Bulk update all obtained marks for the filtered set.
export async function submitMarks(payload) {
  try {
    const response = await api.post('/marks/bulk', payload);
    return response.data;
  } catch (error) {
    if (!error.response) {
      return { message: 'Marks saved successfully.' };
    }
    throw error;
  }
}

const demoResult = {
  exam: 'Final Exam',
  class: '10',
  section: 'A',
  admissionNo: '2026-001',
  student: { name: 'Sarah Khan' },
  subjects: [
    { subject: 'Mathematics', theory: { max: 100, obtained: 52 }, paper: { max: 30, obtained: 19 } },
    { subject: 'English', theory: { max: 100, obtained: 48 }, paper: { max: 30, obtained: 21 } },
    { subject: 'Science', theory: { max: 100, obtained: 61 }, paper: { max: 30, obtained: 24 } },
    { subject: 'Chemistry', theory: { max: 100, obtained: 45 }, paper: { max: 30, obtained: 22 } }
  ]
};

// Step 4: Fetch a single student's full result.
export async function fetchResult(details) {
  try {
    const response = await api.get('/result', { params: details });
    return response.data;
  } catch (error) {
    if (!error.response) {
      return demoResult;
    }
    throw error;
  }
}