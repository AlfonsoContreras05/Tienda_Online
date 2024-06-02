document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const filterCategory = document.getElementById('filterCategory');
    const sortOrder = document.getElementById('sortOrder');
    const productsDiv = document.getElementById('products');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');

    let productsData = [];
    let currentPage = 1;
    const limit = 10;
    let totalPages = 1;

    searchInput.addEventListener('input', () => {
        currentPage = 1;
        filterAndDisplayProducts();
    });

    filterCategory.addEventListener('change', () => {
        currentPage = 1;
        filterAndDisplayProducts();
    });

    sortOrder.addEventListener('change', () => {
        currentPage = 1;
        filterAndDisplayProducts();
    });

    prevPageBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            fetchProducts();
        }
    });

    nextPageBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            fetchProducts();
        }
    });

    fetchProducts();

    function fetchProducts() {
        fetch(`http://localhost:3000/products?page=${currentPage}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                productsData = data.products;
                totalPages = data.totalPages;
                populateCategoryFilter(productsData);
                filterAndDisplayProducts();
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    function populateCategoryFilter(products) {
        filterCategory.innerHTML = '<option value="all">Todas las Categorías</option>';
        const categories = new Set(products.map(product => product.category));
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            filterCategory.appendChild(option);
        });
    }

    function filterAndDisplayProducts() {
        const query = searchInput.value.toLowerCase();
        const selectedCategory = filterCategory.value;
        const selectedSortOrder = sortOrder.value;

        let filteredProducts = productsData.filter(product => {
            return (
                (selectedCategory === 'all' || product.category === selectedCategory) &&
                product.name.toLowerCase().includes(query)
            );
        });

        if (selectedSortOrder === 'asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        displayProducts(filteredProducts);

        prevPageBtn.parentElement.classList.toggle('disabled', currentPage === 1);
        nextPageBtn.parentElement.classList.toggle('disabled', currentPage === totalPages);
    }

    function displayProducts(products) {
        productsDiv.innerHTML = '';
        const categories = {};

        products.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = [];
            }
            categories[product.category].push(product);
        });

        for (const category in categories) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'product-category';
            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category;
            categoryDiv.appendChild(categoryTitle);

            const productCardContainer = document.createElement('div');
            productCardContainer.className = 'product-card-container';

            categories[category].forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product-card';

                const productImage = document.createElement('img');
                productImage.src = product.url_image;
                productImage.alt = product.name;

                const productInfo = document.createElement('p');
                productInfo.textContent = `${product.name} - $${product.price}`;

                productDiv.appendChild(productImage);
                productDiv.appendChild(productInfo);
                categoryDiv.appendChild(productDiv);
            });
            categoryDiv.appendChild(productCardContainer);
            productsDiv.appendChild(categoryDiv);
        }
    }
});
