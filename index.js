let cartPlant = {}
const loadCatagory = () => {
    const url = "https://openapi.programming-hero.com/api/categories"
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
        categroyCard.innerHTML = ` <button onclick=loadfruits(${cat.id}) id="cat-btn-${cat.id}" class=" hover:bg-green-500 rounded btn-category"> ${cat.category_name}</button>`
        catcotainer.append(categroyCard);
    })
};

///////////////////////////////////////

const loadfruits = (id) => {

     document.getElementById("fruit-container").classList.add("hidden");
     document.getElementById("loading-spinner").classList.remove("hidden");


    const url =id ? `https://openapi.programming-hero.com/api/category/${id}`
     :`https://openapi.programming-hero.com/api/plant/${id}`;

     const catBtns =document.querySelectorAll(".btn-category")
     catBtns.forEach(btn => btn.classList.remove("active"));


     const currentBtn=document.getElementById(`cat-btn-${id}`);
     console.log(currentBtn);
     currentBtn.classList.add("active");
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayfruits(data.plants));
}



const displayfruits = async (plants) => {
    const fruitContainer = document.getElementById("fruit-container");
    fruitContainer.innerHTML = "";
    await plants.forEach((plant) => {
        const { id, image, name, description, category, price } = plant;
        const fruitCard = document.createElement("div");
        fruitCard.innerHTML = `
           <!-- card  --> 
      <div class="card bg-base-100 shadow-sm">
        <figure onclick="loodfruitDetails(${id})"><img src="${image}" class="w-full h-40" /></figure>
        <div class="p-2 space-y-1">
          <h1 class="text-base font-medium">${name}</h1>
          <p class="text-[12px] line-clamp-2">${description}</p>
          <div class="flex justify-between items-center">
            <h2 class="border border-blue-500 px-2 py-[2px] rounded-md text-xs text-green-500">${category}</h2>
            <p class="font-medium text-xs text-green-500"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${price}</p>
          </div>
          <div class="mt-2 flex gap-2">
            <button onclick="addToCart(${id})" class="w-full text-white rounded-md bg-green-500 hover:bg-green-600 duration-300">Add to cart</button>
          </div>
        </div>
      </div>
      `;
        fruitContainer.append(fruitCard);
    });
        document.getElementById("fruit-container").classList.remove("hidden");
     document.getElementById("loading-spinner").classList.add("hidden");

};



const loodfruitDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayModal(data.plant));
};


const loadRandomData = () => {
    const url = `https://openapi.programming-hero.com/api/plants`
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayfruits(data.plants));
}


const displayModal = (cartPlant) => {
    const plantsContainer = document.getElementById("details-container");
    plantsContainer.innerHTML = `
  <div class="w-full">
      <img src="${cartPlant?.image}" alt="Image">
      <h1 class=" text-base font-medium">${cartPlant?.name}</h1>
      <p class="text-[12px]  line-clamp-2">
    ${cartPlant?.description}
    </p>
      <p class="font-medium text-xs text-green-500"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${cartPlant?.price}</p>
    </div>
    <div class="">
     
    </div>
    `;      
    document.getElementById("my_modal_3").showModal();
}



function addToCart(plant) {
     console.log(plant);
    cartPlant = plant
}



loadCatagory(); 
// loadfruits();
loadRandomData();



document.getElementById("details-container").addEventListener('click',(e)=>{
    console.log(e.target);
});