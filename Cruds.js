let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let submit=document.getElementById('createsubmit');   
let counts=document.getElementById('counts'); 
let categorys=document.getElementById('categorys');
let mood ='create';
let tmp;

function scroltop(){
  window.scroll({
    top:0,
    behavior:"smooth"
  })
}
/*
###############
get total
################
*/
function gettotal(){
     if(price.value !=''){
       let result=(+price.value + +taxes.value + +ads.value) - +discount.value;
       total.style.background="green";
       total.innerHTML =result;
   }
  else{
  total.innerHTML= '';
  total.style.background="red";
  }
    } 
/*
########################
start main function submit 
########################
*/
 let emptarr
    //   الجزء دا خاص بي ترجيع البياناتللعادي بتاعه بعد م حولتها ل  string

    if(localStorage.producct != null){
      emptarr=JSON.parse(localStorage.producct);
    }
     else{
     emptarr=[];
     }

 submit.onclick=function(){
   let newpro={
   title:title.value.toLowerCase(),
   price:price.value,
   taxes:taxes.value,
   ads:ads.value,
   discount:discount.value,
   total:total.innerHTML,
   categorys:categorys.value.toLowerCase(),
   counts:counts.value,
   }
   // if mood =>
   if(mood === 'create')
   {
   if(newpro.counts > 1){
    for( let i=0;i<newpro.counts;i++){
      emptarr.push(newpro);
           }
        }
  else{ emptarr.push(newpro); }
 }
//  this part belong to update 
else{
  emptarr[tmp] = newpro;
  gettotal();
  submit.innerHTML= 'create';
  counts.style.display='block';
  mood='create'
}
 localStorage.setItem('producct',JSON.stringify(emptarr));
   cleardata();
   showData(); 
  }
/*
#####################
 end main function submit
#######################
*/

/*
######################
 clear input data 
  الجزء دا خاص بي اول ما ادوس ع زرتر ال سب ميت يفضيلي الخانات كلها عشان اكتب من جديد
 ##################
 */
function cleardata(){
title.value='';
price.value='';
ads.value='';
taxes.value='';
counts.value='';
categorys.value='';
total.innerHTML='';
discount.value='';
}

/*
#########################
insert data to table
#####################
*/
function showData(){
  gettotal();
  let table ='';
   for(let i= 0;i < emptarr.length;i++){
   table += `
    <tr>
        <td>${i}</td>
        <td>${emptarr[i].title}</td>
        <td>${emptarr[i].price}</td>
        <td>${emptarr[i].taxes}</td>
        <td>${emptarr[i].ads}</td>
        <td>${emptarr[i].discount}</td>
        <td>${emptarr[i].total}</td>
        <td>${emptarr[i].categorys} </td>
        <td><button class="update"onclick="updatData(${i})">update</button></td>
        <td><button class="delete"onclick=deletData(${i})>delete</button></td>
    </tr>
    `;
}
  document.getElementById('tbody').innerHTML= table;
   //  اول م ادوس ع زر ال  create  هيقوم باانشا زر تحتيه اسمه  delete all
   let btn=document.getElementById('clearAll');
   if(emptarr.length >0){
     btn.innerHTML=`
     <button id="deleteAll"onclick="delettAll()">delete All (${emptarr.length})</button> `
      ;
   }
}

function deletData(i){
/*
##########################
delete one inline product
 عشان اقتطع الجزء بتاع الاندكس i بي
 ##########################
 */
 emptarr.splice(i,1)
localStorage.producct=JSON.stringify(emptarr);
showData();
}
/* 
###############
delete all product 
#############
*/
function delettAll(){
localStorage.clear();
emptarr.splice(0);
showData();
}
/*
###############
update data in one inline product
and counts => display none
submit => update
##################
*/
function updatData(i){

  title.value =emptarr[i].title;
  price.value =emptarr[i].price;
  taxes.value =emptarr[i].taxes;
  ads.value =emptarr[i].ads;
  categorys.value =emptarr[i].categorys;
  discount.value=emptarr[i].discount;
  gettotal();
  submit.innerHTML= 'Update';
  counts.style.display='none';
  tmp=i;
  mood ='update';
  scroll({
    top:0,
    behavior:'smooth'
  })
  }


showData();

/*
start
###########################
search we will use moode > category , > name;
#############################
*/
let searchMood ='title';
function getsearchmood(id){
  let search =document.getElementById('search');
if(id=='searchTitle'){
  searchMood ='title';
  search.placeholder ='search by title';
}
else{
  searchMood ='category';
  search.placeholder ='search by category';
}
// search.placeholder ='search by'+searchMood;
search.focus();
search.value=''
showData();
}
/*
end
###########################
search we will use moode > category , > name;
#############################
*/

function searchData(value){
  let table;
 if(searchMood =='title'){
 
//  محتاج امر ع كل منتج واشوفه موجود في ال  arry 
for(let i=0;i<emptarr.length;i++){
  //  search for any string => includes
 
if(emptarr[i].title.includes(value.toLowerCase())){
  table += `
    <tr>
        <td>${i}</td>
        <td>${emptarr[i].title}</td>
        <td>${emptarr[i].price}</td>
        <td>${emptarr[i].taxes}</td>
        <td>${emptarr[i].ads}</td>
        <td>${emptarr[i].discount}</td>
        <td>${emptarr[i].total}</td>
        <td>${emptarr[i].categorys} </td>
        <td><button class="update"onclick="updatData(${i})">update</button></td>
        <td><button class="delete"onclick=deletData(${i})>delete</button></td>
    </tr> `;
      }
    }
  }
 else{
  for(let i=0;i<emptarr.length;i++){
  //  search for any string => includes
if(emptarr[i].categorys.includes(value.toLowerCase())){
  table += `
    <tr>
        <td>${i}</td>
        <td>${emptarr[i].title}</td>
        <td>${emptarr[i].price}</td>
        <td>${emptarr[i].taxes}</td>
        <td>${emptarr[i].ads}</td>
        <td>${emptarr[i].discount}</td>
        <td>${emptarr[i].total}</td>
        <td>${emptarr[i].categorys} </td>
        <td><button class="update"onclick="updatData(${i})">update</button></td>
        <td><button class="delete"onclick=deletData(${i})>delete</button></td>
    </tr> `;
      }
    }
  }
 document.getElementById('tbody').innerHTML= table;
}

