// ===== STUDY PLAN, EXAM RULES, FULL KEYWORD LIST, CHEAT SHEETS, RESCUE PLAN =====

export interface PlanDay {
  title: string;
  focus: string[];
  task: string;
  goal: string;
}

export const plan4Days: PlanDay[] = [
  {
    title: 'Day 1: Calculations and Logic',
    focus: [
      'Binary/hex/denary conversion',
      'Binary addition/subtraction',
      "Two's complement",
      'Overflow',
      'Image/sound file size',
      'Logic gates truth tables',
      'Boolean expressions',
    ],
    task: 'Do 20 calculation questions from mark schemes.',
    goal: 'No silly mistakes.',
  },
  {
    title: 'Day 2: Definitions and Data',
    focus: [
      'Validation checks',
      'Verification methods',
      'Parity/checksum',
      'RLE',
      'Lossy/lossless',
      'ASCII/Unicode',
      'Sampling rate/resolution',
      'Pixel/bit depth/resolution',
    ],
    task: 'Make 40 flashcards.',
    goal: 'Say each definition in under 10 seconds.',
  },
  {
    title: 'Day 3: SQL, Databases, Networks, Security',
    focus: [
      'Primary/foreign key',
      '1:M, M:1, M:M',
      'CREATE TABLE',
      'SELECT, WHERE, COUNT, SUM, GROUP BY, ORDER BY',
      'JOINs',
      'Star/bus/mesh',
      'Wireless',
      'Client-server',
      'SSL/passwords/phishing',
    ],
    task: 'Write 10 SQL queries from memory.',
    goal: 'Perfect syntax habits.',
  },
  {
    title: 'Day 4: CPU, OS, Control Systems, Review',
    focus: [
      'Registers',
      'Fetch-decode-execute',
      'Addressing modes',
      'LMC trace tables',
      'Cache/RAM/ROM/SSD/HDD',
      'OS functions',
      'Utilities',
      'Compiler/library/DLL/IDE',
      'Sensors/actuators/feedback',
      'Speech recognition',
    ],
    task: 'Do one full mixed past-paper section under time.',
    goal: 'Convert knowledge into marks.',
  },
];

export interface PlanHour {
  hour: number;
  title: string;
  detail: string;
}

export const plan1Day: PlanHour[] = [
  { hour: 1, title: 'Binary/hex/two’s complement/file size', detail: 'Drill calculations.' },
  { hour: 2, title: 'Logic gates/truth tables/Boolean', detail: 'Draw gates, write expressions, complete truth tables.' },
  { hour: 3, title: 'Validation/verification/security', detail: 'Memorize exact definitions.' },
  { hour: 4, title: 'Compression/sampling/data representation', detail: 'RLE, lossy/lossless, ASCII/Unicode, sound/image terms.' },
  { hour: 5, title: 'SQL/database templates', detail: 'Write CREATE TABLE and SELECT queries from memory.' },
  { hour: 6, title: 'Registers/fetch cycle/addressing modes/LMC', detail: 'Memorize register roles and fetch steps.' },
  { hour: 7, title: 'Networks/storage/OS/utilities', detail: 'Topologies, wireless, client-server, cache, ROM/RAM, utilities.' },
  { hour: 8, title: 'Weak-area mark-scheme review', detail: 'Only review what you got wrong. Then sleep — do NOT all-nighter. Sleep consolidates memory.' },
];

export const examMorningChecklist: string[] = [
  'Binary/two’s complement rules.',
  'File size formulas.',
  'Logic gate truth tables.',
  'Register roles.',
  'Fetch cycle order.',
  'SQL template.',
  'Validation/verification definitions.',
  'RLE definition.',
  'Cache definition.',
  'Closed-loop feedback definition.',
];

export interface ExamRule {
  id: number;
  title: string;
  summary: string;
  bad?: string;
  good?: string;
  extra?: string;
}

export const examRules: ExamRule[] = [
  {
    id: 1,
    title: 'Write bullets, not paragraphs',
    summary: 'For 2-mark questions write 2 bullets; for 3-mark questions write 3 bullets. Cambridge awards marks for distinct valid points.',
    good: '• Point 1\n• Point 2',
  },
  {
    id: 2,
    title: 'Use exact keywords',
    summary: 'If the mark scheme says “next instruction”, do not say “current instruction”. If it says “consecutive pixels”, do not say “repeating bits”. If it says “frequently used instructions/data”, do not just say “stores data”.',
    bad: 'current instruction / repeating bits / stores data',
    good: 'next instruction / consecutive pixels / frequently used instructions/data',
  },
  {
    id: 3,
    title: 'Always show working for calculations',
    summary: 'Even if the answer is right, no working may lose method marks. Write: Conversion → Method → Final answer → Unit.',
    good: '100 = 0110 0100\n10 = 0000 1010\n-10 = 1111 0110\n0110 0100 + 1111 0110 = 0101 1010',
  },
  {
    id: 4,
    title: 'State overflow clearly when asked',
    summary: 'Write it explicitly — never leave it implied.',
    good: 'Overflow occurs because the answer cannot be represented in 8 bits.\nThe result is outside the range -128 to +127.',
  },
  {
    id: 5,
    title: 'Use correct units',
    summary: 'Common units: bits, bytes, KB, KiB, MB, MiB, Hz, bps. 8 bits = 1 byte. 1 KB usually = 1000 bytes in these mark schemes. 1 KiB = 1024 bytes. Check the question wording.',
    good: 'Bad: 36   Good: 36 MB',
  },
  {
    id: 6,
    title: 'For SQL, copy names exactly',
    summary: 'Use the exact table and field names given. Do not invent names.',
    good: 'WHERE PRODUCT.ProductID = COMPLAINT.ProductID',
  },
  {
    id: 7,
    title: 'For SQL aggregates, use alias',
    summary: 'Always name aggregate results with AS.',
    good: 'COUNT(CourseID) AS NumOfCourses\nSUM(NumberDays) AS TotalDays\nCOUNT(CharacterID) AS TotalCharacters',
  },
  {
    id: 8,
    title: 'For GROUP BY, group the non-aggregated selected field',
    summary: 'If you select PlayerName + COUNT(...), then GROUP BY PlayerName. If you select CustomerID + SUM(...), then GROUP BY CustomerID.',
    good: 'SELECT PlayerName, COUNT(...) ... GROUP BY PlayerName',
  },
  {
    id: 9,
    title: 'For ORDER BY, check ascending/descending',
    summary: 'DESC = descending, largest/highest first. ASC = ascending, smallest/lowest first. If the question says “highest first”, use ORDER BY Field DESC.',
    good: 'ORDER BY Field DESC',
  },
  {
    id: 10,
    title: 'Do not contradict yourself',
    summary: 'If you write two conflicting statements, the examiner may not know which to credit. Better to write two clear valid bullets than one confused paragraph.',
  },
];

export interface FullKeyword {
  term: string;
  definition: string;
  bucket: string;
}

