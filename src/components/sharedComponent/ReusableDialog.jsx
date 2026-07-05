"use client";

import { Dialog } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

export default function ReusableDialog({
  open,
  onClose,
  title,
  description,
  children,
  headerActions,
  bodyClassName = "",
  bodyStyle,
  panelClassName = "",
  contentClassName = "glass-panel relative z-10 mx-auto flex h-[92dvh] max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-7xl flex-col overflow-hidden rounded-3xl sm:w-full sm:rounded-[2rem] 3xl:h-[94dvh] 3xl:max-w-[95vw] 4xl:h-[95dvh] 4xl:max-w-[96vw] 5xl:h-[96dvh] 5xl:max-w-[97vw]",
  closeButtonLabel = "Close dialog",
  size = "xxl",
  className = "",
}) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return undefined;
  }, [open]);

  return (
    <Dialog
      open={open}
      handler={onClose}
      size={size}
      className={`bg-transparent p-2 shadow-none transition-colors md:p-6 ${className}`}
    >
      <div className="relative flex-center min-h-[95vh]">
        <div
          aria-hidden
          className="fixed inset-0 bg-black/35 backdrop-blur-md"
          onClick={onClose}
        />

        <div
          className={`${contentClassName} ${panelClassName}`.trim()}
          style={{ color: "var(--text)" }}
        >
          <div className="relative grid gap-4 px-4 pb-4 pt-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:px-5 sm:pr-20">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-slate-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-solid)] sm:right-5 sm:top-4"
              style={{ color: "var(--text)" }}
              aria-label={closeButtonLabel}
            >
              <FiX className="text-lg" />
            </button>

            <div className="min-w-0">
              {title ? <h3 className="title-xl w-[85%]">{title}</h3> : null}
              {description ? (
                <p className="mt-1 text-body" style={{ color: "var(--muted)" }}>
                  {description}
                </p>
              ) : null}
            </div>

            {headerActions ? (
              <div className="flex max-w-full flex-wrap items-center gap-2 sm:justify-end">
                {headerActions}
              </div>
            ) : null}
          </div>

          <div
            className={`relative flex-1 ${bodyClassName}`.trim()}
            style={bodyStyle ?? { background: "var(--bg-soft)" }}
          >
            {children}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
