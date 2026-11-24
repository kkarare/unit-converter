# SI-US 엔지니어링 단위변환기

도면과 현장에서 SI 단위와 US 단위를 바로 바꿔 보는 계산기입니다.
길이, 질량, 힘, 압력, 온도, 에너지(토크), 부피, 누설을 다룹니다.

브라우저와 안드로이드 앱이 같은 화면을 씁니다.

- 웹 주소: https://kkarare.github.io/unit-converter/
- 개인정보처리방침: https://kkarare.github.io/unit-converter/privacy.html
- 안드로이드 패키지 이름: `io.github.kkarare.twa`

화면은 이 저장소의 `index.html`입니다. 즐겨찾기와 화면 밝기는 폰 안에만 저장되고, 이름이나 위치 같은 개인정보는 모으지 않습니다.

## 버전 1.0.0

지금 설치되어 있는 앱과 같은 파일입니다. 이 환경에서는 GitHub Release를 만들 수 없어, 설치 파일을 저장소의 `releases` 폴더에 넣어 두었습니다. 태그는 만들지 않았습니다.

- 버전 이름: 1.0.0.0
- versionCode: 1
- 파일: [releases/unit-converter-v1.0.0.apk](releases/unit-converter-v1.0.0.apk)
- 파일 SHA-256: `710f1c2900507a14743af21c5cc338563ccb55bf6690c39843d70261b3ea1ac4`
- 서명 인증서 SHA-256: `67:96:7D:AF:E8:54:A7:69:A9:33:F5:CA:60:0E:89:20:48:CC:E7:D0:20:3E:9A:F1:A8:E5:62:04:A2:81:2E:F9`

v1.0.0은 처음 올린 버전입니다. 여덟 가지 단위를 양쪽으로 바꾸고, 즐겨찾기와 기록, 어두운 화면과 밝은 화면, 오프라인 실행을 넣었습니다. 서명 키(keystore)는 이 저장소에 없습니다. 키 파일은 저장소에 올리지 마세요.

## 앱은 어떻게 만들어졌나

1. 이 저장소의 웹 화면을 GitHub Pages가 https://kkarare.github.io/unit-converter/ 에 올려 둡니다.
2. [PWABuilder](https://www.pwabuilder.com/)가 그 주소를 안드로이드 앱으로 감쌉니다. 방식은 Trusted Web Activity(TWA)입니다.
3. 앱을 켜면 안에 숨은 브라우저가 위 웹 주소를 엽니다. 패키지 이름은 `io.github.kkarare.twa`이고, 앱은 본인 서명 키로 서명되어 있습니다.

그래서 글자, 색, 계산, 배치처럼 화면만 고친 뒤에는 웹을 배포하면 됩니다. 설치 파일(APK)을 다시 만들 필요가 없습니다.

## 화면을 수정한 뒤

1. 이 저장소에서 파일을 고치고, `main` 브랜치에 합칩니다.
2. GitHub Pages가 바뀐 파일을 올릴 때까지 1–2분 기다립니다.
3. 폰에서 앱을 완전히 닫았다가 다시 엽니다. 인터넷에 연결되어 있으면 새 화면이 보입니다.

앱을 다시 만들지 않아도 되는 경우: 화면의 글자, 계산, 색, 여백을 바꾼 경우.

앱을 다시 만들어야 하는 경우: 홈 화면에 보이는 앱 이름, 런처 아이콘, 패키지 이름, 서명 키, 버전 번호를 바꿀 때. PWABuilder에서 **같은 서명 키**로 새 APK를 만듭니다. 키를 바꾸면 폰이 다른 앱으로 여깁니다.

처음 켜질 때 잠깐 보이는 시작 화면 색과, 폰 홈 화면의 아이콘은 APK 안에 들어 있습니다. 그 둘만 웹을 고쳐도 바뀌지 않습니다.

## 주소창 없애기 (Digital Asset Links)

https://kkarare.github.io/.well-known/assetlinks.json 이 없으면, 앱 위에 인터넷 주소창이 남을 수 있습니다.
크롬이 이 파일로 “이 앱이 이 주소의 주인”인지 확인합니다.

이 파일은 **unit-converter 저장소에 넣으면 안 됩니다.** 그 저장소에 넣으면 주소가 `https://kkarare.github.io/unit-converter/.well-known/assetlinks.json` 이 되고, 폰은 그 주소를 보지 않습니다.
파일은 사용자 사이트 저장소 `kkarare.github.io`의 맨 위에 있어야 합니다. 그 저장소는 이 작업에서 만들지 않습니다.

### 순서

1. 브라우저에서 GitHub에 로그인하고, `kkarare.github.io` 저장소를 엽니다. 없다면 그 이름으로 새로 만듭니다. 저장소 이름이 계정 이름 `kkarare`와 같아야 `https://kkarare.github.io/` 로 공개됩니다.
2. **Add file → Create new file**을 누릅니다.
3. 파일 이름 칸에 `.well-known/assetlinks.json` 을 그대로 입력합니다. 슬래시 앞의 `.well-known`이 폴더가 됩니다.
4. 아래 내용을 그대로 붙여 넣습니다.

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "io.github.kkarare.twa",
      "sha256_cert_fingerprints": [
        "67:96:7D:AF:E8:54:A7:69:A9:33:F5:CA:60:0E:89:20:48:CC:E7:D0:20:3E:9A:F1:A8:E5:62:04:A2:81:2E:F9"
      ]
    }
  }
]
```

5. `main` 브랜치에 저장합니다. 저장소 **Settings → Pages**에서 `main` 브랜치의 루트(`/`)를 배포하도록 되어 있는지 확인합니다.
6. 브라우저에서 https://kkarare.github.io/.well-known/assetlinks.json 을 엽니다. 404가 아니고, 위에 붙여 넣은 내용이 보여야 합니다.
7. 폰에서 앱 데이터를 지우거나 앱을 지웠다가 다시 설치합니다. 크롬이 이 파일을 확인하는 데 시간이 걸릴 수 있습니다. 확인이 끝나면 주소창이 사라집니다.

이 파일만 올리는 데는 APK를 다시 만들 필요가 없습니다. 지금 앱은 이미 `https://kkarare.github.io/unit-converter/` 를 열도록 만들어져 있습니다.