export const fullKeywordList: FullKeyword[] = [
  // CPU
  { term: 'PC', definition: 'Stores address of next instruction to be fetched from memory.', bucket: 'CPU' },
  { term: 'MAR', definition: 'Stores address of memory location currently being read from/written to.', bucket: 'CPU' },
  { term: 'MDR', definition: 'Stores data/instruction read from/written to memory address in MAR.', bucket: 'CPU' },
  { term: 'CIR', definition: 'Holds current instruction being decoded/executed.', bucket: 'CPU' },
  { term: 'ACC', definition: 'Stores intermediate results of arithmetic/logical operations.', bucket: 'CPU' },
  { term: 'IX', definition: 'Index register — added to operand in indexed addressing to form address.', bucket: 'CPU' },
  { term: 'Cache', definition: 'Fast memory near CPU storing frequently used instructions/data.', bucket: 'CPU' },
  { term: 'ROM', definition: 'Non-volatile, stores BIOS/bootstrap/firmware/start-up instructions.', bucket: 'CPU' },
  { term: 'RAM', definition: 'Volatile, stores data/instructions currently in use.', bucket: 'CPU' },
  { term: 'SSD', definition: 'Flash storage, no moving parts, fast, durable.', bucket: 'CPU' },
  { term: 'HDD', definition: 'Magnetic storage, moving parts, cheaper high capacity.', bucket: 'CPU' },
  // Databases
  { term: 'Data dictionary', definition: 'Data about the data / structure of the database.', bucket: 'Databases' },
  { term: 'Primary key', definition: 'Uniquely identifies each record.', bucket: 'Databases' },
  { term: 'Foreign key', definition: 'Refers to primary key in another table.', bucket: 'Databases' },
  // Validation / verification
  { term: 'Visual check', definition: 'Entered data manually compared with original by a person.', bucket: 'Validation/Verification' },
  { term: 'Double entry', definition: 'Data entered twice and computer compares matches.', bucket: 'Validation/Verification' },
  { term: 'Presence check', definition: 'Field cannot be blank.', bucket: 'Validation/Verification' },
  { term: 'Range check', definition: 'Value between two specified values.', bucket: 'Validation/Verification' },
  { term: 'Limit check', definition: 'Value above/below one specified value.', bucket: 'Validation/Verification' },
  { term: 'Format check', definition: 'Data matches required pattern.', bucket: 'Validation/Verification' },
  { term: 'Length check', definition: 'Data has exact required number of characters.', bucket: 'Validation/Verification' },
  { term: 'Parity', definition: 'Bit added to make total number of 1s even/odd.', bucket: 'Validation/Verification' },
  { term: 'Checksum', definition: 'Algorithm value sent with data and recalculated by receiver.', bucket: 'Validation/Verification' },
  // Security
  { term: 'SSL', definition: 'Encrypts data so intercepted data unreadable without key.', bucket: 'Security' },
  { term: 'Password', definition: 'Ensures only authorized users can access resources.', bucket: 'Security' },
  { term: 'Phishing', definition: 'Email pretends to be official to steal info/redirect user.', bucket: 'Security' },
  // Data representation
  { term: 'RLE', definition: 'Stores consecutive same-colour pixels as colour + count.', bucket: 'Data' },
  { term: 'Lossy', definition: 'Permanently removes data, smaller file, lower quality.', bucket: 'Data' },
  { term: 'Lossless', definition: 'Original data can be fully reconstructed.', bucket: 'Data' },
  { term: 'Sampling rate', definition: 'Amplitude measurements per second/time interval.', bucket: 'Data' },
  { term: 'Sampling resolution', definition: 'Bits used per amplitude measurement.', bucket: 'Data' },
  { term: 'Analogue', definition: 'Sound wave before digital recording.', bucket: 'Data' },
  { term: 'Pixel', definition: 'Smallest element of image that can be one colour.', bucket: 'Data' },
  { term: 'ASCII', definition: 'Uses 7/8 bits.', bucket: 'Data' },
  { term: 'Unicode', definition: 'Up to 32 bits, wider range of characters/languages.', bucket: 'Data' },
  // Networks
  { term: 'Client-server', definition: 'Server minimal processing, client does most work locally.', bucket: 'Networks' },
  { term: 'Star', definition: 'All devices connect to central device.', bucket: 'Networks' },
  { term: 'Bus', definition: 'All devices connect to central cable.', bucket: 'Networks' },
  { term: 'Mesh', definition: 'Multiple paths, robust if line fails.', bucket: 'Networks' },
  // Control systems
  { term: 'Closed loop', definition: 'Uses feedback to adjust output within criteria.', bucket: 'Control' },
  { term: 'Open loop', definition: 'No feedback.', bucket: 'Control' },
  { term: 'Monitoring', definition: 'Collects data, no feedback/control/actuators.', bucket: 'Control' },
  // Programming tools
  { term: 'Library', definition: 'Pre-written/pre-compiled/pre-tested subroutines called by programs.', bucket: 'Tools' },
  { term: 'DLL', definition: 'Separate library updated independently, programs need not recompile.', bucket: 'Tools' },
  { term: 'Compiler', definition: 'Translates whole program to executable/machine code.', bucket: 'Tools' },
  { term: 'Interpreter', definition: 'Executes line by line.', bucket: 'Tools' },
  { term: 'Backup utility', definition: 'Recovers lost data after hardware failure.', bucket: 'Tools' },
  { term: 'Compression utility', definition: 'Reduces file size, saves storage/transmission time.', bucket: 'Tools' },
  { term: 'Formatter', definition: 'Prepares disk, sets up file system, partitions/deletes data.', bucket: 'Tools' },
  { term: 'Speech recognition', definition: 'Records/analyses sound, compares to database, identifies probable word/command.', bucket: 'Tools' },
];

