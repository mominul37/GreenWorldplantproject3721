let cartPlant = {}
const loadCatagory = () => {
    const url = "https://openapi.programming-hero.com/api/categories"
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayCatagory(data.categories));
};
const cart =[];
let total =0;

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
        <figure onclick="loodfruitDetails(${id})"><img src="${image}" class="w-full h-40 fruit-img" /></figure>
        <div class="p-2 space-y-1">
          <h1 class="text-base font-medium fruits-title">${name}</h1>
          <p class="text-[12px] line-clamp-2">${description}</p>
          <div class="flex justify-between items-center">
            <h2 class="border border-blue-500 px-2 py-[2px] rounded-md text-xs text-green-500">${category}</h2>
            <p class="font-medium text-xs text-green-500 fruit-price"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${price}</p>
          </div>
          <div class="mt-2 flex gap-2">
            <button onclick="addToCart(this)" class="w-full text-white rounded-md bg-green-500 hover:bg-green-600 duration-300">Add to cart</button>
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

function addToCart(btn) {
    //  console.log(btn);
    // cartPlant = plant
    const card=btn.parentNode.parentNode.parentNode;
    const fruitTitle=card.querySelector(".fruits-title").innerText;
    // const fruitImg=card.querySelector(".fruit-img").src;
    const fruitPrice=card.querySelector(".fruit-price").innerText;
    // const fruitPriceNum=Number(fruitPrice);
    const fruitPriceNum = parseInt(fruitPrice.replace(/[^\d]/g, ''));

    console.log(fruitTitle,fruitPrice,fruitPriceNum);
    const selectItem ={
      fruitTitle:fruitTitle,
      // fruitImg:fruitImg,
      fruitPrice:fruitPriceNum,
    };
    cart.push(selectItem);
    displayCart(cart);
     total += fruitPriceNum;
    // total=total+fruitPriceNum;
    displayCart(cart);
    displayTotal(total);
}; 

function displayTotal() {
  document.getElementById("cart-total").innerText = total;
}


const displayCart = () => {
  const cartContainer = document.getElementById("cart-box");
  cartContainer.innerHTML = "";

  for (let item of cart) {
    const newItem = document.createElement("div");
    newItem.classList.add("flex", "items-center", "gap-2", "p-2", "border-b");

    newItem.innerHTML = `
      <div class="flex-1 gap-4">
        <h2 class="text-sm font-medium">${item.fruitTitle}</h2>
        <p class="text-xs text-green-600">${item.fruitPrice}</p>
      </div>
     <button class="text-red-500 hover:text-red-700 text-sm font-bold" onclick="removeFromCart('${item.fruitTitle}')">✖</button>

    `;

    cartContainer.appendChild(newItem);
  };
   total = cart.reduce((sum, item) => sum + (item.fruitPrice || 0), 0);
     displayTotal();
};
const removeCart=(btn)=> {
  const item=btn.parentNode;
  const fruitTitle=item.querySelector(".fruits-title").innerText;
  const fruitPriceNum=Number(item.querySelector(".item-price").innerText);
  console.log(fruitTitle);
  cart=cart.filter(item => item.fruitTitle != fruitTitle);
  total = cart.reduce((sum, item) => sum + item.fruitPrice, 0);
  
 
  displayCart(cart);
  displayTotal(total);

};


function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}


loadCatagory(); 
// loadfruits();
loadRandomData();



document.getElementById("details-container").addEventListener('click',(e)=>{
    console.log(e.target);
});


function displayCart() {
  const cartContainer = document.getElementById("cart-box");
  cartContainer.innerHTML = "";

  total = 0;
  cart.forEach((item, index) => {
    total += item.fruitPrice;

    const newItem = document.createElement("div");
    newItem.classList.add("flex", "items-center", "gap-2", "p-2", "border-b");
    newItem.innerHTML = `
      <img src="${item.fruitImg}" class="w-10 h-10 object-cover rounded" alt="">
      <div class="flex-1">
        <h2 class="text-sm font-medium">${item.fruitTitle}</h2>
        <p class="text-xs text-green-600">${item.fruitPrice}</p>
      </div>
      <button class="text-red-500 hover:text-red-700 text-sm font-bold" onclick="removeFromCart(${index})">✖</button>
    `;
    cartContainer.appendChild(newItem);
  });

  displayTotal(); // ✅ total update
}

