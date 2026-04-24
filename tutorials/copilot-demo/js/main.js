const likeButton = document.querySelector('[data-like-button]');
const likeCount = document.querySelector('[data-like-count]');
const bookmarkButton = document.querySelector('[data-bookmark-button]');

if (likeButton && likeCount) {
    likeButton.addEventListener('click', () => {
        const isActive = likeButton.classList.toggle('is-active');
        likeCount.textContent = isActive ? '1,249' : '1,248';
        likeButton.querySelector('span').textContent = isActive ? '♥' : '♡';
    });
}

if (bookmarkButton) {
    bookmarkButton.addEventListener('click', () => {
        const isActive = bookmarkButton.classList.toggle('is-active');
        bookmarkButton.querySelector('span:last-child').textContent = isActive ? 'Saved' : 'Save';
    });
}
