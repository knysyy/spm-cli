# spm-cli
Selenium-side-runner Project Management Cli

selenium-side-runnerのプロジェクトファイル管理のためのユーティリティツール

## メモ
store commandひな形
```json
{
    "id": "uuid4",
    "comment": "",
    "command": "store",
    "target": "value",
    "targets": [],
    "value": "variable Name"
}
```

## 設定ファイル：フォルダー構成
- data
    - テストに使用する変数宣言用のテンプレートファイル(.json)

- main
    - 処理内容用のテンプレートファイル(.json)


## commandの説明
```
- extract <type>
シナリオ内のテストデータを抽出する。
シナリオ内の処理を抽出する。

- assign
変数にデータを入力しファイルを出力する。

- merge
テストデータと処理のマージファイルを出力する。

- replace <type>
ファイルのidを新しいidに書き換える。

-- generate
入力内容からstore処理を生成しファイルを出力する。
```

## option
```
- type
    data：テストデータを変数に宣言する部分
    main：処理の部分

```

## .sideファイルの作成ルール
```json
{
    "id": "<uui4>",
    "comment": "data",
    "command": "",
    "target": "",
    "targets": [],
    "value": ""
}
# 使用するデータを変数に格納する。(data)
{
    "id": "<uuid4>",
    "comment": "",
    "command": "store",
    "target": "<value>",
    "targets": [],
    "value": "<variable name>"
}
.
.
{
    "id": "<uuid4>",
    "comment": "main",
    "command": "",
    "target": "",
    "targets": [],
    "value": ""
}
# メインの処理をこれ以下に記載していく。(main)
```

## プロジェクトファイルの構成
```yml
id:
version:
name:
url:
tests:
    id:
    name:
    command:
        id:
        comment:
        command:
        target:
        targets:
        value:
suites:
    id:
    name:
    persistSession:
    parallel:
    timeout:
    tests:
urls:
plugins:
```
