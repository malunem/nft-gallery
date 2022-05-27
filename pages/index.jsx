import { useState } from 'react';
import { NFTCard } from '/components/NFTCard';

const Home = () => {

  const [walletAddress, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const handleWalletChange = (evt) => setWalletAddress(evt.target.value);

  const handleCollectionChange = (evt) => setCollectionAddress(evt.target.value);

  const fetchNFTs = async() => {
    let nfts;

    const apiKey = "4jalh0Y1nnzUcWlplxuoK4r0dJPdu1Rt";
    const alchemyApiUrl = "https://eth-mainnet.alchemyapi.io/v2/";
    const baseUrl = `${alchemyApiUrl}${apiKey}/getNFTs/`;

    var requestOptions = {
      method: 'GET'
    };

    if (!collectionAddress.length) {
      const fetchUrl = `${baseUrl}?owner=${walletAddress}`;

      nfts = await fetch(fetchUrl, requestOptions)
        .then(data => data.json());
    } else {
      console.log("fetching nfts for collection owned by address");

      const fetchUrl = `${baseUrl}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;

      nfts = await fetch(fetchUrl, requestOptions)
        .then(data => data.json());
    };

    if (nfts) {
      console.log("nfts:", nfts);
      
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async() => {
    if (collectionAddress.length) {
      var requestOptions = {
        method: 'GET'
      };

      const apiKey = "4jalh0Y1nnzUcWlplxuoK4r0dJPdu1Rt";
      const alchemyApiUrl = "https://eth-mainnet.alchemyapi.io/v2/";
      const baseUrl = `${alchemyApiUrl}${apiKey}/getNFTsForCollection/`;
      const fetchUrl = `${baseUrl}?contractAddress=${collectionAddress}&withMetadata=true`;
      const nfts = await fetch(fetchUrl, requestOptions)
        .then(data => data.json());

      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-2">
      <h1 className="text-5xl font-bold	text-slate-700 m-2">
        NFT Gallery
      </h1>
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input onChange={(e)=>setWalletAddress(e.target.value)} type="text" placeholder="Add a wallet address" value={walletAddress} disabled={fetchForCollection} className="border rounded-md p-2 w-1/2" />
        <input onChange={(e)=>setCollectionAddress(e.target.value)} type="text" placeholder="Add a collection address" value={collectionAddress} className="border rounded-md p-2 w-1/2" />

        <label className="text-gray-600">
          <input type="checkbox" className="mr-2" onChange={(e)=>setFetchForCollection(e.target.checked)} />
          Fetch for collection
        </label>
        <button className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-md w-1/3" onClick={()=>{
          if (!fetchForCollection) {
            fetchNFTs()
          } else {
            fetchNFTsForCollection()
          }
        }}>
          Let's go!
        </button>
      </div>

      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {NFTs.length && NFTs.map(nft => <NFTCard nft={nft} key={nft.tokenUri.gateway}/>)}
      </div>
    </div>
  )
}

export default Home
