import React, { useState, useEffect } from "react";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import Grow from "@mui/material/Grow";
import { playGame, getHistory } from "../api";

const betAmounts = [100, 200, 500];
const betTypes = [
  { label: "7 Up", value: "7up" },
  { label: "7 Down", value: "7down" },
  { label: "Lucky 7", value: "7" },
];

const Dice = ({ value, rolling }) => (
  <div
    className={`w-16 h-16 flex items-center justify-center text-3xl font-bold rounded bg-gray-200 mx-2 transition-transform duration-500 ${
      rolling ? "animate-bounce" : ""
    }`}
    style={{ minWidth: 64, minHeight: 64 }}
  >
    {value}
  </div>
);

const GameContent = () => {
  const [points, setPoints] = useState(0);
  const [betAmount, setBetAmount] = useState(100);
  const [betType, setBetType] = useState("7up");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [rolling, setRolling] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await getHistory();
        if (res.data && res.data.length > 0) {
          setPoints(res.data[0].pointsAfter || res.data[0].points || 5000);
        } else {
          setPoints(5000);
        }
      } catch {
        setPoints(5000);
      }
    };
    fetchPoints();
  }, []);

  const sendFlutterAlert = (msg) => {
    if (window.FlutterChannel && window.FlutterChannel.postMessage) {
      window.FlutterChannel.postMessage(
        JSON.stringify({ action: "showAlert", message: msg })
      );
    }
  };

  const handlePlay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setRolling(true);
    try {
      const res = await playGame({ betType, betAmount });
      setTimeout(() => {
        setResult(res.data);
        setPoints(res.data.points);
        setRolling(false);
        enqueueSnackbar(res.data.win ? "You Win!" : "You Lose!", {
          variant: res.data.win ? "success" : "error",
        });

        if (res.data.win) {
          sendFlutterAlert("Congratulations! You Win!");
        } else {
          sendFlutterAlert("Sorry, you lost. Try again!");
        }
      }, 500);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setRolling(false);
      enqueueSnackbar(err.response?.data?.error || "Something went wrong", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">7 UP 7 DOWN</h2>
        <div className="mb-4 text-center text-lg font-semibold">
          Points: <span className="text-blue-600">{points}</span>
        </div>
        <form onSubmit={handlePlay}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Bet Amount</label>
            <div className="flex gap-2">
              {betAmounts.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  className={`px-4 py-2 rounded border ${
                    betAmount === amt
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-blue-300"
                  }`}
                  onClick={() => setBetAmount(amt)}
                >
                  {amt}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Bet Type</label>
            <div className="flex gap-2">
              {betTypes.map((type) => (
                <button
                  type="button"
                  key={type.value}
                  className={`px-4 py-2 rounded border ${
                    betType === type.value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-blue-300"
                  }`}
                  onClick={() => setBetType(type.value)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Roll Dice"
            )}
          </button>
        </form>
        {result && (
          <Grow in={!!result} timeout={800}>
            <div className="mt-6 text-center">
              <div className="flex justify-center mb-2">
                <Dice value={result.die1} rolling={rolling} />
                <Dice value={result.die2} rolling={rolling} />
              </div>
              <div
                className={`text-xl font-bold mb-2 ${
                  result.win ? "text-green-600" : "text-red-600"
                }`}
              >
                {result.win ? "You Win!" : "You Lose!"}
              </div>
              <div className="text-md">
                Payout: <span className="font-bold">{result.payout}</span>
              </div>
              <div className="text-md mt-2">
                Updated Points:{" "}
                <span className="font-bold">{result.points}</span>
              </div>
            </div>
          </Grow>
        )}
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
};

const Game = () => (
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <GameContent />
  </SnackbarProvider>
);

export default Game;
