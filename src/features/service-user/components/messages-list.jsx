"use client";

import { ConversationsView } from "@/components/shared/conversations-view";

const CONVERSATIONS = [
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    role: "General Practice",
    lastMessage: "See you tomorrow at 10 AM! Please have your insurance card ready.",
    time: "2 min ago",
    unread: 2,
    online: true,
    messages: [
      { id: "1", sender: "other", text: "Hi! I wanted to confirm your appointment for tomorrow at 10:00 AM.", time: "9:30 AM" },
      { id: "2", sender: "self", text: "Yes, I'll be there! Should I prepare anything?", time: "9:32 AM" },
      { id: "3", sender: "other", text: "Please have your insurance card ready and fast for 8 hours since we'll do blood work.", time: "9:35 AM" },
      { id: "4", sender: "self", text: "Got it, I've completed the intake form. I'll make sure to fast. Thank you!", time: "9:38 AM" },
      { id: "5", sender: "other", text: "See you tomorrow at 10 AM! Please have your insurance card ready.", time: "9:40 AM" },
    ],
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    initials: "MC",
    role: "Physical Therapy",
    lastMessage: "I've reviewed your intake form. Everything looks good for our session.",
    time: "15 min ago",
    unread: 1,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "I've reviewed your intake form. Everything looks good for our session.", time: "10:00 AM" },
    ],
  },
  {
    id: "dr-emily-davis",
    name: "Dr. Emily Davis",
    initials: "ED",
    role: "Mental Health",
    lastMessage: "Thank you for booking! Looking forward to our virtual session.",
    time: "1 hour ago",
    unread: 0,
    online: true,
    messages: [
      { id: "1", sender: "self", text: "Hi Dr. Davis, I just booked a virtual session for next week.", time: "8:00 AM" },
      { id: "2", sender: "other", text: "Thank you for booking! Looking forward to our virtual session. I'll send you a prep questionnaire.", time: "9:00 AM" },
    ],
  },
  {
    id: "dr-james-wilson",
    name: "Dr. James Wilson",
    initials: "JW",
    role: "Cardiology",
    lastMessage: "Your test results are in. Everything looks normal.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "Your test results are in. Everything looks normal. Great work on the lifestyle changes!", time: "Yesterday, 3:00 PM" },
      { id: "2", sender: "self", text: "That's wonderful news! Thank you, Dr. Wilson.", time: "Yesterday, 3:30 PM" },
    ],
  },
  {
    id: "dr-lisa-park",
    name: "Dr. Lisa Park",
    initials: "LP",
    role: "Dermatology",
    lastMessage: "Please apply the prescribed cream twice daily and follow up in two weeks.",
    time: "3 days ago",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "Please apply the prescribed cream twice daily and follow up in two weeks.", time: "3 days ago" },
    ],
  },
];

export function MessagesList({ initialContactId }) {
  return (
    <ConversationsView
      initialConversations={CONVERSATIONS}
      initialContactId={initialContactId}
    />
  );
}
