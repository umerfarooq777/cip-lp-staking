import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";


export default function Select({ options, currentOption, setCurrentOption, fake }: any) {
  // const [currentOption, setCurrentOption] = useState(options[0]);

  return (
    <Menu as="div" className="relative inline-block text-left min-w-[100px]">
      {
        currentOption &&
        <Menu.Button className="inline-flex items-center gap-2 bg-neutral-900 w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
          <img src={currentOption.icon} className="w-7" alt="" />
          {currentOption.value}
          {fake ? null : <img src="/icons/chevron.svg" alt="" />}
        </Menu.Button>
      }

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 shadow-sm shadow-neutral-700 right-0 mt-2 origin-top-right rounded-md bg-neutral-900  ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {options && options.map((option: any, ind: any) => {
              return (
                <Menu.Item key={ind}>
                  {({ active }) => (
                    <button
                      className={`group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => {
                        !fake && setCurrentOption({ ...option, index: ind });
                      }}
                    >
                      <img src={option.icon} className="w-7" alt="" />
                      {option.value}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
