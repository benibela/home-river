%SCRIPT
var indentationLevel = 0;
var indentations = [0];
var lines = editor.document().textLines();
var result = "";
for (var li=0;li<lines.length;li++) {
var l = lines[li];
if (l.trim() == "") continue;
//if (l == "") break;
var tokenizer = /^( *)(([.] |[^ ])*)(.*)$/;
var token = tokenizer.exec(l);
var newIndentationLevel = token[1].length;
function addit(){ 
//alert(newIndentationLevel + "  "+ token[2])
if (newIndentationLevel > indentations[indentations.length-1])
indentations.push(newIndentationLevel);
else { while (newIndentationLevel < indentations[indentations.length-1]) {
  indentations.pop();
  result += " ";
} if (result != "") result += " ";
}
if (result != "" && newIndentationLevel == indentations[indentations.length-1]) result += " ";
if (token[2] != "") result += token[2];
}
addit();
while (token[2] != "") {
newIndentationLevel += token[2].length;
//alert(token)
token = tokenizer.exec(token[4]);
newIndentationLevel += token[1].length;
if (token[2] != "") addit();
//if (!confirm(token)) return;

}
//alert(newIndentationLevel+token[1]+":"+indentations);

}
//alert(result);
//editor.write(result)
result += "\n";
result = result.replace(/[.]n /g, ".\n");
writeFile("/tmp/test.hs", result)
system("txs:///homespring /tmp/test.hs > txs:///messages");
/*system("txs:///homespring");
	editor.undo();*/