export interface CheatSheet {
  id: string;
  title: string;
  icon: string;
  sections: { heading: string; lines: string[] }[];
}

export const cheatSheets: CheatSheet[] = [
  {
    id: 'sql',
    title: 'SQL Cheat Sheet (memorize word-for-word)',
    icon: '🗄️',
    sections: [
      {
        heading: 'Basic SELECT',
        lines: ['SELECT Field1, Field2', 'FROM TableName', 'WHERE Condition;'],
      },
      {
        heading: 'COUNT',
        lines: ['SELECT COUNT(FieldName) AS Alias', 'FROM TableName', 'WHERE Condition;'],
      },
      {
        heading: 'SUM with GROUP BY',
        lines: ['SELECT Field1, SUM(NumericField) AS Alias', 'FROM TableName', 'WHERE Condition', 'GROUP BY Field1;'],
      },
      {
        heading: 'Two-table join, comma style',
        lines: ['SELECT Table1.Field1, Table2.Field2', 'FROM Table1, Table2', 'WHERE Table1.Key = Table2.Key', 'AND Condition', 'ORDER BY Field DESC;'],
      },
      {
        heading: 'Two-table join, INNER JOIN style',
        lines: ['SELECT Table1.Field1, Table2.Field2', 'FROM Table1', 'INNER JOIN Table2', 'ON Table1.Key = Table2.Key', 'WHERE Condition', 'GROUP BY Table1.Field1', 'ORDER BY Table1.Key DESC;'],
      },
      {
        heading: 'COUNT with GROUP BY and ORDER BY',
        lines: ['SELECT PlayerName, COUNT(CHARACTER.CharacterID) AS TotalCharacters', 'FROM CHARACTER, PLAYER', 'WHERE CHARACTER.PlayerID = PLAYER.PlayerID', 'GROUP BY PlayerName', 'ORDER BY PLAYER.PlayerID DESC;'],
      },
      {
        heading: 'CREATE TABLE with PK and FK',
        lines: ['CREATE TABLE TableName', '(', '    Field1 DataType NOT NULL,', '    Field2 DataType,', '    Field3 DataType,', '    PRIMARY KEY(Field1),', '    FOREIGN KEY(Field2) REFERENCES OtherTable(Field2)', ');'],
      },
      {
        heading: 'Many-to-many linking table',
        lines: ['Create a third/linking table.', 'It contains the primary keys of both original tables as foreign keys.', 'Its PK may be a composite key made from those FKs.', '', 'CREATE TABLE PURCHASE', '(', '    CharacterID varchar NOT NULL,', '    ItemID varchar NOT NULL,', '    PRIMARY KEY(CharacterID, ItemID),', '    FOREIGN KEY(CharacterID) REFERENCES CHARACTER(CharacterID),', '    FOREIGN KEY(ItemID) REFERENCES ITEM(ItemID)', ');'],
      },
    ],
  },
  {
    id: 'cpu',
    title: 'CPU Cheat Sheet',
    icon: '🧠',
    sections: [
      {
        heading: 'Registers',
        lines: ['PC = next instruction address', 'MAR = address being accessed', 'MDR = data/instruction from memory', 'CIR = current instruction', 'ACC = calculation result', 'IX = index for indexed addressing'],
      },
      {
        heading: 'Fetch cycle',
        lines: ['MAR ← PC', 'PC ← PC + 1', 'MDR ← memory[MAR]', 'CIR ← MDR', 'Decode/execute'],
      },
      {
        heading: 'Addressing modes',
        lines: ['Immediate: operand is value', 'Direct: operand is address', 'Indirect: operand points to address of data', 'Indexed: operand + IX = address'],
      },
    ],
  },
  {
    id: 'compression',
    title: 'Compression/Data Cheat Sheet',
    icon: '🗜️',
    sections: [
      {
        heading: 'RLE',
        lines: ['Consecutive same-colour pixels', 'Store colour + count', 'Compresses pixels', 'Less data stored', 'File size reduced'],
      },
      {
        heading: 'Image file size',
        lines: ['Width × Height × Bit depth', '÷ 8 for bytes', '÷ 1000/1,000,000 for KB/MB if decimal', '÷ 1024/1,048,576 for KiB/MiB'],
      },
      {
        heading: 'Sound file size',
        lines: ['Sampling rate × Sampling resolution × Duration', '÷ 8 for bytes'],
      },
      {
        heading: 'Quality effects',
        lines: ['Higher sampling rate/resolution = better quality, larger file', 'Lower sampling rate/resolution = worse quality, smaller file', 'Too low = original sound cannot be recreated'],
      },
    ],
  },
  {
    id: 'networks',
    title: 'Networks/Security Cheat Sheet',
    icon: '🌐',
    sections: [
      {
        heading: 'Topologies',
        lines: ['Star: central device', 'Bus: central cable', 'Mesh: multiple paths, robust'],
      },
      {
        heading: 'Wireless',
        lines: ['Benefits: no cabling, easy setup, easy add devices, multiple device types', 'Drawbacks: less secure, slower, interference, signal degrades without repeaters/boosters'],
      },
      {
        heading: 'Client-server',
        lines: ['Server: minimal/some processing', 'Client: most processing locally'],
      },
      {
        heading: 'Security',
        lines: ['SSL: encryption, intercepted data unreadable without key', 'Password: controls access, prevents unauthorized access', 'Phishing: fake official email, steals info/redirects', 'Checksum: detect transmission errors', 'Parity: detect single-bit errors'],
      },
    ],
  },
  {
    id: 'control',
    title: 'Control Systems Cheat Sheet',
    icon: '🤖',
    sections: [
      {
        heading: 'Closed loop',
        lines: ['Uses feedback', 'Output affects future control', 'Adjusts to maintain set criteria', 'Has actuators'],
      },
      {
        heading: 'Open loop / monitoring',
        lines: ['No feedback', 'Output does not affect input', 'No automatic adjustment', 'Monitoring may have no actuators'],
      },
      {
        heading: 'Speech recognition robot',
        lines: ['Records sound', 'Analyses audio', 'Compares to database of words/sound waves', 'Identifies most probable word', 'Uses natural language processing', 'Matches sentence/command', 'Performs programmed action'],
      },
    ],
  },
];

