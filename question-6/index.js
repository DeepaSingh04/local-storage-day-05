let users = [
    { id: 1, name: "Leanne Graham", email: "Sincere@april.biz" },
    { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv" },
    { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net" },
    { id: 4, name: "Patricia Lebsack", email: "Julianne.OConner@kory.org" },
    { id: 5, name: "Chelsey Dietrich", email: "Lucio_Hettinger@annie.ca" },
    { id: 6, name: "Mrs. Dennis Schulist", email: "Karley_Dach@jasper.info" },
    { id: 7, name: "Kurtis Weissnat", email: "Telly.Hoeger@billy.biz" },
    { id: 8, name: "Nicholas Runolfsdottir V", email: "Sherwood@rosamond.me" },
    { id: 9, name: "Glenna Reichert", email: "Chaim_McDermott@dana.io" },
    { id: 10, name: "Clementina DuBuque", email: "Rey.Padberg@karina.biz" }
  ];
  
  const userList = document.getElementById('user-list');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Function to render user cards
  function renderUsers() {
    userList.innerHTML = '';
    users.forEach(user => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h2>${user.name}</h2>
        <p>${user.email}</p>
        <button onclick="addToCart(${user.id})">Add to Cart</button>
      `;
      userList.appendChild(card);
    });
  }
  
  // Function to add user to cart
  function addToCart(id) {
    const user = users.find(user => user.id === id);
    if (!cart.some(cartItem => cartItem.id === user.id)) {
      cart.push(user);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${user.name} added to cart!`);
    } else {
      alert('User already in cart!');
    }
  }
  
  renderUsers();
  