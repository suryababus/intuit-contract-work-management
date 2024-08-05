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
import { LoaderCircle, X } from "lucide-react";
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
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
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
        title: undefined,
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
    closeModal,
  } = useModal();

  const [loading, setLoading] = React.useState(false);

  const onConfirmClick = async () => {
    if (onConfirm) {
      setLoading(true);
      await onConfirm();
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-h-[80vh] overflow-scroll">
        <AlertDialogHeader>
          <div
            className="sticky right-0 top-0 self-end h-0 overflow-visible"
            onClick={closeModal}
          >
            <div className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full">
              <X className="h-6 w-6 " />
            </div>
          </div>
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
              <AlertDialogCancel
                className="text-foreground"
                onClick={onCancel}
                disabled={loading}
              >
                {cancelTitle ? cancelTitle : "Cancel"}
              </AlertDialogCancel>
            )}
            {onConfirm && (
              <AlertDialogAction
                className="relative"
                disabled={loading}
                onClick={onConfirmClick}
              >
                <span className={loading ? "opacity-0" : ""}>Confirm</span>
                {loading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <LoaderCircle className="animate-spin h-5 w-5 " />
                  </span>
                )}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
