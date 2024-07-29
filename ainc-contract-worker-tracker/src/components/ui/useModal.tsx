"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogOverlay } from "@radix-ui/react-alert-dialog";
import React from "react";
import { create } from "zustand";

type ShowModalProps = {
  title?: string;
  content: string | React.ReactNode;
  cancelTitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type State = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  content: string | React.ReactNode;
  cancelTitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showModal: (props: ShowModalProps) => void;
  closeModal: () => void;
};

export const useModal = create<State>((set) => {
  return {
    open: false,
    onOpenChange: (open) => set({ open }),
    title: "",
    content: "",
    showModal: (props) =>
      set({
        onConfirm: undefined,
        onCancel: undefined,
        cancelTitle: undefined,
        open: true,
        ...props,
      }),
    closeModal: () => set({ open: false }),
  };
});

export const ModalProvider = () => {
  const {
    open,
    title,
    content,
    onOpenChange,
    onCancel,
    onConfirm,
    cancelTitle,
  } = useModal();

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent className="max-h-[80vh] overflow-scroll">
        <AlertDialogHeader>
          {title && (
            <AlertDialogTitle className="text-foreground">
              {title}
            </AlertDialogTitle>
          )}
          <AlertDialogDescription className="">
            {content}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {(onCancel || onConfirm) && (
          <AlertDialogFooter>
            {onCancel && (
              <AlertDialogCancel className="text-foreground" onClick={onCancel}>
                {cancelTitle ? cancelTitle : "Cancel"}
              </AlertDialogCancel>
            )}
            {onConfirm && (
              <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
