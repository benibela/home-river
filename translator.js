%SCRIPT
var indentationLevel = 0;
var tokenCount = 0;
var indentations = [-1,0];
var indentationTokens = {"0": 0, "-1": 0};
var lines = editor.document().textLines();
var result = "";
var previousTokenCount = 0;
for (var li=0;li<lines.length;li++) {
	var l = lines[li];
	if (l.trim() == "") continue;
	var appendToLastToken =  /[^.][.][>][*]/.test(l);
	if ( appendToLastToken ) 
	  l.remove(".>*")
	 
	//if (l == "") break;
	var tokenizer = /^( *)(([.] |[^ ])*)(.*)$/;
	var token = tokenizer.exec(l);

	var newIndentationLevel = token[1].length;
	if ( !appendToLastToken ) {
	  for (var i=0;i<previousTokenCount-1;i++) result += " ";
	  tokenCount -= previousTokenCount - 1;
	}
	previousTokenCount = 0;

	if (newIndentationLevel > indentations[indentations.length-1]) {
		indentations.push(newIndentationLevel);
		indentationTokens[newIndentationLevel] = tokenCount;	
	} else { 
		while (newIndentationLevel < indentations[indentations.length-1]) {
		  for (var i = indentationTokens[indentations[indentations.length-1]]; 
		           i > indentationTokens[indentations[indentations.length-2]]; i--)
				result += " ";
			indentations.pop();
			tokenCount = indentationTokens[indentations[indentations.length-1]];
		}
  	if (result != "" && newIndentationLevel == indentations[indentations.length-1]) result += " ";
 	}
	if (token[2] != "") { result += " "+token[2]; previousTokenCount++; }

	while (token[2] != "") {
		newIndentationLevel += token[2].length;
		//alert(token)	
		token = tokenizer.exec(token[4]);
		newIndentationLevel += token[1].length;
		if (token[2] != "") { result += " "+ token[2]; previousTokenCount++; }
	//if (!confirm(token)) return;
	
	}
	tokenCount += previousTokenCount;
	//alert(newIndentationLevel+token[1]+":"+indentations);

}
//alert(result);
//editor.write(result)
result = result.trim();
result += "\n";
result = result.replace(/[.]n /g, ".\n");
alert(result.replace(/ /g, " _ "));


writeFile("/tmp/test.hs", result)
system("txs:///homespring /tmp/test.hs | tail -n 100 | column > txs:///messages");
//*/