import React from 'react';
import imagePath from '../Images/i1.jpeg';

const HeaderTitle = () => {
  return (
    <div dir='rtl' className="relative">
      <img
        src={imagePath}
        alt="תמונה מעוררת השראה"
        className="w-full h-auto"
      />
      <div  className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-center ">
          <h1 className="text-3xl font-bold text-[#3abcb1] mb-3 ">
            מתנות ייחודיות ומקוריות
          </h1>
          <p className="text-2xl text-[#3abcb1]">
            לכל אירוע, לכל אדם – מתנות שיביאו חיוך
          </p>
          <p className="text-1xl text-[#3abcb1] mt-2">
           גלו את הקולקציה שלנו ותמצאו את המתנה המושלמת!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderTitle;