import classNames from 'classnames';
import { useState } from 'react';
import Link from 'next/link';

const classes = {
  btn: 'text-white p-3',
};

const NavBar = () => {
  return (
    <div className="w-full bg-blue-500 p-3 flex flex-row">
      <div className="text-4xl px-12 text-white">TransferGuru</div>
      <div className="flex flex-row justify-self-end">
        {
          //<div className={classes.btn}>ABOUT</div>
          //<div className={classes.btn}>FAQ</div>
        }
      </div>
    </div>
  );
};
export default NavBar;
