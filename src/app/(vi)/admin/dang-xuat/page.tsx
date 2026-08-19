import { signOut } from "@/../auth";

export default function SignOutPage() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/admin/dang-nhap" });
      }}
    >
      <button type="submit">Đăng xuất</button>
    </form>
  );
}
