# Vivliostyleで学会論文を書く(仮題)

この記事では学会論文をテーマにして、2つの観点から切り込んでみます:

- Vivliostyleで論文をとなれば、気になるあんなレイアウトやこんな配置もできます。
- HTMLをソースにすることで、こんな世界が広がるかもしれません。
- データの流通

## 気になるあんなレイアウトやこんな配置

「あんなレイアウトやこんな配置もできます」は、次のような内容を考えてます。macnekoさんの「DTPあるあるのCSS組版的解決法」とかぶったものは止めるので、macnekoさんは気にせず書いてください。どれも本「Web技術で「本」が作れるCSS組版 Vivliostyle入門」に書いてあることですが:

### 脚注

akabekoさんがMakedownからHTMLへの変換にとどめておいてくださったものを、その後どのように配置されるかまでを書きます。

### 参考文献や図表の番号を本文から参照する。


### 図表を上詰めで配置する

段抜きのものも含めて。

### 段組みでコンテンツを順に埋める(column-fill: auto;)

かつて、ブラウザで段組みはできるが、均等分割(column-fill: balance;)しかできなかった頃がありました。

### 英文タイトルや所属住所などを左段の下に詰めて配置する。

### 見出しをrun-inにする。

### 論文番号を柱(ランニングヘッド)に表示する。

## HTMLで広がる文章執筆

「HTMLで、こんな世界が」は、次のような内容を考えてます。

- CSSの多彩なレイアウトを編集画面で活かしてみましょう、フロント開発の皆さんは、自分のための編集環境ならすぐにできますよね。例えば…

### 高精細で大きなディスプレイいっぱいに、論文を多段組で敷き詰めて

広い範囲を見ながら執筆できます。ディスプレイを回転して縦長にして、原稿の広い範囲を表示して編集する人っていますよね。プログラムのコーディングでも。

### ブロックとインラインを切り替えて編集できます。

抄録abstractなど、1つの段落に見えて、中身に構造を要求されることがあります(実際に見出しを付けた[structured abstract](https://en.wikipedia.org/wiki/Abstract_(summary)#Structure)もあります)。その構造に見出しを付けて各要素をブロック表示で編集したり、各要素をインラインにして全体で1つのブロックとして編集したりと切り替えられます。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="qBGdjXM" data-pen-title="Abstract" data-user="yamahige" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/yamahige/pen/qBGdjXM">
  Abstract</a> by Taku Yamaguchi (<a href="https://codepen.io/yamahige">@yamahige</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 遠く離れた部分を近くに配置して、見比べながら編集できます。

ワープロの画面分割よりも多彩に表示できます。

### ブラウザの開発用コンソールを使うと、原稿の一括編集をDOMの操作で実現できますよね。

テキストファイルを正規表現で編集するのとは、違う便利さがあります。例えば、著者の氏名と所属の書き方は、意味的な内容は同じでもフォーマットが学会によって異なります(LaTeXを想定)。こういった一括変換を、DOMの操作で実現できます。

```HTML
<span class="pub-id" pub-id-type="doi">10.NNNN/XXXX.NN.NNN</span>
```
を、一括で
```HTML
<a href="https://doi.org/10.NNNN/XXXX.NN.NNN" class="pub-id" pub-id-type="doi">10.NNNN/XXXX.NN.NNN</a>
```
に変換してみましょう

## データの流通

これについては機会があれば、別途、考えてみたいと思います。次のような内容です。

- PDFへのフォントの埋め込み、MS明朝が求められることも、Macではどうする？
- 最初の投稿はPDFでも、掲載決定(accept)後にWordやLaTeXでの入稿を求められることもある。

これらについては、
- 一個人としては、HTML -> LaTeX変換ができたり、マクロを含むWordテンプレートへの流し込みができたりすると嬉しい。
- 流通全体としては、**何か**を共有することで変換の手間を削減できるとよいですね。電子版の最終的な行き先がJ-STAGEならば、JATS[全文XML利用者向けマニュアル 全文XML作成手順書(JATS1.1版)](https://www.jstage.jst.go.jp/static/files/ja/zenbun-xml-jats1_1-manual.pdf)の要素や属性を原稿HTMLが想定するのがよいかも。


