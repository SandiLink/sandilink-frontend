"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  MessageSquare,
  Paperclip,
  Search,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Shared chat / conversations view used by every role's messages page.
 *
 * Behavior:
 *   - Mobile: one pane at a time (list OR chat). Tap a conversation → chat
 *     panel with a back arrow in the header. Desktop (lg+): split view.
 *   - Send button appends the typed message to the active conversation
 *     (state-only; swap for an API call when backend is ready).
 *   - Paperclip opens a native file picker, shows a toast confirming the
 *     attachment.
 *   - Auto-scrolls to the latest message on send and on conversation switch.
 *   - Custom scrollbar via `chat-scroll` class (defined in globals.css).
 *   - Container is 100dvh - 169px so it works inside the dashboard chrome.
 */
export function ConversationsView({ initialConversations, initialContactId }) {
  const [conversations, setConversations] = useState(initialConversations);
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState(
    initialContactId || initialConversations[0]?.id || null,
  );
  const [message, setMessage] = useState("");
  const [view, setView] = useState(initialContactId ? "chat" : "list");
  const fileInputRef = useRef(null);
  const messagesScrollRef = useRef(null);

  const filtered = conversations.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase()),
  );
  const active = conversations.find((c) => c.id === activeId);

  useEffect(() => {
    const node = messagesScrollRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [active?.id, active?.messages.length]);

  function selectConversation(id) {
    setActiveId(id);
    setView("chat");
  }

  function nowLabel() {
    return new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function handleSend(e) {
    e.preventDefault();
    const text = message.trim();
    if (!text || !active) return;
    const newMsg = {
      id: `${Date.now()}`,
      sender: "self",
      text,
      time: nowLabel(),
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: text,
              time: "Just now",
              unread: 0,
            }
          : c,
      ),
    );
    setMessage("");
  }

  function handleAttachClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKb = (file.size / 1024).toFixed(1);
    toast.success(`Attached ${file.name}`, {
      description: `${sizeKb} KB · will be sent with your next message`,
    });
    e.target.value = "";
  }

  return (
    <div className="flex h-[calc(100dvh-169px)] min-h-[500px] overflow-hidden rounded-xl border">
      {/* Conversation list */}
      <div
        className={cn(
          "w-full shrink-0 flex-col border-r lg:flex lg:w-80",
          view === "list" ? "flex" : "hidden",
        )}
      >
        <div className="border-b p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 text-xs"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto chat-scroll">
          {filtered.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => selectConversation(c.id)}
              className={cn(
                "flex w-full items-start gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/50",
                activeId === c.id && "bg-muted/80",
              )}
            >
              <div className="relative shrink-0">
                <Avatar size="sm">
                  <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                    {c.initials}
                  </AvatarFallback>
                </Avatar>
                {c.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between gap-1">
                  <p
                    className={cn(
                      "truncate text-xs",
                      c.unread > 0 ? "font-semibold" : "font-medium",
                    )}
                  >
                    {c.name}
                  </p>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {c.time}
                  </span>
                </div>
                {c.role && (
                  <p className="text-[10px] text-muted-foreground">{c.role}</p>
                )}
                <p
                  className={cn(
                    "mt-0.5 truncate text-[11px]",
                    c.unread > 0
                      ? "text-foreground font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {c.lastMessage}
                </p>
              </div>
              {c.unread > 0 && (
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat panel */}
      {active ? (
        <div
          className={cn(
            "flex-1 flex-col lg:flex",
            view === "chat" ? "flex" : "hidden",
          )}
        >
          <div className="flex items-center justify-between gap-2 border-b px-3 py-2.5 sm:px-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 shrink-0 lg:hidden"
                onClick={() => setView("list")}
                aria-label="Back to conversations"
              >
                <ArrowLeft className="size-4" />
              </Button>
              <div className="relative shrink-0">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {active.initials}
                  </AvatarFallback>
                </Avatar>
                {active.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background bg-emerald-500" />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{active.name}</p>
                <p
                  className={cn(
                    "truncate text-xs",
                    active.online
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-muted-foreground",
                  )}
                >
                  {active.online ? "Online" : (active.role ?? "Offline")}
                </p>
              </div>
            </div>
          </div>

          <div
            ref={messagesScrollRef}
            className="chat-scroll flex-1 overflow-y-auto px-3 py-4 sm:px-4"
          >
            <div className="space-y-4">
              <div className="text-center">
                <Badge variant="secondary" className="text-[10px]">
                  Today
                </Badge>
              </div>
              {active.messages.map((msg) => {
                const isSelf = msg.sender === "self";
                return (
                  <div
                    key={msg.id}
                    className={cn("flex", isSelf ? "justify-end" : "justify-start")}
                  >
                    <div className="flex max-w-[85%] items-end gap-2 sm:max-w-[75%]">
                      {!isSelf && (
                        <Avatar size="sm" className="size-6 shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary text-[8px]">
                            {active.initials}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="space-y-1">
                        <div
                          className={cn(
                            "rounded-2xl px-3.5 py-2.5 text-sm",
                            isSelf
                              ? "rounded-br-md bg-primary text-primary-foreground"
                              : "rounded-bl-md bg-muted",
                          )}
                        >
                          {msg.text}
                        </div>
                        <p
                          className={cn(
                            "text-[10px] text-muted-foreground/60",
                            isSelf ? "text-right" : "text-left",
                          )}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t px-3 py-3 sm:px-4">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              aria-hidden="true"
            />
            <form
              onSubmit={handleSend}
              className="mx-auto flex items-center gap-2"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-9 shrink-0"
                onClick={handleAttachClick}
                aria-label="Attach a file"
              >
                <Paperclip className="size-4" />
              </Button>
              <Input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-10 min-w-0 flex-1"
              />
              <Button
                type="submit"
                size="icon"
                className="size-9 shrink-0"
                disabled={!message.trim()}
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <div className="text-center">
            <MessageSquare className="mx-auto size-10 text-muted-foreground/30" />
            <p className="mt-3 text-sm text-muted-foreground">
              Select a conversation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
