"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ng-youth/ui";
import { useState } from "react";
import CategoryEdit from "./category-edit";

export default function CategoryCreateButton() {
  const [isOpen, setOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button color="primary">New category</Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby={undefined}
        onInteractOutside={(evt) => evt.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <CategoryEdit close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
