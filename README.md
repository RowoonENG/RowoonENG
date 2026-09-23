# 로운이엔지 홈페이지 — GitHub / Vercel 프로젝트

기존 로고, AI 배너, 5개 탭, 애니메이션, 반응형 화면을 포함하는 HTML/CSS/JavaScript 정적 프로젝트입니다. Node.js 22 이상을 사용합니다. 외부 npm 패키지는 필요 없습니다. Tailwind 브라우저 CDN 호출을 제거하고 필요한 기본 스타일을 로컬 CSS에 포함했습니다.

## 로컬 실행

압축을 풀고 package.json이 있는 폴더에서 실행합니다.

```bash
npm ci
npm run check
npm run dev
```

http://localhost:3000 접속. 수정 후 서버를 종료하고 `npm run dev`를 다시 실행합니다. 자동 새로고침은 없습니다.

배포용 생성: `npm run build`. 생성된 파일 확인: `npm run preview`.

## 파일 구조

| 경로 | 역할 |
|---|---|
| src/index.html | 전체 콘텐츠 |
| src/styles.css | 디자인·반응형 스타일 |
| src/main.js | 탭·애니메이션·문의 전송·지도 |
| src/config.js | 카카오 JavaScript 공개 키 |
| public/assets/rowoon-eng-logo.png | 회사 로고 |
| public/assets/hydrogen-engineers-hero.webp | AI 생성 홈 배너 |
| public/assets/favicon.png | 브라우저 탭용 회사 로고 심벌 |
| scripts/build.mjs | dist 생성 |
| scripts/serve.mjs | 로컬 서버 |
| package.json / package-lock.json | 실행 설정 |
| vercel.json | Vercel 배포 설정 |
| .gitignore | 빌드 생성물·비밀정보 제외 |

수정은 src 및 public에서 하고 dist는 직접 수정하지 않습니다. 주소는 /#home, /#about, /#business, /#projects, /#contact 방식입니다.

## 투명 로고와 브라우저 탭 아이콘

회사 로고는 원본 PNG의 알파 투명도를 보존합니다. 브라우저 탭에는 원본 로고의 RW 심벌을 투명 배경 PNG로 사용합니다. 배포 뒤 예전 검은 로고가 캐시에 남아 보이면 강력 새로고침(Windows: Ctrl+F5)을 하세요.

## GitHub 업로드

이 프로젝트는 RowoonENG/RowoonENG 저장소에 업로드되어 있습니다. 로컬 복사본 변경분을 반영할 때 다음 명령을 사용합니다:

```bash
git init
git add .
git commit -m "Initial Rowoon ENG website"
git branch -M main
git remote add origin https://github.com/RowoonENG/RowoonENG.git
git push -u origin main
```

GitHub Desktop으로 이 폴더를 저장소로 생성한 뒤 Publish repository를 선택해도 됩니다. ZIP 자체가 아니라 압축을 푼 내용을 업로드하세요.

## Vercel 배포

1. Vercel 새 프로젝트에서 GitHub 저장소를 Import합니다.
2. Root Directory를 package.json이 있는 폴더로 지정합니다. 저장소 루트에 내용을 넣었다면 기본값을 사용합니다.
3. Framework Preset: **Other**.
4. Install Command: `npm ci`, Build Command: `npm run build`, Output Directory: `dist`. vercel.json에 포함되어 있습니다.
5. Node.js 22 이상을 선택하고 Deploy합니다.
6. GitHub에 변경사항을 push하면 연결된 Vercel에서 자동 재배포됩니다.

공식 안내: https://vercel.com/docs/project-configuration/vercel-json

GitHub 계정 연결 및 Vercel 실제 배포는 이 ZIP에 포함되지 않습니다. 기존 Sites 홈페이지도 변경하지 않았습니다.

## rweng.net 연결

Vercel의 도메인 설정에서 rweng.net 및 필요시 www.rweng.net을 추가하고, 화면에 표시되는 DNS 값을 도메인 관리업체에서 적용합니다. Google Workspace 메일에 쓰이는 MX·SPF·DKIM·DMARC 레코드는 유지하세요. 도메인이 자동 연결되는 것은 아닙니다.

## 문의 폼과 지도

문의 폼은 FormSubmit AJAX를 이용해 `sales@rweng.net`으로 직접 전달합니다. FormSubmit에서 수신 주소를 처음 사용할 때 소유자 확인 메일을 보낼 수 있으니 해당 메일에서 확인을 완료해야 접수가 활성화됩니다. 입력한 연락 정보와 문의 내용은 전송 처리를 위해 FormSubmit 서비스로 전달됩니다.

문의 위치는 네이버 지도 검색 화면을 삽입합니다. Kakao Developers의 브라우저용 JavaScript 키를 `src/config.js`에 설정하고 서비스 도메인을 등록하면 주소 검색에 성공한 경우 카카오 지도가 우선 표시됩니다. 키가 없거나 주소 검색이 실패하면 네이버 지도가 유지됩니다. 서버 비밀키는 넣지 마세요.

## 현재 기능과 남은 자료

- 문의 폼은 FormSubmit을 통해 sales@rweng.net으로 전달됩니다. 해당 서비스의 최초 수신 확인이 필요할 수 있습니다.
- 사업분야 사진, 실적 및 파트너 로고는 준비 중 영역입니다.
- 배너는 AI 생성 이미지이며 실제 시공 현장 또는 인증 증빙이 아닙니다.
- 회사소개 원문과 동작 줄이기 설정 대응을 유지합니다.
- 외부 웹 연결은 FormSubmit 문의 전달 및 지도 서비스에 필요합니다.
