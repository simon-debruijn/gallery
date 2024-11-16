export function LoginPage(props: { email?: string }) {
  return (
    <form method="post" action="/users/login" class="flex flex-col gap-3">
      <label htmlFor="email">email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={props.email}
        required
        className="text-black"
      ></input>

      <label htmlFor="password">password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="text-black"
      ></input>

      <button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-lg font-medium transition-colors"
      >
        Login
      </button>
    </form>
  );
}
