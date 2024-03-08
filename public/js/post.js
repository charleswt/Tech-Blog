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
    if (event.target.hasAttribute('data-deleteId')) {
      const id = event.target.getAttribute('data-deleteId');
  
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
  
  const updateFormDisplayHandler = async (event) => {
    if (event.target.hasAttribute('data-updateId')) {
      const id = event.target.getAttribute('data-updateId');
  
      try {
        const response = await fetch(`/api/blog/textToUpdate/${id}`, {
          method: 'GET',
        });
  
        if (response.ok) {
          const blogData = await response.json();

          populateUpdateForm(blogData);
  
        } else {
          alert('Could not display update form');
          console.error('updateFormDisplayHandler could not be executed when clicked with a response of', response);
        }
      } catch (error) {
        console.error('Error during updateFormDisplayHandler:', error);
      }
    }
  };
  

  const populateUpdateForm = (blogData) => {

    const textToUpdate = document.querySelector(`#updateForm${blogData.id}`);
    
    textToUpdate.innerHTML = `<div class="form-style">
    <input id="title-blog" class="input-style" value="${blogData.title}"><input id="content-blog" class="input-style content-input" value="${blogData.content}">
    <button onClick="updateFormButtonHandler(event)" class="login-button" data-updateId="${blogData.id}">Update Post</button>
    </div>`;

    console.log('Populating update form with:', blogData);
  };

  const updateFormButtonHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-blog').value.trim();
    const content = document.querySelector('#content-blog').value.trim();

    if (event.target.hasAttribute('data-updateId')) {

        const id = event.target.getAttribute('data-updateId');

    const response = await fetch(`/api/blog/updatePost/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        return location.reload()
      } 
      alert('Could not update post');
      console.log('updateFormButtonHandler could not be executed when clicked with a response of', response);
    }
  }
