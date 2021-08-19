const users = [];

const addUser = ({ id,name,room }) => {
    users.push({ id , name , room })
    return { id , name , room };
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if(index) {
    const x =  users[index]
       users.splice(index,1);
       return x
    }
}

const getCurrentUser = (id) => {
    return users.find(user => user.id === id);
}

const getAllUsers = (room) => {
    return users.filter(user => user.room === room);
}


module.exports = {
    addUser, 
    removeUser,
    getCurrentUser,
    getAllUsers
}
