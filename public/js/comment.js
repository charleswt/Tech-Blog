const commentForms = document.querySelectorAll('#commentForm');

commentForms.forEach(commentForm => {
  const commentId = commentForm.getAttribute('data-displayCommentFormId');
  
  commentForm.addEventListener('click', () => displayCommentForm(commentId));
});

const displayCommentForm = (commentId) => {
  const commentFormContainer = document.querySelector(`#displayCommentForm${commentId}`);

  if (commentFormContainer.children.length === 0) {
    const commentForm = document.createElement('div');
    commentForm.classList.add('home-blog');
    commentForm.innerHTML = `
      <div class="home-row ">
        <input id="commentInput${commentId}" class="home-content">
        <button class="sendComment login-button">Send</button>
      </div>
    </div>`;

    commentFormContainer.appendChild(commentForm);

    commentForm.querySelector('.sendComment').addEventListener('click', () => createCommentHandler(commentId));
  }
};

const createCommentHandler = async (commentId) => {
  const commentInput = document.querySelector(`#commentInput${commentId}`).value;
  
  console.log(commentId)
  try {
    const response = await fetch(`/api/comments/comment/${commentId}`, {
      method: 'POST',
      body: JSON.stringify({ comment: commentInput }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Comment created successfully');
      location.reload()
    } else {
      console.error('Failed to create comment');
      console.log(response)
    }
  } catch (error) {
    console.error('Error during comment creation:', error);
  }
};