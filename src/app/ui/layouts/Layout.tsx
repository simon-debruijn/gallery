import type { FC } from "hono/jsx";

export const Layout: FC = function (props) {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Gallery</title>
        <link rel="stylesheet" href="/public/styles/output.css" />
      </head>
      <body class="bg-gray-950 text-gray-50 flex flex-col items-center justify-center min-h-screen">
        {props.children}
      </body>
    </html>
  );
};
