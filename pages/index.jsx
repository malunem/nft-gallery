import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';

const Home = () => {

  const [walletAddress, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");

  const handleWalletChange = (evt) => setWalletAddress(evt.target.value);

  const handleCollectionChange = (evt) => setCollectionAddress(evt.target.value);

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-2">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input onChange={(e)=>setWalletAddress(e.target.value)} type="text" placeholder="Add a wallet address" value={walletAddress} />
        <input onChange={(e)=>setCollectionAddress(e.target.value)} type="text" placeholder="Add a collection address" value={collectionAddress} />

        <label className="text-gray-600">
          <input type="checkbox" className="mr-2" />
          Fetch for collection
        </label>
        <button className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-md w-1/5" onClick={()=>{
          
        }}>
          Let's go!
        </button>
      </div>
    </div>
  )
}

export default Home
