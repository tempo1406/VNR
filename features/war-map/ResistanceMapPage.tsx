"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Crosshair,
  Flag,
  Lock,
  MapPinned,
  Medal,
  RotateCcw,
  ScrollText,
  Sparkles,
} from "lucide-react";
import {
  badgeRules,
  campaignTimeline,
  sourceAttribution,
  warLocations,
} from "@/features/war-map/data/campaignData";
import { WarLocation } from "@/features/war-map/types";

type CampaignState = {
  visited: string[];
  completed: string[];
  unlockedSecrets: string[];
  missionChecks: Record<string, boolean[]>;
  quizCorrect: Record<string, boolean>;
  quizSelected: Record<string, number>;
  badges: string[];
};

const STORAGE_KEY = "war-map-campaign-v1";

const initialState: CampaignState = {
  visited: [],
  completed: [],
  unlockedSecrets: [],
  missionChecks: {},
  quizCorrect: {},
  quizSelected: {},
  badges: [],
};

function computeBadges(state: CampaignState): string[] {
  const ids: string[] = [];

  if (state.visited.length >= 3) ids.push("trinh-sat");
  if (state.completed.length >= 4) ids.push("to-chuc");
  if (
    ["ha-noi", "viet-bac", "cao-bang"].every((id) =>
      state.completed.includes(id)
    )
  ) {
    ids.push("chien-luoc");
  }
  if (state.completed.length === warLocations.length) ids.push("toan-thang");

  return ids;
}

function sanitizeList(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  return input.filter((item): item is string => typeof item === "string");
}

function normalizeState(raw: Partial<CampaignState>): CampaignState {
  const normalized: CampaignState = {
    visited: [...new Set(sanitizeList(raw.visited))],
    completed: [...new Set(sanitizeList(raw.completed))],
    unlockedSecrets: [...new Set(sanitizeList(raw.unlockedSecrets))],
    missionChecks:
      raw.missionChecks && typeof raw.missionChecks === "object"
        ? raw.missionChecks
        : {},
    quizCorrect:
      raw.quizCorrect && typeof raw.quizCorrect === "object"
        ? raw.quizCorrect
        : {},
    quizSelected:
      raw.quizSelected && typeof raw.quizSelected === "object"
        ? raw.quizSelected
        : {},
    badges: [],
  };

  normalized.badges = computeBadges(normalized);
  return normalized;
}

