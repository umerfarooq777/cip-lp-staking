import React, { Dispatch, SetStateAction } from "react";
import { Button, Container, Input } from "..";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GiHamburgerMenu } from "react-icons/gi";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const HeaderUser = ({ open, setOpen }: Props) => {
  return (
    <header className="pt-5">

      <Container>
       
        <div className="flex">
         
        
          <div className="ms-auto flex items-center gap-2">
          
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: 12,
              }}
              >
              <ConnectButton />
              
            </div>
            <button
              className="bg-neutral-800 text-2xl px-2.5 py-2 rounded-lg md:hidden"
              onClick={() => {
                setOpen(!open);
              }}
              >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default HeaderUser;
