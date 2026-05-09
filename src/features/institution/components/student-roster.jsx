"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Trash2, Upload, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/shared/DataTable";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addStudentSchema } from "./schema/addStudentSchema";

const STUDENTS = [
  {
    id: "s1",
    name: "Jane Smith",
    initials: "JS",
    email: "jsmith@uni.edu",
    program: "BSN",
    year: "3rd",
    placement: "Dr. Williams — Family Medicine",
    status: "placed",
  },
  {
    id: "s2",
    name: "Tom Lee",
    initials: "TL",
    email: "tlee@uni.edu",
    program: "BSN",
    year: "3rd",
    placement: "Pending — Dr. Garcia",
    status: "pending",
  },
  {
    id: "s3",
    name: "Sara Kim",
    initials: "SK",
    email: "skim@uni.edu",
    program: "MSN",
    year: "2nd",
    placement: "Dr. Park — ER",
    status: "placed",
  },
  {
    id: "s4",
    name: "Mike Brown",
    initials: "MB",
    email: "mbrown@uni.edu",
    program: "BSN",
    year: "4th",
    placement: "Pending — Dr. Chen",
    status: "pending",
  },
  {
    id: "s5",
    name: "Emily Davis",
    initials: "ED",
    email: "edavis@uni.edu",
    program: "DNP",
    year: "1st",
    placement: "Not assigned",
    status: "unplaced",
  },
  {
    id: "s6",
    name: "Alex Wong",
    initials: "AW",
    email: "awong@uni.edu",
    program: "BSN",
    year: "3rd",
    placement: "Not assigned",
    status: "unplaced",
  },
  {
    id: "s7",
    name: "Priya Patel",
    initials: "PP",
    email: "ppatel@uni.edu",
    program: "MSN",
    year: "2nd",
    placement: "Completed — Dr. Thompson",
    status: "completed",
  },
  {
    id: "s8",
    name: "Chris Taylor",
    initials: "CT",
    email: "ctaylor@uni.edu",
    program: "BSN",
    year: "4th",
    placement: "Completed — Dr. Martinez",
    status: "completed",
  },
];

const statusConfig = {
  placed: { label: "Placed", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  unplaced: { label: "Unplaced", variant: "outline" },
  completed: { label: "Completed", variant: "outline" },
};

export function StudentRoster() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      program: "",
      year: "",
    },
  });

  const onSubmit = (data) => {
    console.log("New student:", data);
    reset();
    setAddOpen(false);
  };

  const studentColumns = [
    {
      header: "Student",
      accessorKey: "name",
      cell: (s) => (
        <div className="flex items-center gap-2.5">
          <Avatar size="sm">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {s.initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-medium">{s.name}</p>
            <p className="text-xs text-muted-foreground">{s.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Program",
      accessorKey: "program",
      cellClassName: "text-sm",
    },
    {
      header: "Year",
      accessorKey: "year",
      cellClassName: "text-sm",
    },
    {
      header: "Placement",
      accessorKey: "placement",
      cellClassName: "text-sm text-muted-foreground",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (s) => {
        const st = statusConfig[s.status];
        return <Badge variant={st.variant}>{st.label}</Badge>;
      },
    },
  ];

  const studentActions = (s) => [
    {
      content: "View profile",
      onClick: () => {
        router.push(`/institution/students/${s.id}`);
      },
    },
    {
      content: "Assign placement",
      onClick: () => {
        console.log("Assign placement", s.id);
      },
    },
    { separator: true },
    {
      content: (
        <div className="flex items-center gap-2 text-destructive">
          <Trash2 className="size-4" />
          Remove
        </div>
      ),
      onClick: () => {
        console.log("Remove", s.id);
      },
      className: "text-destructive",
    },
  ];

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/institution/students/import">
              <Upload className="size-3.5" data-icon="inline-start" />
              Bulk import
            </Link>
          </Button>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="size-3.5" data-icon="inline-start" />
                Add student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Student</DialogTitle>
                <DialogDescription>
                  Add a student to your roster.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 py-2"
              >
                <div className="grid gap-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-1.5">
                      <Label>First name</Label>
                      <Input className="h-10" {...register("firstName")} />
                      {errors.firstName && (
                        <p className="text-xs text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Last name</Label>
                      <Input className="h-10" {...register("lastName")} />
                      {errors.lastName && (
                        <p className="text-xs text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      className="h-10"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-1.5">
                      <Label>Program</Label>
                      <Controller
                        control={control}
                        name="program"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="h-10 w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bsn">BSN</SelectItem>
                              <SelectItem value="msn">MSN</SelectItem>
                              <SelectItem value="dnp">DNP</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />

                      {errors.program && (
                        <p className="text-xs text-red-500">
                          {errors.program.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Year</Label>
                      <Controller
                        control={control}
                        name="year"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="h-10 w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1st</SelectItem>
                              <SelectItem value="2">2nd</SelectItem>
                              <SelectItem value="3">3rd</SelectItem>
                              <SelectItem value="4">4th</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.year && (
                        <p className="text-xs text-red-500">
                          {errors.year.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setAddOpen(false)}>Add student</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent>
          <DataTable
            columns={studentColumns}
            data={STUDENTS}
            actions={studentActions}
            emptyMessage="No students found."
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
