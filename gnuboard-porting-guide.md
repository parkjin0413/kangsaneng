# 그누보드5 테마 이식 가이드 (카페24 호스팅)

이 폴더의 `index.html`, `products.html`, `about.html`, `contact.html`은 정적 시안입니다.
그누보드5 테마로 옮길 때는 아래 구조를 따르세요.

## 1. 테마 폴더 구조

```
/theme/gangsan/
  ├─ head.head.php     ← <header class="site-header">...</header> + 모바일 nav 블록
  ├─ tail.tail.php      ← <footer class="site-footer">...</footer> + </body></html>
  ├─ head.php / tail.php
  ├─ css/style.css      ← assets/css/style.css 그대로 복사
  └─ js/main.js         ← assets/js/main.js 그대로 복사
```

- `head.head.php` 안에서 현재 메뉴 활성화(`aria-current="page"`)는 그누보드 변수
  `$sub_url`이나 `$_SERVER['PHP_SELF']` 비교로 대체하세요.
- `assets/`, `image/` 경로는 그누보드 규칙에 맞춰 `<?php echo G5_THEME_URL ?>/css/...` 형태로 치환합니다.

## 2. 페이지 매핑

| 정적 파일 | 그누보드5 대상 |
|---|---|
| `index.html` | 메인 페이지 (`index.php` 또는 최상단 테마 템플릿) |
| `products.html` | 일반 페이지(`/bbs/content.php` 또는 커스텀 php) — 탭 3개는 그대로 두거나, 품목별 게시판(자료실)로 확장 가능 |
| `about.html` | 일반 페이지, 연혁 섹션은 정적 콘텐츠로 유지 가능 |
| `contact.html` | 게시판 글쓰기 스킨(`/skin/board/문의용스킨/write.skin.php`)으로 이식 |

## 3. 문의 폼 → 게시판 글쓰기 스킨 필드 매핑

`contact.html`의 `<form data-inquiry-form>` 안 `name` 속성을 그누보드 필드에 맞춰 이미 준비해뒀습니다.

| 폼 항목 | HTML name | 그누보드 필드 |
|---|---|---|
| 회사명/현장명 | `wr_subject` | 제목 |
| 담당자명 | `wr_name` | 작성자명 |
| 연락처 | `wr_1` | 게시판 추가필드 1 |
| 이메일 | `wr_email` | 이메일 |
| 문의 품목 | `wr_2` | 게시판 추가필드 2 (select) |
| 문의 내용 | `wr_content` | 본문 |

관리자 페이지에서 문의 게시판을 만들고 `wr_1`, `wr_2` 추가필드를 활성화한 뒤,
`write.skin.php`에 이 폼 마크업(class/CSS 포함)을 그대로 붙여 넣으면 됩니다.
현재 JS의 제출 알림 문구는 시안용 안내이므로, 실제 연동 후에는 해당 로직을 제거하세요
(`assets/js/main.js`의 `data-inquiry-form` 관련 블록).

## 4. 이미지

`card-media`, `photo-frame`, `hero-panel .photo-frame` 등은 모두 텍스트 플레이스홀더입니다.
실제 제품/현장 사진으로 교체한 뒤, 배경색 대신 `<img>` 또는 `background-image`로 바꿔주세요.
(`image/` 폴더의 참고 이미지 4장은 무드 레퍼런스 용도이며, 다른 스튜디오의 결과물이므로
실제 사이트 콘텐츠로 사용하지 않는 것을 권장합니다.)

## 4b. 히어로 영상

`index.html`의 히어로는 현재 `assets/img/hero.mp4`(약 2.5MB)를 배경 영상으로 사용합니다.

- `autoplay muted loop playsinline`이 모두 있어야 모바일에서 자동재생됩니다.
- `poster="assets/img/hero-placeholder.svg"`는 영상 로드 전/실패 시 대체 이미지입니다.
  SVG poster는 구형 브라우저에서 지원이 불안정할 수 있어, 실제 배포 전 JPG/PNG 스틸컷으로
  교체하는 것을 권장합니다(영상의 한 프레임을 캡처해서 사용하면 자연스럽습니다).
- `prefers-reduced-motion` 사용자는 `assets/js/main.js`에서 자동으로 영상을 일시정지합니다.
- 카페24 서버 트래픽/용량 정책에 따라 mp4 용량이 부담되면, `image` 대신 정적 이미지로
  되돌리거나(위 4번 참고) 영상을 더 압축(H.264, 1080p 이하, 10~15초 루프 권장)하세요.

## 5. 폰트 CDN

`style.css` 상단의 Pretendard / Noto Serif KR은 외부 CDN(jsdelivr, Google Fonts)을 사용합니다.
카페24 서버 환경에 따라 외부 리소스 접근이 제한될 수 있으니, 문제가 있으면 폰트 파일을
`theme/gangsan/fonts/`에 직접 다운로드해 `@font-face`로 교체하세요.
