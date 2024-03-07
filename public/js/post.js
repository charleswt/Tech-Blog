const formButtonHandler = () => {
    displayButtonFirst.innerHTML = `<div class="form-style">
    <input id="title-blog" class="input-style" placeholder="Title"><input id="content-blog" class="input-style content-input" placeholder="Content...">
    <button onClick="newFormHandler(event)" class="login-button">Post</button>
    </div>`;
}

const displayButtonFirst = document.querySelector('#button-display');
displayButtonFirst.innerHTML = `<button id="post-form" class="post-form-btn form-display-button">New Post<p class="big-plus">+</p></button>`;

document.querySelector('.form-display-button').addEventListener('click', formButtonHandler);

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title-blog').value.trim();
    const content = document.querySelector('#content-blog').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/blog/createPost`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        return location.reload()
      } 
      alert('Could not post');
      console.error('newFormHandler could not be executed when clicked with a response of', response);
      console.log(title, content);
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        return location.reload()
      } 
      alert('Could not delete post');
      console.error('delButtonHandler could not be executed when clicked with a response of', response);
    }
  };
  