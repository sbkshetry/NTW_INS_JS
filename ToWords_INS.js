// Indian Numbering System

var th =["hundred","thousand","lakh","crore","arab","kharab","nil","padma","shankh"]
var dg = ['zero','one','two','three','four',
'five','six','seven','eight','nine']; 
var tn =
['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen',
'seventeen','eighteen','nineteen']

var tw = ['twenty','thirty','forty','fifty',
'sixty','seventy','eighty','ninety']

var l_20_words=dg.concat(tn)
function toWordsTwoDigit(n){
    if(n%10>0) return tw[parseInt(n/10)-2]+" "+dg[n%10]
    else return tw[parseInt(n/10)-2]
}
function toWords(n,h=0){
    var words=""
    if(n>0 && n<20) words=l_20_words[n] 
    else if(n>20) words=toWordsTwoDigit(n) 
    if(h>0){
        words = dg[h]+" "+th[0]+" " + words
    }
    return words
}
function validateNumber(str){
    if(!isNumeric(str)){
        throw str+" is not a number"
    }
}
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }
function validateBigNumber(first,str){
    if(first.toString().length>18){
        throw str+ " is more than ninety nine shankh. this type of big number is not yet supported as of now."
    }
}
function handleDecimal(str){
    var second=""
    var number_format_d=""
    var first=str
    var secondStr=""
    if(str.indexOf(".")>-1){
        first=str.split(".")[0]
        second=str.split(".")[1].toString()
        number_format_d="."+second
    }
    if(second.length>0){
       secondStr="."
        for(var i=0;i<second.length;i++){
            secondStr+=dg[parseInt(second.charAt(i))]+" "
        }
    }
    return {"first":first,"number_format_d":number_format_d,"secondStr":secondStr}
}
function toWords_INS(s){
    var str = s.toString(); 
    str = str.replace(/[\, ]/g,'');
    var number_format=""
    var number_format_d=""
    validateNumber(str)
    var fisrtStr=""
    var d=handleDecimal(str)
    var first=d.first
    var secondStr=d.secondStr
    var number_format_d=d.number_format_d
    validateBigNumber(first,str)
     if(first==0){
         fisrtStr=dg[0]
         number_format=first
     }
     else if(first<1000){
         fisrtStr=toWords(first%100,parseInt(first/100))
         number_format=first
     }
     else{
         var numberInStr=first.toString().substring(0,first.toString().length-3)
         number_format = first.toString().substring(first.toString().length-3)
         first=parseInt(number_format)
        if(first>0){
            fisrtStr=toWords(first%100,parseInt(first/100))
         }
         var thCounter=1
         for(let thDigit=numberInStr.length;thDigit>0; thDigit=thDigit-2){
            var digitStr=numberInStr.charAt(thDigit-2)+numberInStr.charAt(thDigit-1)
             first=parseInt(digitStr)
             if(first>0){
                fisrtStr=toWords(first) +" "+ th[thCounter] +" "+ fisrtStr
             }
             thCounter++
             number_format=digitStr+","+number_format
        }
     }

     return {"Number":str,"Formated_Number":number_format+number_format_d,"NumberInWord": fisrtStr.trimEnd()+secondStr}
    
}
/*console.log(toWords_INS("123.912312"))
console.log(toWords_INS("20"))
console.log(toWords_INS("21"))
console.log(toWords_INS("99"))
console.log(toWords_INS("0.001"))
console.log(toWords_INS("10.001"))
console.log(toWords_INS("17"))
console.log(toWords_INS("917"))
console.log(toWords_INS("1000"))
console.log(toWords_INS("991191"))
console.log(toWords_INS("9911919989810100"))
console.log(toWords_INS("10300805007000001"))
console.log(toWords_INS("100000000000000100"))
console.log(toWords_INS("100000000000000000"))
console.log(toWords_INS("10000000000000000010avc"))
*/