import React from 'react';
import { motion } from 'framer-motion';

export const Timeline = ({ events }) => {
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-slate-200">
      {events.map((event, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative"
        >
          {/* Timeline dot */}
          <span className={`absolute -left-6 w-5 h-5 rounded-full border-4 border-white ${
            event.status === 'completed' ? 'bg-emerald-500' : 
            event.status === 'active' ? 'bg-orange-500 ring-4 ring-orange-100' : 'bg-slate-300'
          }`} />
          
          {/* Content */}
          <div className="pl-4 pb-1">
            <h4 className={`text-sm font-bold ${
              event.status === 'completed' ? 'text-slate-800' : 
              event.status === 'active' ? 'text-orange-600' : 'text-slate-400'
            }`}>
              {event.title}
            </h4>
            {event.description && (
              <p className="text-xs text-slate-500 mt-1">{event.description}</p>
            )}
            {event.time && (
              <span className="inline-block mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">
                {event.time}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
