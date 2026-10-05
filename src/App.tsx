import { useState, useEffect, useCallback } from 'react';
import { topics, keywordMemory, Topic, Flashcard, QuizQuestion } from './data/content';

type View = 'dashboard' | 'flashcards' | 'quiz' | 'keywords' | 'topic-detail' | 'progress';

interface ProgressData {
  [cardId: string]: { correct: number; incorrect: number; lastSeen: number };
}

function loadProgress(): ProgressData {
  try {
    const saved = localStorage.getItem('cs9618-progress');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveProgress(data: ProgressData) {
  localStorage.setItem('cs9618-progress', JSON.stringify(data));
}

// ===== DASHBOARD =====
function Dashboard({ onSelectTopic, onStartQuiz, onStartFlashcards }: {
  onSelectTopic: (topic: Topic) => void;
  onStartQuiz: () => void;
  onStartFlashcards: () => void;
}) {
  const tier1 = topics.filter(t => t.tier === 1);
  const tier2 = topics.filter(t => t.tier === 2);
  const tier3 = topics.filter(t => t.tier === 3);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">CS 9618 Paper 1 — Active Revision</h1>
        <p className="text-indigo-100 text-sm md:text-base mb-4">
          Don't just read. <strong>Recall, test, repeat.</strong> Master mark-scheme bullets, not paragraphs.
        </p>
        <div className="flex flex-wrap gap-3">
          <button onClick={onStartFlashcards} className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50 transition text-sm">
            🃏 Flashcards
          </button>
          <button onClick={onStartQuiz} className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-400 transition text-sm border border-indigo-400">
            🧠 Quiz Mode
          </button>
        </div>
      </div>

      {/* Strategy reminder */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-amber-800 text-sm font-medium">⚡ Strategy: Master Tier 1 first (highest ROI), then Tier 2, then Tier 3.</p>
        <p className="text-amber-700 text-xs mt-1">Write in short, exact, non-contradictory bullets. Zero careless marks = 100%.</p>
      </div>

      {/* Tier 1 */}
      <TierSection title="🏆 Tier 1: Bank These Marks First" subtitle="Highest predictability — appear repeatedly with fixed wording" topics={tier1} color="green" onSelectTopic={onSelectTopic} />
      
      {/* Tier 2 */}
      <TierSection title="📘 Tier 2: Medium Difficulty" subtitle="Very learnable but require more structure" topics={tier2} color="blue" onSelectTopic={onSelectTopic} />
      
      {/* Tier 3 */}
      <TierSection title="🔥 Tier 3: Harder / Less Predictable" subtitle="Do only after Tier 1 & 2 are solid" topics={tier3} color="red" onSelectTopic={onSelectTopic} />
    </div>
  );
}

function TierSection({ title, subtitle, topics: tierTopics, color, onSelectTopic }: {
  title: string;
  subtitle: string;
  topics: Topic[];
  color: 'green' | 'blue' | 'red';
  onSelectTopic: (topic: Topic) => void;
}) {
  const colorClasses = {
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
    red: 'bg-red-50 border-red-200'
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-1">{title}</h2>
      <p className="text-xs text-gray-500 mb-3">{subtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {tierTopics.map(topic => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            className={`${colorClasses[color]} border rounded-xl p-4 text-left hover:shadow-md transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-mono bg-white/70 px-2 py-0.5 rounded text-gray-600">#{topic.rank}</span>
              <span className="text-xs text-gray-400">{topic.flashcards.length} cards</span>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mt-2">{topic.name}</h3>
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{topic.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== FLASHCARD VIEW =====
function FlashcardView({ topic, onBack }: { topic: Topic | null; onBack: () => void }) {
  const allCards = topic ? topic.flashcards : topics.flatMap(t => t.flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState<ProgressData>(loadProgress);
  const [showKeywords, setShowKeywords] = useState(false);

  const card = allCards[currentIndex];

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % allCards.length);
    setIsFlipped(false);
    setShowKeywords(false);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + allCards.length) % allCards.length);
    setIsFlipped(false);
    setShowKeywords(false);
  };

  const markCard = (correct: boolean) => {
    const newProgress = { ...progress };
    if (!newProgress[card.id]) {
      newProgress[card.id] = { correct: 0, incorrect: 0, lastSeen: Date.now() };
    }
    if (correct) newProgress[card.id].correct++;
    else newProgress[card.id].incorrect++;
    newProgress[card.id].lastSeen = Date.now();
    setProgress(newProgress);
    saveProgress(newProgress);
    handleNext();
  };

  const handleShuffle = () => {
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    // We'll just reset to a random position
    setCurrentIndex(Math.floor(Math.random() * allCards.length));
    setIsFlipped(false);
    setShowKeywords(false);
  };

  if (!card) return <div>No cards available</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          ← Back
        </button>
        <span className="text-xs text-gray-500">
          {topic ? topic.name : 'All Topics'} — {currentIndex + 1}/{allCards.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / allCards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div
        onClick={handleFlip}
        className="cursor-pointer perspective-1000"
      >
        <div className={`relative w-full min-h-[280px] md:min-h-[320px] transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className={`absolute inset-0 backface-hidden rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-center ${
            isFlipped ? 'invisible' : 'bg-white border-2 border-indigo-100'
          }`}>
            <span className="text-xs text-indigo-400 mb-3 uppercase tracking-wide">Question / Prompt</span>
            <p className="text-lg md:text-xl font-semibold text-gray-800">{card.front}</p>
            <span className="text-xs text-gray-400 mt-4">Tap to reveal answer</span>
          </div>
          {/* Back */}
          <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl shadow-lg p-6 flex flex-col justify-center ${
            !isFlipped ? 'invisible' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200'
          }`}>
            <span className="text-xs text-indigo-400 mb-3 uppercase tracking-wide">Answer</span>
            <pre className="text-sm md:text-base text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{card.back}</pre>
          </div>
        </div>
      </div>

      {/* Keywords toggle */}
      {isFlipped && (
        <div className="space-y-3">
          <button
            onClick={() => setShowKeywords(!showKeywords)}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {showKeywords ? '▼ Hide' : '▶ Show'} keywords to check
          </button>
          {showKeywords && (
            <div className="flex flex-wrap gap-2">
              {card.keywords.map((kw, i) => (
                <span key={i} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full border border-yellow-200">
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        <button onClick={handlePrev} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
          ← Prev
        </button>
        <button onClick={handleShuffle} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs transition">
          🔀 Shuffle
        </button>
        <button onClick={handleNext} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
          Next →
        </button>
      </div>

      {/* Self-assessment */}
      {isFlipped && (
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={() => markCard(false)}
            className="px-6 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium text-sm transition"
          >
            ❌ Didn't know
          </button>
          <button
            onClick={() => markCard(true)}
            className="px-6 py-2.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-medium text-sm transition"
          >
            ✅ Got it
          </button>
        </div>
      )}
    </div>
  );
}

// ===== QUIZ VIEW =====
function QuizView({ topic, onBack }: { topic: Topic | null; onBack: () => void }) {
  const allQuestions = topic ? topic.quiz : topics.flatMap(t => t.quiz);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [fillAnswer, setFillAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setFillAnswer('');
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
    setIsComplete(false);
  }, [topic]);

  const question = shuffledQuestions[currentIndex];

  const checkAnswer = () => {
    if (!question) return;
    setShowResult(true);
    const userAnswer = question.type === 'mcq' ? (selectedAnswer ?? '') : (fillAnswer ?? '').trim().toLowerCase();
    const correctAnswer = question.answer.toLowerCase();
    const isCorrect = question.type === 'mcq'
      ? selectedAnswer === question.answer
      : correctAnswer.includes(userAnswer) || userAnswer.includes(correctAnswer);
    
    if (isCorrect) {
      setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }));
    } else {
      setScore(s => ({ ...s, total: s.total + 1 }));
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= shuffledQuestions.length) {
      setIsComplete(true);
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setFillAnswer('');
      setShowResult(false);
    }
  };

  const restart = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setFillAnswer('');
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
    setIsComplete(false);
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No quiz questions available for this topic yet.</p>
        <button onClick={onBack} className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium text-sm">← Back</button>
      </div>
    );
  }

  if (isComplete) {
    const percentage = Math.round((score.correct / score.total) * 100);
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-8">
        <div className="text-6xl">{percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '📚'}</div>
        <h2 className="text-2xl font-bold text-gray-800">Quiz Complete!</h2>
        <p className="text-lg text-gray-600">
          You got <strong>{score.correct}/{score.total}</strong> correct ({percentage}%)
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all ${percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">
          {percentage < 80 ? 'Review the flashcards for topics you missed, then try again!' : 'Great job! Keep practicing to maintain mastery.'}
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={restart} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
            Try Again
          </button>
          <button onClick={onBack} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (!question) return null;

  const isCorrect = question.type === 'mcq'
    ? selectedAnswer === question.answer
    : question.answer.toLowerCase().includes(fillAnswer.trim().toLowerCase()) || fillAnswer.trim().toLowerCase().includes(question.answer.toLowerCase());

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          ← Back
        </button>
        <span className="text-xs text-gray-500">
          {topic ? topic.name : 'All Topics'} — Q{currentIndex + 1}/{shuffledQuestions.length}
        </span>
      </div>

      {/* Score */}
      <div className="text-xs text-gray-500 text-right">
        Score: {score.correct}/{score.total}
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <span className="text-xs text-indigo-400 uppercase tracking-wide font-medium">
          {question.type === 'mcq' ? 'Multiple Choice' : 'Fill in the Blank'}
        </span>
        <h3 className="text-lg font-semibold text-gray-800 mt-2 mb-4">{question.question}</h3>

        {question.type === 'mcq' && question.options && (
          <div className="space-y-2">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => !showResult && setSelectedAnswer(option)}
                className={`w-full text-left p-3 rounded-lg border transition text-sm ${
                  showResult
                    ? option === question.answer
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : option === selectedAnswer
                        ? 'bg-red-50 border-red-300 text-red-800'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    : selectedAnswer === option
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {question.type === 'fill' && (
          <div>
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !showResult && fillAnswer.trim() && checkAnswer()}
              disabled={showResult}
              placeholder="Type your answer..."
              className={`w-full p-3 rounded-lg border text-sm ${
                showResult
                  ? isCorrect
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                  : 'border-gray-300 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200'
              } outline-none transition`}
            />
            {showResult && !isCorrect && (
              <p className="text-sm text-green-700 mt-2">
                Correct answer: <strong>{question.answer}</strong>
              </p>
            )}
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p className="font-medium">{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</p>
            <p className="mt-1 text-xs opacity-80">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-center">
        {!showResult ? (
          <button
            onClick={checkAnswer}
            disabled={question.type === 'mcq' ? !selectedAnswer : !fillAnswer.trim()}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {currentIndex + 1 >= shuffledQuestions.length ? 'See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}

// ===== KEYWORD MEMORY VIEW =====
function KeywordView() {
  const [hiddenKeywords, setHiddenKeywords] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggleHide = (index: number) => {
    const newHidden = new Set(hiddenKeywords);
    if (newHidden.has(index)) newHidden.delete(index);
    else newHidden.add(index);
    setHiddenKeywords(newHidden);
  };

  const toggleReveal = (index: number) => {
    const newRevealed = new Set(revealed);
    if (newRevealed.has(index)) newRevealed.delete(index);
    else newRevealed.add(index);
    setRevealed(newRevealed);
  };

  const shuffleAll = () => {
    setHiddenKeywords(new Set(keywordMemory.map((_, i) => i)));
    setRevealed(new Set());
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">🔑 Keyword → Sentence Memory</h2>
        <button onClick={shuffleAll} className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition">
          Hide All (Test Yourself)
        </button>
      </div>
      <p className="text-sm text-gray-500">
        Click a keyword to hide/show its sentence. Use this for active recall — try to say the sentence before revealing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {keywordMemory.map((item, i) => (
          <div
            key={i}
            className={`border rounded-xl p-4 transition-all ${
              hiddenKeywords.has(i)
                ? 'bg-gray-50 border-gray-200'
                : 'bg-white border-gray-200 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between">
              <button
                onClick={() => toggleHide(i)}
                className={`font-bold text-sm ${hiddenKeywords.has(i) ? 'text-gray-400' : 'text-indigo-700'}`}
              >
                {hiddenKeywords.has(i) ? '🔒 ???' : item.keyword}
              </button>
              <button
                onClick={() => toggleReveal(i)}
                className="text-xs text-gray-400 hover:text-indigo-600"
              >
                {revealed.has(i) ? '▼' : '▶'}
              </button>
            </div>
            {!hiddenKeywords.has(i) && revealed.has(i) && (
              <p className="text-sm text-gray-600 mt-2">{item.sentence}</p>
            )}
            {!hiddenKeywords.has(i) && !revealed.has(i) && (
              <p className="text-sm text-gray-600 mt-2">{item.sentence}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== TOPIC DETAIL VIEW =====
function TopicDetail({ topic, onBack, onStartFlashcards, onStartQuiz }: {
  topic: Topic;
  onBack: () => void;
  onStartFlashcards: () => void;
  onStartQuiz: () => void;
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          ← All Topics
        </button>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          topic.tier === 1 ? 'bg-green-100 text-green-700' : topic.tier === 2 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
        }`}>
          Tier {topic.tier} • #{topic.rank}
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h1 className="text-xl font-bold text-gray-800">{topic.name}</h1>
        <p className="text-sm text-gray-500 mt-1">{topic.description}</p>

        <div className="flex gap-3 mt-4">
          <button onClick={onStartFlashcards} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            🃏 Study Flashcards ({topic.flashcards.length})
          </button>
          <button onClick={onStartQuiz} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition">
            🧠 Take Quiz ({topic.quiz.length})
          </button>
        </div>
      </div>

      {/* Flashcard previews */}
      <div className="space-y-3">
        <button
          onClick={() => setExpandedSection(expandedSection === 'cards' ? null : 'cards')}
          className="w-full text-left bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">📇 Flashcard Preview</h3>
            <span className="text-gray-400">{expandedSection === 'cards' ? '▼' : '▶'}</span>
          </div>
        </button>
        {expandedSection === 'cards' && (
          <div className="space-y-3 pl-2">
            {topic.flashcards.map((card, i) => (
              <CardPreview key={card.id} card={card} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Quiz previews */}
      <div className="space-y-3">
        <button
          onClick={() => setExpandedSection(expandedSection === 'quiz' ? null : 'quiz')}
          className="w-full text-left bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">🧪 Quiz Questions Preview</h3>
            <span className="text-gray-400">{expandedSection === 'quiz' ? '▼' : '▶'}</span>
          </div>
        </button>
        {expandedSection === 'quiz' && (
          <div className="space-y-3 pl-2">
            {topic.quiz.map((q, i) => (
              <QuizPreview key={q.id} question={q} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CardPreview({ card, index }: { card: Flashcard; index: number }) {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-100 p-4">
      <button onClick={() => setShow(!show)} className="text-left w-full">
        <p className="text-sm font-medium text-gray-700">Q{index + 1}: {card.front}</p>
      </button>
      {show && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">{card.back}</pre>
          <div className="flex flex-wrap gap-1 mt-2">
            {card.keywords.map((kw, i) => (
              <span key={i} className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function QuizPreview({ question, index }: { question: QuizQuestion; index: number }) {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-100 p-4">
      <button onClick={() => setShow(!show)} className="text-left w-full">
        <p className="text-sm font-medium text-gray-700">Q{index + 1}: {question.question}</p>
      </button>
      {show && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          {question.options && (
            <div className="space-y-1 mb-2">
              {question.options.map((opt, i) => (
                <p key={i} className={`text-sm ${opt === question.answer ? 'text-green-700 font-medium' : 'text-gray-500'}`}>
                  {opt === question.answer ? '✅ ' : '○ '}{opt}
                </p>
              ))}
            </div>
          )}
          {!question.options && (
            <p className="text-sm text-green-700 font-medium">Answer: {question.answer}</p>
          )}
          <p className="text-xs text-gray-500 mt-2">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

// ===== PROGRESS VIEW =====
function ProgressView() {
  const progress = loadProgress();
  const entries = Object.entries(progress);
  
  const totalCards = topics.flatMap(t => t.flashcards).length;
  const reviewedCards = entries.length;
  const totalCorrect = entries.reduce((sum, [, data]) => sum + data.correct, 0);
  const totalAttempts = entries.reduce((sum, [, data]) => sum + data.correct + data.incorrect, 0);

  // Find weak cards
  const weakCards = entries
    .filter(([, data]) => data.incorrect > data.correct || (data.correct === 0 && data.incorrect > 0))
    .map(([id]) => {
      for (const topic of topics) {
        const card = topic.flashcards.find(c => c.id === id);
        if (card) return { card, topic };
      }
      return null;
    })
    .filter(Boolean) as { card: Flashcard; topic: Topic }[];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-gray-800">📊 Your Progress</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-indigo-600">{reviewedCards}</p>
          <p className="text-xs text-gray-500">Cards Reviewed</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{totalCards}</p>
          <p className="text-xs text-gray-500">Total Cards</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0}%</p>
          <p className="text-xs text-gray-500">Accuracy</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">{totalAttempts}</p>
          <p className="text-xs text-gray-500">Total Attempts</p>
        </div>
      </div>

      {/* Coverage */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Coverage</h3>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-indigo-500 h-3 rounded-full transition-all"
            style={{ width: `${(reviewedCards / totalCards) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{reviewedCards}/{totalCards} cards reviewed ({Math.round((reviewedCards / totalCards) * 100)}%)</p>
      </div>

      {/* Weak cards */}
      {weakCards.length > 0 && (
        <div className="bg-red-50 rounded-xl border border-red-200 p-4">
          <h3 className="font-semibold text-red-800 mb-2">⚠️ Cards to Review Again</h3>
          <div className="space-y-2">
            {weakCards.slice(0, 10).map(({ card, topic }) => (
              <div key={card.id} className="bg-white rounded-lg p-3 border border-red-100">
                <p className="text-sm font-medium text-gray-800">{card.front}</p>
                <p className="text-xs text-gray-500">{topic.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No progress yet!</p>
          <p className="text-sm mt-1">Start reviewing flashcards to track your progress here.</p>
        </div>
      )}

      {/* Reset */}
      {entries.length > 0 && (
        <button
          onClick={() => {
            if (confirm('Reset all progress? This cannot be undone.')) {
              localStorage.removeItem('cs9618-progress');
              window.location.reload();
            }
          }}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Reset all progress
        </button>
      )}
    </div>
  );
}

// ===== MAIN APP =====
export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [quizTopic, setQuizTopic] = useState<Topic | null>(null);
  const [flashcardTopic, setFlashcardTopic] = useState<Topic | null>(null);

  const handleSelectTopic = useCallback((topic: Topic) => {
    setSelectedTopic(topic);
    setView('topic-detail');
  }, []);

  const handleStartQuiz = useCallback(() => {
    setQuizTopic(selectedTopic);
    setView('quiz');
  }, [selectedTopic]);

  const handleStartFlashcards = useCallback(() => {
    setFlashcardTopic(selectedTopic);
    setView('flashcards');
  }, [selectedTopic]);

  const handleGlobalQuiz = useCallback(() => {
    setQuizTopic(null);
    setView('quiz');
  }, []);

  const handleGlobalFlashcards = useCallback(() => {
    setFlashcardTopic(null);
    setView('flashcards');
  }, []);

  const handleBack = useCallback(() => {
    if (view === 'topic-detail') {
      setView('dashboard');
      setSelectedTopic(null);
    } else if (view === 'flashcards') {
      if (flashcardTopic) {
        setView('topic-detail');
      } else {
        setView('dashboard');
      }
    } else if (view === 'quiz') {
      if (quizTopic) {
        setView('topic-detail');
      } else {
        setView('dashboard');
      }
    } else {
      setView('dashboard');
    }
  }, [view, flashcardTopic, quizTopic]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => { setView('dashboard'); setSelectedTopic(null); }} className="font-bold text-indigo-700 text-sm md:text-base">
            CS 9618 P1
          </button>
          <div className="flex gap-1 md:gap-2">
            <NavButton active={view === 'dashboard'} onClick={() => { setView('dashboard'); setSelectedTopic(null); }}>
              📋 Topics
            </NavButton>
            <NavButton active={view === 'flashcards'} onClick={handleGlobalFlashcards}>
              🃏 Cards
            </NavButton>
            <NavButton active={view === 'quiz'} onClick={handleGlobalQuiz}>
              🧠 Quiz
            </NavButton>
            <NavButton active={view === 'keywords'} onClick={() => setView('keywords')}>
              🔑 Keys
            </NavButton>
            <NavButton active={view === 'progress'} onClick={() => setView('progress')}>
              📊 Stats
            </NavButton>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {view === 'dashboard' && (
          <Dashboard
            onSelectTopic={handleSelectTopic}
            onStartQuiz={handleGlobalQuiz}
            onStartFlashcards={handleGlobalFlashcards}
          />
        )}
        {view === 'topic-detail' && selectedTopic && (
          <TopicDetail
            topic={selectedTopic}
            onBack={handleBack}
            onStartFlashcards={handleStartFlashcards}
            onStartQuiz={handleStartQuiz}
          />
        )}
        {view === 'flashcards' && (
          <FlashcardView topic={flashcardTopic} onBack={handleBack} />
        )}
        {view === 'quiz' && (
          <QuizView topic={quizTopic} onBack={handleBack} />
        )}
        {view === 'keywords' && <KeywordView />}
        {view === 'progress' && <ProgressView />}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 md:px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition ${
        active ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
}
