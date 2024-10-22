document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const postContent = document.getElementById('postContent').value;
    const postImage = document.getElementById('postImage').files[0];

    if (postContent || postImage) {
        addPost(postContent, postImage);
        document.getElementById('postContent').value = ''; // Clear the textarea
        document.getElementById('postImage').value = ''; // Clear the file input
    }
});

function addPost(content, image) {
    const postsContainer = document.getElementById('postsContainer');
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const timestamp = new Date().toLocaleString();
    let imageHTML = '';

    if (image) {
        const imageUrl = URL.createObjectURL(image);
        imageHTML = `<img src="${imageUrl}" alt="Post Image" class="image-preview">`;
    }

    postElement.innerHTML = `
        <p>${content}</p>
        ${imageHTML}
        <span class="timestamp">${timestamp}</span>
        <div>
            <span class="likes">❤️ <span class="likeCount">0</span></span>
            <button class="delete-btn" onclick="deletePost(this)">Delete</button>
        </div>
    `;

    const likeButton = postElement.querySelector('.likes');
    likeButton.addEventListener('click', function() {
        const likeCount = postElement.querySelector('.likeCount');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    });

    postsContainer.prepend(postElement); // Add new post at the top
}

function deletePost(button) {
    const post = button.closest('.post');
    post.remove();
}