export default function ResistanceMapPage() {
  const [state, setState] = useState<CampaignState>(initialState);
  const [selectedId, setSelectedId] = useState<string>(warLocations[0].id);
  const [isHydrated, setIsHydrated] = useState(false);

  const locationMap = useMemo(
    () => new Map(warLocations.map((location) => [location.id, location])),
    []
  );

  const withBadgeUpdate = (next: CampaignState): CampaignState => ({
    ...next,
    badges: computeBadges(next),
  });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CampaignState>;
        setState(normalizeState(parsed));
      }
    } catch {
      setState(initialState);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [isHydrated, state]);

  const selectedLocation = locationMap.get(selectedId) ?? warLocations[0];

  const getMissingPrerequisites = (location: WarLocation) =>
    location.prerequisites.filter((id) => !state.completed.includes(id));

  const isUnlocked = (location: WarLocation) =>
    getMissingPrerequisites(location).length === 0;

  const getMissionChecks = (location: WarLocation) =>
    state.missionChecks[location.id] ?? Array(location.missions.length).fill(false);

  const hasAnsweredCurrent = Object.prototype.hasOwnProperty.call(
    state.quizSelected,
    selectedLocation.id
  );
  const selectedOption = state.quizSelected[selectedLocation.id];
  const isCurrentQuizCorrect = Boolean(state.quizCorrect[selectedLocation.id]);
  const currentMissionDone = getMissionChecks(selectedLocation).every(Boolean);
  const canClaimCurrent =
    isUnlocked(selectedLocation) &&
    !state.completed.includes(selectedLocation.id) &&
    currentMissionDone &&
    isCurrentQuizCorrect;

  const selectLocation = (locationId: string) => {
    const location = locationMap.get(locationId);
    if (!location) return;

    setSelectedId(locationId);
    if (!isUnlocked(location)) return;

    setState((prev) => {
      if (prev.visited.includes(locationId)) return prev;
      return withBadgeUpdate({
        ...prev,
        visited: [...prev.visited, locationId],
      });
    });
  };

  const toggleMission = (location: WarLocation, index: number) => {
    if (!isUnlocked(location) || state.completed.includes(location.id)) return;

    setState((prev) => {
      const current = prev.missionChecks[location.id]
        ? [...prev.missionChecks[location.id]]
        : Array(location.missions.length).fill(false);
      current[index] = !current[index];

      return withBadgeUpdate({
        ...prev,
        missionChecks: {
          ...prev.missionChecks,
          [location.id]: current,
        },
      });
    });
  };

  const answerQuiz = (location: WarLocation, optionIndex: number) => {
    if (!isUnlocked(location)) return;

    const correct = optionIndex === location.quiz.correctIndex;
    setState((prev) =>
      withBadgeUpdate({
        ...prev,
        quizSelected: {
          ...prev.quizSelected,
          [location.id]: optionIndex,
        },
        quizCorrect: {
          ...prev.quizCorrect,
          [location.id]: prev.quizCorrect[location.id] || correct,
        },
      })
    );
  };

  const claimLocation = (location: WarLocation) => {
    if (!canClaimCurrent || location.id !== selectedLocation.id) return;

    setState((prev) => {
      const completed = prev.completed.includes(location.id)
        ? prev.completed
        : [...prev.completed, location.id];
      const visited = prev.visited.includes(location.id)
        ? prev.visited
        : [...prev.visited, location.id];
      const unlockedSecrets = prev.unlockedSecrets.includes(location.id)
        ? prev.unlockedSecrets
        : [...prev.unlockedSecrets, location.id];

      return withBadgeUpdate({
        ...prev,
        visited,
        completed,
        unlockedSecrets,
      });
    });
  };

  const resetCampaign = () => {
    setState(initialState);
    if (isHydrated) window.localStorage.removeItem(STORAGE_KEY);
    setSelectedId(warLocations[0].id);
  };

  const completionRate = Math.round(
    (state.completed.length / warLocations.length) * 100
  );
  const explorationRate = Math.round(
    (state.visited.length / warLocations.length) * 100
  );
  const activeBadges = badgeRules.filter((badge) =>
    state.badges.includes(badge.id)
  );

  return (
    <main className="campaign-shell">
      <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
        <header className="campaign-card animate-rise">
          <p className="campaign-kicker">Mon Lich su Dang - Ban do tuong tac</p>
          <h1 className="campaign-title">
            Duong loi khang chien toan quoc va qua trinh to chuc thuc hien
            (1946 - 1950)
          </h1>
          <p className="campaign-subtitle">
            Kham pha cac diem nong lich su, giai mini-quiz, hoan thanh nhiem vu,
            mo khoa bi mat va tai hien duong loi khang chien toan dan, toan dien,
            lau dai, dua vao suc minh la chinh.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="campaign-card stat-card">
            <div className="stat-head">
              <MapPinned size={18} />
              <span>Tien do kham pha</span>
            </div>
            <strong>{state.visited.length}/{warLocations.length} dia diem</strong>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${explorationRate}%` }} />
            </div>
            <small>{explorationRate}% ban do da duoc do bo</small>
          </article>

          <article className="campaign-card stat-card">
            <div className="stat-head">
              <Flag size={18} />
              <span>Tien do hoan thanh</span>
            </div>
            <strong>{state.completed.length}/{warLocations.length} dia diem</strong>
            <div className="progress-track">
              <div
                className="progress-fill completion"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <small>{completionRate}% nhiem vu chien dich da xac nhan</small>
          </article>

          <article className="campaign-card stat-card">
            <div className="stat-head">
              <Medal size={18} />
              <span>Huy hieu khang chien</span>
            </div>
            <strong>{activeBadges.length}/{badgeRules.length} huy hieu</strong>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeBadges.length === 0 && (
                <span className="badge-muted">Chua mo khoa</span>
              )}
              {activeBadges.map((badge) => (
                <span key={badge.id} className="badge-chip">
                  {badge.label}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
          <article className="campaign-card map-frame">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="section-title">Ban do khang chien</h2>
              <button type="button" className="reset-btn" onClick={resetCampaign}>
                <RotateCcw size={16} />
                Dat lai hanh trinh
              </button>
            </div>

            <div className="war-map-canvas">
              <div className="map-overlay" />
              {warLocations.map((location, index) => {
                const unlocked = isUnlocked(location);
                const visited = state.visited.includes(location.id);
                const completed = state.completed.includes(location.id);
                const selected = selectedLocation.id === location.id;

                return (
                  <button
                    key={location.id}
                    type="button"
                    className={[
                      "map-pin",
                      unlocked ? "unlocked" : "locked",
                      visited ? "visited" : "",
                      completed ? "completed" : "",
                      selected ? "selected" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ left: `${location.coords.x}%`, top: `${location.coords.y}%` }}
                    onClick={() => selectLocation(location.id)}
                    aria-label={`Mo moc ${location.name}`}
                  >
                    <span className="pin-core">
                      {unlocked ? (
                        completed ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <Crosshair size={14} />
                        )
                      ) : (
                        <Lock size={12} />
                      )}
                    </span>
                    <span className="pin-label">
                      {index + 1}. {location.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </article>

          <article className="campaign-card detail-panel">
            <h2 className="section-title">Nhiem vu dia diem</h2>
            <div className="location-tag-row">
              <span className="location-name">{selectedLocation.name}</span>
              <span className="location-period">{selectedLocation.period}</span>
            </div>
            <p className="location-theme">{selectedLocation.theme}</p>
            <p className="location-summary">{selectedLocation.summary}</p>

            {!isUnlocked(selectedLocation) && (
              <div className="locked-note">
                <Lock size={16} />
                <p>
                  Dia diem nay chua mo khoa. Hoan thanh truoc:{" "}
                  {getMissingPrerequisites(selectedLocation)
                    .map((id) => locationMap.get(id)?.name ?? id)
                    .join(", ")}
                </p>
              </div>
            )}

            {isUnlocked(selectedLocation) && (
              <>
                <div className="detail-block">
                  <h3>Su kien noi bat</h3>
                  <ul>
                    {selectedLocation.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-block">
                  <h3>Nhiem vu ngan</h3>
                  <div className="mission-list">
                    {selectedLocation.missions.map((mission, index) => {
                      const checked = getMissionChecks(selectedLocation)[index];
                      return (
                        <button
                          type="button"
                          key={mission}
                          className={`mission-item ${checked ? "done" : ""}`}
                          onClick={() => toggleMission(selectedLocation, index)}
                        >
                          {checked ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                          <span>{mission}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="detail-block">
                  <h3>Mini quiz</h3>
                  <p className="quiz-prompt">{selectedLocation.quiz.prompt}</p>
                  <div className="quiz-options">
                    {selectedLocation.quiz.options.map((option, index) => {
                      const isCorrectOption =
                        index === selectedLocation.quiz.correctIndex;
                      const isSelected = hasAnsweredCurrent && selectedOption === index;
                      const showCorrect = hasAnsweredCurrent && isCorrectOption;
                      const showWrong =
                        hasAnsweredCurrent && isSelected && !isCorrectOption;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => answerQuiz(selectedLocation, index)}
                          className={[
                            "quiz-option",
                            showCorrect ? "correct" : "",
                            showWrong ? "wrong" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <span>{String.fromCharCode(65 + index)}.</span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>
                  {hasAnsweredCurrent && (
                    <p
                      className={`quiz-feedback ${
                        isCurrentQuizCorrect ? "good" : "bad"
                      }`}
                    >
                      {isCurrentQuizCorrect
                        ? "Chinh xac. "
                        : "Chua dung. "}
                      {selectedLocation.quiz.explanation}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => claimLocation(selectedLocation)}
                  className="claim-btn"
                  disabled={!canClaimCurrent}
                >
                  <Sparkles size={16} />
                  Xac nhan hoan thanh dia diem
                </button>

                <div className="secret-box">
                  <h3>Bi mat lich su</h3>
                  {state.unlockedSecrets.includes(selectedLocation.id) ? (
                    <>
                      <strong>{selectedLocation.secretTitle}</strong>
                      <p>{selectedLocation.secretDetail}</p>
                    </>
                  ) : (
                    <p>
                      Hoan thanh day du nhiem vu + mini quiz de mo khoa bi mat o
                      khu vuc nay.
                    </p>
                  )}
                </div>
              </>
            )}
          </article>
        </section>

        <section className="campaign-card">
          <h2 className="section-title">Truc thoi gian 1946 - 1950</h2>
          <div className="timeline-grid">
            {campaignTimeline.map((item) => (
              <article key={item.date} className="timeline-item">
                <p className="timeline-date">{item.date}</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="campaign-card">
          <h2 className="section-title">Kho bi mat da mo khoa</h2>
          <div className="secret-grid">
            {warLocations.map((location) => {
              const unlocked = state.unlockedSecrets.includes(location.id);
              return (
                <article key={location.id} className={`secret-card ${unlocked ? "open" : "closed"}`}>
                  <div className="secret-card-head">
                    <span>{location.name}</span>
                    {unlocked ? <CheckCircle2 size={16} /> : <Lock size={14} />}
                  </div>
                  <p>{unlocked ? location.secretDetail : "Chua mo khoa"}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="campaign-card source-card">
          <h2 className="section-title">
            <ScrollText size={18} /> Nguon tai lieu
          </h2>
          <ul>
            {sourceAttribution.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
