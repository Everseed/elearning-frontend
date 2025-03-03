"use client";

import { deleteCourse } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  useToast,
} from "@ng-youth/ui";
import { Course } from "@ng-youth/lib/models";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CourseDeleteButton({
  course,
  disabled,
}: {
  course: Course;
  disabled?: boolean;
}) {
  const [isDeleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteCourse(course.id, true);
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
      setDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={disabled} variant="destructive" size="icon">
          <Trash2 className="size-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to delete course?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting && (
              <LoaderCircle className="mr-2 size-4 animate-spin" />
            )}
            Proceed
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
