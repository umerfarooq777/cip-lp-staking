import React, { useEffect, useRef, useState } from "react";

// type PropTypes = {
//   component: any;
//   buttonChildren: any;
//   position?: "left" | "right"; 
//   width?: number;
//   _to="string"
//   _from={_from}
//   set_to={set_to}
//   set_from={set_from}
//   clearCipAmountFilter={clearCipAmountFilter}
//   applyCipAmountFilter={applyCipAmountFilter}
//   isFilterStakeLoading={isFilterStakeLoading}
  
// };
type PropTypes = any;

const Drawer = ({ component: Component, buttonChildren, position="left", width= 72, componentProps }: PropTypes) => {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<any>(null);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const closeOnOutsideClick = (event: MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", closeOnOutsideClick);
    } else {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [open]);

  const getContainerClass = () => {
    return `relative inline-block ${position === "right" ? " right-0" : ""}`;
  };

  return (
    <div ref={drawerRef} className={getContainerClass()}>
      <div className="inline-flex items-center overflow-hidden rounded-md">
        <a href="#" className="px-4 py-2 text-sm/non">
          {buttonChildren.label}
        </a>
        <button className="h-full p-2" onClick={toggleOpen}>
          <span className="sr-only">Menu</span>
          <buttonChildren.icon />
        </button>
      </div>

      <div
        className={`absolute shadow-sm shadow-neutral-600 ${position === "left" ? "left-0" : "right-0"} z-10 mt-4 w-${width} rounded-md bg-neutral-900 shadow-lg ${
          open ? "" : "hidden"
        }`}
        role="menu"
      >
        <div className="p-2">
          <Component componentProps={{...componentProps, setOpen}}/>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
