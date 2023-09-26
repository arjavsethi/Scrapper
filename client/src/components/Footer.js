export const Footer = () => {
  return (
    <div className="h-10 bg-emerald-400 overflow-hidden">
      <div className="">
        <p className="float-left pl-5 pt-2 prose prose-strong text-black tracking-wider cursor-none">
          &copy; {new Date().getFullYear()} Amazon Scarper
        </p>
      </div>
      <div className="">
        <p className="float-right pr-5 pt-2 prose prose-strong text-black tracking-wider cursor-none">
          Made with ❤️ by MatrixCoders
        </p>
      </div>
    </div>
  );
};
