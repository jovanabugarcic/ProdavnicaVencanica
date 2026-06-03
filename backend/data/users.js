import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Jovana Bugarcic",
        email: "jovanabugarcic05@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: "Teodora Knezevic",
        email: "teodora@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
];
export default users;