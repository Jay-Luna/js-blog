const AllUsers = () => {
    const { username: userParam } = useParams();
    const isLoggedIn = Auth.loggedIn();



    const AllUsers = () => {
        const { username: userParam } = useParams();
        const isLoggedIn = Auth.loggedIn();
      
        if (!isLoggedIn) {
          //alert;
          window.location.assign("/login");
        }
      
        console.log(userParam);

};
};
export default AllUsers;