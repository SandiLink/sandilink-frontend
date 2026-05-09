"use client";

import { ConversationsView } from "@/components/shared/conversations-view";

const CONVERSATIONS = [
  {
    id: "dr-williams",
    name: "Dr. Robert Williams",
    initials: "RW",
    role: "Preceptor — Family Medicine",
    lastMessage: "Wednesday at 2:30 PM works. I'll send the evaluation form.",
    time: "1 hour ago",
    unread: 1,
    online: true,
    messages: [
      { id: "1", sender: "other", text: "Jane Smith is doing great in her rotation. She's very proactive.", time: "10:00 AM" },
      { id: "2", sender: "self", text: "That's wonderful! When would be good for her mid-term evaluation?", time: "10:15 AM" },
      { id: "3", sender: "other", text: "How about Wednesday afternoon? Anytime after 2 PM works.", time: "10:20 AM" },
      { id: "4", sender: "self", text: "Wednesday at 2:30 PM works. I'll send the evaluation form.", time: "10:25 AM" },
    ],
  },
  {
    id: "dr-garcia",
    name: "Dr. Maria Garcia",
    initials: "MG",
    role: "Preceptor — Pediatrics",
    lastMessage: "I can accept one more student for spring.",
    time: "3 hours ago",
    unread: 1,
    online: false,
    messages: [
      { id: "1", sender: "self", text: "Dr. Garcia, do you have capacity for another BSN student this spring?", time: "9:00 AM" },
      { id: "2", sender: "other", text: "I can accept one more student for spring. Send me their credentials.", time: "11:00 AM" },
    ],
  },
  {
    id: "dr-park",
    name: "Dr. Kevin Park",
    initials: "KP",
    role: "Preceptor — Emergency Medicine",
    lastMessage: "The affiliation agreement has been signed.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "self", text: "The affiliation agreement is ready for your signature.", time: "Yesterday, 9:00 AM" },
      { id: "2", sender: "other", text: "The affiliation agreement has been signed. Looking forward to the partnership!", time: "Yesterday, 2:00 PM" },
    ],
  },
  {
    id: "dr-chen",
    name: "Dr. Anna Chen",
    initials: "AC",
    role: "Preceptor — OB/GYN",
    lastMessage: "Please send the updated student handbook.",
    time: "2 days ago",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "Please send the updated student handbook. I want to review the new clinical hours policy.", time: "2 days ago" },
    ],
  },
];

export function InstitutionMessages({ initialContactId }) {
  return (
    <ConversationsView
      initialConversations={CONVERSATIONS}
      initialContactId={initialContactId}
    />
  );
}
