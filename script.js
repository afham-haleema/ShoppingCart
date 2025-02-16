
let addCart = document.querySelectorAll('.addtocart');
let cartQty = document.querySelector('#cartqty');
let cartbody = document.querySelector('.cart-body');
let productimg = document.querySelectorAll('.product-img #img');
let titles = document.querySelectorAll('.product-text #title');
let prices = document.querySelectorAll('.product-text #price');

let totalCount = 0;
let cartItems = {};
let totalPrice = 0;

addCart.forEach((product, index) => {
    product.addEventListener('click', () => {
        let itemName = titles[index].innerText;
        let itemPrice = prices[index].innerText;


        if (cartItems[itemName]) {
            cartItems[itemName].count++;
        } else {
            cartItems[itemName] = {
                count: 1,
                price: parseFloat(itemPrice.replace('$', '')),
            };
        }

        totalCount++;
        totalPrice += itemPrice
        cartQty.innerHTML = `Your Cart (${totalCount})`;


        updateCartUI();
    });
});

function updateCartUI() {
    cartbody.innerHTML = '';
    let currentotal = 0;

    Object.keys(cartItems).forEach((item,index) => {
        let cartdiv = document.createElement('div');
        cartdiv.classList.add('cart-item');

        let leftdiv = document.createElement('div');
        let name = document.createElement('p');
        name.innerText = item;

        let qtyControlDiv = document.createElement('div');
        qtyControlDiv.classList.add('qty-controller');

        let minus = document.createElement('i');
        minus.classList.add('fa-solid', 'fa-minus');
        minus.addEventListener('click', () => updateQuantity(item, -1));

        let qty = document.createElement('b');
        qty.innerText = cartItems[item].count;

        let plus = document.createElement('i');
        plus.classList.add('fa-solid', 'fa-plus');
        plus.addEventListener('click', () => updateQuantity(item, 1));

        qtyControlDiv.appendChild(minus);
        qtyControlDiv.appendChild(qty);
        qtyControlDiv.appendChild(plus);
        leftdiv.appendChild(name);
        leftdiv.appendChild(qtyControlDiv);


        let right = document.createElement('b');
        let itemTotal = cartItems[item].count * cartItems[item].price
        right.innerText = `$${itemTotal.toFixed(2)}`;
        currentotal += itemTotal;

        cartdiv.appendChild(leftdiv);
        cartdiv.appendChild(right);
        cartbody.appendChild(cartdiv);
    
    });

    totalPrice = currentotal;
    

    let line = document.createElement('div')
    line.classList.add('line')
    cartbody.appendChild(line)

    let totalprice = document.createElement('div')
    totalprice.classList.add('order-total')
    let rightP = document.createElement('b')
    rightP.innerText = `$${totalPrice.toFixed(2)}`
    let left = document.createElement('p')
    left.innerText = 'Order Total'

    totalprice.appendChild(left)
    totalprice.appendChild(rightP)
    cartbody.appendChild(line)
    cartbody.appendChild(totalprice)

    let confirm = document.createElement('button')
    confirm.classList.add('confirm')
    
    confirm.innerText = 'Confirm Order'
    
    cartbody.appendChild(confirm)


    confirm.addEventListener('click', (event) => {
        console.log('Confirm Order clicked');
        
        let dialog = document.createElement('dialog')
        dialog.classList.add('dialog')

        let icon = document.createElement('i')
        icon.innerHTML = ` <i class="fa-regular fa-circle-check" style="color: green;font-size:2rem;margin:1rem"></i>`
        dialog.appendChild(icon)

        let modalT = document.createElement('h2')
        modalT.innerText = 'Order Confirmed'
        dialog.appendChild(modalT)

        let modalP = document.createElement('p')
        modalP.innerText = 'We hope you enjoy your food!'
        modalP.style.color='grey'
        dialog.appendChild(modalP)

        let totalAmt=document.createElement('div')
        totalAmt.classList.add('total-amt')
        let orderTotal = document.createElement('p')
        orderTotal.innerText = 'Order Total'
        let orderPrice = document.createElement('b')
        orderPrice.innerText = `$${totalPrice}`
        totalAmt.appendChild(orderTotal)
        totalAmt.appendChild(orderPrice)
        dialog.appendChild(totalAmt)


        let startBtn = document.createElement('button')
        startBtn.innerText = 'Start New Order'
        dialog.appendChild(startBtn)
        startBtn.addEventListener('click', () => {
            window.location.reload()
        })

        document.body.appendChild(dialog)
        dialog.showModal();
        dialog.addEventListener('click', () => {
            dialog.close()
        })
    })

}



function updateQuantity(item, change) {
    cartItems[item].count += change;


    if (cartItems[item].count <= 0) {
        totalCount -= cartItems[item].count;
        totalPrice -= cartItems[item].price * cartItems[item].count;
        delete cartItems[item];
    } else {
        totalCount += change;
    }

    cartQty.innerHTML = `Your Cart (${totalCount})`;
    updateCartUI();
}