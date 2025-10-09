const loadCatagory = () => {
    const url =  "https://openapi.programming-hero.com/api/categories"
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayCatagory(data.categories));
};

const displayCatagory = (categories) => {
    //  console.log(categories);
    const catcotainer = document.getElementById("category-container");
    catcotainer.innerHTML = "";
    categories.forEach((cat) => {
        // console.log(cat);
        const categroyCard = document.createElement("div")
        categroyCard.innerHTML = ` <button onclick=loadfruits(${cat.id}) id="cat-btn-'${cat.id}' " class=" "> ${cat.category_name}</button>`
        catcotainer.append(categroyCard);
    })
};


const loadfruits = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayfruits(data.plants));
}


const loodfruitDetails = (id) => {
  const url =`https://openapi.programming-hero.com/api/plants `
   fetch(url)
        .then((res) => res.json())
        .then((data) => displayModal(data.plants));
}

const displayfruits = async (plants) =>{
  // console.log(plants);
  
  const fruitContainer =document.getElementById("fruit-container");
  fruitContainer.innerHTML ="";
  await plants.forEach((plant)=> {
    const fruitCard =document.createElement("div");
    fruitCard.innerHTML=`
           <!-- card  --> 
      <div onclick="loodfruitDetails()" class="card bg-base-100  shadow-sm  ">
     <figure class="px- pt-">
    <img src="${plant.image}" class="w-full h-40" />
     </figure>
    <div class=" p-2 space-y-1">
    <h1 class=" text-base font-medium">${plant.name}</h1>
    <p class="text-[12px]  line-clamp-2">
    ${plant.description}
    </p>
    <div class="flex justify-between  items-center">
      <h2 class="border border-blue-500 px-2 py-[2px] rounded-md text-xs  text-green-500">${plant.category}</h2>
      <p class="font-medium text-xs text-green-500"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</p>
    </div>
    <div class=" mt-2">
     <button class=" font-normal w-full text-base text-white rounded-md bg-green-500 hover:bg-green-500 duration-300  py-[2px] cursor-pointer">Add to cart</button>
    </div>
     </div>
      `;
      fruitContainer.append(fruitCard)
  });
};

const loadRandomData =()=>{
  const url=`https://openapi.programming-hero.com/api/plants`
  fetch(url)
  .then((res)=>res.json())
  .then((data)=>displayfruits(data.plants));
}
  // "id": 1,
  //   "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
  //   "name": "Mango Tree",
  //   "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
  //   "category": "Fruit Tree",
  //   "price": 500
  // }

const displayModal =(plants) =>{
  const plantsContainer =document.getElementById("details-container");
  plantsContainer.innerHTML=`
  <div class="">
      <img src="${plants.image}"
       alt="">
    </div>
  <div class="">
     
    </div>
    `;
}


loadCatagory(); 
loadRandomData();