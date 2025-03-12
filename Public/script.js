document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    if (name && comment) {
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment');

        const commentName = document.createElement('h3');
        commentName.textContent = name;

        const commentText = document.createElement('p');
        commentText.textContent = comment;

        commentContainer.appendChild(commentName);
        commentContainer.appendChild(commentText);

        document.getElementById('commentsContainer').appendChild(commentContainer);

        document.getElementById('commentForm').reset();
    }
});
