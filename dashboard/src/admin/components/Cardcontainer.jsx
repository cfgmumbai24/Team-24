import Card from "./Card";

const BlogContainer = () => {
  const data = [
    {
      title: "Terracota Necklace",
      description: "Product: Made with Terracota material",
      quantity: "12",
      status: "SOMETHING",
    },
    {
      title: "Terracota Necklace",
      description: "Product: Made with Terracota material",
      quantity: "12",
      status: "SOMETHING",
    },
    {
      title: "Terracota Necklace",
      description: "Product: Made with Terracota material",
      quantity: "12",
      status: "SOMETHING",
    },
  ];
  return (
    <div className="container mx-auto mt-8 mb-8 px-4 flex flex-wrap justify-evenly">
      {/* <div>
        <h1>Admin Dashboard</h1>
      </div> */}
      {data.map((d) => {
        return <Card card={d} />;
      })}
    </div>
  );
};

export default BlogContainer;
