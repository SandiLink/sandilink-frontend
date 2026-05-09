"use client";

import { ConversationsView } from "@/components/shared/conversations-view";

const CONVERSATIONS = [
  {
    id: "lisa-nguyen",
    name: "Dr. Lisa Nguyen",
    initials: "LN",
    role: "Grant Writer",
    lastMessage: "I've drafted the specific aims page — take a look and let me know your thoughts.",
    time: "30 min ago",
    unread: 2,
    online: true,
    messages: [
      { id: "1", sender: "other", text: "Hi Dr. Rashid! I've reviewed the grant opportunity and your research profile. I think we can build a very strong R21 proposal.", time: "9:00 AM" },
      { id: "2", sender: "self", text: "Thank you Lisa! I agree — the mental health interventions angle fits perfectly with the NIMHD priorities.", time: "9:15 AM" },
      { id: "3", sender: "other", text: "Exactly. I've started outlining the Specific Aims. For Aim 1, I'm thinking we lead with the ML-based screening model. For Aim 2, the community validation component. Does that align with your vision?", time: "9:20 AM" },
      { id: "4", sender: "self", text: "That's spot on. I'd also like to emphasize the health equity dimension in Aim 2 — we have strong preliminary data from three community health centers.", time: "9:25 AM" },
      { id: "5", sender: "other", text: "Perfect — that preliminary data will really strengthen the Significance section. Can you share the datasets and any published results?", time: "9:30 AM" },
      { id: "6", sender: "self", text: "Absolutely. I'll share the data and our Lancet Digital Health paper — it covers the methodology we'd extend for this proposal.", time: "9:35 AM" },
      { id: "7", sender: "other", text: "I've drafted the specific aims page — take a look and let me know your thoughts. I'll start on the Significance and Innovation sections next.", time: "2:15 PM" },
    ],
  },
  {
    id: "fatima-al-rashidi",
    name: "Dr. Fatima Al-Rashidi",
    initials: "FA",
    role: "Grant Writer",
    lastMessage: "The Gates Foundation proposal is ready for your final review.",
    time: "1 hour ago",
    unread: 1,
    online: true,
    messages: [
      { id: "1", sender: "other", text: "Good news — I've finished the full draft for the Gates Foundation Global Health Innovation proposal.", time: "10:00 AM" },
      { id: "2", sender: "self", text: "That's great! How does the budget section look?", time: "10:30 AM" },
      { id: "3", sender: "other", text: "Budget is tight at $980K with room for adjustment. I allocated 40% to personnel, 25% to field operations, and the rest to equipment and indirect costs.", time: "10:45 AM" },
      { id: "4", sender: "self", text: "Sounds reasonable. Let me review the full document this afternoon.", time: "11:00 AM" },
      { id: "5", sender: "other", text: "The Gates Foundation proposal is ready for your final review. I've uploaded it to the shared folder.", time: "3:00 PM" },
    ],
  },
  {
    id: "juan-martinez",
    name: "Dr. Juan Martinez",
    initials: "JM",
    role: "Co-Investigator",
    lastMessage: "I've updated the dataset and pushed the latest analysis results.",
    time: "3 hours ago",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "self", text: "Juan, how's the data analysis coming along for the R01 progress report?", time: "8:00 AM" },
      { id: "2", sender: "other", text: "Almost done! I ran the updated models overnight. The results are looking strong — 34% improvement in detection rates.", time: "9:30 AM" },
      { id: "3", sender: "self", text: "Excellent! That's even better than our preliminary findings.", time: "9:45 AM" },
      { id: "4", sender: "other", text: "I've updated the dataset and pushed the latest analysis results. You should be able to see them in the shared repo.", time: "1:00 PM" },
    ],
  },
  {
    id: "sana-patel",
    name: "Dr. Sana Patel",
    initials: "SP",
    role: "Co-Investigator",
    lastMessage: "Can we schedule a call to discuss the revised methodology section?",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "Hi Amira, I've been reviewing the methodology section and have some suggestions for strengthening the mixed-methods approach.", time: "Yesterday, 2:00 PM" },
      { id: "2", sender: "self", text: "Great — I'd love to hear your thoughts. What areas need the most work?", time: "Yesterday, 2:30 PM" },
      { id: "3", sender: "other", text: "Mainly the qualitative data collection strategy. I think we should add focus groups in addition to the surveys. Also, the sampling framework could be more robust.", time: "Yesterday, 3:00 PM" },
      { id: "4", sender: "other", text: "Can we schedule a call to discuss the revised methodology section? Would Thursday at 2pm work?", time: "Yesterday, 3:15 PM" },
    ],
  },
  {
    id: "helen-park",
    name: "Dr. Helen Park",
    initials: "HP",
    role: "Researcher",
    lastMessage: "Thanks for accepting! Excited to collaborate on the PCORI proposal.",
    time: "2 days ago",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "other", text: "Hi Dr. Rashid! I sent you a collaboration request for the PCORI health equity proposal. I think our research areas are really complementary.", time: "3 days ago, 10:00 AM" },
      { id: "2", sender: "self", text: "Hi Helen! I reviewed your profile and I agree — your community health data paired with our ML models could make a strong case. I've accepted the request.", time: "2 days ago, 9:00 AM" },
      { id: "3", sender: "other", text: "Thanks for accepting! Excited to collaborate on the PCORI proposal. Should we set up a kickoff meeting next week?", time: "2 days ago, 9:30 AM" },
    ],
  },
  {
    id: "support-team",
    name: "SandiLink Support",
    initials: "SL",
    role: "Support",
    lastMessage: "Your question about the grants directory has been resolved.",
    time: "3 days ago",
    unread: 0,
    online: false,
    messages: [
      { id: "1", sender: "self", text: "Hi, I'm having trouble filtering grants by international eligibility. The filter doesn't seem to include EU-only grants.", time: "4 days ago, 11:00 AM" },
      { id: "2", sender: "other", text: "Thank you for reporting this! We've identified the issue — the EU region filter wasn't including ERC grants. A fix has been deployed.", time: "3 days ago, 9:00 AM" },
      { id: "3", sender: "other", text: "Your question about the grants directory has been resolved. Please let us know if you experience any other issues!", time: "3 days ago, 9:05 AM" },
    ],
  },
];

export function ResearcherMessagesList({ initialContactId }) {
  return (
    <ConversationsView
      initialConversations={CONVERSATIONS}
      initialContactId={initialContactId}
    />
  );
}
