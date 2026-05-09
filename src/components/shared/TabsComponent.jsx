"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";

export function TabsComponent({
  tabs,
  defaultValue,
  className,
  namespace = "",
  paramName,
  onTabChange,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramKey = paramName || (namespace ? `tab[${namespace}]` : "tab");
  const paramValue = searchParams.get(paramKey)?.toLowerCase();

  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const activeTab = useMemo(() => {
    return (
      tabs.find((t) => t.value.toLowerCase() === paramValue)?.value ||
      defaultValue ||
      tabs[0]?.value
    );
  }, [paramValue, defaultValue, tabs]);

  const handleTabChange = (value) => {
    // Update URL query param
    const url = new URL(window.location.href);
    url.searchParams.set(paramKey, value);
    router.replace(url.toString());

    onTabChange?.(value);
  };

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const active = container?.querySelector('[data-state="active"]');
    if (container && active) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      if (activeRect.left < containerRect.left) {
        container.scrollBy({
          left: activeRect.left - containerRect.left,
          behavior: "smooth",
        });
      } else if (activeRect.right > containerRect.right) {
        container.scrollBy({
          left: activeRect.right - containerRect.right + 1,
          behavior: "smooth",
        });
      }
    }
  }, [activeTab]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, []);

  return (
    <div className="grid grid-cols-1">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className={`w-full gap-0 ${className}`}
      >
        <div className="flex items-center gap-2">
          {canScrollLeft && (
            <Button variant="ghost" size="icon" onClick={scrollLeft}>
              ‹
            </Button>
          )}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scroll-y-hidden scroll-x-hidden scroll-smooth flex-1"
          >
            <TabsList className="flex gap-2 whitespace-nowrap w-max">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {canScrollRight && (
            <Button variant="ghost" size="icon" onClick={scrollRight}>
              ›
            </Button>
          )}
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
