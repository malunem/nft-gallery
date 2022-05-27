export const NFTCard = ({ nft }) => {
  return (
    <div className="w-1/4 flex flex-col">
      <div className="rounded-md">
        <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} />
      </div>

      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-full">
        <div>
          <h2 className="text-xl text-gray-800">
            {nft.title}
          </h2>
        </div>
      </div>
    </div>
  );
};