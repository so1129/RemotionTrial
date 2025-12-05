# RemotionTrial

## 概要
Remotionを使ったテキストアニメーションプロジェクト。
Git LFSで大容量素材を管理し、派生物・レンダー・キャッシュは除外する構成。

## 機能
- **テキストアニメーション**: 一文字ずつ飛び出すアニメーション
- **カスタマイズ可能なProps**:
  - テキスト設定（内容、サイズ、色）
  - 背景設定（背景色）
  - アニメーション設定（速度、方向、回転）
- **Google Fonts対応**: Potta Oneフォント使用

## ディレクトリ構造
- `src/`: Remotionソースコード
  - `TextAnimation.tsx`: メインアニメーションコンポーネント
  - `Root.tsx`: コンポジション設定
- `public/`: 静的ファイル
- `assets_raw/`: 生素材（動画・音声・高解像度画像）← **Git LFS管理**
- `assets_derived/`: 編集後の中間ファイル（Git管理外）
- `renders/`: 最終出力ファイル（Git管理外）
- `cache/`: キャッシュ（Git管理外）

## セットアップ
```bash
# 依存関係のインストール
npm install

# LFSファイルの取得（生素材がある場合）
git lfs pull

# Remotion Studioを起動
npm start
```

## 運用ルール
- **100MB超のファイル**は必ずLFS追跡すること（pre-commitフックで自動チェック）
- 派生物やレンダーは `.gitignore` で除外済み
- リモートは二重化：origin（GitHub）/ backup（ローカルbare）

## リモート
- **origin**: GitHub（private）- https://github.com/so1129/RemotionTrial
- **backup**: ~/git-repos/RemotionTrial.git（ローカルバックアップ）

## 技術スタック
- Remotion 4.0
- React 18
- TypeScript 5
- Google Fonts (@remotion/google-fonts)
- Git LFS 3.7

## ライセンス
MIT
