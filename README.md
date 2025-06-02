# TeamBase AI - 業務効率化×AI

## 概要
TeamBaseは、マーケティング事業者向けの案件一元管理AIツールです。AIによる業務効率化を実現し、案件・進捗・人材管理をまるごと自動化します。

## 特徴
- 🤖 **AIによる自動最適化**: 案件・タスク・人材の状況を自動で分析し、最適な配分を提案
- 👁️ **リアルタイム進捗可視化**: 全案件の進捗・課題を一目で把握
- 👥 **人材リソース最適化**: メンバーの稼働状況をAIが管理し、無駄なくリソースを活用

## 実績
- 📈 売上向上率：**3倍**
- 📊 案件獲得数：**2倍**  
- ⚡ 業務効率化：**50%**

## デモ
ランディングページ: [https://teambase-ai.netlify.app](局所サーバーで確認可能)

## プロジェクト構成
```
TeamBase AI/
├── index.html          # メインのランディングページ
├── styles.css          # スタイルシート（3色カラースキーム）
├── script.js           # JavaScript（アニメーション・フォーム処理）
├── Code.gs            # Google Apps Script（フォーム送信処理）
├── images/            # 画像ファイル
│   ├── teambase_todo_banner.png
│   ├── addnessbanner.png
│   ├── logoimage.jpg
│   └── pattern.svg
└── README.md          # このファイル
```

## 技術スタック
- **フロントエンド**: HTML5, CSS3, JavaScript (ES6+)
- **アニメーション**: CSS Transitions, Intersection Observer API
- **フォーム処理**: Google Apps Script
- **デザイン**: レスポンシブデザイン、モダンUI/UX
- **アイコン**: Font Awesome 6.0

## カラーパレット
- **ベースカラー**: ネイビー (`#1B2B44`)
- **差し色**: 薄い赤 (`#FF6B6B`)
- **CTAカラー**: 鮮やかな青 (`#4A90E2`)

## ローカル開発環境のセットアップ

### 前提条件
- Python 3.x がインストールされていること

### サーバー起動
```bash
# プロジェクトディレクトリに移動
cd TeamBase\ LP2

# HTTPサーバーを起動
python3 -m http.server 8080
```

ブラウザで `http://localhost:8080` にアクセスしてページを確認できます。

## フォーム機能
- Google Apps Scriptと連携したコンタクトフォーム
- モニター応募者の情報を自動でスプレッドシートに保存
- 送信後、自動でサンクスページへリダイレクト

## レスポンシブ対応
- デスクトップ、タブレット、スマートフォンに最適化
- ブレークポイント: 900px, 600px
- モバイルファーストアプローチ

## SEO対策
- セマンティックHTML構造
- メタタグ最適化
- 適切な見出し階層
- 高速読み込み最適化

## ブラウザサポート
- Chrome (推奨)
- Firefox
- Safari
- Edge

## ライセンス
© 2024 TeamBase. All rights reserved.

## 開発者
[addness-info-osaka](https://github.com/addness-info-osaka)

## お問い合わせ
モニター応募やお問い合わせは、ランディングページのフォームからお気軽にご連絡ください。 