[English](./README.md) | **日本語**

<div align="center">
  <img src="./public/logo.png" alt="ホイアン小教区 ロゴ" width="84" height="84" />
  <h1>Giáo xứ Hội An（ホイアン小教区 ポータル）</h1>
  <p>ベトナム・ダナン教区に属する歴史あるカトリック教会「ホイアン小教区」の公式司牧ポータル、リアルタイム典礼ミサ計算エンジン、および記事管理ワークスペースです。</p>
  <p>
    <a href="#概要">概要</a> ·
    <a href="#主な機能">主な機能</a> ·
    <a href="#技術スタック">技術スタック</a> ·
    <a href="#技術的な工夫設計判断">技術的な工夫</a> ·
    <a href="#アーキテクチャ">アーキテクチャ</a> ·
    <a href="#セットアップ">セットアップ</a>
  </p>
</div>

<p align="center">
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16.3.1-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img alt="React 19" src="https://img.shields.io/badge/React-19.2.8-23272f?style=flat-square&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript 5" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose_9.9-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img alt="Node.js 24" src="https://img.shields.io/badge/Node.js-24.x-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
</p>

---

## 概要

**Giáo xứ Hội An（ホイアン小教区ポータル）** は、ユネスコ世界文化遺産都市ホイアンに位置するカトリック教会（ダナン教区、グエン・チュオン・トー通り106番地）の公式Webポータルです。400年以上にわたる宣教とベトナム語国語表記（クオック・グー）の黎明期の歴史を背景に、地域信徒、巡礼者、国内外の観光客、在外信徒へ向けて正確な司牧情報と典礼案内を提供しています。

本プロジェクトは以下の3つの役割を柱として設計されています：
1. **司牧・典礼情報ゲートウェイ:** ミサ時間、教会暦、緊急司牧連絡先、秘跡の手続き案内を即座に確認できます。
2. **信仰共同体の情報発信ハブ:** 教理・福音の黙想、青年会・各種信心会の活動、寄付の透明性レポートなどを発信します。
3. **信仰遺産のデジタルアーカイブ:** 東西文化交流とベトナム宣教の歴史的資料を整理し、伝承します。

---

## 開発背景・課題

教区や教会の情報は従来、SNSや会報、掲示板などに分散しやすく、以下の課題が生じていました：
- **ミサ時間の検索難度:** 祝日や教会暦時期による変動が把握しづらい。
- **秘跡手続きの不透明さ:** 洗礼・婚姻・病者の塗油などの必要書類や窓口が体系化されていない。
- **外国人訪問者への対応:** 国際観光都市でありながら、英語ミサ（日曜日16:00）や見学マナーの情報が届きにくい。
- **管理側の運用負荷:** 技術知識のない広報担当者でも安全に記事を作成・公開できる環境が必要とされていました。

---

## 主な機能

- **リアルタイム次期ミサ計算エンジン:** 週ごとの典礼スケジュールと閲覧者の現地時間を比較し、次に参加可能なミサまでの差分時間を動的に算出・表示します。
- **外国人・訪問者向けガイダンス:** 日曜日の英語ミサ（16:00）や教会内での見学マナー、アクセス情報を明確に提示します。
- **7つの秘跡の総合案内:** 洗礼・堅信・聖体・ゆるし・病者の塗油・叙階・婚姻の受領条件、必要書類、担当窓口を標準化して案内します。
- **管理画面・記事ワークスペース (`/admin/bai-viet`):** NextAuth認証に基づき、記事の下書き、編集、公開、削除、タグ管理を行う専用ダッシュボードです。
- **多条件記事フィルタリング:** 公開状態（公開・下書き・アーカイブ）、種別（ニュース・黙想）、カテゴリ、キーワード検索を高速に処理します。
- **ベトナム語声調対応スラッグ生成エンジン:** ベトナム語の複雑な声調記号を正しく処理し、RFC 3986に準拠したクリーンなパーマリンクを自動生成します。
- **新聞調のエディトリアルUI / アクセシビリティ:** ホイアンの文化景観に調和した新聞調タイポグラフィを採用し、高齢者でも読みやすいコントラスト設計および `prefers-reduced-motion` に対応しています。

---

## 技術スタック

