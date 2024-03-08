const commentId = document.querySelector('#commentFormElementId').getAttribute('data-displayCommentFormId');

document.querySelector(`#commentForm${commentId}`).addEventListener('click', displayCommentForm);

document.querySelector(`sendComment${commentId}`).addEventListener('click', createCommentHandler);

const displayCommentForm = (event) => {
  
  const commentForm = document.querySelector(`#displayCommentForm${commentId}`);
    
  commentForm.innerHTML = `
    <div class="home-blog">
      <div class="home-row ">
        <input id="commentInput${commentId}" class="home-content">
        <button id="sendComment${commentId}">Send</button>
      </div>
    </div>`;
};

const createCommentHandler = async (event) => {
  event.preventDefault();

  const commentInput = document.querySelector(`#commentInput${commentId}`).value;

  try {
    const response = await fetch(`/comments/comment/${commentId}`, {
      method: 'POST',
      body: JSON.stringify({ comment: commentInput }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Comment created successfully');
    } else {
      console.error('Failed to create comment');
    }
  } catch (error) {
    console.error('Error during comment creation:', error);
  }
};