import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink, Calendar } from 'lucide-react';

export default function CouponCard({ coupon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = coupon.code;
      el.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const expiryFormatted = new Date(coupon.expiry).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <li
      className="glass rounded-2xl overflow-hidden border border-white/10"
      aria-label={`${coupon.title} 쿠폰`}
    >
      <div className="flex">
        {/* 왼쪽 — 할인 정보 */}
        <div
          className={`flex flex-col items-center justify-center px-4 py-6 w-[100px] sm:w-[108px] bg-gradient-to-br ${coupon.color} flex-none`}
          aria-hidden="true"
        >
          <span className="text-2xl font-black text-white leading-none">{coupon.discount}</span>
          <span className="text-[10px] font-bold text-white/80 mt-1 uppercase tracking-wider">
            {coupon.discountType === 'percent' ? 'OFF' : coupon.discountType === 'cashback' ? 'CASHBACK' : 'DC'}
          </span>
        </div>

        {/* 구분선 (톱니 효과) */}
        <div
          aria-hidden="true"
          className="w-0 border-l-2 border-dashed border-white/15 self-stretch"
        />

        {/* 오른쪽 — 상세 정보 */}
        <div className="flex-1 min-w-0 px-4 py-4 space-y-2.5 pr-4">
          {/* 배지 + 공급사 */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-[#9090A8]">
              {coupon.provider}
            </span>
            {coupon.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(0,212,255,0.12)] text-aurora-1 border border-[rgba(0,212,255,0.25)]">
                {coupon.badge}
              </span>
            )}
          </div>

          {/* 제목 */}
          <p className="text-sm font-bold text-white leading-snug line-clamp-2">{coupon.title}</p>
          <p className="text-xs text-[#5A5A70] leading-relaxed line-clamp-2">{coupon.description}</p>

          {/* 만료일 */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#5A5A70]">
            <Calendar size={10} aria-hidden="true" />
            <time dateTime={coupon.expiry} aria-label={`쿠폰 유효기간: ${expiryFormatted}까지`}>
              ~{expiryFormatted}까지
            </time>
          </div>

          {/* 코드 + 복사 버튼 */}
          <div className="flex items-center gap-2 pt-1">
            <div
              className="flex-1 px-3 py-2 rounded-xl bg-white/6 border border-white/10 font-mono text-xs text-[#9090A8] tracking-widest truncate"
              aria-label={`쿠폰 코드: ${coupon.code}`}
            >
              {coupon.code}
            </div>
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              aria-label={copied ? '쿠폰 코드가 복사되었습니다' : `${coupon.title} 쿠폰 코드 복사하기`}
              aria-live="polite"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-aurora-h text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check size={11} aria-hidden="true" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy size={11} aria-hidden="true" />
                  복사
                </>
              )}
            </motion.button>
            <a
              href={coupon.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${coupon.title} — ${coupon.provider} 외부 사이트에서 사용하기`}
              className="w-8 h-8 rounded-xl glass flex items-center justify-center text-[#5A5A70] hover:text-white transition-colors flex-shrink-0"
            >
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
