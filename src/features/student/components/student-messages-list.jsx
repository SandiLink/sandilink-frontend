"use client";

import { ConversationsView } from "@/components/shared/conversations-view";

const CONVERSATIONS = [
  {
    id: "dr-robert-williams",
    name: "Dr. Robert Williams",
    initials: "RW",
    role: "Preceptor",
    lastMessage: "Great work today! Keep documenting your patient encounters.",
    time: "30 min ago",
    unread: 1,
    online: true,
    messages: [
      { id: "1", sender: "other", text: "Good morning Jane! How are you settling into the rotation?", time: "8:00 AM" },
      { id: "2", sender: "self", text: "Good morning Dr. Williams! I'm really enjoying it. The patient variety has been great.", time: "8:05 AM" },
      { id: "3", sender: "other", text: "That's great! Today we have lots of chronic disease management cases. Review the care plan protocols before we start.", time: "8:10 AM" },
      { id: "4", sender: "self", text: "I reviewed them last night! I have a question about the diabetes management protocol — can we discuss between patients?", time: "8:12 AM" },
      { id: "5", sender: "other", text: "Great work today! Keep documenting your patient encounters.", time: "4:30 PM" },
    ],
  },
  {
    id: "dr-maria-garcia",
    name: "Dr. Maria Garcia",
    initials: "MG",
    role: "Preceptor",
    lastMessage: "I'll review your placement request this week.",
    time: "2 hours ago",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "self", text: "Hi Dr. Garcia, I submitted a placement request for your Pediatrics rotation.", time: "Yesterday, 2:00 PM" },
      { id: "2", sender: "other", text: "I'll review your placement request this week. Your credentials look great!", time: "Yesterday, 4:00 PM" },
    ],
  },
  {
    id: "dr-kevin-park",
    name: "Dr. Kevin Park",
    initials: "KP",
    role: "Preceptor",
    lastMessage: "Looking forward to working with you!",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "Hi Jane! I saw your placement request for Emergency Medicine. Happy to take you on next month.", time: "2 days ago" },
      { id: "2", sender: "self", text: "That's wonderful! Thank you so much, Dr. Park!", time: "2 days ago" },
      { id: "3", sender: "other", text: "Looking forward to working with you! Please review the ER protocols beforehand.", time: "Yesterday" },
    ],
  },
];

export function StudentMessagesList({ initialContactId }) {
  return (
    <ConversationsView
      initialConversations={CONVERSATIONS}
      initialContactId={initialContactId}
    />
  );
}
