let userRating = 0;

function rate(rating) {
    userRating = rating;

    for (let i = 1; i <= 5; i++) {
        document.getElementById("star" + i).style.color = "#ccc";
    }

    for (let i = 1; i <= rating; i++) {
        document.getElementById("star" + i).style.color = "#FFD700";
    }
}

function submitReview() {
    const userName = document.getElementById("userName").value.trim();
    const productPurchased = document.getElementById("productPurchased").value.trim();
    const reviewText = document.getElementById("reviewText").value.trim();

    if (userName === "" || productPurchased === "" || userRating === 0 || reviewText === "") {
        alert("Silakan lengkapi semua field, berikan rating, dan tulis review.");
        return;
    }

    const review = {
        userName: userName,
        productPurchased: productPurchased,
        rating: userRating,
        reviewText: reviewText
    };

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.push(review);

    localStorage.setItem("reviews", JSON.stringify(reviews));

    displayReview(review);

    document.getElementById("userName").value = "";
    document.getElementById("productPurchased").value = "";
    document.getElementById("reviewText").value = "";
    rate(0);
}

function displayReview(review) {
    const reviewsContainer = document.getElementById("reviews");

    const reviewItem = document.createElement("div");
    reviewItem.className = "review-item";

    const userNameElement = document.createElement("div");
    userNameElement.className = "user-name";
    userNameElement.textContent = "Nama: " + review.userName;

    const productPurchasedElement = document.createElement("div");
    productPurchasedElement.className = "product-purchased";
    productPurchasedElement.textContent = "Unit Dibeli: " + review.productPurchased;

    const userRatingElement = document.createElement("div");
    userRatingElement.className = "user-rating";
    userRatingElement.innerHTML = "Rating: " + "★".repeat(review.rating);

    const userReviewElement = document.createElement("div");
    userReviewElement.className = "user-review";
    userReviewElement.textContent = review.reviewText;

    reviewItem.appendChild(userNameElement);
    reviewItem.appendChild(productPurchasedElement);
    reviewItem.appendChild(userRatingElement);
    reviewItem.appendChild(userReviewElement);

    reviewsContainer.appendChild(reviewItem);
}

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.forEach(displayReview);
}

window.onload = loadReviews;


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector('.form-control[type="search"]');
    const searchButton = document.querySelector('.btn[type="submit"]');
    
    const itemsContainers = document.querySelectorAll('.items-container');

    function filterItems(query) {
        itemsContainers.forEach(function (container) {
            const itemHeading = container.querySelector('.card-title').textContent.toLowerCase();

            if (itemHeading.includes(query)) {
                container.style.display = 'inline-block';
            } else {
                container.style.display = 'none'; 
            }
        });
    }

    searchButton.addEventListener('click', function (e) {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase();
        filterItems(searchTerm);
    });

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();

        if (query === "") {
            itemsContainers.forEach(item => {
                item.style.display = "inline-block";
            });
        } else {
            filterItems(query);
        }
    });
});

