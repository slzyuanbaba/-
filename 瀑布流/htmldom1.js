~(function () {
    //首先导入依赖的方法、、
    const{toJSON,offset,win} = window._utils;


let flow = document.getElementById('flow');
let flowList = flow.getElementsByTagName('li')
flowList = Array.from(flowList)

//请求数据方法
function getImgData(){

const xhr = new XMLHttpRequest();
xhr.open('GET','./data.json',false)
xhr.onreadystatechange =function(){
    if(this.readyState === 4 && /^2\d{2}$/.test(this.status)){

           bindData( toJSON(this.responseText)) 
           console.log( toJSON(this.responseText) )
    }
        
}

xhr.send()
}

//绑定数据
function bindData(data){
  
    data.forEach(item => {
       
       const dom = creata(item) 
   flowList.sort((a,b) =>a.offsetHeight - b.offsetHeight)
   flowList[0].appendChild(dom)

    });



}

//动态创建数据
function creata(item){

    const {src , link,title,height} =item

    const a = document.createElement('a')
    a.href = link
    const img = document.createElement('img');
    img.src = './images/10.gif'
    img.setAttribute('height',height)
    img.setAttribute('img-src',src)
    const p =document.createElement('p')
    p.innerHTML = title
    p.className = 'title'

    a.appendChild(img)
    a.appendChild(p)
  return a
}



//加载更多
function landMore(){

const sTop = win('scrollTop');
const winH = win('clientHeight');
const sHeight = win('scrollHeight')

if(sTop + winH >=sHeight-100){

   getImgData()
}


}

//获取图片  判断图片是否出现在视口
let imgAll = document.getElementsByTagName('img')

function lazyImg(){

 const sTop = win('scrollTop');
 const winH = win('clientHeight')
for(let i = 0;i<imgAll.length;i++){
    let img = imgAll[i]
    if(img.load) continue
    let top = offset(img).top
    let height = img.offsetHeight


if( sTop + winH >= top + height){
    let src = img.getAttribute('img-src')
    let teip = new Image()
    teip.src = src
   
    teip.onload=function(){
        img.src = src
        img.load =true
        teip = null
    }
    teip.onerror=function(){
        console.log('地址不对')
    }
}


}


}


let timer = null
//滚轮滚动事件
window.onscroll =function(){

    timer &&clearInterval(timer)
    timer=setInterval(()=>{
        landMore()
        lazyImg()
    },100)
   
}




getImgData()
lazyImg()

})();

