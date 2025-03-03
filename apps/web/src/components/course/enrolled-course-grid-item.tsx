"use client";

import { removeEnrollment } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Card,
  CardContent,
  CardFooter,
  Progress,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
} from "@ng-youth/ui";
import { EnrolledCourse } from "@ng-youth/lib/models";
import { uppercaseFirstChar } from "@ng-youth/lib/utils";
import { LoaderCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function EnrolledCourseGridItem({ data }: { data: EnrolledCourse }) {
  const [isLoading, setLoading] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const { toast } = useToast();

  const handleRemove = async () => {
    try {
      setLoading(true);
      await removeEnrollment(data.course.id, "/profile/learnings");
      toast({
        title: "Success",
        description: "Removed enrollment",
        variant: "success",
      });
      setAlertOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden shadow-none flex flex-col">
      <CardContent className="p-0 flex flex-col grow">
        <div className="relative">
          <Link href={`/courses/${data.course.slug}`}>
            <div className="aspect-w-16 aspect-h-9">
              <Image
                src={
                  data.course.cover ??
                  require("@ng-youth/assets/images/placeholder.jpg")
                }
                className="bg-primary object-cover"
                alt=""
                priority
                fill
                sizes="33vh"
              />
            </div>
          </Link>

          <TooltipProvider>
            <AlertDialog open={isAlertOpen} onOpenChange={setAlertOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    disabled={isLoading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setAlertOpen(true)}
                    className="shadow-lg absolute top-2 right-2"
                  >
                    <Trash2 className="size-5" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Remove enrollment</TooltipContent>
              </Tooltip>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm remove</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure to unenroll: &ldquo;{data.course.title}&ldquo;?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isLoading}>
                    Cancel
                  </AlertDialogCancel>
                  <Button onClick={handleRemove} disabled={isLoading}>
                    {isLoading && (
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Proceed
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TooltipProvider>
        </div>
        <div className="flex flex-col grow p-4">
          <Link
            href={`/courses/${data.course.slug}`}
            className="text-foreground font-semibold text-lg line-clamp-2"
          >
            {data.course.title}
          </Link>
          <div className="flex items-center text-sm mb-4 mt-1">
            <div className="text-muted-foreground">
              {uppercaseFirstChar(data.course.access)}
            </div>
            <div className="mx-2 text-muted-foreground">&bull;</div>
            <div className="text-primary">
              {uppercaseFirstChar(data.course.level)}
            </div>
          </div>

          <div className="flex-grow"></div>

          <Button asChild>
            {data.resumeLesson ? (
              <Link
                href={`/learn/${data.course.slug}/lessons/${data.resumeLesson.slug}`}
              >
                Resume course
              </Link>
            ) : (
              <Link href={`/learn/${data.course.slug}`}>Resume course</Link>
            )}
          </Button>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-4 bg-muted/50 flex space-x-3">
        <Progress
          className="h-3"
          indicatorClass="bg-success"
          value={data.progress}
        />
        <div className="text-sm text-muted-foreground">{data.progress}%</div>
      </CardFooter>
    </Card>
  );
}
