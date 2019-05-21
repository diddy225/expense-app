import React from "react";

const HomePage = (props) => {
    const { authed, user } = props;
    return (
      <div>
        <div style={{textAlign:"center"}}>
          {!authed ? (
            <div>
              <h1>EXPENSE</h1>
              <p>PLEASE LOGIN WITH GOOGLE TO START</p>
            </div>
          ) : (
            <div>
              <h1>You have logged in succcessfully!</h1>
              <h2>Welcome {user.name}!</h2>
            </div>
          )}
        </div>
      </div>
    );
}

export default HomePage