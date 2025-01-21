import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const testBlog = {
    id: "3141592pi",
    title: "The Resolution of the Bitcoin Experiment",
    user: {
      username: "mhearn",
    },
    author: "Mike Hearn",
    url: "https://blog.plan99.net/the-resolution-of-the-bitcoin-experiment-dabb30201f7",
    likes: 13,
  };

  const testUser = {
    token: "t1k2n",
    username: "mhearn",
    name: "mike hearn",
  };

  let container;

  let mockLikeHandler;
  let mockDelHandler;

  beforeEach(() => {
    mockLikeHandler = vi.fn();
    mockDelHandler = vi.fn();

    const decFuncLike = (id) => mockLikeHandler;
    const decFuncDel = (id) => mockDelHandler;

    container = render(
      <Blog
        key={testBlog.id}
        blog={testBlog}
        onLikeClick={decFuncLike}
        onDelete={decFuncDel}
        userData={testUser}
      />,
    ).container;
  });

  test("renders title and author by default, BUT hides url and number of likes is not visible", async () => {
    const element = screen.getByText(`${testBlog.title} by ${testBlog.author}`);
    const element2 = screen.queryByText(
      `url: ${testBlog.url} likes: ${testBlog.likes}`,
    );

    expect(element2).toBeNull();
  });

  test("shows details when show details button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show details");
    await user.click(button);

    expect(container).toHaveTextContent(
      `url: ${testBlog.url}likes: ${testBlog.likes}`,
    );
  });

  test("shows details when show details button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show details");
    await user.click(button);

    expect(container).toHaveTextContent(
      `url: ${testBlog.url}likes: ${testBlog.likes}`,
    );
  });

  test("if the like button is clicked twice, the event handler is called twice", async () => {
    const user = userEvent.setup();
    const showButton = screen.getByText("show details");
    await user.click(showButton);
    const likeButton = screen.getByText("like");

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockLikeHandler.mock.calls).toHaveLength(2);
  });
});
