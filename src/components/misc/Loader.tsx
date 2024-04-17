import { Transition } from "@headlessui/react";

type Props = {
  isLoading?: any;
  msg?: string;
};
export default function Loader({ isLoading, msg }: Props) {
  return (
    <div className="h-full">
      <div className="flex justify-center items-center h-full">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
      </div>
    </div>
  );
}
