import { Compass } from 'lucide-react';

const FOOTER_LINKS = {
  '서비스': ['여행지 탐색', '투어 예약', '브이로그', '실전 팁'],
  '파트너': ['Klook', 'Viator', 'GetYourGuide', '신한카드 트래블리'],
  '회사': ['서비스 소개', '이용약관', '개인정보처리방침', '문의하기'],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-void border-t border-white/8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* 브랜드 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Compass size={20} aria-hidden="true" className="text-aurora-1" />
              <span className="text-aurora font-black text-lg tracking-[0.18em] uppercase">
                WANDR
              </span>
            </div>
            <p className="text-sm text-[#5A5A70] leading-relaxed max-w-xs">
              여행은 정답이 없어, Wandr와 함께 지금 바로 떠나자!
            </p>
            {/* SNS */}
            <div className="flex gap-3" aria-label="소셜 미디어 링크">
              {[
                { href: '#', label: '인스타그램 팔로우하기', emoji: '📷' },
                { href: '#', label: '유튜브 채널 구독하기', emoji: '▶️' },
                { href: '#', label: '카카오 채널 추가하기', emoji: '💬' },
              ].map(({ href, label, emoji }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-sm hover:border-white/25 transition-colors"
                >
                  <span aria-hidden="true">{emoji}</span>
                </a>
              ))}
            </div>
          </div>

          {/* 링크 섹션 */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <nav key={group} aria-label={`${group} 링크`}>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#5A5A70] mb-4">
                {group}
              </h3>
              <ul role="list" className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#9090A8] hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* 하단 법적 고지 */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5A5A70]">
            © {year} WANDR. All rights reserved.
          </p>
          <div className="flex items-center gap-6" aria-label="법적 링크">
            {['이용약관', '개인정보처리방침', '쿠키 설정'].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs text-[#5A5A70] hover:text-[#9090A8] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
          <p className="text-xs text-[#5A5A70]">
            Made with ❤️ in Seoul
          </p>
        </div>
      </div>
    </footer>
  );
}
