"use client";

import { TabsComponent } from "@/components/shared/TabsComponent";
import { CalendarViewTab } from "./schedule-manager/CalendarViewTab";
import { AvailabilityTab } from "./schedule-manager/AvailabilityTab";

export function ScheduleManager() {
  const tabs = [
    {
      value: "calendar",
      label: "Calendar View",
      content: <CalendarViewTab />,
    },
    {
      value: "availability",
      label: "Weekly Availability",
      content: <AvailabilityTab />,
    },
  ];
  return (
    <TabsComponent tabs={tabs} defaultValue="calendar" namespace="schedule" />
  );
}