export const buckets: { num: number; name: string }[] = [
  { num: 1, name: 'Numbers/calculations' },
  { num: 2, name: 'Logic gates' },
  { num: 3, name: 'Data representation/compression' },
  { num: 4, name: 'Validation/verification/security' },
  { num: 5, name: 'Networks' },
  { num: 6, name: 'Databases/SQL' },
  { num: 7, name: 'CPU registers/LMC' },
  { num: 8, name: 'Storage/OS/utilities' },
  { num: 9, name: 'Programming tools/libraries' },
  { num: 10, name: 'Sensors/control/AI' },
];

export interface RescueStep {
  minutes: string;
  title: string;
  content: string;
}

export const rescuePlan: RescueStep[] = [
  {
    minutes: '0–10',
    title: 'Binary/hex/two’s complement',
    content: '8-bit place values: 128 64 32 16 8 4 2 1\nDenary→binary: subtract largest place value\nBinary→hex: group into 4s from right\n-n: invert bits, add 1\n8-bit signed range: -128 to +127\nOverflow: answer cannot be represented in 8 bits',
  },
  {
    minutes: '10–20',
    title: 'File size formulas',
    content: 'Image bytes = width × height × bit depth ÷ 8\nSound bytes = sampling rate × resolution × duration ÷ 8\nKiB = ÷1024\nMB = ÷1,000,000 usually, but check question\nDo 3 examples.',
  },
  {
    minutes: '20–30',
    title: 'Logic gates',
    content: 'Draw truth tables for AND, OR, NOT, NAND, NOR, XOR\nNAND: output 0 only when both inputs 1\nNOR: output 1 only when both inputs 0\nXOR: output 1 when inputs different',
  },
  {
    minutes: '30–40',
    title: 'SQL templates',
    content: 'SELECT ... FROM ... WHERE ...\nSELECT COUNT(...) AS ... FROM ... WHERE ...\nSELECT ..., SUM(...) AS ... FROM ... WHERE ... GROUP BY ...\nSELECT ... FROM Table1, Table2 WHERE Table1.Key = Table2.Key ...\nCREATE TABLE ... PRIMARY KEY ... FOREIGN KEY ...',
  },
  {
    minutes: '40–50',
    title: 'Registers and fetch cycle',
    content: 'PC, MAR, MDR, CIR, ACC roles\nFetch order: MAR←PC, PC←PC+1, MDR←memory[MAR], CIR←MDR, decode/execute\nImmediate/direct/indirect/indexed addressing',
  },
  {
    minutes: '50–60',
    title: 'Definitions blitz (say aloud)',
    content: 'Visual check, Double entry, Presence, Range, Limit, Format, Length, Parity, Checksum, SSL, Password, RLE, Lossy, Lossless, Sampling rate, Sampling resolution, Pixel, ASCII, Unicode, Cache, Closed loop, Monitoring, Client-server, Library, DLL',
  },
];

