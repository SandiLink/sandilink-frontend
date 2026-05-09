"use client";

import { ConversationsView } from "@/components/shared/conversations-view";

const CONVERSATIONS = [
  {
    id: "amira-rashid",
    name: "Dr. Amira Rashid",
    initials: "AR",
    role: "Researcher",
    lastMessage: "That's spot on. I'd also like to emphasize the health equity dimension in Aim 2.",
    time: "30 min ago",
    unread: 2,
    online: true,
    messages: [
      { id: "1", sender: "self", text: "Hi Dr. Rashid! I've reviewed the grant opportunity and your research profile. I think we can build a very strong R21 proposal.", time: "9:00 AM" },
      { id: "2", sender: "other", text: "Thank you Lisa! I agree — the mental health interventions angle fits perfectly with the NIMHD priorities.", time: "9:15 AM" },
      { id: "3", sender: "self", text: "Exactly. I've started outlining the Specific Aims. For Aim 1, I'm thinking we lead with the ML-based screening model. For Aim 2, the community validation component. Does that align with your vision?", time: "9:20 AM" },
      { id: "4", sender: "other", text: "That's spot on. I'd also like to emphasize the health equity dimension in Aim 2 — we have strong preliminary data from three community health centers.", time: "9:25 AM" },
    ],
  },
  {
    id: "robert-chen",
    name: "Dr. Robert Chen",
    initials: "RC",
    role: "Researcher",
    lastMessage: "I've attached the reviewer critiques from the first submission. The main concerns were around methodology.",
    time: "2 hours ago",
    unread: 1,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "Hi Lisa, thanks for taking on the resubmission. Here's some context on what happened with the first round.", time: "10:00 AM" },
      { id: "2", sender: "self", text: "Thanks Robert! Can you share the reviewer critiques? I want to understand exactly what they flagged.", time: "10:15 AM" },
      { id: "3", sender: "other", text: "I've attached the reviewer critiques from the first submission. The main concerns were around methodology and sample size justification.", time: "11:00 AM" },
    ],
  },
  {
    id: "karen-lee",
    name: "Dr. Karen Lee",
    initials: "KL",
    role: "Researcher",
    lastMessage: "The review feedback is incredibly helpful. I'll incorporate your suggestions this week.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "self", text: "Hi Karen, I've completed my review of your PCORI proposal. Overall it's very strong — just a few areas to tighten up.", time: "Yesterday, 2:00 PM" },
      { id: "2", sender: "self", text: "Main feedback: 1) Strengthen the patient engagement section with specific community partnerships. 2) The budget for Year 2 seems low given the proposed activities. 3) Add more detail to the dissemination plan.", time: "Yesterday, 2:05 PM" },
      { id: "3", sender: "other", text: "The review feedback is incredibly helpful. I'll incorporate your suggestions this week.", time: "Yesterday, 3:30 PM" },
    ],
  },
  {
    id: "sarah-mitchell",
    name: "Dr. Sarah Mitchell",
    initials: "SM",
    role: "Researcher",
    lastMessage: "Looking forward to getting started! I'll send over my research summary and preliminary data.",
    time: "2 days ago",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "Hi Lisa! I'm excited to work with you on the RWJF health equity proposal.", time: "2 days ago, 9:00 AM" },
      { id: "2", sender: "self", text: "Welcome aboard, Sarah! Let's start with a strategy call this week to outline the approach. Can you share any preliminary data you have?", time: "2 days ago, 9:30 AM" },
      { id: "3", sender: "other", text: "Looking forward to getting started! I'll send over my research summary and preliminary data by end of day.", time: "2 days ago, 10:00 AM" },
    ],
  },
  {
    id: "marco-silva",
    name: "Dr. Marco Silva",
    initials: "MS",
    role: "Researcher",
    lastMessage: "Thanks for the quick response. I understand you're at capacity — any recommendations for other writers?",
    time: "3 days ago",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "Hi Dr. Nguyen, I sent you a collaboration request for a Fogarty International Center grant. Would love to discuss.", time: "4 days ago, 11:00 AM" },
      { id: "2", sender: "self", text: "Hi Marco, thanks for reaching out. Unfortunately I'm at capacity with current projects and can't take on a new full proposal right now. I'd be happy to do a review once you have a draft.", time: "3 days ago, 9:00 AM" },
      { id: "3", sender: "other", text: "Thanks for the quick response. I understand you're at capacity — any recommendations for other writers with NIH Fogarty experience?", time: "3 days ago, 10:00 AM" },
    ],
  },
  {
    id: "support",
    name: "SandiLink Support",
    initials: "SL",
    role: "Support",
    lastMessage: "Your payout for March has been processed. Check your earnings dashboard for details.",
    time: "4 days ago",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "Your payout for March has been processed. Total: $6,400. Check your earnings dashboard for details.", time: "4 days ago, 8:00 AM" },
    ],
  },
];

export function GrantWriterMessages({ initialContactId }) {
  return (
    <ConversationsView
      initialConversations={CONVERSATIONS}
      initialContactId={initialContactId}
    />
  );
}
