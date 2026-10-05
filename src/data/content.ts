export interface Flashcard {
  id: string;
  front: string;
  back: string;
  keywords: string[];
  topic: string;
  tier: 1 | 2 | 3;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  topic: string;
  tier: 1 | 2 | 3;
  type: 'mcq' | 'fill';
}

export interface Topic {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  rank: number;
  description: string;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

export const topics: Topic[] = [
  {
    id: 'binary-conversion',
    name: 'Binary, Hex, Denary Conversion',
    tier: 1,
    rank: 1,
    description: 'Pure mechanical marks — 4-bit/8-bit conversion, padding, hex digits',
    flashcards: [
      {
        id: 'bc1',
        front: 'Convert denary 100 to 8-bit binary',
        back: '0110 0100\n\nMethod: 100 = 64 + 32 + 4\nBit values: 128 64 32 16 8 4 2 1\nAlways pad to 8 bits',
        keywords: ['64', '32', '4', '0110 0100', 'pad to 8 bits'],
        topic: 'binary-conversion',
        tier: 1
      },
      {
        id: 'bc2',
        front: 'Convert binary 0110 0100 to denary',
        back: '100\n\nMethod: Add place values where bit is 1\n64 + 32 + 4 = 100',
        keywords: ['64', '32', '4', '100'],
        topic: 'binary-conversion',
        tier: 1
      },
      {
        id: 'bc3',
        front: 'Convert binary 0001 1110 1001 to hexadecimal',
        back: '1E9\n\nMethod: Group into 4s from right\n0001 = 1\n1110 = E (14)\n1001 = 9',
        keywords: ['group into 4s', '1', 'E', '9', '1E9'],
        topic: 'binary-conversion',
        tier: 1
      },
      {
        id: 'bc4',
        front: 'What are the hex digit values for A-F?',
        back: 'A = 10\nB = 11\nC = 12\nD = 13\nE = 14\nF = 15',
        keywords: ['A=10', 'B=11', 'C=12', 'D=13', 'E=14', 'F=15'],
        topic: 'binary-conversion',
        tier: 1
      },
      {
        id: 'bc5',
        front: 'Convert hex CC0F to denary',
        back: '52239\n\nMethod: Use powers of 16\nC×16³ + C×16² + 0×16¹ + F×16⁰\n= 12×4096 + 12×256 + 0 + 15\n= 49152 + 3072 + 0 + 15\n= 52239\n\nOR convert to binary first: 1100 1100 0000 1111',
        keywords: ['powers of 16', '49152', '3072', '15', '52239'],
        topic: 'binary-conversion',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'bq1',
        question: 'What is 100 in 8-bit binary?',
        options: ['0110 0100', '0110 0010', '0100 0100', '0110 1000'],
        answer: '0110 0100',
        explanation: '100 = 64 + 32 + 4. Set bits at positions 64, 32, and 4.',
        topic: 'binary-conversion',
        tier: 1,
        type: 'mcq'
      },
      {
        id: 'bq2',
        question: 'What is binary 1111 1100 in hexadecimal?',
        options: ['F1', 'FC', 'CF', 'FF'],
        answer: 'FC',
        explanation: '1111 = F (15), 1100 = C (12). So FC.',
        topic: 'binary-conversion',
        tier: 1,
        type: 'mcq'
      },
      {
        id: 'bq3',
        question: 'What is the denary value of hex digit E?',
        answer: '14',
        explanation: 'A=10, B=11, C=12, D=13, E=14, F=15',
        topic: 'binary-conversion',
        tier: 1,
        type: 'fill'
      }
    ]
  },
  {
    id: 'binary-arithmetic',
    name: 'Binary Addition & Subtraction',
    tier: 1,
    rank: 2,
    description: 'Show carries/borrows, 8-bit answer, overflow',
    flashcards: [
      {
        id: 'ba1',
        front: 'How do you perform binary addition?',
        back: 'Show carries above the line.\n\nRules:\n0 + 0 = 0\n0 + 1 = 1\n1 + 1 = 0 carry 1\n1 + 1 + 1 = 1 carry 1\n\nAlways show your carries!',
        keywords: ['carries', 'show carries above the line'],
        topic: 'binary-arithmetic',
        tier: 1
      },
      {
        id: 'ba2',
        front: 'Two methods for binary subtraction?',
        back: 'Method 1: Two\'s complement addition\n- Convert subtrahend to two\'s complement\n- Add to minuend\n- Discard final carry if 8-bit\n\nMethod 2: Direct subtraction\n- Show borrows\n- Subtract column by column',
        keywords: ['two\'s complement', 'addition', 'borrows', 'discard carry'],
        topic: 'binary-arithmetic',
        tier: 1
      },
      {
        id: 'ba3',
        front: 'What is overflow in binary?',
        back: 'The answer cannot be represented in the number of bits available.\n\nOR: The answer is larger than the maximum positive number that can be stored, OR smaller than the most negative number that can be stored.',
        keywords: ['cannot be represented', 'number of bits', 'maximum positive', 'most negative'],
        topic: 'binary-arithmetic',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'baq1',
        question: 'In 8-bit signed arithmetic, what is the range of representable values?',
        options: ['-128 to +127', '0 to 255', '-127 to +127', '-256 to +255'],
        answer: '-128 to +127',
        explanation: '8-bit signed (two\'s complement): -128 to +127. Unsigned would be 0 to 255.',
        topic: 'binary-arithmetic',
        tier: 1,
        type: 'mcq'
      },
      {
        id: 'baq2',
        question: 'What is the unsigned 8-bit range?',
        answer: '0 to 255',
        explanation: '8-bit unsigned: 0000 0000 = 0 to 1111 1111 = 255',
        topic: 'binary-arithmetic',
        tier: 1,
        type: 'fill'
      }
    ]
  },
  {
    id: 'twos-complement',
    name: "Two's Complement",
    tier: 1,
    rank: 3,
    description: 'Invert bits, add 1, signed range -128 to +127',
    flashcards: [
      {
        id: 'tc1',
        front: 'How to convert a positive number to its negative in two\'s complement?',
        back: '1. Invert all bits (0→1, 1→0)\n2. Add 1 to the result\n\nExample: +10 = 0000 1010\nInvert: 1111 0101\nAdd 1: 1111 0110 = -10',
        keywords: ['invert bits', 'add 1', '1111 0110'],
        topic: 'twos-complement',
        tier: 1
      },
      {
        id: 'tc2',
        front: 'What is the 8-bit signed range?',
        back: '-128 to +127\n\nMost negative: 1000 0000 = -128\nMost positive: 0111 1111 = +127',
        keywords: ['-128', '+127', '1000 0000', '0111 1111'],
        topic: 'twos-complement',
        tier: 1
      },
      {
        id: 'tc3',
        front: 'What is the 8-bit unsigned range?',
        back: '0 to 255\n\nSmallest: 0000 0000 = 0\nLargest: 1111 1111 = 255',
        keywords: ['0', '255', '0000 0000', '1111 1111'],
        topic: 'twos-complement',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'tcq1',
        question: 'What is -10 in 8-bit two\'s complement binary?',
        options: ['1111 0110', '1111 0101', '1000 1010', '1111 1010'],
        answer: '1111 0110',
        explanation: '+10 = 0000 1010. Invert: 1111 0101. Add 1: 1111 0110.',
        topic: 'twos-complement',
        tier: 1,
        type: 'mcq'
      },
      {
        id: 'tcq2',
        question: 'What two steps convert a positive binary number to its negative two\'s complement?',
        answer: 'Invert bits then add 1',
        explanation: 'Step 1: Invert all bits (flip 0s and 1s). Step 2: Add 1 to the result.',
        topic: 'twos-complement',
        tier: 1,
        type: 'fill'
      }
    ]
  },
  {
    id: 'file-size',
    name: 'File Size Calculations',
    tier: 1,
    rank: 4,
    description: 'Image: width × height × bit depth ÷ 8; Sound: sampling rate × resolution × duration ÷ 8',
    flashcards: [
      {
        id: 'fs1',
        front: 'Image file size formula (in bytes)',
        back: 'File size in bits = width × height × bit depth\nFile size in bytes = width × height × bit depth ÷ 8\n\nFor MB: divide by 1,000,000 (decimal) or 1,048,576 (binary/MiB)',
        keywords: ['width', 'height', 'bit depth', '÷ 8', 'bytes'],
        topic: 'file-size',
        tier: 1
      },
      {
        id: 'fs2',
        front: 'Sound file size formula (in bytes)',
        back: 'File size in bits = sampling rate × sampling resolution × duration\nFile size in bytes = sampling rate × sampling resolution × duration ÷ 8',
        keywords: ['sampling rate', 'sampling resolution', 'duration', '÷ 8'],
        topic: 'file-size',
        tier: 1
      },
      {
        id: 'fs3',
        front: 'What is sampling rate?',
        back: 'The number of times the amplitude is measured per second (per time interval)',
        keywords: ['amplitude', 'measured per second'],
        topic: 'file-size',
        tier: 1
      },
      {
        id: 'fs4',
        front: 'What is sampling resolution?',
        back: 'The number of bits used to store each amplitude measurement',
        keywords: ['bits', 'each amplitude measurement'],
        topic: 'file-size',
        tier: 1
      },
      {
        id: 'fs5',
        front: '1 KB = ? bytes, 1 KiB = ? bytes',
        back: '1 KB = 1000 bytes (decimal)\n1 KiB = 1024 bytes (binary)\n\n1 MB = 1,000,000 bytes\n1 MiB = 1,048,576 bytes',
        keywords: ['1000', '1024', '1,000,000', '1,048,576'],
        topic: 'file-size',
        tier: 1
      },
      {
        id: 'fs6',
        front: 'Effect of increasing sampling rate?',
        back: 'Better quality, larger file\n\nMore samples per second = more accurate reproduction of original sound',
        keywords: ['better quality', 'larger file'],
        topic: 'file-size',
        tier: 1
      },
      {
        id: 'fs7',
        front: 'Effect of decreasing sampling rate?',
        back: 'Worse quality, smaller file\n\nMark-scheme phrase: "There will be fewer samples per second, so the original sound cannot be recreated"\nOR: "Data is permanently lost"',
        keywords: ['worse quality', 'smaller file', 'fewer samples', 'cannot be recreated', 'permanently lost'],
        topic: 'file-size',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'fsq1',
        question: 'An image is 1500 × 3000 pixels with 8-bit colour depth. What is the file size in bytes?',
        options: ['4,500,000', '36,000,000', '4,500', '36,000'],
        answer: '4,500,000',
        explanation: '1500 × 3000 × 8 = 36,000,000 bits ÷ 8 = 4,500,000 bytes',
        topic: 'file-size',
        tier: 1,
        type: 'mcq'
      },
      {
        id: 'fsq2',
        question: 'What is the critical conversion factor between bits and bytes?',
        answer: '8 bits = 1 byte',
        explanation: '8 bits = 1 byte. Never forget this!',
        topic: 'file-size',
        tier: 1,
        type: 'fill'
      }
    ]
  },
  {
    id: 'logic-gates',
    name: 'Logic Gates & Truth Tables',
    tier: 1,
    rank: 5,
    description: 'AND, OR, NOT, NAND, NOR, XOR truth tables',
    flashcards: [
      {
        id: 'lg1',
        front: 'AND gate truth table',
        back: 'A B | Output\n0 0 | 0\n0 1 | 0\n1 0 | 0\n1 1 | 1\n\nOutput is 1 ONLY when BOTH inputs are 1',
        keywords: ['both', '1 only when both 1'],
        topic: 'logic-gates',
        tier: 1
      },
      {
        id: 'lg2',
        front: 'OR gate truth table',
        back: 'A B | Output\n0 0 | 0\n0 1 | 1\n1 0 | 1\n1 1 | 1\n\nOutput is 1 if AT LEAST ONE input is 1',
        keywords: ['at least one', '1 if at least one is 1'],
        topic: 'logic-gates',
        tier: 1
      },
      {
        id: 'lg3',
        front: 'NOT gate truth table',
        back: 'A | Output\n0 | 1\n1 | 0\n\nInverts the input',
        keywords: ['inverts'],
        topic: 'logic-gates',
        tier: 1
      },
      {
        id: 'lg4',
        front: 'NAND gate truth table',
        back: 'A B | Output\n0 0 | 1\n0 1 | 1\n1 0 | 1\n1 1 | 0\n\nOutput is 0 ONLY when BOTH inputs are 1\n(Inverse of AND)',
        keywords: ['0 only when both 1', 'inverse of AND'],
        topic: 'logic-gates',
        tier: 1
      },
      {
        id: 'lg5',
        front: 'NOR gate truth table',
        back: 'A B | Output\n0 0 | 1\n0 1 | 0\n1 0 | 0\n1 1 | 0\n\nOutput is 1 ONLY when BOTH inputs are 0\n(Inverse of OR)',
        keywords: ['1 only when both 0', 'inverse of OR'],
        topic: 'logic-gates',
        tier: 1
      },
      {
        id: 'lg6',
        front: 'XOR gate truth table',
        back: 'A B | Output\n0 0 | 0\n0 1 | 1\n1 0 | 1\n1 1 | 0\n\nOutput is 1 ONLY when inputs are DIFFERENT\n"One input is 1 and the other is 0"',
        keywords: ['different', 'one is 1 other is 0'],
        topic: 'logic-gates',
        tier: 1
      },
      {
        id: 'lg7',
        front: 'Boolean notation for gates',
        back: 'A AND B = A . B or AB\nA OR B = A + B\nNOT A = A\' or Ā\nA NAND B = NOT(A . B)\nA NOR B = NOT(A + B)\nA XOR B = output 1 if inputs different',
        keywords: ['A . B', 'A + B', "A'", 'NOT'],
        topic: 'logic-gates',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'lgq1',
        question: 'What is the output of a NAND gate when both inputs are 1?',
        options: ['0', '1', 'Undefined', 'Depends on previous state'],
        answer: '0',
        explanation: 'NAND outputs 0 ONLY when both inputs are 1. It is the inverse of AND.',
        topic: 'logic-gates',
        tier: 1,
        type: 'mcq'
      },
      {
        id: 'lgq2',
        question: 'What is the output of XOR when both inputs are the same?',
        answer: '0',
        explanation: 'XOR outputs 1 only when inputs are DIFFERENT. If both are 0 or both are 1, output is 0.',
        topic: 'logic-gates',
        tier: 1,
        type: 'fill'
      },
      {
        id: 'lgq3',
        question: 'Which gate outputs 1 only when both inputs are 0?',
        options: ['NOR', 'NAND', 'XOR', 'AND'],
        answer: 'NOR',
        explanation: 'NOR: Output is 1 only when BOTH inputs are 0. It is the inverse of OR.',
        topic: 'logic-gates',
        tier: 1,
        type: 'mcq'
      }
    ]
  },
  {
    id: 'validation',
    name: 'Data Validation Checks',
    tier: 1,
    rank: 6,
    description: 'Presence, range, limit, format, length, check digit',
    flashcards: [
      {
        id: 'v1',
        front: 'What is a presence check?',
        back: 'The field cannot be left blank.\n\nExample: Date of Birth field cannot be empty.',
        keywords: ['cannot be blank', 'cannot be empty'],
        topic: 'validation',
        tier: 1
      },
      {
        id: 'v2',
        front: 'What is a range check?',
        back: 'The value must be between TWO specified values, including both ends.\n\nExample: Date of birth must be after one date and before another date.\n\nKEY: Range check has TWO limits.',
        keywords: ['between', 'two values', 'two limits'],
        topic: 'validation',
        tier: 1
      },
      {
        id: 'v3',
        front: 'What is a limit check?',
        back: 'The value must be above or below ONE specified value.\n\nExample: Age must be over 18.\n\nKEY: Limit check has ONE limit only.',
        keywords: ['one specified value', 'above or below', 'one limit'],
        topic: 'validation',
        tier: 1
      },
      {
        id: 'v4',
        front: 'What is a format check?',
        back: 'The data must match a required pattern/format.\n\nExamples:\n- Date must be dd/mm/yyyy\n- Registration number must be letter-digit-digit-digit-letter-letter',
        keywords: ['pattern', 'format', 'must match'],
        topic: 'validation',
        tier: 1
      },
      {
        id: 'v5',
        front: 'What is a length check?',
        back: 'The data must be a specific number of characters.\n\nExample: Registration number must be 6 characters long.',
        keywords: ['specific number of characters'],
        topic: 'validation',
        tier: 1
      },
      {
        id: 'v6',
        front: 'What is a check digit?',
        back: 'A digit calculated from the other digits in a number to detect errors.\n\nUsed in barcodes, ID numbers, etc.',
        keywords: ['calculated from other digits', 'detect errors'],
        topic: 'validation',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'vq1',
        question: 'A field that checks age must be over 18 is what type of check?',
        options: ['Limit check', 'Range check', 'Presence check', 'Format check'],
        answer: 'Limit check',
        explanation: 'Limit check has ONE boundary (over 18). Range check would have TWO (e.g., between 18 and 65).',
        topic: 'validation',
        tier: 1,
        type: 'mcq'
      },
      {
        id: 'vq2',
        question: 'How many limits does a range check have?',
        answer: '2',
        explanation: 'Range check has TWO limits (between two values). Limit check has only ONE.',
        topic: 'validation',
        tier: 1,
        type: 'fill'
      },
      {
        id: 'vq3',
        question: 'Which check ensures data matches dd/mm/yyyy?',
        options: ['Format check', 'Length check', 'Range check', 'Presence check'],
        answer: 'Format check',
        explanation: 'Format check verifies data matches a required pattern.',
        topic: 'validation',
        tier: 1,
        type: 'mcq'
      }
    ]
  },
  {
    id: 'verification',
    name: 'Data Verification Methods',
    tier: 1,
    rank: 7,
    description: 'Visual check, double entry, parity, checksum',
    flashcards: [
      {
        id: 'vf1',
        front: 'What is a visual check?',
        back: 'Data is entered by a user and then manually compared to the original data by a person to make sure they are the same.',
        keywords: ['manually compared', 'original data', 'by a person'],
        topic: 'verification',
        tier: 1
      },
      {
        id: 'vf2',
        front: 'What is double entry?',
        back: 'The data is entered twice and the computer automatically compares whether the two entries match.',
        keywords: ['entered twice', 'computer compares', 'automatically'],
        topic: 'verification',
        tier: 1
      },
      {
        id: 'vf3',
        front: 'What is a parity check?',
        back: 'A parity bit is added so that the total number of 1s is even or odd.\n\nPurpose: Detects single-bit errors during transmission.\n\nLimitation: Cannot detect all errors, e.g. two-bit errors may cancel out.',
        keywords: ['parity bit', 'even or odd', 'single-bit errors', 'cannot detect all'],
        topic: 'verification',
        tier: 1
      },
      {
        id: 'vf4',
        front: 'What is a checksum? (mark-scheme wording)',
        back: '1. The data is put through an algorithm to create a checksum value\n2. The data and checksum are sent to the receiver\n3. The receiver performs the same algorithm on the data\n4. If both checksums match, the data is verified',
        keywords: ['algorithm', 'checksum value', 'sent', 'same algorithm', 'match', 'verified'],
        topic: 'verification',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'vfq1',
        question: 'What is the key limitation of parity checking?',
        options: ['Cannot detect all errors (e.g. two-bit errors)', 'Too slow', 'Requires encryption', 'Only works for text'],
        answer: 'Cannot detect all errors (e.g. two-bit errors)',
        explanation: 'Parity can detect single-bit errors but two-bit errors may cancel out and go undetected.',
        topic: 'verification',
        tier: 1,
        type: 'mcq'
      },
      {
        id: 'vfq2',
        question: 'In double entry, who compares the two entries?',
        answer: 'The computer',
        explanation: 'In double entry, the COMPUTER automatically compares the two entries. In visual check, a PERSON compares.',
        topic: 'verification',
        tier: 1,
        type: 'fill'
      }
    ]
  },
  {
    id: 'rle',
    name: 'Run-Length Encoding (RLE)',
    tier: 1,
    rank: 8,
    description: 'Consecutive pixels, colour + count, reduces stored data',
    flashcards: [
      {
        id: 'rle1',
        front: 'How does RLE work? (exact mark-scheme wording)',
        back: 'RLE identifies consecutive repeating pixels of the same colour and stores the colour/pattern and the number of times it repeats.\n\nOR: A series of consecutive pixels of the same colour is stored as a single copy of the colour and the number of consecutive occurrences.',
        keywords: ['consecutive', 'pixels', 'same colour', 'count', 'number of times'],
        topic: 'rle',
        tier: 1
      },
      {
        id: 'rle2',
        front: 'Why does RLE reduce file size?',
        back: 'Less data is stored, therefore the file size is reduced.',
        keywords: ['less data stored', 'file size reduced'],
        topic: 'rle',
        tier: 1
      },
      {
        id: 'rle3',
        front: 'CRITICAL TRAP: What word must you use in RLE answers?',
        back: 'You MUST say "pixels" — NOT bits, NOT characters, NOT elements.\n\nMark scheme: "Do not accept bits or characters or elements etc. for pixels."',
        keywords: ['PIXELS', 'not bits', 'not characters', 'not elements'],
        topic: 'rle',
        tier: 1
      },
      {
        id: 'rle4',
        front: 'RLE example: RRRWWWW compresses to?',
        back: '3R4W or R3W4 (depending on format)\n\n3 consecutive Red pixels, then 4 consecutive White pixels.',
        keywords: ['3R', '4W', 'consecutive'],
        topic: 'rle',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'rleq1',
        question: 'RLE compresses what type of data?',
        options: ['Pixels', 'Bits', 'Characters', 'Bytes'],
        answer: 'Pixels',
        explanation: 'RLE identifies consecutive repeating PIXELS. You must say pixels, not bits/characters/elements.',
        topic: 'rle',
        tier: 1,
        type: 'mcq'
      },
      {
        id: 'rleq2',
        question: 'What does RLE store for each run of data?',
        answer: 'The colour and the count',
        explanation: 'RLE stores the colour/pattern and the number of consecutive occurrences.',
        topic: 'rle',
        tier: 1,
        type: 'fill'
      }
    ]
  },
  {
    id: 'ascii-unicode',
    name: 'ASCII vs Unicode',
    tier: 1,
    rank: 9,
    description: 'ASCII 7/8 bits; Unicode up to 32 bits; wider characters',
    flashcards: [
      {
        id: 'au1',
        front: 'ASCII vs Unicode — key differences (mark-scheme wording)',
        back: '• ASCII uses 7 / 8 bits\n• Unicode can use many more / up to 32 bits\n• Unicode can represent a wider range of characters including different languages\n• Unicode can represent emojis and symbols from many writing systems',
        keywords: ['7/8 bits', 'up to 32 bits', 'wider range', 'different languages'],
        topic: 'ascii-unicode',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'auq1',
        question: 'How many bits does ASCII use?',
        options: ['7 or 8 bits', '16 bits', '32 bits', '4 bits'],
        answer: '7 or 8 bits',
        explanation: 'ASCII uses 7 bits (standard) or 8 bits (extended).',
        topic: 'ascii-unicode',
        tier: 1,
        type: 'mcq'
      },
      {
        id: 'auq2',
        question: 'How many bits can Unicode use?',
        answer: 'Up to 32 bits',
        explanation: 'Unicode can use up to 32 bits, allowing representation of a much wider range of characters.',
        topic: 'ascii-unicode',
        tier: 1,
        type: 'fill'
      }
    ]
  },
  {
    id: 'sampling',
    name: 'Sampling Rate & Resolution',
    tier: 1,
    rank: 10,
    description: 'Rate = measurements per second; resolution = bits per sample',
    flashcards: [
      {
        id: 'sr1',
        front: 'Define sampling rate',
        back: 'The number of times the amplitude is measured per second (per time interval).',
        keywords: ['amplitude', 'measured per second'],
        topic: 'sampling',
        tier: 1
      },
      {
        id: 'sr2',
        front: 'Define sampling resolution',
        back: 'The number of bits used to store each amplitude measurement.',
        keywords: ['bits', 'each amplitude measurement'],
        topic: 'sampling',
        tier: 1
      },
      {
        id: 'sr3',
        front: 'What is "analogue" in sound context?',
        back: 'The type of sound wave before it is recorded by a computer.',
        keywords: ['sound wave', 'before recorded', 'computer'],
        topic: 'sampling',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'srq1',
        question: 'Increasing sampling resolution results in:',
        options: ['Better quality and larger file', 'Worse quality and smaller file', 'No change', 'Better quality and smaller file'],
        answer: 'Better quality and larger file',
        explanation: 'More bits per sample = more accurate representation = better quality but larger file size.',
        topic: 'sampling',
        tier: 1,
        type: 'mcq'
      }
    ]
  },
  {
    id: 'networks',
    name: 'Network Topologies',
    tier: 1,
    rank: 11,
    description: 'Star, bus, mesh descriptions and advantages',
    flashcards: [
      {
        id: 'n1',
        front: 'Star topology — description and advantages',
        back: 'Description: All devices connect to one central device.\n\nAdvantages:\n• Easy to add/remove devices\n• Fault of one cable affects only one device\n• Centralized management\n\nDisadvantage: If central device fails, whole network fails.',
        keywords: ['central device', 'easy to add/remove', 'one cable one device', 'central device fails'],
        topic: 'networks',
        tier: 1
      },
      {
        id: 'n2',
        front: 'Bus topology — description and advantages/disadvantages',
        back: 'Description: All devices connect to a central cable.\n\nAdvantages:\n• Simple to install\n• Less cabling than star\n\nDisadvantages:\n• If main cable fails, whole network fails\n• Collisions/heavy traffic can reduce performance',
        keywords: ['central cable', 'simple to install', 'less cabling', 'main cable fails', 'collisions'],
        topic: 'networks',
        tier: 1
      },
      {
        id: 'n3',
        front: 'Mesh topology — description and advantages/disadvantages',
        back: 'Description: Multiple paths for packets to travel.\n\nAdvantage: Robust/resilient because if one line fails, data can take another path.\n\nDisadvantages:\n• More cabling/complexity\n• Expensive to set up',
        keywords: ['multiple paths', 'robust', 'resilient', 'another path', 'more cabling', 'expensive'],
        topic: 'networks',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'nq1',
        question: 'In which topology does failure of the central device cause the whole network to fail?',
        options: ['Star', 'Mesh', 'Ring', 'Peer-to-peer'],
        answer: 'Star',
        explanation: 'In star topology, all devices connect to one central device. If it fails, the whole network fails.',
        topic: 'networks',
        tier: 1,
        type: 'mcq'
      },
      {
        id: 'nq2',
        question: 'Which topology is most resilient to single line failures?',
        answer: 'Mesh',
        explanation: 'Mesh has multiple paths, so if one line fails, data can take another path.',
        topic: 'networks',
        tier: 1,
        type: 'fill'
      }
    ]
  },
  {
    id: 'wireless',
    name: 'Wireless Advantages/Disadvantages',
    tier: 1,
    rank: 12,
    description: 'No cabling, easy setup; less secure, interference, slower',
    flashcards: [
      {
        id: 'w1',
        front: 'Wireless network benefits (memorize these)',
        back: '• No cabling is needed, so easier to set up\n• Easier to add additional devices\n• Multiple different device types can be connected',
        keywords: ['no cabling', 'easier to set up', 'add devices', 'multiple device types'],
        topic: 'wireless',
        tier: 1
      },
      {
        id: 'w2',
        front: 'Wireless network drawbacks (memorize these)',
        back: '• Can be less secure\n• Transmission speed can be slow\n• Interference is possible\n• The signal degrades quickly without repeaters/boosters',
        keywords: ['less secure', 'slow', 'interference', 'signal degrades'],
        topic: 'wireless',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'wq1',
        question: 'Name one security drawback of wireless networks.',
        answer: 'Less secure',
        explanation: 'Wireless networks can be less secure because signals can be intercepted without physical access.',
        topic: 'wireless',
        tier: 1,
        type: 'fill'
      }
    ]
  },
  {
    id: 'client-server',
    name: 'Client-Server Model',
    tier: 1,
    rank: 13,
    description: 'Server minimal processing; client does most work locally',
    flashcards: [
      {
        id: 'cs1',
        front: 'Client-server model — mark-scheme wording',
        back: '• The server performs minimal / some processing for the client\n• The clients also do most of their own processing/work independently\n• Most of the resources are installed locally',
        keywords: ['server minimal processing', 'client own processing', 'resources installed locally'],
        topic: 'client-server',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'csq1',
        question: 'In client-server model, who does most of the processing?',
        options: ['The client', 'The server', 'Both equally', 'A third device'],
        answer: 'The client',
        explanation: 'The server performs minimal processing. The client does most of its own work independently.',
        topic: 'client-server',
        tier: 1,
        type: 'mcq'
      }
    ]
  },
  {
    id: 'security',
    name: 'Security: SSL/Passwords',
    tier: 1,
    rank: 14,
    description: 'Encryption makes intercepted data unreadable; passwords prevent unauthorized access',
    flashcards: [
      {
        id: 's1',
        front: 'What does SSL/encryption do? (mark-scheme wording)',
        back: 'Ensures that if data is intercepted / obtained it cannot be understood without the decryption key.\n\nSSL encrypts data sent between client and server.',
        keywords: ['intercepted', 'cannot be understood', 'decryption key', 'encrypts data'],
        topic: 'security',
        tier: 1
      },
      {
        id: 's2',
        front: 'What do passwords do? (mark-scheme wording)',
        back: 'Ensures only users with the correct password can access the resources.\nPrevents unauthorized access.',
        keywords: ['correct password', 'access resources', 'prevents unauthorized access'],
        topic: 'security',
        tier: 1
      },
      {
        id: 's3',
        front: 'Authentication vs Authorization',
        back: 'Authentication = proving who you are (e.g. password/biometric)\nAuthorization = determining what you are allowed to access',
        keywords: ['proving who you are', 'what allowed to access'],
        topic: 'security',
        tier: 1
      },
      {
        id: 's4',
        front: 'What is phishing? (mark-scheme wording)',
        back: '• The email pretends to be from an official body\n• Persuades individuals to disclose private information, e.g. bank details\n• Or requests authentication by redirecting to an unofficial/unauthorized website',
        keywords: ['pretends official', 'disclose private information', 'unofficial website'],
        topic: 'security',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'sq1',
        question: 'What happens to encrypted data if it is intercepted?',
        options: ['It cannot be understood without the decryption key', 'It is automatically deleted', 'It can be read by anyone', 'It self-destructs'],
        answer: 'It cannot be understood without the decryption key',
        explanation: 'Encryption ensures intercepted data cannot be understood without the decryption key.',
        topic: 'security',
        tier: 1,
        type: 'mcq'
      }
    ]
  },
  {
    id: 'sql',
    name: 'SQL SELECT Templates',
    tier: 1,
    rank: 15,
    description: 'SELECT, FROM, WHERE, ORDER BY, COUNT, SUM, AS',
    flashcards: [
      {
        id: 'sql1',
        front: 'Basic SELECT template',
        back: 'SELECT Field1, Field2\nFROM TableName\nWHERE Condition;',
        keywords: ['SELECT', 'FROM', 'WHERE'],
        topic: 'sql',
        tier: 1
      },
      {
        id: 'sql2',
        front: 'SELECT with COUNT template',
        back: 'SELECT COUNT(FieldName) AS Alias\nFROM TableName\nWHERE Condition;\n\nIMPORTANT: Use AS to name the counted column!',
        keywords: ['COUNT', 'AS', 'alias'],
        topic: 'sql',
        tier: 1
      },
      {
        id: 'sql3',
        front: 'SELECT with SUM and GROUP BY template',
        back: 'SELECT Field1, SUM(NumericField) AS Alias\nFROM TableName\nWHERE Condition\nGROUP BY Field1;',
        keywords: ['SUM', 'AS', 'GROUP BY'],
        topic: 'sql',
        tier: 1
      },
      {
        id: 'sql4',
        front: 'SELECT joining two tables (old style)',
        back: 'SELECT Table1.Field1, Table2.Field2\nFROM Table1, Table2\nWHERE Table1.Key = Table2.Key\nAND Condition\nORDER BY Field DESC;',
        keywords: ['FROM Table1, Table2', 'WHERE ... = ...', 'Key = Key'],
        topic: 'sql',
        tier: 1
      },
      {
        id: 'sql5',
        front: 'SELECT with INNER JOIN template',
        back: 'SELECT Table1.Field1, Table2.Field2\nFROM Table1\nINNER JOIN Table2\nON Table1.Key = Table2.Key\nWHERE Condition\nGROUP BY Table1.Field1\nORDER BY Table1.Key DESC;',
        keywords: ['INNER JOIN', 'ON', 'Key = Key'],
        topic: 'sql',
        tier: 1
      },
      {
        id: 'sql6',
        front: 'Correct SQL clause order',
        back: '1. SELECT\n2. FROM\n3. WHERE\n4. GROUP BY\n5. ORDER BY',
        keywords: ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY'],
        topic: 'sql',
        tier: 1
      },
      {
        id: 'sql7',
        front: 'Common SQL traps that lose marks',
        back: '1. Forgetting AS alias for COUNT/SUM\n2. Forgetting GROUP BY with aggregates\n3. Wrong join condition (must use PK/FK match)\n4. Wrong clause order\n5. Wrong quote style for strings/dates\n6. Wrong table/field names (copy exactly from question)',
        keywords: ['AS alias', 'GROUP BY', 'PK/FK match', 'exact names'],
        topic: 'sql',
        tier: 1
      }
    ],
    quiz: [
      {
        id: 'sqlq1',
        question: 'What is the correct order of SQL clauses?',
        options: ['SELECT, FROM, WHERE, GROUP BY, ORDER BY', 'SELECT, WHERE, FROM, GROUP BY, ORDER BY', 'FROM, SELECT, WHERE, ORDER BY, GROUP BY', 'SELECT, FROM, GROUP BY, WHERE, ORDER BY'],
        answer: 'SELECT, FROM, WHERE, GROUP BY, ORDER BY',
        explanation: 'The correct order is: SELECT → FROM → WHERE → GROUP BY → ORDER BY',
        topic: 'sql',
        tier: 1,
        type: 'mcq'
      },
      {
        id: 'sqlq2',
        question: 'When using COUNT() with another field in SELECT, what clause must you include?',
        answer: 'GROUP BY',
        explanation: 'When you use an aggregate function like COUNT/SUM and also select a non-aggregated field, you need GROUP BY for that field.',
        topic: 'sql',
        tier: 1,
        type: 'fill'
      }
    ]
  },
  // TIER 2 TOPICS
  {
    id: 'registers',
    name: 'Registers and Roles',
    tier: 2,
    rank: 16,
    description: 'PC, MAR, MDR, CIR, ACC, IX',
    flashcards: [
      {
        id: 'r1',
        front: 'Role of Program Counter (PC)',
        back: 'Stores the address of the NEXT instruction to be fetched from memory.\n\nTRAP: Do NOT say "current instruction" — say "next instruction".',
        keywords: ['address', 'next instruction', 'fetched', 'memory'],
        topic: 'registers',
        tier: 2
      },
      {
        id: 'r2',
        front: 'Role of Memory Address Register (MAR)',
        back: 'Stores the address of the memory location currently being read from or written to.',
        keywords: ['address', 'memory location', 'read from or written to'],
        topic: 'registers',
        tier: 2
      },
      {
        id: 'r3',
        front: 'Role of Memory Data Register (MDR)',
        back: 'Stores the data/instruction that has been read from or written to the memory address in the MAR.',
        keywords: ['data/instruction', 'read from or written to', 'MAR'],
        topic: 'registers',
        tier: 2
      },
      {
        id: 'r4',
        front: 'Role of Current Instruction Register (CIR)',
        back: 'Holds the instruction currently being decoded and/or executed.',
        keywords: ['instruction', 'decoded', 'executed'],
        topic: 'registers',
        tier: 2
      },
      {
        id: 'r5',
        front: 'Role of Accumulator (ACC)',
        back: 'Stores the intermediate results of arithmetic and logical operations.\nOR: Holds the result of a calculation.',
        keywords: ['intermediate results', 'arithmetic', 'logical', 'result of calculation'],
        topic: 'registers',
        tier: 2
      },
      {
        id: 'r6',
        front: 'Role of Index Register (IX)',
        back: 'Stores the index value used in indexed addressing.\n\nIn indexed addressing: Effective address = operand address + contents of IX',
        keywords: ['index value', 'indexed addressing', 'operand address + IX'],
        topic: 'registers',
        tier: 2
      },
      {
        id: 'r7',
        front: 'Role of Status/Flag Register',
        back: 'Stores status flags such as zero, carry, overflow, negative.',
        keywords: ['status flags', 'zero', 'carry', 'overflow', 'negative'],
        topic: 'registers',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'rq1',
        question: 'Which register stores the address of the NEXT instruction to be fetched?',
        options: ['Program Counter (PC)', 'Memory Address Register (MAR)', 'Current Instruction Register (CIR)', 'Accumulator (ACC)'],
        answer: 'Program Counter (PC)',
        explanation: 'PC stores the address of the NEXT instruction to be fetched from memory. Not the current one!',
        topic: 'registers',
        tier: 2,
        type: 'mcq'
      },
      {
        id: 'rq2',
        question: 'Which register holds the instruction currently being decoded?',
        answer: 'CIR',
        explanation: 'CIR (Current Instruction Register) holds the instruction currently being decoded and/or executed.',
        topic: 'registers',
        tier: 2,
        type: 'fill'
      },
      {
        id: 'rq3',
        question: 'The Accumulator stores what?',
        options: ['Intermediate results of arithmetic/logical operations', 'The next instruction address', 'Memory addresses', 'Status flags'],
        answer: 'Intermediate results of arithmetic/logical operations',
        explanation: 'ACC stores intermediate results of calculations and arithmetic/logical operations.',
        topic: 'registers',
        tier: 2,
        type: 'mcq'
      }
    ]
  },
  {
    id: 'fetch-decode',
    name: 'Fetch-Decode-Execute Cycle',
    tier: 2,
    rank: 17,
    description: 'MAR ← PC, PC ← PC + 1, MDR ← memory[MAR], CIR ← MDR',
    flashcards: [
      {
        id: 'fd1',
        front: 'Fetch-Decode-Execute cycle — memorize this order',
        back: '1. MAR ← [PC]\n2. PC ← [PC] + 1\n3. MDR ← [[MAR]]\n4. CIR ← [MDR]\n5. Decode and execute instruction in CIR',
        keywords: ['MAR ← PC', 'PC ← PC + 1', 'MDR ← memory', 'CIR ← MDR', 'decode execute'],
        topic: 'fetch-decode',
        tier: 2
      },
      {
        id: 'fd2',
        front: 'Explain the fetch-decycle cycle in words',
        back: '1. The address in PC is copied to MAR\n2. The PC is incremented to point to the next instruction\n3. The data/instruction at the MAR address is copied to MDR\n4. The contents of MDR are copied into CIR\n5. The instruction in CIR is decoded and executed',
        keywords: ['address copied to MAR', 'PC incremented', 'data copied to MDR', 'MDR to CIR', 'decoded and executed'],
        topic: 'fetch-decode',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'fdq1',
        question: 'What is the first step of the fetch cycle?',
        options: ['MAR ← [PC]', 'PC ← PC + 1', 'MDR ← [[MAR]]', 'CIR ← [MDR]'],
        answer: 'MAR ← [PC]',
        explanation: 'First, the address in the Program Counter is copied to the Memory Address Register.',
        topic: 'fetch-decode',
        tier: 2,
        type: 'mcq'
      },
      {
        id: 'fdq2',
        question: 'What happens to the PC during the fetch cycle?',
        answer: 'It is incremented by 1',
        explanation: 'PC ← PC + 1. The PC is incremented to point to the next instruction.',
        topic: 'fetch-decode',
        tier: 2,
        type: 'fill'
      }
    ]
  },
  {
    id: 'addressing',
    name: 'Addressing Modes',
    tier: 2,
    rank: 18,
    description: 'Immediate, direct, indirect, indexed',
    flashcards: [
      {
        id: 'am1',
        front: 'Immediate addressing',
        back: 'The operand is the actual value/data to be used.\n\nExample: LDM #50 → load the value 50 directly.',
        keywords: ['actual value', 'data to be used'],
        topic: 'addressing',
        tier: 2
      },
      {
        id: 'am2',
        front: 'Direct addressing',
        back: 'The operand is the address of the data.\n\nExample: LDD 100 → go to memory address 100 and load the data there.',
        keywords: ['address of the data', 'go to address'],
        topic: 'addressing',
        tier: 2
      },
      {
        id: 'am3',
        front: 'Indirect addressing',
        back: 'The operand points to a memory location which contains the address of the data.\n\nExample: LDI 101 → Memory address 101 contains another address; go to that address to get the data.',
        keywords: ['points to memory location', 'contains address', 'two steps'],
        topic: 'addressing',
        tier: 2
      },
      {
        id: 'am4',
        front: 'Indexed addressing',
        back: 'The address of the data is formed by adding the contents of the Index Register (IX) to the operand.\n\nEffective address = operand address + [IX]',
        keywords: ['IX', 'adding', 'operand + IX', 'effective address'],
        topic: 'addressing',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'amq1',
        question: 'In which addressing mode is the operand the actual value to be used?',
        options: ['Immediate', 'Direct', 'Indirect', 'Indexed'],
        answer: 'Immediate',
        explanation: 'Immediate addressing: the operand IS the actual value/data.',
        topic: 'addressing',
        tier: 2,
        type: 'mcq'
      },
      {
        id: 'amq2',
        question: 'In indirect addressing, how many memory accesses are needed to get the data?',
        answer: '2',
        explanation: 'First access: read the address stored at the operand location. Second access: go to that address to get the actual data.',
        topic: 'addressing',
        tier: 2,
        type: 'fill'
      }
    ]
  },
  {
    id: 'databases',
    name: 'Database Relationships',
    tier: 2,
    rank: 20,
    description: '1:M, M:1, M:M, linking table, primary key, foreign key',
    flashcards: [
      {
        id: 'db1',
        front: 'Define primary key',
        back: 'A field that uniquely identifies each record in a table.\n\nFeatures:\n• Must be unique\n• Cannot be null\n• One primary key per table',
        keywords: ['uniquely identifies', 'each record', 'unique', 'cannot be null'],
        topic: 'databases',
        tier: 2
      },
      {
        id: 'db2',
        front: 'Define foreign key',
        back: 'A field in one table that refers to the primary key in another table.\n\nPurpose:\n• Links tables together\n• Enforces referential integrity',
        keywords: ['refers to primary key', 'another table', 'links tables', 'referential integrity'],
        topic: 'databases',
        tier: 2
      },
      {
        id: 'db3',
        front: 'What is a one-to-many (1:M) relationship?',
        back: 'One record in table A relates to many records in table B.\n\nExample: One SHOW has many PERFORMANCEs.\nOne CUSTOMER has many BOOKINGs.',
        keywords: ['one record', 'many records', 'relates to'],
        topic: 'databases',
        tier: 2
      },
      {
        id: 'db4',
        front: 'How to resolve a many-to-many (M:M) relationship?',
        back: 'Create a linking/junction/bridge table.\n\nMark-scheme wording:\n"To remove the many-to-many relationship between the two tables by creating a linking table between the entities."',
        keywords: ['linking table', 'junction table', 'bridge table', 'remove M:M'],
        topic: 'databases',
        tier: 2
      },
      {
        id: 'db5',
        front: 'What is a data dictionary?',
        back: 'Data about the data in the database.\nOR: Data about the structure of the database.',
        keywords: ['data about the data', 'structure of the database'],
        topic: 'databases',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'dbq1',
        question: 'How do you resolve a many-to-many relationship?',
        options: ['Create a linking/junction table', 'Add a foreign key to one table', 'Merge the tables', 'Delete duplicate records'],
        answer: 'Create a linking/junction table',
        explanation: 'A linking/junction/bridge table is created between the two entities to remove the M:M relationship.',
        topic: 'databases',
        tier: 2,
        type: 'mcq'
      },
      {
        id: 'dbq2',
        question: 'A primary key must be ___ and cannot be ___.',
        answer: 'unique, null',
        explanation: 'Primary key must be unique and cannot be null.',
        topic: 'databases',
        tier: 2,
        type: 'fill'
      }
    ]
  },
  {
    id: 'create-table',
    name: 'CREATE TABLE Syntax',
    tier: 2,
    rank: 21,
    description: 'Fields, data types, NOT NULL, PRIMARY KEY, FOREIGN KEY',
    flashcards: [
      {
        id: 'ct1',
        front: 'CREATE TABLE template',
        back: 'CREATE TABLE TableName\n(\n    Field1 DataType NOT NULL,\n    Field2 DataType,\n    Field3 DataType,\n    PRIMARY KEY(Field1),\n    FOREIGN KEY(Field2) REFERENCES OtherTable(Field2)\n);',
        keywords: ['CREATE TABLE', 'DataType', 'NOT NULL', 'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES'],
        topic: 'create-table',
        tier: 2
      },
      {
        id: 'ct2',
        front: 'What earns marks in CREATE TABLE?',
        back: '• Creating table with correct name\n• Opening and closing brackets\n• All fields with appropriate data types\n• Primary key set correctly\n• Foreign key set correctly if required\n• NOT NULL where required\n• Commas in correct places',
        keywords: ['correct name', 'brackets', 'data types', 'primary key', 'foreign key', 'NOT NULL', 'commas'],
        topic: 'create-table',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'ctq1',
        question: 'What keyword links a foreign key to another table?',
        answer: 'REFERENCES',
        explanation: 'FOREIGN KEY(Field) REFERENCES OtherTable(Field)',
        topic: 'create-table',
        tier: 2,
        type: 'fill'
      }
    ]
  },
  {
    id: 'compression',
    name: 'Compression: Lossy vs Lossless',
    tier: 2,
    rank: 23,
    description: 'Lossy removes data permanently; lossless reconstructs original',
    flashcards: [
      {
        id: 'c1',
        front: 'Define lossless compression',
        back: 'The original data can be fully reconstructed after decompression.\n\nUsed for text, programs, some images.',
        keywords: ['fully reconstructed', 'original data', 'decompression'],
        topic: 'compression',
        tier: 2
      },
      {
        id: 'c2',
        front: 'Define lossy compression',
        back: 'Some data is permanently removed / lost.\n\nResults: Smaller file size but lower quality.\n\nUsed for audio, video, images where small file size is important.',
        keywords: ['permanently removed', 'permanently lost', 'smaller file', 'lower quality'],
        topic: 'compression',
        tier: 2
      },
      {
        id: 'c3',
        front: 'When might compression NOT be needed? (mark-scheme examples)',
        back: '• Video may already be a small file size and does not need further reduction\n• Video is not saved so storage is not an issue\n• Already fast connection that can transmit the data without slowing\n• Dedicated connection to the headset / not sharing bandwidth',
        keywords: ['already small', 'not saved', 'fast connection', 'dedicated connection'],
        topic: 'compression',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'cq1',
        question: 'In which type of compression can the original data be fully reconstructed?',
        options: ['Lossless', 'Lossy', 'Both', 'Neither'],
        answer: 'Lossless',
        explanation: 'Lossless compression allows the original data to be fully reconstructed after decompression.',
        topic: 'compression',
        tier: 2,
        type: 'mcq'
      },
      {
        id: 'cq2',
        question: 'What happens to data in lossy compression?',
        answer: 'It is permanently removed/lost',
        explanation: 'In lossy compression, some data is permanently removed/lost and cannot be recovered.',
        topic: 'compression',
        tier: 2,
        type: 'fill'
      }
    ]
  },
  {
    id: 'storage',
    name: 'Storage: ROM, RAM, SSD, HDD',
    tier: 2,
    rank: 24,
    description: 'Volatile/non-volatile, speed, capacity, moving parts',
    flashcards: [
      {
        id: 'st1',
        front: 'ROM characteristics',
        back: '• Non-volatile\n• Stores start-up instructions / bootstrap program / BIOS / firmware / kernel\n• Cannot normally be changed by user',
        keywords: ['non-volatile', 'bootstrap', 'BIOS', 'firmware', 'cannot be changed'],
        topic: 'storage',
        tier: 2
      },
      {
        id: 'st2',
        front: 'RAM characteristics',
        back: '• Volatile\n• Stores data/instructions currently in use\n• Lost when power is switched off\n• Faster than secondary storage',
        keywords: ['volatile', 'currently in use', 'lost when power off', 'faster than secondary'],
        topic: 'storage',
        tier: 2
      },
      {
        id: 'st3',
        front: 'Cache memory — exact wording',
        back: '• Cache is fast access memory close to the CPU\n• Stores frequently used instructions/data\n• So that they can be accessed faster than from RAM\n• Improves system performance',
        keywords: ['fast', 'close to CPU', 'frequently used', 'faster than RAM', 'improves performance'],
        topic: 'storage',
        tier: 2
      },
      {
        id: 'st4',
        front: 'SSD characteristics',
        back: '• Uses flash memory\n• No moving parts\n• Faster than HDD\n• More durable/resistant to shock\n• Lower latency\n• Often more expensive per unit capacity',
        keywords: ['flash memory', 'no moving parts', 'faster than HDD', 'durable', 'expensive'],
        topic: 'storage',
        tier: 2
      },
      {
        id: 'st5',
        front: 'HDD characteristics',
        back: '• Uses magnetic platters\n• Has moving read/write heads\n• Slower than SSD\n• Cheaper for large capacity\n• More prone to mechanical failure',
        keywords: ['magnetic platters', 'moving heads', 'slower than SSD', 'cheaper', 'mechanical failure'],
        topic: 'storage',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'stq1',
        question: 'Which type of memory is volatile?',
        options: ['RAM', 'ROM', 'SSD', 'HDD'],
        answer: 'RAM',
        explanation: 'RAM is volatile — data is lost when power is switched off. ROM is non-volatile.',
        topic: 'storage',
        tier: 2,
        type: 'mcq'
      },
      {
        id: 'stq2',
        question: 'What does cache store?',
        answer: 'Frequently used instructions/data',
        explanation: 'Cache stores frequently used instructions/data so they can be accessed faster than from RAM.',
        topic: 'storage',
        tier: 2,
        type: 'fill'
      }
    ]
  },
  {
    id: 'os-functions',
    name: 'Operating System Functions',
    tier: 2,
    rank: 26,
    description: 'Memory management, processor scheduling, file management, security, UI',
    flashcards: [
      {
        id: 'os1',
        front: 'OS: Processor scheduling',
        back: '• Efficient allocation of resources to processes\n• Moving processes between states\n• Allocating time slices to processes',
        keywords: ['allocation of resources', 'processes', 'time slices'],
        topic: 'os-functions',
        tier: 2
      },
      {
        id: 'os2',
        front: 'OS: Memory management',
        back: '• Allocates memory to processes\n• Manages virtual memory\n• Prevents processes interfering with each other\'s memory',
        keywords: ['allocates memory', 'virtual memory', 'prevents interfering'],
        topic: 'os-functions',
        tier: 2
      },
      {
        id: 'os3',
        front: 'OS: File management',
        back: '• Creates, deletes, organizes files and folders\n• Manages file directories/access\n• Controls permissions',
        keywords: ['creates deletes organizes', 'directories', 'permissions'],
        topic: 'os-functions',
        tier: 2
      },
      {
        id: 'os4',
        front: 'OS: Peripheral management',
        back: '• Controls input/output devices\n• Uses device drivers\n• Manages data transfer between CPU and peripherals',
        keywords: ['input/output devices', 'device drivers', 'data transfer'],
        topic: 'os-functions',
        tier: 2
      },
      {
        id: 'os5',
        front: 'OS: Security',
        back: '• Controls user access\n• Uses passwords/authentication\n• Protects data from unauthorized access',
        keywords: ['user access', 'passwords', 'authentication', 'unauthorized access'],
        topic: 'os-functions',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'osq1',
        question: 'Which OS function allocates time slices to processes?',
        answer: 'Processor scheduling',
        explanation: 'Processor scheduling handles efficient allocation of resources, moving processes between states, and allocating time slices.',
        topic: 'os-functions',
        tier: 2,
        type: 'fill'
      }
    ]
  },
  {
    id: 'compiler-interpreter',
    name: 'Compiler vs Interpreter',
    tier: 2,
    rank: 28,
    description: 'Compiler creates executable; interpreter executes line by line',
    flashcards: [
      {
        id: 'ci1',
        front: 'What does a compiler do?',
        back: 'Translates the whole high-level program into machine code / object code / executable file.\n\nBenefit: Creates an executable file so the code can be tested/run multiple times without having to recompile.',
        keywords: ['whole program', 'machine code', 'executable file', 'multiple times without recompiling'],
        topic: 'compiler-interpreter',
        tier: 2
      },
      {
        id: 'ci2',
        front: 'What does an interpreter do?',
        back: 'Translates and executes source code one line at a time.\n\nBenefit: Easier to debug because errors are found line by line. No separate compilation step needed.\n\nDrawback: Usually slower than compiled code.',
        keywords: ['one line at a time', 'easier to debug', 'slower'],
        topic: 'compiler-interpreter',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'ciq1',
        question: 'Which translates the whole program at once?',
        options: ['Compiler', 'Interpreter'],
        answer: 'Compiler',
        explanation: 'A compiler translates the whole high-level program into machine code/executable at once.',
        topic: 'compiler-interpreter',
        tier: 2,
        type: 'mcq'
      },
      {
        id: 'ciq2',
        question: 'Which is easier to debug?',
        answer: 'Interpreter',
        explanation: 'Interpreter is easier to debug because errors are found line by line.',
        topic: 'compiler-interpreter',
        tier: 2,
        type: 'fill'
      }
    ]
  },
  {
    id: 'libraries',
    name: 'Libraries and DLLs',
    tier: 2,
    rank: 29,
    description: 'Pre-written subroutines; DLL updated independently',
    flashcards: [
      {
        id: 'lib1',
        front: 'What is a library? (exact wording)',
        back: 'A set of pre-written / pre-compiled / pre-tested subroutines which can be called in other programs by installing/importing the library.',
        keywords: ['pre-written', 'pre-compiled', 'pre-tested', 'subroutines', 'called in other programs'],
        topic: 'libraries',
        tier: 2
      },
      {
        id: 'lib2',
        front: 'What is a DLL? (exact mark-scheme wording)',
        back: '• Maintenance does not need to be done by the programmer\n• Because the DLL is separate from the program\n• The calling program does not need recompilation when a DLL file changes\n• Because the DLL file can be updated independently of the calling program\n• Updates apply to all programs that use the DLL file',
        keywords: ['separate from program', 'no recompilation', 'updated independently', 'all programs benefit'],
        topic: 'libraries',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'libq1',
        question: 'Why does a DLL not require recompilation of the calling program?',
        options: ['Because the DLL is separate from the program and can be updated independently', 'Because DLLs are faster', 'Because DLLs are smaller', 'Because DLLs are written in machine code'],
        answer: 'Because the DLL is separate from the program and can be updated independently',
        explanation: 'The DLL is separate from the calling program, so it can be updated independently without requiring recompilation.',
        topic: 'libraries',
        tier: 2,
        type: 'mcq'
      }
    ]
  },
  {
    id: 'ide',
    name: 'IDE Tools/Debugging',
    tier: 2,
    rank: 30,
    description: 'Autocomplete, single stepping, breakpoints, watch, indenting',
    flashcards: [
      {
        id: 'ide1',
        front: 'What is autocomplete/context-sensitive prompts?',
        back: 'As the code is being written, options to complete the statement are shown.',
        keywords: ['code being written', 'options to complete', 'shown'],
        topic: 'ide',
        tier: 2
      },
      {
        id: 'ide2',
        front: 'What is single stepping?',
        back: 'Allows the programmer to execute the program one line at a time so that the effects/values of each statement can be seen/checked.',
        keywords: ['one line at a time', 'effects/values', 'seen/checked'],
        topic: 'ide',
        tier: 2
      },
      {
        id: 'ide3',
        front: 'What are breakpoints?',
        back: 'Pause execution at a specific line so variables/state can be inspected.',
        keywords: ['pause execution', 'specific line', 'variables inspected'],
        topic: 'ide',
        tier: 2
      },
      {
        id: 'ide4',
        front: 'What is a watch?',
        back: 'Monitors the value of selected variables during execution.',
        keywords: ['monitors', 'selected variables', 'during execution'],
        topic: 'ide',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'ideq1',
        question: 'Which IDE feature allows executing code one line at a time?',
        answer: 'Single stepping',
        explanation: 'Single stepping allows the programmer to execute the program one line at a time.',
        topic: 'ide',
        tier: 2,
        type: 'fill'
      }
    ]
  },
  {
    id: 'control-systems',
    name: 'Sensors, Actuators, Control Systems',
    tier: 2,
    rank: 31,
    description: 'Sensor input, actuator output, feedback, open/closed loop',
    flashcards: [
      {
        id: 'ctrl1',
        front: 'Define sensor',
        back: 'Input device that detects/measures a physical quantity and converts it into data/signals.',
        keywords: ['input device', 'detects', 'measures', 'physical quantity', 'converts to data'],
        topic: 'control-systems',
        tier: 2
      },
      {
        id: 'ctrl2',
        front: 'Define actuator',
        back: 'Output device that generates a signal / causes an action / converts electrical energy into movement.\n\nExamples: Motor, brake, buzzer, light, robotic arm.',
        keywords: ['output device', 'causes action', 'electrical energy into movement'],
        topic: 'control-systems',
        tier: 2
      },
      {
        id: 'ctrl3',
        front: 'What is a closed loop system?',
        back: '• Uses feedback\n• Output is measured and compared with desired value\n• System adjusts action to maintain set criteria/constraints\n\nMark-scheme: "Feedback ensures that a system operates within set criteria/constraints"',
        keywords: ['feedback', 'measured', 'compared', 'desired value', 'adjusts', 'set criteria'],
        topic: 'control-systems',
        tier: 2
      },
      {
        id: 'ctrl4',
        front: 'What is an open loop system?',
        back: '• No feedback\n• Output does not affect future input/control\n\nExample: Simple timer-based system.',
        keywords: ['no feedback', 'output does not affect input'],
        topic: 'control-systems',
        tier: 2
      },
      {
        id: 'ctrl5',
        front: 'Why is a monitoring system NOT a closed loop?',
        back: '• There is no use of feedback\n• The output does not affect the input data from sensors\n• The system does not have actuators\n\nA monitoring system collects/reports data but does not automatically control the process.',
        keywords: ['no feedback', 'output does not affect input', 'no actuators', 'does not control'],
        topic: 'control-systems',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'ctrlq1',
        question: 'What key feature distinguishes a closed loop from an open loop system?',
        options: ['Use of feedback', 'Use of sensors', 'Use of a computer', 'Speed of processing'],
        answer: 'Use of feedback',
        explanation: 'Closed loop uses feedback — the output is measured and compared with desired value, and the system adjusts.',
        topic: 'control-systems',
        tier: 2,
        type: 'mcq'
      },
      {
        id: 'ctrlq2',
        question: 'An actuator is what type of device?',
        answer: 'Output device',
        explanation: 'An actuator is an output device that causes an action / converts electrical energy into movement.',
        topic: 'control-systems',
        tier: 2,
        type: 'fill'
      }
    ]
  },
  {
    id: 'ai-speech',
    name: 'AI / Speech Recognition',
    tier: 2,
    rank: 32,
    description: 'Record sound, compare to database, identify probable word, generate command',
    flashcards: [
      {
        id: 'ai1',
        front: 'How does speech recognition work? (mark-scheme wording)',
        back: '1. Uses speech recognition\n2. Identifies key phrases/words spoken\n3. Matches these to a database\n4. Generates the most likely sentence/command/word',
        keywords: ['speech recognition', 'key phrases', 'matches database', 'most likely'],
        topic: 'ai-speech',
        tier: 2
      },
      {
        id: 'ai2',
        front: 'Longer version of speech recognition process',
        back: '• Voice/speech recognition is used\n• The sound is recorded and analysed\n• Audio recordings are compared to a database of words/sound waves\n• The system identifies the word with the highest probability of being said\n• Natural language recognition is used\n• Words are combined and compared to known sentences\n• Programmed actions for matching sentences are performed',
        keywords: ['recorded and analysed', 'compared to database', 'highest probability', 'natural language', 'programmed actions'],
        topic: 'ai-speech',
        tier: 2
      }
    ],
    quiz: [
      {
        id: 'aiq1',
        question: 'In speech recognition, what is the recorded audio compared to?',
        answer: 'A database of words/sound waves',
        explanation: 'Audio recordings are compared to a database of words/sound waves to identify the most probable match.',
        topic: 'ai-speech',
        tier: 2,
        type: 'fill'
      }
    ]
  },
  // TIER 3
  {
    id: 'boolean-expressions',
    name: 'Complex Boolean Expressions',
    tier: 3,
    rank: 33,
    description: 'Requires gate tracing — practice truth tables and expression building',
    flashcards: [
      {
        id: 'be1',
        front: 'How to build a truth table for 3 variables P, Q, R',
        back: 'P Q R\n0 0 0\n0 0 1\n0 1 0\n0 1 1\n1 0 0\n1 0 1\n1 1 0\n1 1 1\n\nAlways use this order unless question specifies otherwise.\n\nFor 2 variables: 00, 01, 10, 11',
        keywords: ['8 rows for 3 variables', 'standard order', '000 to 111'],
        topic: 'boolean-expressions',
        tier: 3
      },
      {
        id: 'be2',
        front: 'Example: (A XOR B) NOR C',
        back: 'Step 1: Calculate A XOR B for each row\nStep 2: Take result NOR C\n\nXOR: output 1 if inputs different\nNOR: output 1 only if both inputs 0\n\nWork through each row systematically.',
        keywords: ['XOR first', 'then NOR', 'work systematically'],
        topic: 'boolean-expressions',
        tier: 3
      }
    ],
    quiz: [
      {
        id: 'beq1',
        question: 'How many rows does a truth table for 3 variables have?',
        answer: '8',
        explanation: '2³ = 8 rows for 3 variables.',
        topic: 'boolean-expressions',
        tier: 3,
        type: 'fill'
      }
    ]
  },
  {
    id: 'advanced-sql',
    name: 'Advanced SQL with Multiple Joins',
    tier: 3,
    rank: 34,
    description: 'Syntax traps — memorize templates, use exact table/field names',
    flashcards: [
      {
        id: 'asql1',
        front: 'COUNT with GROUP BY example',
        back: 'SELECT PlayerName, COUNT(CHARACTER.CharacterID) AS TotalCharacters\nFROM CHARACTER, PLAYER\nWHERE CHARACTER.PlayerID = PLAYER.PlayerID\nGROUP BY PlayerName\nORDER BY PLAYER.PlayerID DESC;\n\nMarks split as:\n• Selecting correct fields and counting\n• Using appropriate alias\n• Linking/joining correct tables\n• Grouping correctly\n• Ordering correctly',
        keywords: ['COUNT', 'AS alias', 'GROUP BY', 'ORDER BY', 'linking tables'],
        topic: 'advanced-sql',
        tier: 3
      }
    ],
    quiz: [
      {
        id: 'asqlq1',
        question: 'When joining two tables, what must the WHERE condition match?',
        answer: 'Primary key to foreign key',
        explanation: 'The join condition must use matching primary key/foreign key fields, not random fields.',
        topic: 'advanced-sql',
        tier: 3,
        type: 'fill'
      }
    ]
  },
  {
    id: 'evaluation',
    name: 'Scenario-Based Evaluation',
    tier: 3,
    rank: 37,
    description: 'Use "point + because/so" structure',
    flashcards: [
      {
        id: 'ev1',
        front: 'Sentence formula for Explain/Describe/Suggest why questions',
        back: 'Use: Point + Because/So + Effect\n\nExamples:\n• Cache improves performance BECAUSE it stores frequently used instructions/data, SO the CPU can access them faster than from RAM.\n• RLE reduces file size BECAUSE it stores colour + count for consecutive pixels, SO less data is stored.\n• Wireless is easier to set up BECAUSE no cabling is needed, SO additional devices can be added easily.',
        keywords: ['Point', 'Because', 'So', 'Effect'],
        topic: 'evaluation',
        tier: 3
      }
    ],
    quiz: [
      {
        id: 'evq1',
        question: 'What structure should you use for "Explain" questions?',
        answer: 'Point + Because/So + Effect',
        explanation: 'Use Point + Because/So + Effect to ensure your answer is structured and complete.',
        topic: 'evaluation',
        tier: 3,
        type: 'fill'
      }
    ]
  }
];

export const keywordMemory: { keyword: string; sentence: string }[] = [
  { keyword: 'Presence', sentence: 'cannot be blank' },
  { keyword: 'Range', sentence: 'between two values' },
  { keyword: 'Limit', sentence: 'one boundary' },
  { keyword: 'Format', sentence: 'pattern' },
  { keyword: 'Length', sentence: 'exact number of characters' },
  { keyword: 'Visual check', sentence: 'person compares to original' },
  { keyword: 'Double entry', sentence: 'entered twice, computer compares' },
  { keyword: 'RLE', sentence: 'consecutive pixels, colour + count' },
  { keyword: 'Checksum', sentence: 'algorithm, send, recalculate, compare' },
  { keyword: 'PC', sentence: 'next instruction' },
  { keyword: 'MAR', sentence: 'address being read/written' },
  { keyword: 'MDR', sentence: 'data/instruction retrieved' },
  { keyword: 'CIR', sentence: 'current instruction decoded/executed' },
  { keyword: 'ACC', sentence: 'intermediate calculation result' },
  { keyword: 'Cache', sentence: 'fast, near CPU, frequently used' },
  { keyword: 'Closed loop', sentence: 'feedback adjusts output' },
  { keyword: 'Monitoring', sentence: 'no feedback/actuators' },
  { keyword: 'Client-server', sentence: 'server minimal, client local processing' },
  { keyword: 'SSL', sentence: 'intercepted data unreadable without key' },
  { keyword: 'Unicode', sentence: 'up to 32 bits, wider characters' },
  { keyword: 'ASCII', sentence: '7/8 bits' },
  { keyword: 'Lossless', sentence: 'fully reconstructed after decompression' },
  { keyword: 'Lossy', sentence: 'data permanently removed' },
  { keyword: 'Parity', sentence: 'detects single-bit errors only' },
  { keyword: 'Compiler', sentence: 'whole program → executable' },
  { keyword: 'Interpreter', sentence: 'one line at a time' },
  { keyword: 'DLL', sentence: 'updated independently, no recompilation needed' },
  { keyword: 'Primary key', sentence: 'uniquely identifies each record' },
  { keyword: 'Foreign key', sentence: 'refers to PK in another table' },
  { keyword: 'Sensor', sentence: 'input, detects physical quantity' },
  { keyword: 'Actuator', sentence: 'output, causes action/movement' },
];
