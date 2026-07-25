import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "../utils/apiClient";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto"
            src="/Assets/logo.svg"
            alt="Academically Logo"
            onError={(e) => {
              e.target.src = "/Assets/logo.webp";
            }}
          />
          <h1
            className="mt-6 text-2xl font-bold text-[#030A21]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Placement Management
          </h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to your administrator dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2.5 border border-gray-350 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00D9B7] focus:border-[#00D9B7] text-sm text-[#030A21]"
                placeholder="admin@academically.com"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 border border-gray-350 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00D9B7] focus:border-[#00D9B7] text-sm text-[#030A21]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-450 hover:text-gray-600 text-xs font-semibold cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-[#030A21] bg-[#00D9B7] hover:bg-[#00D9B7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D9B7] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;
