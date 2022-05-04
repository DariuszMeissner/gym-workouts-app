import React from 'react';

const Logout = () => {
    return (
      <div className="protected-container-header">
        <button onClick={signUserOut}>
          <i class="fas fa-sign-out"></i>
        </button>
      </div>
    );
};

export default Logout;