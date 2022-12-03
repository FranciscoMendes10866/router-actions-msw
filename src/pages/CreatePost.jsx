import { Form, redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const form = await request.formData();

  const formToJSON = {};
  for (const [key, value] of [...form.entries()]) {
    formToJSON[key] = value;
  }

  try {
    await fetch("/mocked-api/post", {
      method: "POST",
      body: JSON.stringify(formToJSON),
    });
  } catch (err) {
    console.log(`[ACTION ERROR]: ${err}`);
  }

  return redirect("/");
};

const CreatePost = () => {
  return (
    <section>
      <h2>Create New Post</h2>

      <Form method="post">
        <input name="title" placeholder="Post title" />
        <textarea name="content" placeholder="Post content" />
        <button type="submit">Submit</button>
      </Form>
    </section>
  );
};

export default CreatePost;
