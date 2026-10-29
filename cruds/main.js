let title=document.getElementById('title')
let price=document.getElementById('price')
let ads=document.getElementById('ads')
let taxses=document.getElementById('taxses')
let desc=document.getElementById('desc')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let create=document.getElementById('create')
let del=document.getElementById('del')
let mood='create'
let temp;
function getTotal(){
    if(price.value !=''){
        let result =(+price.value + +ads.value + +taxses.value) - +desc.value;
        total.innerHTML= 'Total: '+result
    }
    else
    {
        total.innerHTML=''
    }
}
//create function
let data;
if(localStorage.item!=null){
    data= JSON.parse(localStorage.item)
}
else{
    data=[]
}
create.onclick=function(){
    let newprod={
        title:title.value.toLowerCase(),
        price:price.value,
        ads:ads.value,
        taxses:taxses.value,
        desc:desc.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value .toLowerCase(),

    }
    if(title.value!=''&&count.value<200&&price.value!=''&&category.value!=''){
        if(mood==='create'){
            if(newprod.count>1){
                for(let i=0;i<newprod.count;i++){
                    data.push(newprod)

                }
            }
            else{
                data.push(newprod)
            }
        }
        else{
            data[temp]=newprod
            mood='create'
            create.innerHTML='Create'
            count.style.display='none'
            
        }
    cleardata();   
    }
    

    
    //save in local storage
    localStorage.setItem('item',JSON.stringify(data))
    
    readData();
}

function cleardata(){
    title.value='';
    price.value='';
    ads.value='';
    taxses.value='';
    desc.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
readData()
//read data
function readData(){
    let table=""
    
    for(let i=0;i<data.length;i++){

        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].taxses}</td>
            <td>${data[i].desc}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick=updateitem(${i}) class="btn"> UPDATE</button></td>
            <td><button onclick=deleteitem(${i}) class="btn">DELETE</button></td>

        </tr>`
                
        del.style.display = data.length > 0 ? 'block' : 'none';
    
    }
document.getElementById('tbody').innerHTML=table
}
function deleteitem(i){
    data.splice(i,1)
    localStorage.item=JSON.stringify(data)
    readData()

}
if(data.length>0)
{
    del.style.display='block'
}
else{
    del.style.display='none'
}
function deleteAll(){
    localStorage.clear()
    data.splice(0)
    readData()
    del.style.display='none'
}
function updateitem( i){
    title.value=data[i].title
    price.value=data[i].price
    ads.value=data[i].ads
    taxses.value=data[i].taxses
    desc.value=data[i].desc
    getTotal()
    count.style.display='none'
    category.value=data[i].category
    create.innerHTML='Update'
    mood='update'
    temp=i
    scroll({
        top:0,
        behavior:"smooth"
    })
}
let searchmode='title'
function getsearchmoode(id){
    let search=document.getElementById('search')
    search.focus()
    if(id=='titleSearch')
    {
        searchmode='title'
        search.placeholder='search by title '
    }
    else{
        searchmode='category'
        search.placeholder='search by category '
    }
    console.log(searchmode)
    search.value=''
    readData()

}
function searchItem(value){
    let table=''
    for(let i=0;i<data.length;i++)
    {
        if(searchmode=='title'){
        
            
                if(data[i].title .includes(value .toLowerCase()))
                {
                        table +=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].taxses}</td>
                        <td>${data[i].desc}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick=updateitem(${i}) class="btn"> UPDATE</button></td>
                        <td><button onclick=deleteitem(${i}) class="btn">DELETE</button></td>

                    </tr>`
                    

                }

            
        }
        else{
            
                if(data[i].category.includes(value.toLowerCase()))
                {
                        table +=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].taxses}</td>
                        <td>${data[i].desc}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick=updateitem(${i}) class="btn"> UPDATE</button></td>
                        <td><button onclick=deleteitem(${i}) class="btn">DELETE</button></td>

                    </tr>`

                }
            
        }
    }
    document.getElementById('tbody').innerHTML=table

}
    
