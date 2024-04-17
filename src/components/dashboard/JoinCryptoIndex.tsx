import { useEthereum } from "@/context/cipMainContext";
import { Button, Input } from "..";
import { getShortenAddress } from "@/utils/helper";
import useMobileDetect from "@/hooks/useMobileDetect";

const JoinCryptoIndex = () => {
  const { headAddress } = useEthereum();
  const isMobile = useMobileDetect(768);

  return (
    <article className="bg-black-700 rounded-lg p-5 w-full">
      {/* <img src="/icons/cee.svg" className="mb-5" alt="" /> */}
      <small className="text-neutral-500 font-medium text-sm md:text-base">
        Join Crypto Index Pool Pro Community
      </small>
      <form>
        <div className="text-primary mt-5 font-normal text-base">
          If No Sponsor Address Use
        </div>
        <Input
          value={isMobile ? getShortenAddress(headAddress, 8) : headAddress}
          className="my-5 ring-2 ring-primary ring-opacity-40  text-xs"
          icon="/icons/copy.svg"
          placeholder={isMobile ? getShortenAddress(headAddress) : headAddress}
          readOnly
          onChange={()=>{}}
        />
        {/* <div className="text-neutral-500 font-medium text-sm md:text-base mb-5">
          Sponsor Address
        </div>
        <Input className="md:text-base text-sm" defaultValue={headAddress} solidBg disabled type="text" readOnly/> */}
      </form>
    </article>
  );
};

export default JoinCryptoIndex;
