"use client";

import { ConversationsView } from "@/components/shared/conversations-view";

const CONVERSATIONS = [
  {
    id: "john-doe",
    name: "John Doe",
    initials: "JD",
    role: "Patient",
    lastMessage: "Thank you for the prescription, I'll start today.",
    time: "5 min ago",
    unread: 1,
    online: true,
    messages: [
      { id: "1", sender: "other", text: "Hi Dr. Johnson, I just completed the intake form for tomorrow's appointment.", time: "9:15 AM" },
      { id: "2", sender: "self", text: "Thank you, John! Everything looks good. Please fast for 8 hours before since we'll do blood work.", time: "9:20 AM" },
      { id: "3", sender: "other", text: "Got it! Should I bring anything else?", time: "9:22 AM" },
      { id: "4", sender: "self", text: "Just your insurance card and a list of current medications. See you at 9 AM!", time: "9:25 AM" },
      { id: "5", sender: "other", text: "Thank you for the prescription, I'll start today.", time: "9:30 AM" },
    ],
  },
  {
    id: "alice-martin",
    name: "Alice Martin",
    initials: "AM",
    role: "Patient",
    lastMessage: "Can I reschedule my appointment to next week?",
    time: "30 min ago",
    unread: 2,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "Hi Dr. Johnson, something came up. Can I reschedule my appointment to next week?", time: "10:00 AM" },
    ],
  },
  {
    id: "emma-garcia",
    name: "Emma Garcia",
    initials: "EG",
    role: "Patient",
    lastMessage: "Looking forward to our appointment tomorrow!",
    time: "1 hour ago",
    unread: 0,
    online: true,
    messages: [
      { id: "1", sender: "self", text: "Hi Emma, just a reminder about your appointment tomorrow at 2 PM.", time: "9:00 AM" },
      { id: "2", sender: "other", text: "Looking forward to our appointment tomorrow! I have some questions about my medication.", time: "10:00 AM" },
    ],
  },
  {
    id: "bob-williams",
    name: "Bob Williams",
    initials: "BW",
    role: "Patient",
    lastMessage: "I've uploaded my latest lab results.",
    time: "3 hours ago",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "I've uploaded my latest lab results. Could you take a look when you get a chance?", time: "8:00 AM" },
    ],
  },
  {
    id: "carol-taylor",
    name: "Carol Taylor",
    initials: "CT",
    role: "Patient",
    lastMessage: "The medication is working well. Symptoms improved.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "self", text: "Carol, how are you feeling since we adjusted your medication?", time: "Yesterday, 2:00 PM" },
      { id: "2", sender: "other", text: "The medication is working well. Symptoms improved significantly. Thank you!", time: "Yesterday, 3:00 PM" },
    ],
  },
];

export function ProviderMessagesList({ initialContactId }) {
  return (
    <ConversationsView
      initialConversations={CONVERSATIONS}
      initialContactId={initialContactId}
    />
  );
}
