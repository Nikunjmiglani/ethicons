import { ethers } from "ethers";
import contractData from "../contractData.json";

export async function getContract() {
  let provider, signer;

  if (typeof window !== "undefined" && window.ethereum) {
    // ✅ Use MetaMask if available (for write)
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
  } else {
    // ✅ Fallback to Ngrok RPC (for read-only, e.g. phone without MetaMask)
    provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_BASE_URL);
    signer = provider; // no real signer, just fallback
  }

  return new ethers.Contract(contractData.address, contractData.abi, signer);
}
