(() => {
  const init = () => {
    buildHTML();
    buildCSS();
    loadProducts();
  };

  const buildHTML = () => {
    const productDetail = document.querySelector(".product-detail");
    if (!productDetail) return;

    const carouselContainer = document.createElement("div");
    carouselContainer.className = "custom-carousel unique-carousel";
    carouselContainer.innerHTML = `
            <div class="carousel-wrapper unique-wrapper">
                <h2 class="combine-products-title">You Might Also Like</h2>
                <div class="carousel-content">
                    <button class="carousel-arrow unique-arrow left">&#10094;</button>
                    <div class="carousel-track unique-track"></div>
                    <button class="carousel-arrow unique-arrow right">&#10095;</button>
                </div>
            </div>
        `;
    productDetail.after(carouselContainer);
  };

  const buildCSS = () => {
    const style = document.createElement("style");
    style.textContent = `
            .custom-carousel {
                margin-top: 20px;
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
            }
            .carousel-wrapper.unique-wrapper {
                max-width: 1200px;
                width: 80%;
                margin: 0;
                overflow: visible;
                position: relative;
            }
            .combine-products-title {
                font-size: 32px;
                line-height: 43px;
                font-weight: lighter;
                color: #29323b;
                margin-bottom: 15px;
                text-align: left;
                padding-bottom: 15px;
            }
            .carousel-content {
                display: flex;
                align-items: center;
                position: relative;
            }
            .carousel-track.unique-track {
                display: flex;
                gap: 15px;
                overflow-x: auto;
                overflow-y: hidden;
                margin: 0;
                user-select: none;
                scroll-behavior: smooth;
            }
            .carousel-track.unique-track::-webkit-scrollbar {
                display: none;
            }
            .carousel-arrow.unique-arrow {
                border: none;
                color: black;
                font-size: 3rem;
                padding: 15px;
                cursor: pointer;
                z-index: 1000;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                user-select: none;
                background: transparent;
                box-shadow: none;
            }
            .carousel-arrow.unique-arrow.left {
                left: -50px;
            }
            .carousel-arrow.unique-arrow.right {
                right: -50px;
            }
            .product {
                flex-shrink: 0;
                border-radius: 5px;
                background-color: white;
                position: relative;
                width: calc((100% - 90px) / 6.5);
                text-align: left;
                overflow: hidden;
                height: 38rem;
                user-select: none;
            }
            .product img {
                width: 100%;
                height: auto;
                object-fit: contain;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                pointer-events: none;
            }
            .product .details {
                padding: 10px;
            }
            .product .details p {
                margin: 5px 0;
                font-size: 14px;
                color: #302e2b;
                user-select: none;
            }
            .product .details p.price {
                font-weight: bold;
                color: #193db0 !important;
                line-height: 22px;
                font-size: 18px;
                display: inline-block;
                user-select: none;
            }
            .favorite {
                position: absolute;
                top: 9px;
                right: 15px;
                width: 34px;
                height: 34px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
                border: 0.5px solid #b6b7b9;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                user-select: none;
            }
            .favorite svg {
                width: 20px;
                height: 20px;
                fill: none;
                stroke: #b6b7b9;
                stroke-width: 2;
                pointer-events: none;
            }
            .favorite.active svg {
                fill: #007bff;
                stroke: #007bff;
            }
            @media (max-width: 480px) {
                .combine-products-title {
                    font-size: 24px;
                    line-height: 32px;
                }
                .product {
                    width: 28rem;
                    height: 51rem;
                }
                .carousel-arrow {
                    display: none;
                }
                .carousel-wrapper.unique-wrapper {
                    max-width: 1200px;
                    width: 95%;
                    margin: 0;
                    overflow: visible;
                    position: relative;
                }
            }
            @media (max-width: 991px) {
                .combine-products-title {
                    font-size: 24px;
                    line-height: 32px;
                }
                .product {
                    width: 28rem;
                    height: 51rem;
                }
                .carousel-arrow {
                    display: none;
                }
                .carousel-wrapper.unique-wrapper {
                    max-width: 1200px;
                    width: 95%;
                    margin: 0;
                    overflow: visible;
                    position: relative;
                }
            }
        `;
    document.head.appendChild(style);
  };

  const loadProducts = () => {
    let products = JSON.parse(localStorage.getItem("products")) || null;
    if (!products) {
      fetch(
        "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json"
      )
        .then((response) => response.json())
        .then((data) => {
          products = data;
          localStorage.setItem("products", JSON.stringify(data));
          populateCarousel(data);
        })
        .catch((err) => console.error("Error fetching product data:", err));
    } else {
      populateCarousel(products);
    }
  };

  const populateCarousel = (products) => {
    const track = document.querySelector(".carousel-track.unique-track");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
                <button class="favorite ${
                  favorites.includes(product.id) ? "active" : ""
                }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
                <a href="${product.url}" target="_blank">
                    <img src="${product.img}" alt="${product.name}" />
                </a>
                <div class="details">
                    <p>${product.name}</p>
                    <p class="price">${product.price.toFixed(2)} TL</p>
                </div>
            `;
      track.appendChild(productDiv);

      const favoriteButton = productDiv.querySelector(".favorite");
      favoriteButton.addEventListener("click", () => {
        favoriteButton.classList.toggle("active");
        if (favoriteButton.classList.contains("active")) {
          favorites.push(product.id);
        } else {
          const index = favorites.indexOf(product.id);
          if (index !== -1) favorites.splice(index, 1);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
      });
    });

    const productWidth = document.querySelector(".product").offsetWidth + 15;

    document
      .querySelector(".carousel-arrow.unique-arrow.left")
      .addEventListener("click", () => {
        track.scrollBy({ left: -productWidth, behavior: "smooth" });
      });

    document
      .querySelector(".carousel-arrow.unique-arrow.right")
      .addEventListener("click", () => {
        track.scrollBy({ left: productWidth, behavior: "smooth" });
      });
  };

  init();
})();
