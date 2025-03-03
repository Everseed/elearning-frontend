"use client";

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@ng-youth/ui";
import { Lesson, Quiz } from "@ng-youth/lib/models";
import { Edit } from "lucide-react";
import { useState } from "react";
import QuizEditDialog from "./quiz-edit-dialog";

export default function QuizUpdateButton({
  lesson,
  index,
  quiz,
  afterSubmit,
}: {
  lesson: Lesson;
  index: number;
  quiz: Quiz;
  afterSubmit?: (quiz: Quiz) => void;
}) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="size-8 flex-shrink-0"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Edit className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit quiz</TooltipContent>
      </Tooltip>

      <QuizEditDialog
        lesson={lesson}
        index={index}
        quiz={quiz}
        isOpen={isOpen}
        onOpenChange={setOpen}
        afterSubmit={afterSubmit}
      />
    </>
  );
}
