import type { FC, PropsWithChildren } from "hono/jsx";

type Props = PropsWithChildren<{
  user?: { sub: number; role: string };
}>;

export const Layout: FC<Props> = function (props) {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Gallery</title>
        <link rel="stylesheet" href="/public/styles/output.css" />
      </head>
      <body class="bg-gray-950 text-gray-50 flex flex-col items-center min-h-screen">
        <div>
          {!props.user ? (
            <nav class="flex gap-3 items-center">
              <a href="/users/login">login</a>
              <a href="/users/register">register</a>
            </nav>
          ) : (
            <div>
              Hello {props.user.role.toLowerCase()} {props.user.sub}
            </div>
          )}
        </div>
        <main class="flex flex-1 flex-col justify-center items-center">
          {props.children}
        </main>
      </body>
    </html>
  );
};
