import React, { useEffect, useState } from "react";
import { getHistory } from "../api";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getHistory();
        setHistory(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Game History</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : history.length === 0 ? (
          <div className="text-center">No history found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-2">Date</th>
                  <th className="py-2 px-2">Bet Type</th>
                  <th className="py-2 px-2">Bet Amount</th>
                  <th className="py-2 px-2">Dice</th>
                  <th className="py-2 px-2">Total</th>
                  <th className="py-2 px-2">Result</th>
                  <th className="py-2 px-2">Payout</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={h._id || i} className="border-b">
                    <td className="py-1 px-2">{new Date(h.createdAt).toLocaleString()}</td>
                    <td className="py-1 px-2">{h.betType}</td>
                    <td className="py-1 px-2">{h.betAmount}</td>
                    <td className="py-1 px-2">{h.die1} + {h.die2}</td>
                    <td className="py-1 px-2">{h.total}</td>
                    <td className={`py-1 px-2 font-bold ${h.win ? "text-green-600" : "text-red-600"}`}>{h.win ? "Win" : "Lose"}</td>
                    <td className="py-1 px-2">{h.payout}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
