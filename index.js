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
        categroyCard.innerHTML = ` <button onclick=loadfruits(${cat.id}) id="cat-btn-${cat.id} " class="btn shadow "> ${cat.category_name}</button>`
        catcotainer.append(categroyCard);
    })
};


const loadfruits = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayfruits(data.fruits));
}

const displayfruits =(fruits) =>{
  const fruitContainer =document.getElementById("fruit-container");
  fruitContainer.innerHTML ="";
  fruits.forEach((fruit)=> {
    console.log(fruit);
  })
}

loadCatagory();