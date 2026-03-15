import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function AccordionItem({ icon, title, content, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const btnId = `acc-btn-${id}`;
  const panelId = `acc-panel-${id}`;

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* 트리거 */}
      <h3>
        <button
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((p) => !p)}
          className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/5 transition-colors duration-200 group"
        >
          <span
            aria-hidden="true"
            className={`text-xl flex-shrink-0 transition-transform duration-300 ${open ? 'scale-110' : 'scale-100'}`}
          >
            {icon}
          </span>
          <span className="flex-1 text-sm font-bold text-white group-hover:text-aurora-1 transition-colors">
            {title}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden="true"
            className="flex-shrink-0 text-[#5A5A70] group-hover:text-[#9090A8] transition-colors"
          >
            <ChevronDown size={16} />
          </motion.span>
        </button>
      </h3>

      {/* 패널 — grid trick으로 높이 애니메이션 */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 space-y-3 border-t border-white/8">
              {content.map((item, i) => (
                <ContentItem key={i} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContentItem({ item }) {
  if (item.type === 'tip') {
    return (
      <p className="text-sm text-[#9090A8] leading-relaxed">
        {item.text}
      </p>
    );
  }

  if (item.type === 'info') {
    return (
      <dl className="flex items-start gap-3">
        <dt className="text-xs font-bold text-[#5A5A70] whitespace-nowrap min-w-[80px] pt-0.5">
          {item.label}
        </dt>
        <dd className="text-sm font-semibold text-white flex-1">{item.value}</dd>
      </dl>
    );
  }

  if (item.type === 'table') {
    return (
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-xs" aria-label={item.caption}>
          <caption className="sr-only">{item.caption}</caption>
          <thead>
            <tr className="border-b border-white/10">
              {item.headers.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-3 py-2.5 text-left font-bold text-[#5A5A70] uppercase tracking-wider whitespace-nowrap bg-white/4"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {item.rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-b border-white/6 last:border-0 hover:bg-white/4 transition-colors"
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-3 py-2.5 text-[#9090A8] whitespace-nowrap font-medium"
                  >
                    {ci === 0 ? (
                      <span className="font-bold text-white">{cell}</span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}
