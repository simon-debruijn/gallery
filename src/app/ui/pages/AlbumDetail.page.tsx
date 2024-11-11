import { Layout } from "../layouts/Layout.js";
import { AlbumStatus } from "../../albums/AlbumStatus.js";

type Props = {
  title: string;
  id: string;
  status: AlbumStatus;
};

export function AlbumDetailPage(props: Props) {
  const ownershipForm = (
    <form
      method="post"
      action={`/albums/${props.id}/claim`}
      class="flex flex-col gap-3"
    >
      <label htmlFor="#requester-email"></label>
      <input id="requester-email" name="email" type="email" required></input>
      <button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-lg font-medium transition-colors"
      >
        Request ownership
      </button>
    </form>
  );

  return (
    <Layout>
      <a href="/">{"< home"}</a>
      <h2 class="text-6xl">{props.title}</h2>
      <div>{props.id}</div>
      {props.status === AlbumStatus.UNCLAIMED ? (
        ownershipForm
      ) : (
        <div>(being) claimed</div>
      )}
    </Layout>
  );
}
