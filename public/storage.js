export function loadPosts(){
    const saved = localStorage.getItem('blogPosts');
    return saved ? JSON.parse(saved) : null;
}

export function savePosts(posts){
    localStorage.setItem('blogPosts',JSON.stringify(posts));
}