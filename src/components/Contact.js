const Contact = () => {
  return (
    <div className="contact w-6/12 mx-auto my-4 p-2 bg-blue-100 shadow-lg rounded-md">
      <h1 className="text-center font-bold text-lg">Contact Us</h1>
      <form className="flex justify-center items-center flex-col">
        <input className="m-2 p-2 border border-grey rounded-md" input="text" placeholder="Name" />
        <input className="m-2 p-2 border border-grey rounded-md" input="text" placeholder="Message" />
        <button className="m-2 p-2 bg-green-300 rounded-lg hover:bg-green-400">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
