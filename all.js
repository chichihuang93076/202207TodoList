const txt_add = document.querySelector(".txt_add");
const btn_add = document.querySelector(".btn_add");
const list = document.querySelector(".list");
const list_footer_p = document.querySelector(".list_footer p");
const list_footer_a = document.querySelector(".list_footer a");
const tab = document.querySelector(".tab");
//console.log(tab);

let data=[
  {
    "id": 1,
    "content":"把冰箱發霉的檸檬拿去丟1",
    "checked":true
  },  
  {
    "id": 2,
    "content":"把冰箱發霉的檸檬拿去丟2",
    "checked":false
  },
  {
    "id": 3,
    "content":"把冰箱發霉的檸檬拿去丟3",
    "checked":false
  },
];

let maxSeqno =3;
let displayData = data;
let tab_stts ="全部";

function renderData() {
  let str="";
  displayData.forEach(function(item, index){
    let checked_str = "";
    if (item.checked) {
      checked_str ="checked";
    }

    str+=`<li>
            <label class="checkbox" for="${item.id}">
              <input type="checkbox" data-id=${item.id} ${checked_str}/>
              <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-id=${item.id}></a>
          </li>`
  });
  list.innerHTML = str;
  updateFooter();
//footer data

}

//輸入輸入代辦事項
btn_add.addEventListener("click",function(e){
  if (txt_add.value ==""){
    alert("請輸入代辦事項");
    return;
  }
  if (e.target.getAttribute("class") =="btn_add"){
    let obj={};
    maxSeqno++;
    obj.id = maxSeqno;
    obj.content = txt_add.value;
    obj.checked = false;
    data.push(obj);
    txt_add.value ="";
  }
  filterData();
});

list.addEventListener("click", function(e){    
  // 註記完成事項
  if (e.target.getAttribute("type") =="checkbox"){
    //let id= e.target.getAttribute("data-id");
    const idIndex = data.findIndex(function(item){
      return item.id == e.target.getAttribute("data-id");
    })
    data[idIndex].checked = e.target.checked;
    //console.log(`${id}---${e.target.checked}`);
    updateFooter();
  }
  //刪除事項
  if (e.target.getAttribute("class")=="delete"){    
    const idIndex = data.findIndex(function(item){
      return item.id == e.target.getAttribute("data-id");
    })
    //console.log(id);  
    data.splice(idIndex, 1);
    filterData();
  }
  
});

//刪除已完成事項
list_footer_a.addEventListener("click", function(e){
  if (e.target.getAttribute("class")=="clearChecked"){    
    //console.log(e);
    data.forEach(function(item,index){
      if (item.checked) {
        data.splice(index, 1);  
      }
    });    
    filterData();
  }
});

//計算待完成事項個數
function updateFooter() {
  /*
  const content_checkboxs = document.querySelectorAll('li input');
  let checkedCount =0;
  let noCheckedCount = 0;
  for(const checkbox of content_checkboxs) {
    if(checkbox.checked) {
      checkedCount++;
    }
    else
    {
      noCheckedCount++;
    }
  }
  //console.log(noCheckedCount);
  */
  let noCheckedCount = 0;
  data.forEach(function(item,index){
    if (!item.checked) {
      noCheckedCount++;
    }
  });
  list_footer_p.innerHTML = `${noCheckedCount} 個待完成項目`;
}

filterData();
updateFooter();

//tab 切換
tab.addEventListener("click",function(e){  
  if (e.target.nodeName ="LI")
  {
    //console.log(e.target.textContent);
    tab_stts = e.target.textContent;
    const tab_lis = document.querySelectorAll('.tab li');
    for(const tab_li of tab_lis)
    {
      //console.log(tab_li.textContent); 
      if (tab_li.textContent == tab_stts)
      {
        tab_li.setAttribute("class","active");
        //過濾資料 全部/待完成/已完成        
      }else{
        tab_li.setAttribute("class","");
      }
    }
    filterData();
  }

});

function filterData()
{
  //console.log(tab_stts);
    if (tab_stts=="待完成")
    {    
      displayData = data.filter(function(item){        
        return item.checked == false;
      })
    }
    if (tab_stts=="已完成")
    {    
      displayData = data.filter(function(item){        
        return item.checked == true;
      })
    }
    
    if (tab_stts=="全部")
    {    
      displayData = data;
    }    
    //console.log(displayData);
    renderData();
    updateFooter();
}



