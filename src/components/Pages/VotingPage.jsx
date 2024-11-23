import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { ERC20_ABI, ERC20_ADDRESS } from "../../constants/index.js";

const VotingPage = () => {
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const connectedWallets = useWallets();
  let votingEndTime = 0;
  // Fetch parties from the backend
  const fetchParties = async () => {
    try {
      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) {
        console.error("No provider connected.");
        return;
      }
      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const electionId = await contract.electionCount();
      const electionDetails = await contract.elections(electionId);
      const endTime = electionDetails.endTime;
      console.log("endtime: "+ endTime)
      votingEndTime = (endTime * 1000);

      const fetchedParties = await contract.getElectionParties();
      // Assuming fetchedParties is an array of objects like { id, name, description, photo }
      setParties(
        fetchedParties.map((party) => ({
          id: party.id.toString(),
          name: party.name,
          description: party.description,
          photo: party.photo,
        }))
      );
    } catch (error) {
      console.error("Error fetching parties:", error);
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();


      const distance = votingEndTime - now;
      console.log("end Time voting :" + votingEndTime)
      console.log("Now" + now)
      console.log("Diff: " +distance)
      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft("Гласуването е приключило!");
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}ч ${minutes}м ${seconds}с`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVote = async () => {
    if (!selectedParty) {
      alert("Моля, изберете партия преди да гласувате!");
      return;
    }

    try {
      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) {
        alert("Моля, свържете портфейла си преди да гласувате!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const tx = await contract.vote(selectedParty.id); // Assuming "1" is the election ID
      await tx.wait();
      setVoteSubmitted(true);
      alert("Благодарим ви за вашия глас!");
    } catch (err) {
      console.error("Error submitting vote:", err);
      alert("Възникна грешка при подаването на гласа. Опитайте отново.");
    }
  };

  const openConfirmation = () => {
    if (selectedParty) {
      setShowConfirmation(true);
    } else {
      alert("Моля, изберете партия преди да гласувате!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-10 mb-10">
      <header className="bg-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">Гласуване</h1>
          <p className="mt-4 text-lg">Изберете вашата партия и подайте своя глас сега.</p>
          <div className="mt-4">
            <span className="text-xl font-bold">Оставащо време:</span>{" "}
            <span className="text-2xl">{timeLeft || "Зареждане..."}</span>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {!voteSubmitted ? (
            <>
              <h2 className="text-2xl font-bold text-purple-600 text-center">Партии</h2>
              <p className="text-center text-gray-700 mt-4">
                Изберете партия, за която искате да гласувате.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {parties.length > 0 ? (
                  parties.map((party) => (
                    <div
                      key={party.id}
                      className={`p-6 bg-white rounded-lg shadow-md cursor-pointer transition-transform transform ${selectedParty?.id === party.id
                        ? "border-4 border-purple-600 scale-105"
                        : "border border-gray-200 hover:scale-105"
                        }`}
                      onClick={() => setSelectedParty(party)}
                    >
                      <img
                        src={party.photo || "https://via.placeholder.com/150"}
                        alt={party.name}
                        className="w-24 h-24 rounded-full mx-auto"
                      />
                      <h3 className="text-xl font-semibold text-purple-600 mt-4">{party.name}</h3>
                      <p className="mt-4 text-sm text-gray-600">{party.description || "Описание липсва."}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">Няма налични партии.</p>
                )}
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
              <h2 className="text-3xl font-bold text-purple-600">Благодаря за вашия глас!</h2>
              <p className="mt-4 text-lg text-gray-700">Вашият глас беше записан успешно.</p>
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

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold text-purple-600">Потвърдете вашия избор</h2>
            <p className="mt-4 text-gray-700">
              Избраната партия:{" "}
              <span className="font-semibold">{selectedParty.name}</span>
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