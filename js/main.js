fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.products.length > 0) {
        var temp = "";
        data.products.forEach(itemData => {
          temp += `
          <div class="card">
                <div class="">
                    <span class=""><img src="${itemData.thumbnail}" class="card-img-top" alt="Product 1" width="100px" height="250px"></span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${itemData.title}</h5>
                    <p>${itemData.price}$</p>
                    <p>${itemData.discountPercentage}$</p>
                    <a href="product-details.html?id=${itemData.id}" class="btn btn-primary">More</a>
                </div>
            </div>
            

           
            `;
        });
        document.getElementById('data').innerHTML = temp;
      }
    });


// Function to handle form submission for searching
function searchProducts(event) {
  event.preventDefault(); // Prevent form submission

  // Get search input value
  const searchValue = document.getElementById('searchInput').value;

  // Fetch the search results based on the product title
  fetch(`https://dummyjson.com/products/search?q=${searchValue}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // Display the search results on the page
      const searchResults = document.getElementById('searchResults');
      searchResults.innerHTML = '';

      if (data.products.length > 0) {
        data.products.forEach(product => {
          const productCard = document.createElement('div');
          productCard.classList.add('card');
          productCard.innerHTML = `
          <div class="col-md-4">
          </br>
            <div class="card">
              <img src="${product.thumbnail}" class="card-img-top" alt="Product 1" width="100px" height="250px">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                
                <p class="card-price text-danger">${product.price}$</p>
                <p class="card-discount">${product.discountPercentage}</p>
                <a href="product-details.html?id=${product.id}" class="btn btn-primary">More</a>
              </div>
            </div>
          </div>
          
          
        
          `;
          searchResults.appendChild(productCard);
        });
      } else {
        searchResults.innerHTML = '<p>No results found.</p>';
      }
    });
}

// Attach event listener to the search form submit event
document.getElementById('searchForm').addEventListener('submit', searchProducts);
