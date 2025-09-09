"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../../constants/contract";

export default function Traceability() {
  const [herbName, setHerbName] = useState("");
  const [geoLocation, setGeoLocation] = useState("");
  const [status, setStatus] = useState("");

  async function collectHerb() {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.collectHerb(herbName, geoLocation);
      setStatus("Transaction sent, waiting for confirmation...");
      await tx.wait();
      setStatus("Herb collected successfully!");
    } catch (error) {
      console.error(error);
      setStatus("Error: " + (error.data?.message || error.message));
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Collect Herb</h2>
      <input
        placeholder="Herb Name"
        value={herbName}
        onChange={(e) => setHerbName(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 8 }}
      />
      <input
        placeholder="Geo Location"
        value={geoLocation}
        onChange={(e) => setGeoLocation(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 8 }}
      />
      <button onClick={collectHerb} style={{ width: "100%", padding: 10 }}>
        Collect Herb
      </button>
      <p>{status}</p>
    </div>
  );
}
