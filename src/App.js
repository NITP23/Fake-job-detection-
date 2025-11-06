import React, { useState } from "react";

export default function App() {
  const [jobText, setJobText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // In actual app, this would call your backend API
    setTimeout(() => {
      // fake prediction
      const random = Math.random();
      setResult(random > 0.5 ? "✅ Legit Job Posting" : "🚨 Fake Job Scam Detected");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Fake Job Detection System 💼
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg"
      >
        <label className="block text-gray-700 font-semibold mb-2">
          Enter Job Description or Link:
        </label>
        <textarea
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          placeholder="Paste job details or link here..."
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          rows="4"
        />

        <div className="mt-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Job Image or PDF:
          </label>
          <input
            type="file"
            accept=".jpg,.png,.pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          {loading ? "Analyzing..." : "Check Authenticity"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-full max-w-lg text-center">
          <h2 className="text-xl font-bold text-gray-800">{result}</h2>
        </div>
      )}

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>© 2025 Fake Job Detector | Developed by Priya Kumari</p>
        <p className="mt-2">
          📧 Contact: <a href="mailto:priya@example.com" className="text-blue-600">priya@example.com</a>
        </p>
      </footer>
    </div>
  );
}