export const panicTips: string[] = [
  'You will not get 100% by reading everything. You get near 100% by:',
  '1. Memorize exact mark-scheme keywords.',
  '2. Practice calculations until they are automatic.',
  '3. Memorize SQL templates.',
  '4. Master registers/fetch cycle/addressing modes.',
  '5. Write answers in short bullets.',
  '6. Never omit units/working/aliases/GROUP BY.',
  '7. Use scenario words from the question.',
  '8. Do not contradict yourself.',
];

export interface MistakeItem {
  problem: string;
  bad: string;
  good: string;
}

export const commonMistakes: MistakeItem[] = [
  { problem: '1. Vague answers', bad: 'Cache makes computer faster.', good: 'Cache is fast memory close to the CPU that stores frequently used instructions/data, so they can be accessed faster than from RAM.' },
  { problem: '2. Wrong keyword', bad: 'PC stores the current instruction.', good: 'PC stores the address of the next instruction to be fetched.' },
  { problem: '3. Saying bits instead of pixels', bad: 'RLE compresses repeated bits.', good: 'RLE compresses consecutive repeated pixels of the same colour.' },
  { problem: '4. No working', bad: 'Answer: 0101 1010', good: '100 = 0110 0100 / 10 = 0000 1010 / -10 = 1111 0110 / 0110 0100 + 1111 0110 = 0101 1010' },
  { problem: '5. Missing unit', bad: '36', good: '36 MB' },
  { problem: '6. SQL without alias', bad: 'SELECT COUNT(CourseID)', good: 'SELECT COUNT(CourseID) AS NumOfCourses' },
  { problem: '7. SQL without GROUP BY', bad: 'SELECT PlayerName, COUNT(CharacterID) FROM CHARACTER, PLAYER WHERE CHARACTER.PlayerID = PLAYER.PlayerID;', good: '...same... GROUP BY PlayerName;' },
  { problem: '8. Confusing range and limit', bad: 'Range = above/below one value', good: 'Range: between two values. Limit: above/below one value.' },
  { problem: '9. Confusing validation and verification', bad: 'They are the same thing.', good: 'Validation: is the data sensible/acceptable? Verification: does the entered data match the original?' },
  { problem: '10. Confusing monitoring and control', bad: 'Monitoring controls the system.', good: 'Monitoring: collects data, no feedback/control. Control: uses feedback and actuators to adjust output.' },
];

export interface CalcProblem {
  id: string;
  prompt: string;
  answer: string;
  working: string;
}

