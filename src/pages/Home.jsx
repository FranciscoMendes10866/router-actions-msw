import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  let data;
  try {
    const res = await fetch("/mocked-api/post");
    data = await res.json();
  } catch {
    data = null;
  }
  return data;
};

const Home = () => {
  const list = useLoaderData();

  return (
    <div>
      <h1>Home page</h1>

      {list?.map((item, itemIndex) => (
        <ul key={itemIndex}>
          <li>{item?.title}</li>
        </ul>
      ))}
    </div>
  );
};

export default Home;
