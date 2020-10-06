window.addEventListener('load', function () {
    getDataByCategory('random');
    links.forEach(link => {
        link.addEventListener('click', linkClickEvent)
    });
});

//get all the links in the header related to products
const links = document.querySelectorAll('.product-link');

//set checked class to the clicked link and remove it from other 
function linkClickEvent() {

    document.querySelector('.checked').classList.toggle('checked')
    this.classList.add('checked')

    document.getElementById('links').classList.remove('show')

}
let body=document.querySelector('body');

let darkModeBtn=document.querySelector(".dark-mode-img");
darkModeBtn.addEventListener('click',()=>{
body.classList.toggle('dark');
darkModeBtn.classList.toggle('dark-selceted')
})

var x = document.querySelector(".products-wrapper");
var slider = document.querySelector(".slider");

let max=1;
let width=x.scrollWidth;
width>1000?max=3:max=1;
slider.max=width/max;//this will work fine in the mobile because it will take the width of the mobile
 

slider.oninput = function() {
 
  changewidth(slider.value);
}
let toggleSideMenu=false;

function showSideMenu(){
    if(toggleSideMenu===false){

        document.querySelector(".dark-mode").style.transform="translateY(-50px)";
        document.querySelector(".dark-mode").style.boxShadow="0 0 10px 5px var(--shopping-cart-text-darker-color)";
        document.querySelector(".slider").style.display="block"
         document.querySelector(".cards-slider").style.width='80%';
         document.querySelector(".cards-slider").style.boxShadow="0 0 10px 5px var(--shopping-cart-text-darker-color)";
        toggleSideMenu=true;
    }else{
        document.querySelector(".dark-mode").style.transform="translateY(0px)";
        document.querySelector(".dark-mode").style.boxShadow="none";
        document.querySelector(".slider").style.display="none"
          document.querySelector(".cards-slider").style.width='0%';
         document.querySelector(".cards-slider").style.boxShadow="none";

        toggleSideMenu=false;
    }
}

function changewidth(value) { 
        x.style.gridTemplateColumns =`repeat(auto-fill, minmax(${value +'px'}, 1fr))`;     
}

const showHeaderMenu = (navID, togglerID) => {
    const toggle = document.getElementById(togglerID);
    const menu = document.getElementById(navID);

    // if both are not undefined
    if (toggle && menu)
        toggle.addEventListener('click', () => {
            menu.classList.toggle('show')
        })
}

showHeaderMenu('links', 'header-toggler');

const dropContainer = document.querySelector('.droppale');
dropContainer.addEventListener("drop", (e) => {
    cartProducts();
});
dropContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

getDataByCategory = async (category) => {
    let url = category === "random" ? "https://fakestoreapi.com/products/" : "https://fakestoreapi.com/products/category/" + category;

    const response = await fetch(url);
    // Storing data as JSON  if the response status is 200
    if (response.status === 200) {
        let data = await response.json();

        renderProducts(data);
    }
}

renderProducts = (products) => {
    let container = document.querySelector(".products-wrapper");

    let cards = '';

    products.map(product => {
        let card = `  
        <div draggable="true" class="product-card d-flex draggable" id="${product.id}">
        <div class="product-top-section">
            <div class="image">
                <img src="${product.image}">

            </div>
            <!-- details will be a div on top of the image to display the item section and the price -->
            <div class="details d-flex">
                <div class="product-section ">
                    <p>${product.category}</p>
                </div>
                <div class="product-price">
                    <p>${product.price}$</p>
                </div>
            </div>
        </div>
        <div class="product-bottom-section d-flex">
        <div class="title-wrapper">
        <h4 class=" title">${product.title}</h4>
    </div>
    <div class="description-wrapper">
        <p class="description"> ${product.description}
        </p>
    </div>
             
        </div>
    </div>
        `;

        cards += card;
    });
    container.innerHTML = cards;
    draggingFunctionality();//after adding the products to page give them the dragging functionallity
}

//needs more logic here for smoother and smarter scrolling but its out of task scope
function backToTop(time = -10) {//when start dragging the element it scrolls the page to top 
    if (window.pageYOffset > 0) {
        window.scrollBy(0, time);
        setTimeout(backToTop, 1);
    }

}

draggingFunctionality = () => {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach(draggable => {

        //tried to make the drag and drop for mobile also 
        draggable.addEventListener('touchmove', () => {
            draggable.classList.add('dragging');

        })
        draggable.addEventListener('touchend', () => {
            draggable.classList.remove('dragging');

        })
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
            backToTop();
        })
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        })
    })
}

