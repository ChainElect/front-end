import React, { useState, useEffect } from "react";

const VotingPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); // For countdown timer

  const candidates = [
    {
      id: 1,
      name: "Иван Иванов",
      party: "Партия A",
      description: "Кандидат с визия за икономическа стабилност и развитие.",
      photo: "https://via.placeholder.com/150", // Replace with real photo URL
    },
    {
      id: 2,
      name: "Мария Петрова",
      party: "Партия B",
      description: "Фокус върху образованието и социалната справедливост.",
      photo: "https://via.placeholder.com/150", // Replace with real photo URL
    },
    {
      id: 3,
      name: "Георги Георгиев",
      party: "Партия C",
      description: "Работа за устойчиво развитие и защита на околната среда.",
      photo: "https://via.placeholder.com/150", // Replace with real photo URL
    },
  ];

  // Voting end time (set your desired end date/time here)
  const votingEndTime = new Date("2024-11-20T23:59:59").getTime();

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = votingEndTime - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft("Гласуването е приключило!");
      } else {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}ч ${minutes}м ${seconds}с`);
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const handleVote = () => {
    if (selectedCandidate) {
      console.log(`Vote submitted for: ${selectedCandidate.name}`);
      setVoteSubmitted(true);
      setShowConfirmation(false);
    } else {
      alert("Моля, изберете кандидат преди да гласувате!");
    }
  };

  const openConfirmation = () => {
    if (selectedCandidate) {
      setShowConfirmation(true);
    } else {
      alert("Моля, изберете кандидат преди да гласувате!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">Гласуване</h1>
          <p className="mt-4 text-lg">
            Изберете вашия кандидат и подайте своя глас сега.
          </p>
          <div className="mt-4">
            <span className="text-xl font-bold">Оставащо време:</span>{" "}
            <span className="text-2xl">{timeLeft || "Зареждане..."}</span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white shadow-md py-4">
        <div className="max-w-5xl mx-auto px-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                voteSubmitted ? "bg-green-500" : "bg-purple-600"
              }`}
              style={{ width: voteSubmitted ? "100%" : "50%" }}
            ></div>
          </div>
          <p className="text-center mt-2 text-gray-600">
            {voteSubmitted
              ? "Гласуването е завършено."
              : "Избиране на кандидат..."}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {!voteSubmitted ? (
            <>
              <h2 className="text-2xl font-bold text-purple-600 text-center">
                Кандидати
              </h2>
              <p className="text-center text-gray-700 mt-4">
                Изберете кандидат, за който искате да гласувате.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`p-6 bg-white rounded-lg shadow-md cursor-pointer transition-transform transform ${
                      selectedCandidate?.id === candidate.id
                        ? "border-4 border-purple-600 scale-105"
                        : "border border-gray-200 hover:scale-105"
                    }`}
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      className="w-24 h-24 rounded-full mx-auto"
                    />
                    <h3 className="text-xl font-semibold text-purple-600 mt-4">
                      {candidate.name}
                    </h3>
                    <p className="mt-2 text-gray-700">{candidate.party}</p>
                    <p className="mt-4 text-sm text-gray-600">
                      {candidate.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <button
                  onClick={openConfirmation}
                  className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md shadow-md hover:bg-purple-700 transition"
                >
                  Подайте своя глас
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-purple-600">
                Благодаря за вашия глас!
              </h2>
              <p className="mt-4 text-lg text-gray-700">
                Вашият глас беше записан успешно.
              </p>
              <div className="mt-8">
                <a
                  href="/results"
                  className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md shadow-md hover:bg-purple-700 transition"
                >
                  Вижте резултатите
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold text-purple-600">
              Потвърдете вашия избор
            </h2>
            <p className="mt-4 text-gray-700">
              Избраният кандидат:{" "}
              <span className="font-semibold">{selectedCandidate.name}</span>
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Отказ
              </button>
              <button
                onClick={handleVote}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              >
                Потвърждавам
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingPage;
