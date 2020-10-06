import { useEffect, useRef, useState } from "react";

const useSidebar = () => {
  const [isShowingSidebar, setIsShowingSidebar] = useState(false);
  const sidebarRef = useRef(null);

  function toggleSidebar() {
    setIsShowingSidebar(!isShowingSidebar);
  }

  const handleClickOutsideSidebar = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isShowingSidebar) {
      toggleSidebar()
    }
  }
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSidebar);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSidebar);
    };
  }, [sidebarRef, isShowingSidebar]);

  return {
    sidebarRef,
    isShowingSidebar,
    toggleSidebar
  };
};

export default useSidebar;
