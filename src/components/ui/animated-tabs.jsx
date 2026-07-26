import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function AnimatedTabs({ tabs, className = "" }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || tabs[0]?.title)

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
            style={{
              color: activeTab === tab.id ? '#FAFAF8' : '#71717A',
            }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="active-tab"
                className="absolute inset-0 rounded-full"
                style={{ background: '#C24E2E' }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <div
        className="p-6 rounded-xl border min-h-[280px] backdrop-blur-sm"
        style={{
          background: '#FAFAF8',
          borderColor: '#E5E5E2',
        }}
      >
        <AnimatePresence mode="wait">
          {tabs.find((t) => t.id === activeTab) && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "circOut" }}
            >
              {tabs.find((t) => t.id === activeTab)?.content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
