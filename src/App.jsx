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

  // New Gamey RPG states
  const [health, setHealth] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25:00 in seconds
  const [gameState, setGameState] = useState("playing"); // playing | gameover

  const progress = language ? progressByLang[language] : null;
  const level = LEVELS[currentLevelIdx];

  // Timer Tick logic
  useEffect(() => {
    let timerId;
    if (screen === "level" && gameState === "playing") {
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            setGameState("gameover");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [screen, gameState]);

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
      prog.completedLevels.length >= LEVELS.length ? 1 : prog.completedLevels.length + 1;
    const idx = LEVELS.findIndex((l) => l.id === nextLevelId);
    setCurrentLevelIdx(idx === -1 ? 0 : idx);
    setFeedback(null);
    setHintIndex(0);
    setHealth(5);
    setTimeLeft(25 * 60);
    setGameState("playing");
    setScreen("level");
  };

  const updateProgress = (updater) => {
    setProgressByLang((prev) => ({
      ...prev,
      [language]: updater(prev[language]),
    }));
  };

  const handleSubmit = () => {
    if (gameState === "gameover") return;

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
      setFeedback({ type: "success", message: "Solved! The dungeon gate unlocks..." });
      setConfettiFire(true);
      setTimeout(() => setConfettiFire(false), 2500);
      setShowComplete(true);
    } else {
      const isWeak = result.reason === "weak";

      if (isWeak) {
        // Deduct health on actual incorrect attempts
        setHealth((prev) => {
          const nextHealth = Math.max(0, prev - 1);
          if (nextHealth === 0) {
            setGameState("gameover");
            setFeedback({
              type: "error",
              message: "You ran out of health! The dungeon collapsed.",
            });
          }
          return nextHealth;
        });
      }

      const messages = {
        unchanged: "Starter code is untouched! Write your solution before submitting.",
        tooshort: "Your code is too short! Flesh out the logic a bit more.",
        weak: "Oops! Incorrect logic. You lost 1 Health heart!",
      };
      
      if (!isWeak || health > 1) {
        setFeedback({
          type: "encourage",
          message: messages[result.reason] || "Oops! Incorrect logic. Give it another try!",
        });
      }

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
    setHealth(5);
    setTimeLeft(25 * 60);
    setGameState("playing");
    setScreen("level");
  };

  const handleTryAgain = () => {
    // Reset timer and health, keep progress, retry current level
    setHealth(5);
    setTimeLeft(25 * 60);
    setGameState("playing");
    setFeedback(null);
  };

  const handleChangeLanguage = () => {
    setLanguage(null);
    setScreen("lang");
  };

  return (
    <div className="dungeon-root min-h-screen bg-[#2B1B3D]">
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
            health={health}
            timeLeft={timeLeft}
            gameState={gameState}
            onTryAgain={handleTryAgain}
            onChangeLanguage={handleChangeLanguage}
            completedLevels={progress.completedLevels}
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
