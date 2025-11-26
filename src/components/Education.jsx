import React from "react";

const Education = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6">
      {/* Education */}
      <div className="flex flex-col gap-4 h-full">
        <h2 className="text-stitch-black text-[22px] font-bold leading-tight">
          Education
        </h2>
        <div className="bg-stitch-card p-6 rounded-lg border border-stitch-pink h-full shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-stitch-black">
              B.E. Computer Science Engineering
            </h3>
            <p className="text-stitch-textux mb-2">
              Aalim Muhammed Salegh College of Engineering
            </p>
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t border-stitch-pink text-sm text-stitch-black">
            <span>CGPA: 8.04</span>
            <span className="font-bold text-stitch-gold">2024</span>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="flex flex-col gap-4 h-full">
        <h2 className="text-stitch-black text-[22px] font-bold leading-tight">
          Certifications
        </h2>
        <div className="bg-stitch-card p-6 rounded-lg border border-stitch-pink h-full shadow-sm">
          <ul className="space-y-3 text-stitch-black text-sm">
            <li className="flex items-center gap-3">
              <span className="text-stitch-red font-bold">✓</span> Foundation of
              Python
            </li>
            <li className="flex items-center gap-3">
              <span className="text-stitch-red font-bold">✓</span> Oracle DBA
            </li>
            <li className="flex items-center gap-3">
              <span className="text-stitch-red font-bold">✓</span> Full Stack
              Web Development
            </li>
            <li className="flex items-center gap-3">
              <span className="text-stitch-red font-bold">✓</span> ChatGPT
              Prompt Engineering
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Education;
