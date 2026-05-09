"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function ClientInfoTab({ project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <Avatar className="size-14">
            <AvatarFallback className="bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400 text-base">
              {project.clientInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-base font-semibold">{project.client}</p>
            <p className="text-sm text-muted-foreground">
              {project.institution}
            </p>
            <div className="mt-3 grid gap-3 text-sm">
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Grant</span>
                <span className="font-medium">{project.grantTitle}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Funding Target</span>
                <span className="font-medium">{project.fundingAmount}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{project.service}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Project Started</span>
                <span className="font-medium">{project.startDate}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deadline</span>
                <span className="font-medium text-destructive">
                  {project.deadline}
                </span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <MessageSquare className="size-4" />
                Message
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/researcher">View Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
