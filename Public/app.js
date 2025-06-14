(function(){
    window.mgApp = {
        getUser: function(){
            return localStorage.getItem('mg_username');
        },
        setUser: function(name){
            localStorage.setItem('mg_username', name);
        },
        signOut: function(){
            localStorage.removeItem('mg_username');
        },
        getComments: function(){
            const key = 'mg_comments_' + window.location.pathname;
            try {
                return JSON.parse(localStorage.getItem(key)) || [];
            } catch(e){
                return [];
            }
        },
        saveComments: function(comments){
            const key = 'mg_comments_' + window.location.pathname;
            localStorage.setItem(key, JSON.stringify(comments));
        }
    };

    function renderComments(){
        const section = document.getElementById('comments');
        if(!section) return;
        section.innerHTML = '';
        const comments = mgApp.getComments();
        if(comments.length === 0){
            section.innerHTML = '<p>No comments yet.</p>';
        } else {
            const ul = document.createElement('ul');
            comments.forEach(c => {
                const li = document.createElement('li');
                li.textContent = c.user + ': ' + c.text;
                ul.appendChild(li);
            });
            section.appendChild(ul);
        }
    }

    function setupCommentForm(){
        const form = document.getElementById('commentForm');
        if(!form) return;
        form.addEventListener('submit', function(e){
            e.preventDefault();
            const user = mgApp.getUser();
            if(!user){
                alert('Please create an account first.');
                return;
            }
            const input = document.getElementById('commentInput');
            const text = input.value.trim();
            if(!text) return;
            const comments = mgApp.getComments();
            comments.push({user: user, text: text});
            mgApp.saveComments(comments);
            input.value = '';
            renderComments();
        });
    }

    document.addEventListener('DOMContentLoaded', function(){
        renderComments();
        setupCommentForm();
        const userDisplay = document.getElementById('currentUser');
        if(userDisplay){
            const user = mgApp.getUser();
            userDisplay.textContent = user ? 'Logged in as ' + user : 'Not logged in';
        }
    });
})();
