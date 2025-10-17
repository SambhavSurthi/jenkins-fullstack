import React, { useEffect, useState } from "react";
import { fetchRandomQuote } from "../api";

const QuoteBanner = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomQuote()
      .then((res) => {
        // zenquotes returns array or map depending on proxy; normalize
        const data = res.data;
        let text = "";
        if (Array.isArray(data) && data.length > 0) {
          const q = data[0];
          text = `${q.q} — ${q.a}`;
        } else if (data && data.q && data.a) {
          text = `${data.q} — ${data.a}`;
        } else if (typeof data === "string") {
          text = data;
        } else {
          text = "Stay consistent. Small steps lead to big results.";
        }
        setQuote(text);
      })
      .catch(() => setQuote("Stay consistent. Small steps lead to big results."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 shadow">
        <p className="text-sm uppercase tracking-wide opacity-80">Motivation</p>
        <p className="mt-1 text-lg">
          {loading ? "Fetching a quote..." : quote}
        </p>
      </div>
    </div>
  );
};

export default QuoteBanner;


