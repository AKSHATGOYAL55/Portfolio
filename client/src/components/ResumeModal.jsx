import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiDownload } from "react-icons/fi";

export default function ResumeModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
        >
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl h-[85vh] bg-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-ink/60">
              <h3 className="font-display text-paper text-sm sm:text-base">
                Akshat Goyal — Resume
              </h3>

              <div className="flex items-center gap-3">
                {/* Download Button */}
                <a
                  href="/resume.pdf"
                  download="Akshat_Goyal_Resume.pdf"
                  className="inline-flex items-center gap-1.5 tag !text-paper hover:!border-signal hover:!text-signal transition-colors"
                >
                  <FiDownload size={13} />
                  <span>Download</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  aria-label="Close resume viewer"
                  className="text-fog hover:text-signal transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-[#0d1424]">
              <iframe
                src="/resume.pdf#toolbar=0"
                title="Akshat Goyal Resume"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}