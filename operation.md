# 画像S3アップロード

## AWS CLI の設定

```
aws configure
```

プロンプトが表示されるので、以下を入力します：

- AWS Access Key ID: IAMユーザーのアクセスキーID
- AWS Secret Access Key: IAMユーザーのシークレットアクセスキー
- Default region name: バケットを作成したリージョン（例: us-east-1）
- Default output format: json（またはtext、table）

成功したか確認。S3バケットの一覧を表示

```
aws s3 ls
```

