"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

export function ScrollableButtonGroup({
  items,
  activeValue,
  onChange,
  className = "",
}) {
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Auto-scroll active into view
  useEffect(() => {
    const container = scrollRef.current;
    const active = container?.querySelector("[data-active='true']");

    if (container && active) {
      const cRect = container.getBoundingClientRect();
      const aRect = active.getBoundingClientRect();

      if (aRect.left < cRect.left) {
        container.scrollBy({
          left: aRect.left - cRect.left,
          behavior: "smooth",
        });
      } else if (aRect.right > cRect.right) {
        container.scrollBy({
          left: aRect.right - cRect.right,
          behavior: "smooth",
        });
      }
    }
  }, [activeValue]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="grid grid-cols-1">
      <div className={`flex items-center gap-2 ${className}`}>
        {canScrollLeft && (
          <Button size="icon" variant="ghost" onClick={scrollLeft}>
            ‹
          </Button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scroll-y-hidden scroll-x-hidden whitespace-nowrap flex-1 scroll-smooth"
        >
          {items.map((item) => (
            <Button
              key={item.id}
              size="sm"
              variant={activeValue === item.id ? "default" : "outline"}
              onClick={() => onChange(item.id)}
              data-active={activeValue === item.id}
              className="whitespace-nowrap flex items-center gap-1"
            >
              {item.icon && <item.icon className="size-3.5" />}
              {item.label}
            </Button>
          ))}
        </div>

        {canScrollRight && (
          <Button size="icon" variant="ghost" onClick={scrollRight}>
            ›
          </Button>
        )}
      </div>
    </div>
  );
}