export const calcDrills: CalcProblem[] = [
  { id: 'cd1', prompt: 'Convert denary 45 to 8-bit binary.', answer: '0010 1101', working: '45 = 32 + 8 + 4 + 1 → bits at 32,8,4,1 → 0010 1101' },
  { id: 'cd2', prompt: 'Convert binary 1011 0110 to denary.', answer: '182', working: '128 + 32 + 16 + 4 + 2 = 182' },
  { id: 'cd3', prompt: 'Convert hex 2AF to denary.', answer: '687', working: '2×256 + 10×16 + 15 = 512 + 160 + 15 = 687' },
  { id: 'cd4', prompt: 'Convert denary 205 to hex.', answer: 'CD', working: '205 = 1101 1101 → 1101=D, 1101=C → CD' },
  { id: 'cd5', prompt: 'Express -23 in 8-bit two’s complement.', answer: '1110 1001', working: '23 = 0001 0111 → invert 1110 1000 → add 1 → 1110 1001' },
  { id: 'cd6', prompt: 'What denary does 1101 0010 represent (two’s complement)?', answer: '-46', working: 'Starts with 1 → negative. Invert: 0010 1101 = 45, add 1 = 46 → -46' },
  { id: 'cd7', prompt: 'Calculate 100 + (-10) in 8-bit two’s complement.', answer: '0101 1010 (= 90)', working: '100 = 0110 0100; 10 = 0000 1010; -10 = 1111 0110; 0110 0100 + 1111 0110 = 0101 1010 (discard carry)' },
  { id: 'cd8', prompt: 'Calculate 100 + 100 in 8-bit two’s complement. State any error.', answer: 'Overflow', working: '0110 0100 + 0110 0100 = 1100 1000 → looks like -56 but true answer 200 is outside -128..+127 → overflow (answer cannot be represented in 8 bits)' },
  { id: 'cd9', prompt: 'Add binary 0101 1100 + 0010 0110.', answer: '1000 0010 (= 130)', working: '92 + 38 = 130; unsigned OK, but in two’s complement 130 > 127 → overflow' },
  { id: 'cd10', prompt: 'Image: 800 × 600 px, 24-bit colour. Size in bytes?', answer: '1,440,000 bytes', working: '800 × 600 × 24 = 11,520,000 bits ÷ 8 = 1,440,000 bytes ≈ 1.44 MB (decimal)' },
  { id: 'cd11', prompt: 'Image: 1024 × 768, 8-bit depth. Size in KiB?', answer: '768 KiB', working: '1024 × 768 × 8 ÷ 8 = 786,432 bytes ÷ 1024 = 768 KiB' },
  { id: 'cd12', prompt: 'Sound: 44,100 Hz, 16-bit, 10 s. Size in bytes?', answer: '882,000 bytes', working: '44,100 × 16 × 10 = 7,056,000 bits ÷ 8 = 882,000 bytes ≈ 0.882 MB' },
  { id: 'cd13', prompt: 'Sound: 8000 Hz, 8-bit, 30 s. Size in KB (decimal)?', answer: '30 KB', working: '8000 × 8 × 30 = 1,920,000 bits ÷ 8 = 240,000 bytes ÷ 1000 = 240 KB — wait: 240,000 ÷ 1000 = 240 KB', },
  { id: 'cd14', prompt: 'How many colours with a 6-bit colour depth?', answer: '64', working: '2^6 = 64' },
  { id: 'cd15', prompt: 'Min bit depth for 100 colours?', answer: '7 bits', working: '2^6 = 64 < 100 ≤ 128 = 2^7' },
  { id: 'cd16', prompt: 'Convert 1110 0011 to hex.', answer: 'E3', working: '1110 = E, 0011 = 3' },
  { id: 'cd17', prompt: 'Convert hex F0A to binary.', answer: '1111 0000 1010', working: 'F=1111, 0=0000, A=1010' },
  { id: 'cd18', prompt: 'Range of 8-bit two’s complement?', answer: '-128 to +127', working: '-2^7 to 2^7 - 1' },
  { id: 'cd19', prompt: 'Range of 8-bit unsigned?', answer: '0 to 255', working: '0 to 2^8 - 1' },
  { id: 'cd20', prompt: 'Image 1920×1080, 32-bit, uncompressed. Size in MB (decimal)?', answer: '8.2944 MB', working: '1920 × 1080 × 32 = 66,355,200 bits ÷ 8 = 8,294,400 bytes ÷ 1,000,000 = 8.2944 MB' },
];

// Fix cd13 answer to match working
calcDrills[12].answer = '240 KB';

export interface GateTruth {
  gate: string;
  rule: string;
  table: string;
}

export const gateTruthTables: GateTruth[] = [
  { gate: 'AND', rule: 'Output 1 only when BOTH inputs are 1.', table: 'A B | Q\n0 0 | 0\n0 1 | 0\n1 0 | 0\n1 1 | 1' },
  { gate: 'OR', rule: 'Output 1 when AT LEAST ONE input is 1.', table: 'A B | Q\n0 0 | 0\n0 1 | 1\n1 0 | 1\n1 1 | 1' },
  { gate: 'NOT', rule: 'Output is the inverse of the input.', table: 'A | Q\n0 | 1\n1 | 0' },
  { gate: 'NAND', rule: 'Output 0 only when both inputs 1 (inverse AND).', table: 'A B | Q\n0 0 | 1\n0 1 | 1\n1 0 | 1\n1 1 | 0' },
  { gate: 'NOR', rule: 'Output 1 only when both inputs 0 (inverse OR).', table: 'A B | Q\n0 0 | 1\n0 1 | 0\n1 0 | 0\n1 1 | 0' },
  { gate: 'XOR', rule: 'Output 1 when inputs are DIFFERENT.', table: 'A B | Q\n0 0 | 0\n0 1 | 1\n1 0 | 1\n1 1 | 0' },
];

