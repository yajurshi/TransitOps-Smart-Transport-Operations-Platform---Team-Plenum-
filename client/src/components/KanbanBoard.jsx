import React from 'react';
import { motion } from 'framer-motion';

export const KanbanBoard = ({ columns, renderCard }) => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-6 h-full min-h-[600px] hide-scrollbar">
      {columns.map((col, colIdx) => (
        <div key={col.id} className="flex-shrink-0 w-80 flex flex-col bg-slate-50/50 rounded-2xl border border-slate-200">
          {/* Column Header */}
          <div className="p-4 flex items-center justify-between border-b border-slate-200 bg-white/50 rounded-t-2xl">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${col.color || 'bg-slate-400'}`} />
              {col.title}
            </h3>
            <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-0.5 rounded-full">
              {col.items.length}
            </span>
          </div>

          {/* Cards Container */}
          <div className="flex-1 p-3 space-y-3 overflow-y-auto">
            {col.items.map((item, itemIdx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: itemIdx * 0.05 }}
              >
                {renderCard(item)}
              </motion.div>
            ))}
            
            {col.items.length === 0 && (
              <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl">
                <span className="text-sm font-bold text-slate-400">No items</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
