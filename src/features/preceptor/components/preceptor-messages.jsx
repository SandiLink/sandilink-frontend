"use client";

import { ConversationsView } from "@/components/shared/conversations-view";

const CONVERSATIONS = [
  {
    id: "jane-smith",
    name: "Jane Smith",
    initials: "JS",
    role: "BSN Student",
    lastMessage: "I reviewed the diabetes protocol. Can we discuss it tomorrow?",
    time: "30 min ago",
    unread: 1,
    online: true,
    messages: [
      { id: "1", sender: "other", text: "Hi Dr. Williams! I reviewed the diabetes management protocol. I have a few questions.", time: "2:00 PM" },
      { id: "2", sender: "self", text: "Great initiative, Jane! What questions do you have?", time: "2:15 PM" },
      { id: "3", sender: "other", text: "I was wondering about the insulin titration guidelines for type 2 patients with A1C above 9%.", time: "2:20 PM" },
      { id: "4", sender: "self", text: "Good question! We generally start with basal insulin and titrate based on fasting glucose. Let's walk through a case tomorrow.", time: "2:30 PM" },
      { id: "5", sender: "other", text: "I reviewed the diabetes protocol. Can we discuss it tomorrow?", time: "2:35 PM" },
    ],
  },
  {
    id: "sara-kim",
    name: "Sara Kim",
    initials: "SK",
    role: "MSN Student",
    lastMessage: "Thank you for the feedback on my patient assessment!",
    time: "2 hours ago",
    unread: 1,
    online: false,
    messages: [
      { id: "1", sender: "self", text: "Sara, great job on the patient assessment today. Your documentation is improving.", time: "11:00 AM" },
      { id: "2", sender: "other", text: "Thank you for the feedback on my patient assessment! I'll work on being more concise.", time: "11:30 AM" },
    ],
  },
  {
    id: "state-university",
    name: "State University",
    initials: "SU",
    role: "Institution",
    lastMessage: "Wednesday at 2:30 PM works perfectly.",
    time: "1 hour ago",
    unread: 0,
    online: true,
    messages: [
      { id: "1", sender: "other", text: "When would be a good time for Jane's mid-term evaluation?", time: "10:00 AM" },
      { id: "2", sender: "self", text: "How about next Wednesday afternoon? I can do anytime after 2 PM.", time: "10:20 AM" },
      { id: "3", sender: "other", text: "Wednesday at 2:30 PM works perfectly. I'll send the evaluation form in advance.", time: "10:25 AM" },
    ],
  },
  {
    id: "tom-lee",
    name: "Tom Lee",
    initials: "TL",
    role: "BSN Student",
    lastMessage: "I've uploaded my patient log for this week.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "I've uploaded my patient log for this week. Let me know if you need anything else.", time: "Yesterday, 4:00 PM" },
    ],
  },
];

export function PreceptorMessages({ initialContactId }) {
  return (
    <ConversationsView
      initialConversations={CONVERSATIONS}
      initialContactId={initialContactId}
    />
  );
}