export interface DrillCard {
  id: string;
  front: string;
  back: string;
}

export const sqlMemoryDrills: DrillCard[] = [
  { id: 'sq1', front: 'SELECT all Forename and Surname from STUDENT where YearGroup = 12', back: 'SELECT Forename, Surname\nFROM STUDENT\nWHERE YearGroup = 12;' },
  { id: 'sq2', front: 'Count the number of courses', back: 'SELECT COUNT(CourseID) AS NumOfCourses\nFROM COURSE;' },
  { id: 'sq3', front: 'Total NumberDays of courses per Centre', back: 'SELECT Centre, SUM(NumberDays) AS TotalDays\nFROM COURSE\nGROUP BY Centre;' },
  { id: 'sq4', front: 'Names of students and their player characters (join CHARACTER & PLAYER)', back: 'SELECT PlayerName, CHARACTER.CharacterID\nFROM CHARACTER, PLAYER\nWHERE CHARACTER.PlayerID = PLAYER.PlayerID;' },
  { id: 'sq5', front: 'Number of characters per player, highest PlayerID first', back: 'SELECT PlayerName, COUNT(CHARACTER.CharacterID) AS TotalCharacters\nFROM CHARACTER, PLAYER\nWHERE CHARACTER.PlayerID = PLAYER.PlayerID\nGROUP BY PlayerName\nORDER BY PLAYER.PlayerID DESC;' },
  { id: 'sq6', front: 'Create table PURCHASE linking CHARACTER and ITEM (many-to-many)', back: 'CREATE TABLE PURCHASE\n(\n    CharacterID varchar NOT NULL,\n    ItemID varchar NOT NULL,\n    PRIMARY KEY(CharacterID, ItemID),\n    FOREIGN KEY(CharacterID) REFERENCES CHARACTER(CharacterID),\n    FOREIGN KEY(ItemID) REFERENCES ITEM(ItemID)\n);' },
  { id: 'sq7', front: 'Products complained about — join PRODUCT and COMPLAINT', back: 'SELECT PRODUCT.ProductName\nFROM PRODUCT, COMPLAINT\nWHERE PRODUCT.ProductID = COMPLAINT.ProductID;' },
  { id: 'sq8', front: 'INNER JOIN version of a two-table query', back: 'SELECT Table1.Field1, Table2.Field2\nFROM Table1\nINNER JOIN Table2\nON Table1.Key = Table2.Key\nWHERE Condition;' },
];

export const registerDrills: DrillCard[] = [
  { id: 'rd1', front: 'Role of PC', back: 'Stores the address of the NEXT instruction to be fetched from memory.' },
  { id: 'rd2', front: 'Role of MAR', back: 'Stores the ADDRESS of the memory location currently being read from / written to.' },
  { id: 'rd3', front: 'Role of MDR', back: 'Stores the DATA / INSTRUCTION read from (or to be written to) the memory address held in the MAR.' },
  { id: 'rd4', front: 'Role of CIR', back: 'Holds the CURRENT instruction being decoded / executed.' },
  { id: 'rd5', front: 'Role of ACC', back: 'Stores INTERMEDIATE results of arithmetic / logical operations.' },
  { id: 'rd6', front: 'Fetch cycle steps (in order)', back: 'MAR ← PC\nPC ← PC + 1\nMDR ← memory[MAR]\nCIR ← MDR\nThen decode, then execute.' },
  { id: 'rd7', front: 'Immediate addressing', back: 'The operand IS the value (e.g. LDA #5 loads 5).' },
  { id: 'rd8', front: 'Direct addressing', back: 'The operand IS the address of the data (e.g. LDA 50 → data at address 50).' },
  { id: 'rd9', front: 'Indirect addressing', back: 'The operand points to an address WHICH CONTAINS the address of the data.' },
  { id: 'rd10', front: 'Indexed addressing', back: 'Effective address = operand + contents of IX (index register).' },
];
