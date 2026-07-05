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
  contentClassName = "glass-panel relative z-10 mx-auto flex h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] 3xl:h-[94vh] 3xl:max-w-[95vw] 4xl:h-[95vh] 4xl:max-w-[96vw] 5xl:h-[96vh] 5xl:max-w-[97vw]",
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
          <div className="flex-between gap-4 px-5 py-4">
            <div>
              {title ? <h3 className="title-xl">{title}</h3> : null}
              {description ? (
                <p className="mt-1 text-body" style={{ color: "var(--muted)" }}>
                  {description}
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              {headerActions}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                style={{ color: "var(--text)" }}
                aria-label={closeButtonLabel}
              >
                <FiX className="text-lg" />
              </button>
            </div>
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
