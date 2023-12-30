"use client";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { useState } from "react";

function HomeFilters() {
  const [active, setActive] = useState("");

  const handleClick = (item: string) => {
    if (active === item) {
      setActive("");
      return;
    }
    setActive(item);
  };

  return (
    <div className="mt-10 hidden gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none 
          ${
            active === item.value
              ? "bg-primary-100 text-primary-500 dark:bg-dark-400"
              : "bg-light-800 text-light-500 dark:bg-dark-300"
          }`}
          onClickCapture={() => handleClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilters;
