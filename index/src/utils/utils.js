const formateDate=(time)=>{
    let times=new Date(time)
    return times.getFullYear()+'-'+(times.getMonth()+1)+'-'+times.getDate()+' '+date(times.getHours())+':'+date(times.getMinutes())+':'+date(times.getSeconds())
}
const date=(num)=>{
    return  num>10?num:'0'+num
}
export default formateDate
// http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'