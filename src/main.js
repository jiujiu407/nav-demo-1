
const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
   { logo:'A', url:'https://www.acfun.cn'},
   {logo:'B',url:'https://www.bilibili.com'}
];
const simplifyUrl = (url)=>{
   // replace() 方法用于在字符串中用一些字符替换另一些字符
   return url.replace('https://','').replace('http://','')
   .replace('www.','')
   // 删除/开头的内容
   .replace('/\/.*/','')
}
const render = ()=>{
   $siteList.find('li:not(.last)').remove()
   hashMap.forEach((node,index)=>{
      const $li =$(`<li>
           <div class="site">
           <div class="logo">${node.logo}</div>
           <div class="link">${simplifyUrl(node.url)}</div>
           <div class="close"><svg class="icon">
           <use xlink:href="#icon-searchclose"></use>
       </svg></div>
           </div>
              </li>`).insertBefore($lastLi)
              $li.on('click',()=>{
                 window.open(node.url)
              })
              $li.on('click','.close',(e)=>{e.stopPropagation()
               console.log(index)
              hashMap.splice(index,1)
              render()
            })
   })
}
render()
$('.addButton').on('click',()=>{
let url = window.prompt("请输入你要添加的网址")
if(url.indexOf('http')!==0){
   url = 'https://' + url
}
console.log(url)
hashMap.push({logo:simplifyUrl(url)[0].toUpperCase(),url:url});
render();
});
// 窗口关闭时触发
window.onbeforeunload = () =>{
  const string = JSON.stringify(hashMap);
//   在本地的存储里设置一个x,其值为string
  localStorage.setItem('x',string)
}
// toLowerCase小写
$(document).on('keypress',(e)=>{
   const {key} = e;
   for(let i=0;i<hashMap.length; i++){
      if(hashMap[i].logo.toLowerCase()=== key){
         window.open(hashMap[i].url)
      }
   }
})
// 阻止输入框事件键盘事件冒泡
$('.searchForm').on('keypress',(e)=>{
e.stopPropagation()
})
