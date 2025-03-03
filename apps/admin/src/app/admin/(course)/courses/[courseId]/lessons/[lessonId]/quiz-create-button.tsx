"use client";

import { Button } from "@ng-youth/ui";
import { Lesson, Quiz } from "@ng-youth/lib/models";
import { useState } from "react";
import QuizEditDialog from "./quiz-edit-dialog";

export default function QuizCreateButton({
  lesson,
  index,
  afterSubmit,
}: {
  lesson: Lesson;
  index: number;
  afterSubmit?: (quiz: Quiz) => void;
}) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Add question
      </Button>
      <QuizEditDialog
        lesson={lesson}
        index={index}
        isOpen={isOpen}
        onOpenChange={setOpen}
        afterSubmit={afterSubmit}
      />
    </>
  );
}
