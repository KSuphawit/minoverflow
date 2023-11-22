"use client";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
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
    <div className="mt-10 flex gap-3">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          className={`body-medium background-light800_dark400 rounded-lg px-6 py-3 capitalize 
          ${active === item.value ? "" : ""}`}
          onClickCapture={() => handleClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilters;