| 分類 | 技術 | バージョン | 採用理由・プロジェクトでの役割 |
| --- | --- | --- | --- |
| **フレームワーク** | [Next.js](https://nextjs.org/) (App Router) | 16.3.1 | Server Componentsによる初期ロード最適化、ストリーミングSSR、Route Handlers |
| **UIライブラリ** | [React](https://react.dev/) | 19.2.8 | Server Actionsによる安全なデータ更新、最新フックプリミティブの活用 |
| **開発言語** | [TypeScript](https://www.typescriptlang.org/) | 5.x | DTO、DBスキーマ、UIコンポーネント全体における厳格な型安全性の確保 |
| **スタイリング** | [Tailwind CSS](https://tailwindcss.com/) | 4.x | 新聞調デザインシステムの構築、レスポンシブグリッド、アクセシビリティ対応 |
| **データベース・ODM** | [MongoDB](https://www.mongodb.com/) / [Mongoose](https://mongoosejs.com/) | 9.9.3 | 記事データの永続化、接続プーリングのキャッシュ化、leanクエリによる省メモリ化 |
| **認証** | [NextAuth.js](https://authjs.dev/) (Auth.js) | 5.0.0-beta.32 | JWTセッション管理、Credentialsプロバイダ、bcryptパスワードハッシュ照合 |
| **スキーマバリデーション** | [Zod](https://zod.dev/) | 4.4.3 | ログイン資格情報、記事作成フォーム入力の実行時型検証 |
| **コンテンツ処理** | `next-mdx-remote` & `gray-matter` | 6.0.0 / 4.0.3 | マークダウン／MDX記事およびFrontmatter解析パイプライン |
| **アイコン** | [Lucide React](https://lucide.dev/) | 1.31.0 | 軽量かつセマンティックなアイコンセット |
| **テスト・検証** | Node.js Test Assertions (`tsx`) | Native / 4.23 | 外部テストフレームワークに依存しない高速なアサーションスクリプト |

---

## 技術的な工夫・設計判断

### 1. ハイドレーション不整合を防ぐリアルタイム典礼ミサ計算エンジン

**課題**  
ユーザーがアクセスした瞬間、次に開催されるミサ（例:「本日 18:00」「明日 05:00」）を即座に知らせる必要があります。しかし、サーバーサイドで現在時刻を基準に相対時間を計算すると、クライアント環境との時刻ズレやタイムゾーン差異によりハイドレーションエラー（Hydration Mismatch）が発生します。

**対応**  
平日の朝夕ミサ、土曜日の主日先出しミサ、日曜日の多言語ミサを含む週次マトリクスを計算する純粋関数エンジン（`src/lib/data/gio-le.ts`）を作成しました。UIコンポーネント（`src/components/blocks/next-mass-badge.tsx`）ではマウント完了前は静的メタデータをフォールバック表示し、マウント後にクライアント側の時計で差分をアクティブ化する2段階ハイドレーション構造を採用しました。

**結果**  
レイアウトシフトやハイドレーション警告を起こすことなく、常に正確な次回ミサ情報とカウントダウンを表示できるようになりました。

```typescript
// src/lib/data/gio-le.ts より抜粋: 週次ミサ枠の相対差分計算
export function getNextMass(date: Date = new Date()): NextMassResult {
  const currentDay = date.getDay();
  const currentMinutes = date.getHours() * 60 + date.getMinutes();
  let bestSlot: MassSlot | null = null;
  let minDiff = Infinity;

  for (const slot of ALL_WEEKLY_MASSES) {
    let dayDiff = slot.dayOfWeek - currentDay;
    let minuteDiff = dayDiff * 24 * 60 + (slot.minutes - currentMinutes);
    if (minuteDiff <= 0) minuteDiff += 7 * 24 * 60; // 翌週へループ

    if (minuteDiff < minDiff) {
      minDiff = minuteDiff;
      bestSlot = slot;
    }
  }
  // スロット情報、相対日付ラベル、および分単位の差分を返却
}
```

---

### 2. タグ付き再検証（Tagged Revalidation）を備えた多層キャッシュ構造

**課題**  
教会の告知や福音黙想記事は閲覧頻度（Read）が非常に高い一方、更新頻度（Write）は限定的です。リクエストのたびにMongoDB Atlasへ直接クエリを発行すると、接続プールの枯渇や応答速度の低下を招きます。

**対応**  
MongooseのleanクエリをNext.jsの `unstable_cache` でラップし、記事一覧（`publicFields`）と記事詳細（`detailFields`）で取得フィールドを最適化しました（`src/lib/articles.ts`）。また、`articles`、`articles:${locale}`、`article:${locale}:${kind}:${slug}` などの階層化されたキャッシュタグを設定し、管理画面で記事が保存・更新・削除された際に `revalidateTag` で対象タグのみをピンポイントで無効化しています。

**結果**  
閲覧時はキャッシュからサブミリ秒で高速に応答しつつ、管理者による更新内容は即座に公開ページへ反映される仕組みを構築しました。

---

### 3. 多層防御（Defense-in-Depth）による管理者保護

**課題**  
宗教団体の公式サイトとして、コンテンツの改ざんや不正投稿は厳格に防止しなければなりません。エッジミドルウェアのみに依存するとルーティング定義漏れのリスクがあり、ページコンポーネント内のみでガードするとServer Actionsが直接叩かれた際に無防備となる懸念がありました。

**対応**  
エッジとサーバーの2箇所で二重検証を実施しました：
1. **エッジプロキシ (`src/proxy.ts`):** ログイン画面を除く `/admin/*` へのリクエストをルーティング段階で検知し、未認証セッションを即座にリダイレクト。
2. **Server Actionガード (`src/lib/auth-guard.ts`):** データ作成・編集・削除を行うすべてのServer Action内部で `requireAdmin()` を呼び出し、サーバーサイドでセッションと権限を再検証。不正アクセス時は即時例外を送出。

**結果**  
万一URLルーティング設定に不備があった場合でも、サーバーアクション層での不正データ変更を完全に遮断できる堅牢性を確保しました。

---

### 4. ベトナム語声調を考慮したURLスラッグエンジン

**課題**  
ベトナム語には多数の声調記号（hỏi, ngã, nặng, sắc, huyền）および特殊文字（đ, Đ）が存在します。一般的な英数字用スラッグ変換器を通すと文字化けしたり意味をなさない文字列になり、SEOや可読性に悪影響を与えていました。

**対応**  
Unicode NFD正規化により文字と結合発音記号を分解し、ベトナム語特有の音素置換（`đ/Đ` → `d`）を行った上で記号を除去し、最長120文字で制限する専用スラッグ生成モジュール（`src/lib/article-slug.ts`）を実装しました。

**結果**  
教会広報担当者がベトナム語でタイトルを入力するだけで、意味が通じる整然としたパーマリンクが安全かつ自動的に生成されるようになりました。

---

## アーキテクチャ

```mermaid
flowchart TD
    Client[ブラウザ / クライアント端末] --> Ingress[Next.js エッジプロキシ / Middleware]
    
    subgraph Edge Layer
        Ingress -->|公開リクエスト| LocaleRewrite[ロケール書き換え /vi]
        Ingress -->|管理画面アクセス| EdgeAuthCheck{認証済み?}
        EdgeAuthCheck -->|未認証| LoginRedirect[/admin/dang-nhap へリダイレクト]
        EdgeAuthCheck -->|認証済| AdminWorkspace[/admin/bai-viet 管理画面]
    end

    subgraph Server Layer [Next.js App Router]
        LocaleRewrite --> PublicPages[公開 Server Components]
        AdminWorkspace --> AdminActions[管理者 Server Actions]
        
        PublicPages --> MassEngine[典礼・次回ミサ計算エンジン]
        PublicPages --> CachedStore[Next.js unstable_cache]
        AdminActions --> AuthGuard{requireAdmin 検査}
        AuthGuard -->|更新 & キャッシュ失効| MongooseDriver[Mongoose ORM]
        CachedStore -->|キャッシュミス時| MongooseDriver
    end

    subgraph Data Layer
        MongooseDriver --> ConnPool[(接続プールキャッシュ)]
        ConnPool --> MongoDBAtlas[(MongoDB Atlas)]
        MassEngine --> StaticData[(典礼静的マトリクス)]
    end
```

---

## ディレクトリ構成

```text
giaoxuhoian2/
├── scripts/                      # アサーションベースの自動検証スクリプト
│   ├── check-admin-article-filter.ts
│   ├── check-admin-article-slug.ts
│   └── check-public-navigation.ts
├── src/
│   ├── app/                      # Next.js App Router構成
│   │   ├── [locale]/             # 公開ローカライズページ (vi)
│   │   │   ├── bi-tich/          # 7つの秘跡案内と詳細ページ
│   │   │   ├── cong-doan/        # 小教区共同体・各種活動組織
│   │   │   ├── dong-hanh/        # 寄付・支援および透明性指針
│   │   │   ├── giao-xu/          # 教会の歴史・タイムライン
│   │   │   ├── lien-he/          # 所在地・司牧事務室連絡先
│   │   │   ├── loi-chua/         # 福音朗読・説教・黙想
│   │   │   ├── phung-vu/         # ミサ時間表・聖体礼拝案内
│   │   │   ├── tin-tuc/          # 教会ニュース・活動報告
│   │   │   └── page.tsx          # エディトリアル・トップページ
│   │   ├── admin/                # 保護された管理ワークスペース
│   │   │   ├── bai-viet/         # 記事管理・新規作成・編集
│   │   │   └── dang-nhap/        # ログイン画面
│   │   ├── api/                  # APIルートハンドラー
│   │   └── globals.css           # Tailwind CSS v4 デザイン設定
│   ├── components/
│   │   ├── admin/                # 管理画面ナビゲーション・フォーム
│   │   ├── blocks/               # NextMassBadge、記事カード、各種フォーム
│   │   ├── layout/               # 新聞調ヘッダー、ナビ、フッター
│   │   └── ui/                   # 共通UI（ボタン、バッジ、入力欄等）
│   ├── lib/
│   │   ├── data/                 # 典礼データ (gio-le.ts)・教会定数
│   │   ├── i18n/                 # 辞書定義およびルーティング補足
│   │   ├── admin-article-filter.ts # 記事フィルタリングロジック
│   │   ├── article-slug.ts       # ベトナム語スラッグ生成エンジン
│   │   ├── articles.ts           # キャッシュ付きデータアクセス層
│   │   ├── auth-guard.ts         # サーバーサイド認可ガード
│   │   └── mongodb.ts            # Mongoose接続プール管理
│   ├── models/                   # Mongooseモデルスキーマ (article.ts)
│   └── proxy.ts                  # エッジミドルウェア認証プロキシ
├── auth.ts                       # NextAuth設定・認証プロバイダ定義
├── package.json
└── tsconfig.json
```

---

## 検証・テスト

本リポジトリでは重厚なテストフレームワークを追加せず、Node.js標準のアサーション（`assert`）を用いた軽量かつ高速な検証スクリプトを採用しています：

```bash
# 管理画面の記事フィルタリングロジックを検証
npm run check:admin-filter

# ベトナム語スラッグ生成エンジンの正常動作を検証
npm run check:admin-slug

# 公開ルーティング正規化およびアクティブリンク判定を検証
node --conditions=react-server --import tsx scripts/check-public-navigation.ts

# TypeScript 型チェック
npm run typecheck
```

---

## セットアップ

### 必要条件

- **Node.js:** `24.x` (`package.json` の `engines` に指定)
- **パッケージマネージャ:** `npm`
- **データベース:** MongoDB インスタンスまたは MongoDB Atlas クラスタ

### 手順

1. リポジトリをクローンします：
   ```bash
   git clone https://github.com/epauengi/giaoxuhoian.git
   cd giaoxuhoian
   ```

2. 依存パッケージをインストールします：
   ```bash
   npm install
   ```

3. 環境変数を設定します：
   ```bash
   cp .env.example .env.local
   ```
   `.env.local` を開き、必要な接続情報と管理者パスワードハッシュを設定します（[環境変数](#環境変数) 参照）。

4. 開発サーバーを起動します：
   ```bash
   npm run dev
   ```
   ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

5. 本番用ビルドと起動：
   ```bash
   npm run build
   npm run start
   ```

---

## 環境変数

`.env.example` に定義されている環境変数一覧：

| 変数名 | 必須 | 説明 |
| --- | --- | --- |
| `MONGODB_URI` | ○ | MongoDB Atlas サーバー接続用URI（接続プーリング設定を含む） |
| `AUTH_SECRET` | ○ | NextAuth が JWT トークンの署名に使用する32バイト暗号秘密鍵 |
| `ADMIN_USERNAME` | ○ | 記事管理ワークスペース用 管理者ユーザー名 |
| `ADMIN_PASSWORD_HASH` | ○ | 管理者パスワードに対応する bcrypt ハッシュ値 |

*※注意: 機密情報が含まれる `.env` や `.env.local` はバージョン管理に含めないでください。*

---

## 今後の展開

教区のプロダクトロードマップに基づき、以下の機能拡張が予定されています：
- [ ] **境内インタラクティブマップ:** 歴史ある聖堂、ルルドの洞窟、境内史跡の案内マップ。
- [ ] **英語圏向けローカライズ拡充:** 外国人観光客・巡礼者に特化した英語ページの独立展開。
- [ ] **オンライン教理・各種講座登録:** カテキズム受講および秘跡準備のWeb受付フロー。
- [ ] **音声黙想・ポッドキャスト:** 司祭による日々の説教や聖歌のオーディオストリーミング配信。

---

## ライセンス

非公開リポジトリ（Private）。著作権は **Giáo xứ Hội An**（ダナン教区）に帰属します。
