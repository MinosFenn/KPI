import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import create from "zustand";
import shallow from "zustand/shallow";
import cn from "clsx";
import { AnimatePresence, motion } from "framer-motion";

const useToastStore = create((set, get) => ({
  toastList: new Set(),
  show(toastId) {
    const { toastList } = get();

    const newToastList = new Set(toastList);
    newToastList.add(toastId);

    set({
      toastList: newToastList
    });
  },
  close(toastId) {
    const { toastList } = get();

    const newToastList = new Set(toastList);
    newToastList.delete(toastId);

    set({
      toastList: newToastList
    });
  },
  closeAll() {
    const newToastList = new Set();

    set({
      toastList: newToastList
    });
  }
}));

export function Toast(props) {
  const { uniqueId, config = {}, className, children } = props;
  const { duration = 0, role = "status" } = config;

  const { toastList, close } = useToastStore(
    (store) => ({
      toastList: store.toastList,
      close: store.close
    }),
    shallow
  );

  const isShown = toastList.has(uniqueId);

  useEffect(() => {
    if (!duration || !isShown) {
      return;
    }

    const timeoutId = setTimeout(() => {
      close(uniqueId);
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [uniqueId, isShown, duration, close]);

  return createPortal(
    <AnimatePresence>
      {isShown && (
        <motion.div
          key={uniqueId}
          layout
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          className={cn("toast", className)}
          role={role}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.querySelector("#toasts-portal")
  );
}

export function useToastControls() {
  const controls = useToastStore(
    (store) => ({
      show: store.show,
      close: store.close,
      closeAll: store.closeAll
    }),
    shallow
  );

  return controls;
}
