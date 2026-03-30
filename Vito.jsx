import { useState, useEffect } from "react";

const Vito = () => {
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("");
  const [showFinal, setShowFinal] = useState(false);
  const [accepted, setAccepted] = useState(false); // ✅ NEW

  const message =
    "Vito... I didn’t want to say this the normal way. You mean more to me than words can explain. ❤️";

  useEffect(() => {
    if (started) {
      let i = 0;
      const interval = setInterval(() => {
        setText((prev) => prev + message[i]);
        i++;
        if (i === message.length) clearInterval(interval);
      }, 40);

      setTimeout(() => {
        setShowFinal(true);
      }, 4000);
    }
  }, [started]);

  const startLove = () => {
    setStarted(true);
    const audio = new Audio("/love.mp3");
    audio.play();
  };

  const moveButton = (e) => {
    const btn = e.target;
    btn.style.position = "absolute";
    btn.style.top = Math.random() * 80 + "%";
    btn.style.left = Math.random() * 80 + "%";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 to-rose-400 text-white relative overflow-hidden">

      {!started && (
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Hey Vito 💖</h1>
          <p className="max-w-md">
            I made something special for you... don’t laugh 😅
          </p>
          <button
            onClick={startLove}
            className="px-6 py-3 bg-white text-pink-500 rounded-full hover:bg-pink-100 transition"
          >
            Open it 🥺
          </button>
        </div>
      )}

      {started && (
        <div className="text-center space-y-6">
          <h2 className="text-xl max-w-lg">{text}</h2>

          {showFinal && (
            <>
              <h1 className="text-4xl font-bold animate-bounce">
                I LOVE YOU VITO ❤️
              </h1>

              <div className="flex gap-4 justify-center mt-4">
                <button
                  onClick={() => setAccepted(true)} // ✅ UPDATED
                  className="px-6 py-3 bg-white text-pink-500 rounded-full"
                >
                  Yes 💖
                </button>

                <button
                  onMouseOver={moveButton}
                  className="px-6 py-3 bg-red-200 text-red-600 rounded-full"
                >
                  No 😅
                </button>
              </div>

              {/* ✅ SWEET MESSAGE */}
              {accepted && (
                <div className="mt-6 animate-bounce">
                  <h2 className="text-2xl font-bold">
                    You just made me the happiest person alive 😭❤️
                  </h2>

                  <p className="mt-3 text-lg">
                    Vito… I promise to always make you smile,
                    to stand by you, and never take you for granted 💖
                  </p>

                  <p className="mt-2 text-lg">
                    This is just the beginning of something beautiful 🌹
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-xl animate-pulse"
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
          >
            ❤️
          </span>
        ))}
      </div>
    </div>
  );
};

export default Vito;