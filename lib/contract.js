import { ethers } from "ethers";
import contractData from "./contractData.js";

const CONTRACT_ADDRESS = contractData.address;
const ABI = contractData.abi;

/**
 * ✅ Read-only contract instance
 * Uses JsonRpcProvider → no MetaMask required
 * Works on localhost or Vercel (with NEXT_PUBLIC_RPC_URL)
 */
export function getReadContract() {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
  if (!rpcUrl) {
    throw new Error("NEXT_PUBLIC_RPC_URL not set in .env.local");
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
}

/**
 * ✅ Write-enabled contract instance
 * Uses MetaMask signer (BrowserProvider)
 * Needed for transactions like collectHerb()
 */
export async function getWriteContract() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not detected in browser");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}
