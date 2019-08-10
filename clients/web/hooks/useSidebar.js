import { useState } from "react";

const useSidebar = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle
  };
};

export default useSidebar;
