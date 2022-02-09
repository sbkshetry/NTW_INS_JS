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
function float2int (value:number) {
    return value | 0;
}
function toWordsTwoDigit(n:number){
    if(n%10>0) return tw[float2int(n/10)-2]+" "+dg[n%10]
    else return tw[float2int(n/10)-2]
}
function toWords(n:number,h=0){
    var words=""
    if(n>0 && n<20) words=l_20_words[n] 
    else if(n>20) words=toWordsTwoDigit(n) 
    if(h>0){
        words = dg[h]+" "+th[0]+" " + words
    }
    return words
}
function validateNumber(str:string){
    if(!isNumeric(str)){
        throw str+" is not a number"
    }
}
function isNumeric(str:any) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }
function validateBigNumber(first:string,str:string){
    if(first.length>18){
        throw str+ " is more than ninety nine shankh. this type of big number is not yet supported as of now."
    }
}
function handleDecimal(str:string){
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

type ReturnTypeItem = {
    Number: string;
    Formated_Number: string;
    NumberInWord: string;
}


export function toWords_INS(s:string):ReturnTypeItem{
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
     if(parseFloat(first)==0){
         fisrtStr=dg[0]
         number_format=first
     }
     else if(parseFloat(first)<1000){
         fisrtStr=toWords(parseFloat(first)%100,float2int(parseFloat(first)/100))
         number_format=first
     }
     else{
        var numberInStr=first.toString().substring(0,first.toString().length-3)
        number_format = first.toString().substring(first.toString().length-3)
        var firstInt=parseInt(number_format)
        if(firstInt>0){
            fisrtStr=toWords(firstInt%100,float2int(firstInt/100))
         }
         var thCounter=1
         for(let thDigit=numberInStr.length;thDigit>0; thDigit=thDigit-2){
            var digitStr=numberInStr.charAt(thDigit-2)+numberInStr.charAt(thDigit-1)
            firstInt=parseInt(digitStr)
             if(firstInt>0){
                fisrtStr=toWords(firstInt) +" "+ th[thCounter] +" "+ fisrtStr
             }
             thCounter++
             number_format=digitStr+","+number_format
        }
     }
     var json ={
        "Number": str, "Formated_Number": number_format + number_format_d, "NumberInWord": fisrtStr.trim() + secondStr.trim()
    }
    return json;    
}
