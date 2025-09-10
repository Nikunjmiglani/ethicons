import { ethers } from "ethers";
import contractJson from "../contracts/AyurvedicTraceability.json";

// Replace with deployed address
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function getContract() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not detected");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();   
  return new ethers.Contract(CONTRACT_ADDRESS, contractJson.abi, signer);
}
