"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "../utils/apiClient";
import styles from "./AdminLogin.module.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const router = useRouter();

  // Mouse Tracking Refs & State
  const botRef = useRef(null);
  const [headTransform, setHeadTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    const checkSession = async () => {
      try {
        await apiClient.get("/api/admin/auth/me");
        router.push("/admin/placements");
      } catch (err) {
        // Not logged in, stay here
      }
    };
    checkSession();
  }, [router]);

  // Mouse tracking logic using useRef and window event listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!botRef.current) return;

      const rect = botRef.current.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - botCenterX;
      const deltaY = e.clientY - botCenterY;

      // Calculate head tilt angles
      const rotateY = Math.max(-12, Math.min(12, deltaX / 45));
      const rotateX = Math.max(-8, Math.min(8, -deltaY / 45));

      // Calculate eye pupil translation (limited to eye socket boundary)
      const pupilX = Math.max(-14, Math.min(14, deltaX / 25));
      const pupilY = Math.max(-12, Math.min(12, deltaY / 25));

      setHeadTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
      setPupilOffset({ x: pupilX, y: pupilY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await apiClient.post("/api/admin/auth/login", { email, password });
      router.push("/admin/placements");
    } catch (err) {
      setError(err.message || "Invalid username or password.");
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.mainWrapper}>
        {/* INTERACTIVE BLUE ROBOT CHARACTER */}
        <div className={styles.robotSection} ref={botRef}>
          {/* Yellow Antenna */}
          <div className={styles.antennaWrapper}>
            <div className={styles.antennaBall} />
            <div className={styles.antennaStem} />
          </div>

          {/* Robot Head */}
          <div className={styles.robotHead} style={{ transform: headTransform }}>
            {/* Eyes Container */}
            <div className={styles.eyesContainer}>
              {/* Left Eye */}
              <div className={styles.eyeSocket}>
                <div
                  className={`${styles.eyelids} ${
                    isFocusedPassword ? styles.eyelidsCovered : ""
                  }`}
                />
                <div
                  className={styles.pupil}
                  style={{
                    transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                  }}
                >
                  <div className={styles.pupilGlare} />
                </div>
              </div>

              {/* Right Eye */}
              <div className={styles.eyeSocket}>
                <div
                  className={`${styles.eyelids} ${
                    isFocusedPassword ? styles.eyelidsCovered : ""
                  }`}
                />
                <div
                  className={styles.pupil}
                  style={{
                    transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                  }}
                >
                  <div className={styles.pupilGlare} />
                </div>
              </div>
            </div>

            {/* Mouth */}
            <div
              className={`${styles.mouth} ${
                loading ? styles.mouthSurprised : ""
              }`}
            />
          </div>

          {/* Neck */}
          <div className={styles.robotNeck} />

          {/* Body / Shoulders */}
          <div className={styles.robotBody} />
        </div>

        {/* WHITE LOGIN CARD */}
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Welcome Back!</h1>

          {error && <div className={styles.errorBanner}>{error}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                id="username"
                name="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
                placeholder="Enter username"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => setIsFocusedPassword(false)}
                className={styles.inputField}
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${styles.submitBtn} ${
                loading ? styles.submitBtnDisabled : ""
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