createCartProduct = (num = 1) => {

    let node = document.createElement('div');
    const draggable = document.querySelector('.dragging');
    let remove = document.createElement('span');
    let removetext = document.createTextNode("X");
    remove.classList.add("remove")
    remove.append(removetext);
    node.appendChild(remove)

    node.classList = 'product-on-cart d-flex';
    let image = document.createElement('img');
    let productImageSrc = draggable.querySelector('.product-top-section .image img').getAttribute('src');
  
    image.setAttribute('src', productImageSrc);
    node.appendChild(image);
    let title = document.createElement('h3');
    const productTitle = draggable.querySelector('.title-wrapper .title');
    let titleText = document.createTextNode(productTitle.textContent);
    const productPrice = draggable.querySelector('.details .product-price');
    let priceWrapper = document.createElement('div');
    let price = document.createElement('h3');
    let x = document.createElement('h3');

    price.className = ("product-price")
    let priceText = document.createTextNode(productPrice.textContent);
    price.appendChild(priceText)
    let xtext = document.createTextNode(' X');
    x.appendChild(xtext);


 let plus = document.createElement('div');
    plus.className = "plus";
    let minus = document.createElement('div');
    minus.className = "minus";

    let countWrapper = document.createElement('div');
    let count = document.createElement('h3');
    let productCount = document.createTextNode(num);
    countWrapper.className = "product-count";
    count.className = "count";
    countWrapper.appendChild(plus)
    countWrapper.appendChild(count)
    countWrapper.appendChild(minus)

    count.appendChild(productCount);

    priceWrapper.appendChild(price);
    priceWrapper.appendChild(x);
    priceWrapper.appendChild(countWrapper);
    priceWrapper.classList.add('d-flex');
    priceWrapper.classList.add('price');
    title.appendChild(titleText);
    title.classList.add('title');
    node.appendChild(title);
    node.id = "p-" + draggable.id
    node.appendChild(priceWrapper);
    return node;
}


plusMinus = (product) => {

 console.log("product", product)

    product.querySelector('.price').querySelector('.product-count').querySelector('.plus').addEventListener('click', () => {
      increaseProductCount(product)
    
    })
    product.querySelector('.price').querySelector('.product-count').querySelector('.minus').addEventListener('click', () => {
      deleteProductFromCart( product.id)
    })

  

}

cartProducts = () => {

    const draggable = document.querySelector('.dragging');
    const productID = "p-" + draggable.id;
    let element = document.getElementById(productID);

    if (element === null) {
        addProductToCart(createCartProduct())
      
    }
    else {
        increaseProductCount(element) 
           animateOnAdd(element)
    }
 
}

increaseProductCount = (product) => {
let count =product.querySelector(".price").querySelector(".product-count").querySelector('.count');
    let newCount =parseInt( count.textContent);
    newCount += 1;
    count.textContent = newCount;
    calculateTotal();
}


animateOnAdd = (product) => {
   
    product.scrollIntoView();//this is weird scrolling need to be changed
    backToTop(-1000);
    product.classList.add('animate')//animate the product when added to the cart
    let t = setTimeout(() => {
        product.classList.remove('animate')
    }, 300);
}


addProductToCart = (product) => {

    //add the remove product functionallity
    product.querySelector('.remove').addEventListener('click', () => {
        deleteProductFromCart(product.id)
    })
    dropContainer.append(product);//add the product to the cart
    animateOnAdd(product)
plusMinus(product);
calculateTotal();

}

calculateTotal = () => {
    let total = 0;
    let tax = 0;
    let taxValue = 0.15;
    let listOfProducts = document.querySelectorAll('.product-on-cart');
    let totalElement = document.querySelector(".total");
    let taxElement = document.querySelector(".tax");
    let totalSumElement = document.querySelector(".total-sum");

    [...listOfProducts].map((product, index) => {
        let priceText = product.querySelector(".product-price").textContent
        priceText = priceText.substring(0, priceText.length - 1)

        let countText = product.querySelector(".product-count").textContent;
        total += parseFloat(priceText) * parseFloat(countText);//calculate the total for all the products 
    })
    totalElement.textContent = total.toFixed(2) + '$';//set the total on the cart
    tax = (total * taxValue);//calculate the tax 
    taxElement.textContent = tax.toFixed(2);//set the tax value on cart
    totalSumElement.textContent = (total + tax).toFixed(2)//set the total sum value on the cart
}

deleteProductFromCart = (productID) => {
    console.log("deleeeeeeeeeeeeeee")
    //get the product from the cart which is required to be removed or count-1
    let product = document.getElementById(productID);

    //get the count of the element if count >1 then -1 else remove the element
    let count =product.querySelector(".price").querySelector(".product-count").querySelector('.count');
    let newCount =parseInt( count.textContent);

    if (newCount > 1) {
        count.textContent = newCount-1;
        product.classList.add('animate2')//animate the product when added to the cart
        let t = setTimeout(() => {
            product.classList.remove('animate2')
        }, 300);
    }
    else {
        document.getElementById(product.id).remove();
    }
    calculateTotal();
}


