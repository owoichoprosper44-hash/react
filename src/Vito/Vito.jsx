import { useState, useEffect, useMemo } from "react";

const Vito = () => {
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("");
  const [showFinal, setShowFinal] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const message =
    "Vito... I didn't want to say this the normal way. You mean more to me than words can explain. <3";

  useEffect(() => {
    if (!started) return;

    setText("");
    let i = 0;

    const interval = setInterval(() => {
      setText((prev) => prev + message[i]);
      i++;
      if (i === message.length) clearInterval(interval);
    }, 40);

    setTimeout(() => {
      setShowFinal(true);
    }, message.length * 40);

    return () => clearInterval(interval);
  }, [started]);

  const startLove = async () => {
    setStarted(true);
    const audio = new Audio("/love.mp3");
    try {
      await audio.play();
    } catch (err) {}
  };

  const moveButton = (e) => {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 60);

    e.target.style.position = "fixed";
    e.target.style.left = `${x}px`;
    e.target.style.top = `${y}px`;
  };

  const hearts = useMemo(
    () =>
      Array.from({ length: 20 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
      })),
    []
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-pink-400 to-rose-400 text-white relative overflow-hidden px-4 py-10">

      {/* START SCREEN */}
      {!started && (
        <div className="text-center space-y-4 max-w-sm w-full">
          <h1 className="text-2xl sm:text-4xl font-bold">Hey Vito</h1>

          <p className="text-sm sm:text-base">
            I made something special for you... don't laugh :)
          </p>

          <button
            onClick={startLove}
            className="w-full sm:w-auto px-6 py-3 bg-white text-pink-500 rounded-full hover:bg-pink-100 transition"
          >
            Open it
          </button>
        </div>
      )}

      {/* MAIN SCREEN */}
      {started && (
        <div className="text-center space-y-6 max-w-md w-full">
          <h2 className="text-base sm:text-lg leading-relaxed">
            {text}
          </h2>

          {showFinal && (
            <>
              <h1 className="text-2xl sm:text-4xl font-bold animate-bounce">
                I LOVE YOU VITO <3
              </h1>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                <button
                  onClick={() => setAccepted(true)}
                  className="px-6 py-3 bg-white text-pink-500 rounded-full"
                >
                  Yes
                </button>

                <button
                  onMouseEnter={moveButton}
                  className="px-6 py-3 bg-red-200 text-red-600 rounded-full"
                >
                  No
                </button>
              </div>

              {accepted && (
                <div className="mt-6 animate-bounce px-2">
                  <h2 className="text-lg sm:text-2xl font-bold">
                    You just made me the happiest person alive <3
                  </h2>

                  <p className="mt-3 text-sm sm:text-base">
                    Vito... I promise to always make you smile.
                  </p>

                  <p className="mt-2 text-sm sm:text-base">
                    This is just the beginning.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* FLOATING HEARTS (disable pointer interference) */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((h, i) => (
          <span
            key={i}
            className="absolute text-lg sm:text-xl opacity-70 animate-pulse"
            style={{ top: h.top + "%", left: h.left + "%" }}
          >
            <3
          </span>
        ))}
      </div>
    </div>
  );
};

export default Vito;
