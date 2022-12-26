import { Form, redirect, json, useActionData } from "react-router-dom";
import { assert, object, string, nonempty, StructError } from "superstruct";

const articleSchema = object({
  title: nonempty(string()),
  content: nonempty(string()),
});

export const action = async ({ request }) => {
  const form = await request.formData();

  const formToJSON = {};
  for (const [key, value] of [...form.entries()]) {
    formToJSON[key] = value;
  }

  try {
    assert(formToJSON, articleSchema);
  } catch (err) {
    if (err instanceof StructError) {
      const fieldsErrors = err.failures().reduce(
        (acc, { key, message }) => ({
          ...acc,
          [key]: message,
        }),
        {}
      );
      return json(fieldsErrors);
    }
    console.error(err);
  }

  try {
    await fetch("/mocked-api/post", {
      method: "POST",
      body: JSON.stringify(formToJSON),
    });
  } catch (err) {
    console.error(`[ACTION ERROR]: ${err}`);
  }

  return redirect("/");
};

const CreatePost = () => {
  const actionData = useActionData();

  return (
    <section>
      <h2>Create New Post</h2>

      <Form method="post">
        <input name="title" placeholder="Post title" />
        {actionData?.title && <small>{actionData?.title}</small>}

        <br />
        <textarea name="content" placeholder="Post content" />
        {actionData?.content && <small>{actionData?.content}</small>}

        <br />
        <button type="submit">Submit</button>
      </Form>
    </section>
  );
};

export default CreatePost;
