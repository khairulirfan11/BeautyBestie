function filterProducts() {
    var brand = document.getElementById("searchInput").value.toLowerCase();
    var productFilter = document.getElementById("productFilter").value.toLowerCase();
  
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${productFilter}`)
      .then((response) => response.json())
      .then((data) => {
        var productContainer = document.getElementById("productContainer");
        productContainer.innerHTML = ""; // Clear previous results
  
        data.filter(product => (productFilter === "" || product.product_type.toLowerCase() === productFilter) && product.name.toLowerCase().includes(brand)).forEach((product) => {
          var productItem = document.createElement("div");
          productItem.classList.add("productItem");
  
          productItem.innerHTML += `<h2>${product.name}</h2>`;
          productItem.innerHTML += `<p>${product.description}</p>`;
          productItem.innerHTML += `<p>Price: $${product.price}</p>`;
          productItem.innerHTML += `<img src="${product.image_link}" alt="${product.name}" style="width: 100px; height: 100px;">`;
          productItem.innerHTML += `<p><a href="${product.product_link}" target="_blank">Product Link</a></p>`;
          productItem.innerHTML += `<p><a href="${product.website_link}" target="_blank">Website Link</a></p>`;
  
          productContainer.appendChild(productItem);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  