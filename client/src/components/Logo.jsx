import { useEffect, useState } from "react";

function Logo() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  console.log(isDark);
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    // Create a MutationObserver to watch for changes in the `class` attribute on the `html` element
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    // Initial check
    checkDarkMode();

    // Clean up the observer on component unmount
    return () => observer.disconnect();
  }, [isDark]);
  return (
    <div className="flex flex-row gap-2 dark:text-white items-center">
      <img
        src={isDark ? "/logodark.png" : "/logo.png"}
        alt="logo"
        className="w-[55px]"
      />
      <p className="text-lg font-bold min-w-fit">Click Ai</p>
    </div>
  );
}

export default Logo;
