import { useState, useEffect } from "react";
import LEVELS from "./data/levels";
import { heuristicCheck } from "./data/heuristicCheck";
import Confetti from "./components/Confetti";
import LanguageSelect from "./components/LanguageSelect";
import LevelScreen from "./components/LevelScreen";
import SummaryScreen from "./components/SummaryScreen";
import HintPanel from "./components/HintPanel";
import SolutionPanel from "./components/SolutionPanel";
import LevelCompleteToast from "./components/LevelCompleteToast";
import "./styles/dungeon.css";

const emptyProgress = () => ({
  completedLevels: [],
  hintsUsed: 0,
  solutionsRevealed: 0,
  totalXP: 0,
  attempts: 0,
  successesFirstTry: 0,
  streak: 0,
  maxStreak: 0,
  currentAttemptedThisLevel: false,
});

export default function App() {
  const [screen, setScreen] = useState("lang"); // lang | level | summary
  const [language, setLanguage] = useState(null);
  const [progressByLang, setProgressByLang] = useState({
    python: emptyProgress(),
    java: emptyProgress(),
    cpp: emptyProgress(),
  });
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [confettiFire, setConfettiFire] = useState(false);
  const [lastXpEarned, setLastXpEarned] = useState(0);

  const progress = language ? progressByLang[language] : null;
  const level = LEVELS[currentLevelIdx];

  useEffect(() => {
    if (level && language) {
      setCode(level.starter[language]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevelIdx, language]);

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    const prog = progressByLang[lang];
    const nextLevelId =
      prog.completedLevels.length >= 20 ? 1 : prog.completedLevels.length + 1;
    const idx = LEVELS.findIndex((l) => l.id === nextLevelId);
    setCurrentLevelIdx(idx === -1 ? 0 : idx);
    setFeedback(null);
    setHintIndex(0);
    setScreen("level");
  };

  const updateProgress = (updater) => {
    setProgressByLang((prev) => ({
      ...prev,
      [language]: updater(prev[language]),
    }));
  };

  const handleSubmit = () => {
    const result = heuristicCheck(code, level);
    const alreadyAttemptedThisLevel = progress.currentAttemptedThisLevel;

    if (result.pass) {
      const xpEarned = level.xp;
      setLastXpEarned(xpEarned);
      updateProgress((p) => {
        const newStreak = p.streak + 1;
        return {
          ...p,
          completedLevels: p.completedLevels.includes(level.id)
            ? p.completedLevels
            : [...p.completedLevels, level.id],
          totalXP: p.totalXP + xpEarned,
          attempts: p.attempts + 1,
          successesFirstTry: !alreadyAttemptedThisLevel
            ? p.successesFirstTry + 1
            : p.successesFirstTry,
          streak: newStreak,
          maxStreak: Math.max(p.maxStreak, newStreak),
          currentAttemptedThisLevel: false,
        };
      });
      setFeedback({ type: "success", message: "Solved! The chamber door creaks open..." });
      setConfettiFire(true);
      setTimeout(() => setConfettiFire(false), 2500);
      setShowComplete(true);
    } else {
      const messages = {
        unchanged: "Looks like you haven't started yet — give it a try! Stuck? Grab a hint.",
        tooshort: "You're just getting started. Flesh out your logic a bit more — you're close!",
        weak: "Good attempt, but something's off. Re-read the problem, or peek at a hint for a nudge.",
      };
      setFeedback({
        type: "encourage",
        message: messages[result.reason] || "Not quite there yet — keep going, you've got this!",
      });
      updateProgress((p) => ({
        ...p,
        attempts: p.attempts + 1,
        streak: 0,
        currentAttemptedThisLevel: true,
      }));
    }
  };

  const handleNextLevel = () => {
    setShowComplete(false);
    setFeedback(null);
    setHintIndex(0);
    if (currentLevelIdx + 1 >= LEVELS.length) {
      setScreen("summary");
    } else {
      setCurrentLevelIdx((i) => i + 1);
    }
  };

  const handleHint = () => {
    if (!showHint) {
      updateProgress((p) => ({ ...p, hintsUsed: p.hintsUsed + 1 }));
    }
    setShowHint(true);
  };

  const handleMoreHint = () => {
    setHintIndex((i) => Math.min(i + 1, level.hints.length - 1));
    updateProgress((p) => ({ ...p, hintsUsed: p.hintsUsed + 1 }));
  };

  const handleSolution = () => {
    updateProgress((p) => ({ ...p, solutionsRevealed: p.solutionsRevealed + 1 }));
    setShowSolution(true);
  };

  const handleReplaySameLanguage = () => {
    updateProgress(() => emptyProgress());
    setCurrentLevelIdx(0);
    setFeedback(null);
    setScreen("level");
  };

  const handleChangeLanguage = () => {
    setLanguage(null);
    setScreen("lang");
  };

  return (
    <div className="dungeon-root">
      <Confetti fire={confettiFire} />

      {screen === "lang" && (
        <LanguageSelect onSelect={handleSelectLanguage} progressByLang={progressByLang} />
      )}

      {screen === "level" && level && progress && (
        <>
          <LevelScreen
            level={level}
            levelIndex={currentLevelIdx}
            totalLevels={LEVELS.length}
            language={language}
            code={code}
            onCodeChange={setCode}
            onSubmit={handleSubmit}
            onHint={handleHint}
            onSolution={handleSolution}
            feedback={feedback}
            xp={progress.totalXP}
            streak={progress.streak}
          />
          {showHint && (
            <HintPanel
              level={level}
              hintIndex={hintIndex}
              onMore={handleMoreHint}
              onClose={() => setShowHint(false)}
            />
          )}
          {showSolution && (
            <SolutionPanel
              level={level}
              language={language}
              onClose={() => setShowSolution(false)}
            />
          )}
          {showComplete && (
            <LevelCompleteToast
              level={level}
              xpEarned={lastXpEarned}
              onNext={handleNextLevel}
              isLast={currentLevelIdx + 1 >= LEVELS.length}
            />
          )}
        </>
      )}

      {screen === "summary" && progress && (
        <SummaryScreen
          stats={progress}
          language={language}
          onReplay={handleReplaySameLanguage}
          onChangeLanguage={handleChangeLanguage}
        />
      )}
    </div>
  );
}
