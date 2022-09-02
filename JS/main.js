// 1 start
let users = [
    {
        name: 'User 1',
        password: 'pass111',
        age: 25,
        isLogin: false
    },
    {
        name: 'User 2',
        password: 'pass222',
        age: 30,
        isLogin: false
    },
    {
        name: 'User 3',
        password: 'pass333',
        age: 35,
        isLogin: false
    }
];

let posts = [
    {
        id: 1,
        title: 'Post 1',
        user: 'User 3',
    },
    {
        id: 2,
        title: 'Post 2',
        user: 'User 4',
    },
    {
        id: 3,
        title: 'Post 3',
        user: 'User 6',
    }
];
// 1 end

// users scripts start
let inSystem = '';

function changeInSystemUser(userName=''){
    inSystem = userName;
    let h3 = document.querySelector('h3');
    inSystem ? h3.innerText = `User: ${inSystem} in system` : h3.innerText = 'No users in system'
};

// create logic
function checkUniqueUserName(userName){
    return users.some(item => item.name === userName);
};

function checkPassword(pass, passConfirm){
    return pass === passConfirm;
}

function createUser(){
    let userName = prompt('Enter username');
    if(checkUniqueUserName(userName)) {
        alert('User already exists!');
        return;
    };
    let pass = prompt('Enter password');
    let passConfirm = prompt('Enter password confirmation');
    if(!checkPassword(pass, passConfirm)){
        alert("Passwords don't match")    
        return;    
    };
    let age = +prompt('Enter age');
    let userObj = {
        name: userName,
        password: pass,
        age: age,
        isLogin: false
    };
    users.push(userObj);
    alert('Created successfully');
    console.log(users);
};

// login logic
function getUserObj(userName){
    let test= users.find(item => item.name === userName);
    console.log(test);
    return test;
};

function checkUserPassword(userName, pass){
    let user = getUserObj(userName);
    console.log(user);
    return user.password === pass;
};

function loginUser(){
    let userName = prompt('Enter username');
    console.log(userName);
    if(!checkUniqueUserName(userName)) {
        alert('User not found');
        return;
    };
    let pass = prompt('Enter password');
    if(!checkUserPassword(userName, pass)) {
        alert("Password doesn't match this account!");
        return;
    };
    let user = getUserObj(userName);
    user.isLogin = true;
    changeInSystemUser(userName);
};

// logout logic
function logoutUser(){
    let user = getUserObj(inSystem);
    user.isLogin = false;
    inSystem = '';
    changeInSystemUser('');
};
// users scripts end

// posts scripts start
function createPost() {
    if(!inSystem) {
        alert('Only authorized users can create post');
        return;
    };
    let postTitle = prompt('Enter post title');
    let postObj = {
        id: Date.now(),
        title: postTitle,
        user: inSystem,
        likes: 0
    };
    posts.push(postObj);
    alert('Past successfully created');
    console.log(posts);
};

// update logic
function getPostObj(id){
    return posts.find(item => item.id === id);
};
function checkOwnerPost(id){
    let postObj = getPostObj(id);
    return postObj && postObj.user === inSystem;
};

function updatePost() {
    if(!inSystem) {
        alert('Only authorized users can create post');
        return;
    };
    let postId = +prompt('Enter post id');
    if(!checkOwnerPost(postId)){
        alert('there is no post with id, or you are not the author of such a post');
        return;
    };
    let postObj = getPostObj(postId);
    let newPostDate = prompt('Enter new post data');
    postObj.title = newPostDate;
    alert('Post successfylly updated');
    console.log(posts);
};


// delete post
function deletePost(){
if(!inSystem) {
    alert('Only authorized users can create post');
    return;
};
let postId = +prompt('Enter post id');
    if(!checkOwnerPost(postId)){
        alert('there is no post with id, or you are not the author of such a post');
        return;
    };
    posts = posts.filter(item => item.id !== postId);
    alert('Successfully deleted');
    readPosts();
};

// Messages scripts
function checkMessagesKey(obj){
    return Object.keys(obj).some(item => item === 'messages');
};

function sendMessages(){
    if(!inSystem) {
        alert('Only authorized users can create messages');
        return;
    };
    let postId = +prompt('Enter post id')
    let postObj = getPostObj(postId);
    if(!postObj){
    alert('Post not found');
    return;
};
let messagesContent = prompt('Enter messages content');
let messagesObj = {
    id: 'mess-' + Date.now(),
    content: messagesContent,
    user: inSystem
};
if(checkMessagesKey(postObj)){
    postObj.messages.push(messagesObj);
} else {
    postObj.messages = [messagesObj, ];
};
alert('Messages created successfully');
console.log(posts);
};


// delete messages
function getMessObj(id){
let messages = [];
let getMessages = posts.forEach(item => {
    if(item.messages){
        for(i of item.messages){
            messages.push(i);
        };
    };
});
return messages.find(item => item.id === id);
};

function checkOwnerMessages(id){
    let messObj = getMessObj(id);
    return messObj && messObj.user === inSystem;
};

function deleteMessages(){
    if(!inSystem){
        alert('Only authorized users can delete messages')
        return;
    };
    let messageId = prompt('Enter messages id');
    if(!checkOwnerMessages(messageId)){
        alert('There is no messages with id, or you are not the author of such a messages');
        return;
    };
    posts = posts.map(item => {
        if(item.messages){
            item.messages = item.messages.filter(mess => mess.id !== messageId);
        };
        return item;
    });
    alert('Massages successfully deleted');
    console.log(posts);
};


