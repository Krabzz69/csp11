import { useState, useEffect, useCallback } from 'react';
import { topics, keywordMemory, Topic, Flashcard, QuizQuestion } from './data/content';
import {
  plan4Days, plan1Day, examMorningChecklist, examRules, fullKeywordList,
  cheatSheets, buckets, rescuePlan, panicTips, commonMistakes,
  calcDrills, gateTruthTables, sqlMemoryDrills, registerDrills, DrillCard,
} from './data/plan';

type View = 'dashboard' | 'flashcards' | 'quiz' | 'keywords' | 'topic-detail' | 'progress' | 'plan' | 'rules' | 'drills';

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

// ===== GENERIC DRILL DECK (active recall, self-graded) =====
function DrillDeck({ cards, accent }: { cards: DrillCard[]; accent: string }) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [missed, setMissed] = useState<Set<number>>(new Set());

  const card = cards[idx];

  const advance = (gotIt: boolean) => {
    const next = new Set(gotIt ? known : missed);
    const other = new Set(gotIt ? missed : known);
    next.add(idx);
    other.delete(idx);
    setKnown(next);
    setMissed(other);
    if (next.size === cards.length) return; // cycle complete
    let i = (idx + 1) % cards.length;
    while (next.has(i) && next.size < cards.length) i = (i + 1) % cards.length;
    setIdx(i);
    setRevealed(false);
  };

  const done = known.size === cards.length;

  if (done) {
    return (
      <div className="text-center space-y-4 py-6">
        <div className="text-5xl">🎉</div>
        <p className="font-semibold text-gray-800">Full deck recalled! Run it again to lock it in.</p>
        <button
          onClick={() => { setKnown(new Set()); setMissed(new Set()); setIdx(0); setRevealed(false); }}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Restart deck
        </button>
        {missed.size > 0 && (
          <p className="text-sm text-red-600">You missed {missed.size} card(s) along the way — they are your weak spots.</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`h-2 rounded-full transition-all ${accent}`} style={{ width: `${(known.size / cards.length) * 100}%` }} />
      </div>
      <p className="text-xs text-gray-500">{known.size}/{cards.length} recalled · Card {idx + 1}</p>
      <div
        onClick={() => setRevealed(!revealed)}
        className={`cursor-pointer rounded-xl border-2 p-5 min-h-[120px] flex flex-col justify-center ${revealed ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-200'}`}
      >
        <p className="font-semibold text-gray-800 text-sm md:text-base">{card.front}</p>
        {revealed ? (
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans mt-3 leading-relaxed">{card.back}</pre>
        ) : (
          <span className="text-xs text-gray-400 mt-3">Tap to reveal</span>
        )}
      </div>
      {revealed && (
        <div className="flex gap-3 justify-center">
          <button onClick={() => advance(false)} className="px-5 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium text-sm transition">❌ Missed</button>
          <button onClick={() => advance(true)} className="px-5 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-medium text-sm transition">✅ Got it</button>
        </div>
      )}
    </div>
  );
}

// ===== CALC DRILLS (type-the-answer, active practice) =====
function CalcDrillView() {
  const [answers, setAnswers] = useState<{ [id: string]: string }>({});
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
  const isCorrect = (id: string, expected: string) => {
    const a = norm(answers[id] || '');
    const e = norm(expected);
    return a !== '' && (a === e || a.includes(e) || e.includes(a));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">🧮 20 Calculation Drills (Day 1)</h2>
        <button onClick={() => setShowAll(!showAll)} className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition">
          {showAll ? 'Hide all answers' : 'Show all answers'}
        </button>
      </div>
      <p className="text-sm text-gray-500">Write your answer + working FIRST on paper, then type it here to check. Always show working in the exam.</p>
      {calcDrills.map((p, i) => {
        const revealed = checked.has(p.id) || showAll;
        const correct = isCorrect(p.id, p.answer);
        return (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            <p className="text-sm font-medium text-gray-800">{i + 1}. {p.prompt}</p>
            <div className="flex gap-2">
              <input
                value={answers[p.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [p.id]: e.target.value })}
                placeholder="Your answer..."
                className={`flex-1 p-2 rounded-lg border text-sm outline-none transition ${revealed ? (correct ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300') : 'border-gray-300 focus:border-indigo-400'}`}
              />
              {!checked.has(p.id) && !showAll && (
                <button onClick={() => setChecked(new Set([...checked, p.id]))} className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition shrink-0">Check</button>
              )}
            </div>
            {revealed && (
              <div className={`text-sm rounded-lg p-3 ${correct ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
                <p><strong>Answer:</strong> {p.answer} {correct ? '✅' : '— check your sign/format'}</p>
                <p className="mt-1 text-xs"><strong>Working:</strong> {p.working}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ===== TRUTH TABLE DRILLS =====
function TruthTableView() {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const toggle = (g: string) => {
    const n = new Set(hidden);
    n.has(g) ? n.delete(g) : n.add(g);
    setHidden(n);
  };
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">🚪 Logic Gate Truth Tables</h2>
        <button onClick={() => setHidden(new Set(gateTruthTables.map(g => g.gate)))} className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition">Hide all — test yourself</button>
      </div>
      <p className="text-sm text-gray-500">Cover a table, sketch it from memory on paper, then reveal and compare. Say the rule aloud with the exact keywords.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {gateTruthTables.map(g => (
          <div key={g.gate} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800">{hidden.has(g.gate) ? '???' : g.gate}</h3>
              <button onClick={() => toggle(g.gate)} className="text-xs text-indigo-600 hover:text-indigo-800">{hidden.has(g.gate) ? 'Reveal' : 'Hide'}</button>
            </div>
            {!hidden.has(g.gate) && (
              <>
                <p className="text-xs text-amber-700 font-medium mt-1">{g.rule}</p>
                <pre className="text-sm text-gray-700 mt-2 font-mono bg-gray-50 rounded-lg p-3">{g.table}</pre>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== SQL FROM MEMORY =====
function SqlMemoryView() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-gray-800">✍️ Write 10 SQL Queries From Memory (Day 3)</h2>
      <p className="text-sm text-gray-500">Read the task → write the query on PAPER → reveal → mark yourself like a examiner: exact names, alias, GROUP BY, ORDER BY direction.</p>
      <DrillDeck cards={sqlMemoryDrills} accent="bg-purple-500" />
    </div>
  );
}

// ===== REGISTERS / FETCH / ADDRESSING =====
function RegisterDrillView() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-gray-800">🧠 Registers, Fetch Cycle & Addressing (Day 4)</h2>
      <p className="text-sm text-gray-500">Say each answer OUT LOUD before revealing. If you hesitate, mark it Missed. Exact keywords only.</p>
      <DrillDeck cards={registerDrills} accent="bg-indigo-500" />
    </div>
  );
}

// ===== DRILLS HUB =====
function DrillsHub({ onPick }: { onPick: (d: string) => void }) {
  const drills = [
    { id: 'calc', icon: '🧮', title: 'Calculation Drills', desc: '20 binary/hex/two’s-complement/file-size questions with worked answers. Day 1.' },
    { id: 'truth', icon: '🚪', title: 'Truth Table Blaster', desc: 'Hide-and-recall all 6 gate truth tables with exact rules.' },
    { id: 'sqlmem', icon: '✍️', title: 'SQL From Memory', desc: '8 query tasks — write on paper, reveal, self-mark. Day 3 goal.' },
    { id: 'regs', icon: '🧠', title: 'Registers & Fetch Cycle', desc: 'PC/MAR/MDR/CIR/ACC + fetch order + addressing modes. Day 4.' },
    { id: 'mixed', icon: '🔀', title: 'Mixed Rapid Fire', desc: 'binary → SQL → register → RLE → topology → checksum — retrieval under exam conditions.' },
  ];
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-gray-800">⚡ Active Drill Hub</h2>
      <p className="text-sm text-gray-500">No passive reading here. Every drill forces you to produce the answer first, then check. Spend time only on what you miss.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {drills.map(d => (
          <button key={d.id} onClick={() => onPick(d.id)} className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:shadow-md hover:scale-[1.02] transition-all">
            <div className="text-2xl">{d.icon}</div>
            <h3 className="font-semibold text-gray-800 mt-2 text-sm">{d.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{d.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function DrillsView({ picked, onPick, onBack }: { picked: string | null; onPick: (d: string) => void; onBack: () => void }) {
  if (!picked) return <DrillsHub onPick={onPick} />;
  const titles: { [k: string]: string } = { calc: '🧮 Calculations', truth: '🚪 Truth Tables', sqlmem: '✍️ SQL From Memory', regs: '🧠 Registers', mixed: '🔀 Mixed Rapid Fire' };
  return (
    <div className="space-y-4">
      <button onClick={() => onPick('')} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">← All drills</button>
      {picked !== 'calc' && picked !== 'truth' && (
        <h2 className="text-lg font-bold text-gray-800">{titles[picked]}</h2>
      )}
      {picked === 'calc' && <CalcDrillView />}
      {picked === 'truth' && <TruthTableView />}
      {picked === 'sqlmem' && <SqlMemoryView />}
      {picked === 'regs' && <RegisterDrillView />}
      {picked === 'mixed' && <DrillDeck cards={[...calcDrills.slice(0, 6).map(c => ({ id: c.id, front: c.prompt, back: c.answer + '\n\n' + c.working })), ...registerDrills, ...sqlMemoryDrills]} accent="bg-orange-500" />}
    </div>
  );
}

// ===== STUDY PLAN VIEW =====
function PlanView() {
  const [tab, setTab] = useState<'4days' | '1day' | 'morning' | 'rescue' | 'method'>('4days');
  const tabs = [
    { id: '4days', label: '📅 4 Days' },
    { id: '1day', label: '⏱️ 1 Day (8 hrs)' },
    { id: 'morning', label: '☀️ Exam Morning' },
    { id: 'rescue', label: '🚨 60-Min Rescue' },
    { id: 'method', label: '🧪 Memorization Method' },
  ] as const;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-gray-800">🗓️ Friday Emergency Study Plan</h2>
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === t.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === '4days' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Assuming you have until Friday — one bucket per day, task-driven, with a measurable goal.</p>
          {plan4Days.map((day, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-800">{day.title}</h3>
              <p className="text-xs text-gray-500 mt-2 mb-1 font-medium uppercase tracking-wide">Focus</p>
              <div className="flex flex-wrap gap-1.5">
                {day.focus.map((f, j) => (
                  <span key={j} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-lg border border-indigo-100">{f}</span>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col md:flex-row md:justify-between gap-1 text-sm">
                <p><strong>Task:</strong> {day.task}</p>
                <p className="text-green-700 font-medium">🎯 {day.goal}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === '1day' && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Only one day left? Use this exact 8-hour plan. Hour 8 ends with sleep — do NOT all-nighter. Sleep consolidates memory.</p>
          {plan1Day.map(h => (
            <div key={h.hour} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 items-start">
              <div className="bg-indigo-600 text-white font-bold rounded-lg w-12 h-12 flex items-center justify-center shrink-0">{h.hour}h</div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{h.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{h.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'morning' && (
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-amber-800 text-sm font-medium">Spend 30–45 minutes ONLY on these 10 items. Do not learn new topics exam morning.</p>
          </div>
          <ol className="space-y-2">
            {examMorningChecklist.map((item, i) => (
              <li key={i} className="bg-white rounded-lg border border-gray-200 p-3 flex items-center gap-3 text-sm">
                <span className="bg-green-100 text-green-700 font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0">{i + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      )}

      {tab === 'rescue' && (
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800 text-sm font-bold">Panicking? Do this RIGHT NOW — 60 minutes, 6 blocks of 10.</p>
          </div>
          {rescuePlan.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-800 text-sm">Min {s.minutes} — {s.title}</h3>
              <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans mt-2 bg-gray-50 rounded-lg p-3 leading-relaxed">{s.content}</pre>
            </div>
          ))}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <p className="text-indigo-800 text-sm font-semibold mb-2">Final truth — near-100% comes from this list, not from reading everything:</p>
            {panicTips.map((t, i) => (
              <p key={i} className="text-xs text-indigo-700 leading-relaxed">{t}</p>
            ))}
          </div>
        </div>
      )}

      {tab === 'method' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 font-medium">The fastest memorization routine for the next few days — active recall only, no passive reading.</p>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-2">Step 1 — Break the syllabus into 10 buckets</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {buckets.map(b => (
                <span key={b.num} className="bg-indigo-50 border border-indigo-100 rounded-lg p-2 text-xs text-center text-indigo-800">
                  <strong>{b.num}.</strong> {b.name}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-1">Step 2 — Only 10 cards per bucket</h3>
            <p className="text-xs text-gray-600">Do not make 100 cards. Make the best 10. CPU example: PC role, MAR role, MDR role, CIR role, ACC role, fetch order, immediate, direct, indirect, indexed addressing.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-1">Step 3 — Test yourself OUT LOUD</h3>
            <p className="text-xs text-gray-600">Say: “PC stores the address of the next instruction to be fetched from memory.” If you hesitate, repeat.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-1">Step 4 — Write only the hardest 20%</h3>
            <p className="text-xs text-gray-600">Ignore easy cards after two correct recalls. Spend time only on cards you miss (use the ❌ button — Stats tracks them).</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-1">Step 5 — Do MIXED practice near the exam</h3>
            <p className="text-xs text-gray-600">binary → SQL → register → RLE → topology → checksum → LMC → sampling. This trains retrieval under exam conditions. Use the <strong>Drills → Mixed Rapid Fire</strong> deck.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== EXAM RULES + CHEAT SHEETS + FULL KEYWORDS VIEW =====
function RulesView() {
  const [tab, setTab] = useState<'rules' | 'keywords' | 'sheets' | 'mistakes'>('rules');
  const tabs = [
    { id: 'rules', label: '🛑 Do Not Lose Marks' },
    { id: 'keywords', label: '🔑 Full Keyword List' },
    { id: 'sheets', label: '📜 Cheat Sheets' },
    { id: 'mistakes', label: '⚠️ Lost-Mark Traps' },
  ] as const;

  const grouped = fullKeywordList.reduce((acc, k) => {
    (acc[k.bucket] = acc[k.bucket] || []).push(k);
    return acc;
  }, {} as { [key: string]: typeof fullKeywordList });

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-gray-800">🛑 The “Do Not Lose Marks” System</h2>
      <p className="text-sm text-gray-500">These rules are as important as knowing the content. Your target: produce exactly what the mark scheme rewards.</p>
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === t.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'rules' && (
        <div className="space-y-3">
          {examRules.map(rule => (
            <div key={rule.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-800 text-sm">Rule {rule.id}: {rule.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{rule.summary}</p>
              {rule.bad && (
                <div className="mt-2 bg-red-50 border border-red-100 rounded-lg p-2">
                  <p className="text-xs text-red-700"><strong>✗ Don’t say:</strong> {rule.bad}</p>
                </div>
              )}
              {rule.good && (
                <pre className="mt-2 bg-green-50 border border-green-100 rounded-lg p-3 text-xs text-green-800 whitespace-pre-wrap font-sans"><strong>✓ Write:</strong>{'\n'}{rule.good}</pre>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'keywords' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">If you only memorize 50 lines, memorize these. Tap a term to hide/reveal its definition — say it out loud first.</p>
          {Object.entries(grouped).map(([bucket, items]) => (
            <div key={bucket}>
              <h3 className="font-bold text-gray-700 text-sm mb-2 uppercase tracking-wide">{bucket}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {items.map((k, i) => <KeywordRow key={`${bucket}-${i}`} term={k.term} definition={k.definition} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'sheets' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Memorize the SQL sheet word-for-word. Cover a section, rewrite it from memory on paper, then compare line by line.</p>
          {cheatSheets.map(sheet => (
            <div key={sheet.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-800 text-sm mb-3">{sheet.icon} {sheet.title}</h3>
              <div className="space-y-3">
                {sheet.sections.map((sec, i) => (
                  <CheatSection key={i} heading={sec.heading} lines={sec.lines} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'mistakes' && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">The 10 most common ways students lose marks — and the exact fix.</p>
          {commonMistakes.map((m, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-800 text-sm">{m.problem}</h3>
              <p className="text-xs text-red-700 mt-2 bg-red-50 rounded-lg p-2"><strong>Bad:</strong> {m.bad}</p>
              <p className="text-xs text-green-700 mt-1 bg-green-50 rounded-lg p-2"><strong>Good:</strong> {m.good}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function KeywordRow({ term, definition }: { term: string; definition: string }) {
  const [hidden, setHidden] = useState(false);
  return (
    <button onClick={() => setHidden(!hidden)} className={`text-left rounded-lg border p-3 transition ${hidden ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:shadow-sm'}`}>
      <p className="font-bold text-sm text-indigo-700">{hidden ? '🔒 ' + term : term}</p>
      <p className={`text-xs mt-1 ${hidden ? 'text-gray-300 blur-sm select-none' : 'text-gray-600'}`}>{definition}</p>
      {hidden && <p className="text-[10px] text-gray-400 mt-1">tap to reveal</p>}
    </button>
  );
}

function CheatSection({ heading, lines }: { heading: string; lines: string[] }) {
  const [covered, setCovered] = useState(false);
  return (
    <div className="rounded-lg border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between bg-gray-50 px-3 py-1.5">
        <span className="text-xs font-semibold text-gray-700">{heading}</span>
        <button onClick={() => setCovered(!covered)} className="text-[10px] text-indigo-600 hover:text-indigo-800 font-medium">
          {covered ? 'Reveal' : 'Cover — write from memory'}
        </button>
      </div>
      <pre className={`text-xs font-mono p-3 leading-relaxed whitespace-pre-wrap transition ${covered ? 'text-transparent select-none bg-gray-100' : 'text-gray-800 bg-white'}`}>
        {lines.join('\n')}
      </pre>
    </div>
  );
}

// ===== OFFLINE APP DOWNLOAD (single self-contained HTML file) =====
async function downloadOfflineApp() {
  try {
    const resp = await fetch(location.origin + '/CS9618-Revision-App.html');
    if (resp.ok) {
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CS9618-Revision-App.html';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      return;
    }

    // Fallback: build the single file in-browser from the live page
    let css = '';
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const rules = sheet.cssRules;
        if (rules) css += Array.from(rules).map(r => r.cssText).join('\n') + '\n';
      } catch { /* cross-origin stylesheet — skip */ }
    }

    const srcs = Array.from(document.querySelectorAll('script[src]')).map(s => (s as HTMLScriptElement).src);
    const modSrc = srcs.find(u => u.includes('/assets/')) || srcs[0];
    if (!modSrc) throw new Error('app bundle not found');
    const jsResp = await fetch(modSrc);
    if (!jsResp.ok) throw new Error('could not fetch app bundle');
    const js = await jsResp.text();
    if (js.includes('from "') || /from '/.test(js)) {
      throw new Error('dev-mode script detected; open the built site to download');
    }

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>CS 9618 P1 — Offline Revision App</title>
<style>
${css}
html,body{margin:0;padding:0;background:#f9fafb;}
#offline-banner{background:#059669;color:#fff;text-align:center;font-size:12px;padding:6px;font-family:system-ui,sans-serif;}
</style>
</head>
<body>
<div id="offline-banner">📴 Offline copy of CS 9618 Paper 1 Active Revision — everything works without internet. Your progress is saved on this device.</div>
<div id="root"></div>
<script type="text/javascript">
${js}
</script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CS9618-Revision-App.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  } catch (e) {
    alert('Download failed in this preview environment.\n\nOpen the GitHub Pages site and press the green "⬇️ Download App" button there — it saves the whole app as one offline .html file you can double-click anytime.');
  }
}

// ===== MAIN APP =====
export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [drillPick, setDrillPick] = useState<string | null>(null);
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
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 justify-between">
          <button onClick={() => { setView('dashboard'); setSelectedTopic(null); }} className="font-bold text-indigo-700 text-sm md:text-base shrink-0">
            CS 9618 P1
          </button>
          <div className="flex gap-1 md:gap-2 overflow-x-auto">
            <NavButton active={view === 'dashboard'} onClick={() => { setView('dashboard'); setSelectedTopic(null); }}>
              📋 Topics
            </NavButton>
            <NavButton active={view === 'flashcards'} onClick={handleGlobalFlashcards}>
              🃏 Cards
            </NavButton>
            <NavButton active={view === 'drills'} onClick={() => setView('drills')}>
              ⚡ Drills
            </NavButton>
            <NavButton active={view === 'plan'} onClick={() => setView('plan')}>
              🗓️ Plan
            </NavButton>
            <NavButton active={view === 'rules'} onClick={() => setView('rules')}>
              🛑 Rules
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
            <button
              onClick={downloadOfflineApp}
              title="Download the WHOLE app as ONE offline file — double-click to open on any PC/phone, no internet needed"
              className="shrink-0 bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm font-semibold px-2 md:px-3 py-1.5 rounded-lg transition whitespace-nowrap"
            >
              ⬇️ Download App
            </button>
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
        {view === 'plan' && <PlanView />}
        {view === 'rules' && <RulesView />}
        {view === 'drills' && (
          <DrillsView picked={drillPick ?? null} onPick={(d) => setDrillPick(d || null)} onBack={() => setView('dashboard')} />
        )}
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
