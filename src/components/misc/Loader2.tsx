import { Transition } from "@headlessui/react";
import "./loader2.css";

type Props = {
  isLoading: any;
  msg: string;
};
export default function Loader({ isLoading, msg }: Props) {
  return (
    <Transition show={isLoading}>
      <div className="loader-container flex justify-center align-center">
        <p className="mx-5">{msg}</p>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Transition>
  );
}
