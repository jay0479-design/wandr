/**
 * SkipNav — 접근성 스킵 내비게이션
 *
 * 키보드 사용자가 반복 네비게이션을 건너뛰고
 * 메인 콘텐츠로 바로 이동할 수 있도록 합니다.
 *
 * WCAG 2.4.1 (Bypass Blocks) 준수
 * 포커스 시에만 화면에 표시 (시각적 방해 없음)
 */
export default function SkipNav({ targetId = 'main-content' }) {
  return (
    <a
      href={`#${targetId}`}
      className="skip-link"
      onFocus={(e) => e.currentTarget.removeAttribute('tabindex')}
    >
      본문 바로가기
    </a>
  );
}
