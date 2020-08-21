export function numberSeperator(inpNativeNum = 0) {
    inpNativeNum = inpNativeNum || 0;
    let isLong = false
    let number_p1, number_p2
    let isNeg = Number(inpNativeNum) < 0;
    let inpNativeNumLength = inpNativeNum.length
    if (inpNativeNumLength > 15) {
        isLong = true
        number_p1 = inpNativeNum.slice(0, (inpNativeNumLength) - 15).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        number_p2 = inpNativeNum.slice((inpNativeNumLength) - 15, inpNativeNumLength).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    let nativeNum = Math.abs(Number(inpNativeNum))
    nativeNum = isLong ? number_p1 + "," + number_p2 : nativeNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return isNeg ? `${nativeNum}-` : nativeNum;
}
//------------------------------------------------------------------------------------------------------
export function numberJoiner(num) {
    let number = num != undefined || num != null || num == "" ? (num + "").replace(/,/g, "") : null
    if (!(Number(number)) && number != "") {
        number = "NaN"
    }
    return number
}